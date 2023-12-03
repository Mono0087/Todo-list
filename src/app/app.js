import { Form, ListForm, TaskForm, ChangeTaskForm } from "./Form"
import { Storage, localStorageApi } from "./StorageApi"
import { DefaultList, CustomList, List } from "./List"
import createElement from "./utils/createElement"
import createListLiElement from "./utils/createListElElement"
import { format } from 'date-fns'

export const run = () => {
    const FormListApi = new ListForm
    const FormTaskApi = new TaskForm
    const FormChangeTaskApi = new ChangeTaskForm
    // Add overlay and basic form structure to DOM
    FormListApi.initBaseStructure()
    // CACHE DOM /////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////
    const container = document.querySelector('.container')
    const nav = container.querySelector('nav')
    const main = container.querySelector('main')
    const addListBtn = container.querySelector('#add-project-btn')
    const defaultListsContainer = container.querySelector('[data-default-lists]')
    const customListsContainer = container.querySelector('[data-custom-lists]')
    const overlay = container.querySelector('#overlay')
    const popUpForm = container.querySelector('#pop-up-form')

    // STORAGE ///////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////
    let StorageClient = new Storage(new localStorageApi)
    const DEFAULT_LIST_LOCAL_STORAGE_KEY = 'defaultList'
    const CUSTOM_LIST_LOCAL_STORAGE_KEY = 'customList'
    const CUSTOM_LISTS_KEYS_LOCAL_STORAGE_KEY = 'customListsIDs'
    let customListsKeys = StorageClient.getListsKeys(CUSTOM_LISTS_KEYS_LOCAL_STORAGE_KEY) || []

    // INIT //////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////
    initDefaultLists()
    let currentList = StorageClient.getList('defaultList.1')
    let currentListKey = 'defaultList.1'
    renderDefaultLists()
    renderCustomLists()
    openListOnMain(currentList)

    // BIND EVENTS ///////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////
    nav.addEventListener('click', listsContainerHandler)
    overlay.addEventListener('click', handleForm)
    addListBtn.addEventListener('click', () => {
        FormListApi.initForm()
        FormListApi.showForm()
    })


    // FUNCTIONS /////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////
    function initDefaultLists() {
        let defaultLists = [
            new DefaultList(1, 'Today'),
            new DefaultList(2, 'Week'),
            new DefaultList(3, 'Everyday')
        ]
        defaultLists[0].todos = [
            { title: 'Wake up', dueDate: format(new Date(), 'dd/MM/yyyy'), checked: true, priority: 0 },
            { title: 'drink water', dueDate: format(new Date(), 'dd/MM/yyyy'), checked: false, priority: 0 }
        ]
        defaultLists.forEach((list, i) => {
            let inStorage = StorageClient.getList(`${DEFAULT_LIST_LOCAL_STORAGE_KEY}.${i + 1}`)
            if (!inStorage) {
                StorageClient.saveList(list, DEFAULT_LIST_LOCAL_STORAGE_KEY)
            }
        })
    }

    function renderDefaultLists() {
        let i = 0
        while (true) {
            let list = StorageClient.getList(`${DEFAULT_LIST_LOCAL_STORAGE_KEY}.${i + 1}`)
            if (!list) break
            let listEl = createListLiElement(list, 'default')
            defaultListsContainer.appendChild(listEl)
            ++i
        }
    }

    function renderCustomLists() {
        customListsContainer.innerHTML = ''
        customListsKeys.forEach((item, i) => {
            let list = StorageClient.getList(customListsKeys[i])
            let listEl = createListLiElement(list, 'custom')
            customListsContainer.append(listEl)
        })
    }

    function handleForm(Event) {
        switch (Event.target.id) {
            case 'overlay':
                FormListApi.hideForm()
                break;
            case 'save-list-btn':
                saveList()
                renderCustomLists()
                FormTaskApi.hideForm()
                Event.preventDefault()
                break;
            case 'save-task-btn':
                saveTask()
                renderTodos(currentList)
                FormTaskApi.hideForm()
                Event.preventDefault()
                break;
        }

        Event.stopPropagation()
    }

    function saveList() {
        let inputsData = getInputsData()
        let isValid = FormListApi.validateFormInputs(inputsData)
        if (!isValid) {
            alert('All fields must be filled up!')
            return;
        }
        createList(inputsData[0])
    }

    function createList(listName) {
        let list = new CustomList(listName)
        let listKey = `${CUSTOM_LIST_LOCAL_STORAGE_KEY}.${list.id}`
        customListsKeys.push(listKey)
        StorageClient.updateListsKeys(CUSTOM_LISTS_KEYS_LOCAL_STORAGE_KEY, customListsKeys)
        StorageClient.saveList(list, CUSTOM_LIST_LOCAL_STORAGE_KEY)
    }

    function saveTask() {
        let inputs = handleInputsData()
        let task = { title: inputs[0], dueDate: inputs[1], priority: inputs[2], checked: false }
        currentList.todos.push(task)
        StorageClient.updateList(currentListKey, currentList)
    }

    function changeTask(taskId) {
        let inputs = handleInputsData()
        let changedTask = { title: inputs[0], dueDate: inputs[1], priority: inputs[2], checked: false }
        currentList.todos[taskId] = changedTask
        StorageClient.updateList(currentListKey, currentList)
    }

    function deleteList(listKey) {
        StorageClient.deleteList(listKey)
        customListsKeys.forEach((key, i) => {
            if (key == listKey) customListsKeys.splice(i, 1)
        })
        StorageClient.updateListsKeys(CUSTOM_LISTS_KEYS_LOCAL_STORAGE_KEY, customListsKeys)
    }

    function handleInputsData() {
        let inputsData = getInputsData()
        let isValid = FormTaskApi.validateFormInputs(inputsData)
        if (!isValid) {
            alert('All fields must be filled up!')
            return;
        }
        let date = new Date(inputsData[1])
        let formatDate = format(date, 'dd/MM/yyyy')
        inputsData[1] = formatDate
        return inputsData
    }

    function getInputsData() {
        let inputsData = [...popUpForm.querySelectorAll('input')].map((el) => {
            if (el.type === 'checkbox') return el.checked;
            return el.value;
        })
        return inputsData
    }

    function listsContainerHandler(Event) {
        let target = Event.target
        let targetData = Event.target.dataset.navEl
        switch (targetData) {
            case 'list-item-btn':
                let listId = target.parentElement.dataset.listId
                currentList = StorageClient.getList(listId)
                currentListKey = listId
                openListOnMain(currentList)
                break;
            case 'dropdown-btn':
                openDropDownMenu(target)
                break;
            case 'delete-list-btn':
                let listElId = target.closest('.custom-list-item').dataset.listId
                deleteList(listElId)
                renderCustomLists()
                break;
            default:
                break;
        }
    }

    function todosContainerClickHandler(Event) {
        let todosContainer = Event.target.closest('.todos-container')
        let targetData = `${Event.target.dataset.todoEl}`
        let todoEl = Event.target.closest('.todo-item')
        let index = Array.from(todosContainer.children).indexOf(todoEl);
        switch (targetData) {
            case 'title':
                Event.target.classList.toggle('checked')
                toggleCrossOutTask(index)
                break;
            case 'delete':
                deleteTodo(index)
                renderTodos(currentList)
                break;
            case 'change':
                FormChangeTaskApi.initForm()
                FormChangeTaskApi.showForm()
                let changeTaskBtn = container.querySelector('#change-task-btn')
                changeTaskBtn.addEventListener('click', (e) => {
                    changeTask(index)
                    renderTodos(currentList)
                    FormTaskApi.hideForm()
                    e.preventDefault()
                })
                break;
            default:
                break;
        }
    }

    function openDropDownMenu(target) {
        let dropdownMenu = target.parentElement
        let dropdownContent = dropdownMenu.lastChild
        let allDropLists = customListsContainer.querySelectorAll('.dropdown-content')
        Array.from(allDropLists).forEach(el => el.classList.remove('dropdown-content-open'))
        dropdownContent.classList.add('dropdown-content-open')
        window.addEventListener('click', function (e) {
            if (!e.target.matches('.dropdown-btn')) {
                if (dropdownContent.classList.contains('dropdown-content-open')) {
                    dropdownContent.classList.remove('dropdown-content-open')
                }
            }
        })
    }

    function openListOnMain(list) {
        main.innerHTML = ''
        let listContainer = createElement('div', ['list-container'], null, null)
        let h2 = createElement('h2', null, 'list-title', list.name)
        let todosContainer = createElement('ul', ['todos-container'])
        let addTodoBtn = createElement('button', ['btn'], 'add-todo-btn', 'Add task')
        addTodoBtn.addEventListener('click', () => {
            FormTaskApi.initForm()
            FormTaskApi.showForm()
        })
        listContainer.append(h2, todosContainer, addTodoBtn)
        main.appendChild(listContainer)
        todosContainer.addEventListener('click',
            todosContainerClickHandler)
        renderTodos(list)
    }

    function renderTodos(list) {
        let todosContainer = container.querySelector('.todos-container')
        todosContainer.innerHTML = ''
        list.todos.forEach(todo => {
            let todoEl = createElement('li', ['todo-item'])
            let todoElContainer = createElement('div', ['todo-container'])
            let todoTitle = createElement('button', ['todo-title'], null, todo.title, 'todoEl', 'title')
            todo.checked ? todoTitle.classList.add('checked') : null
            let todoDueDate = createElement('span', ['todo-date'], null, todo.dueDate)
            let deleteTodoBtn = createElement('button', ['btn', 'delete-todo-btn'], null, '✗', 'todoEl', 'delete')
            let changeTodoBtn = createElement('button', ['btn', 'change-todo-btn'], null, '✎', 'todoEl', 'change')
            let priorityIcon = createElement('button', ['priority-icon'], null, '✗')
            const priorities = ['white', '#32c246', '#d6d436', '#d69136', '#d65036']
            priorityIcon.style.backgroundColor = `${priorities[todo.priority]}`
            let todoInfoContainer = createElement('div', ['todo-info-container'])
            todoInfoContainer.append(todoDueDate, deleteTodoBtn, changeTodoBtn, priorityIcon)
            todoElContainer.append(todoTitle, todoInfoContainer)
            todoEl.appendChild(todoElContainer)
            todosContainer.appendChild(todoEl)
        })
    }
    function deleteTodo(todoId) {
        currentList.todos.splice(todoId, 1)
        StorageClient.updateList(currentListKey, currentList)
    }

    function toggleCrossOutTask(taskId) {
        let todo = currentList.todos[taskId]
        todo.checked = todo.checked ? false : true
        StorageClient.updateList(currentListKey, currentList)
    }

}