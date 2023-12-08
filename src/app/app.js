import { Form, ListForm, TaskForm, EverydayTaskForm, ChangeEverydayTaskForm, ChangeTaskForm, SetStartOfDay } from "./Form"
import { Storage, localStorageApi } from "./StorageApi"
import { DefaultList, DefaultEverydayList, CustomList, List } from "./List"
import createElement from "./utils/createElement"
import createListLiElement from "./utils/createListElElement"
import { format, setHours, getHours, startOfToday, differenceInHours } from 'date-fns'

export const run = () => {
    const FormListApi = new ListForm
    const FormTaskApi = new TaskForm
    const FormEverydayTaskApi = new EverydayTaskForm
    const FormChangeTaskApi = new ChangeTaskForm
    const FormChangeEverydayTaskApi = new ChangeEverydayTaskForm
    const FormSetStartOfDayApi = new SetStartOfDay

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
    const DEFAULT_EVERYDAY_LIST_STORAGE_KEY = 'defaultEverydayList'
    const CUSTOM_LIST_LOCAL_STORAGE_KEY = 'customList'
    const CUSTOM_LISTS_KEYS_LOCAL_STORAGE_KEY = 'customListsIDs'
    let customListsKeys = StorageClient.getListsKeys(CUSTOM_LISTS_KEYS_LOCAL_STORAGE_KEY) || []
    let defaultLists = []

    // INIT //////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////
    initDefaultLists()
    let currentListKey = 'defaultList.1'
    let currentList = StorageClient.getList(currentListKey)
    renderDefaultLists()
    renderCustomLists()
    openListOnMain(currentList)
    let startHour = '0'
    initStartTime()

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
        defaultLists = [
            new DefaultList(1, 'Today'),
            new DefaultList(2, 'Week'),
        ]
        let everydayDefaultList = new DefaultEverydayList(3, 'Everyday')
        defaultLists[0].todos = [
            { title: 'Wake up', dueDate: format(new Date(), 'dd/MM/yyyy'), checked: true, priority: 0 },
            { title: 'drink water', dueDate: format(new Date(), 'dd/MM/yyyy'), checked: false, priority: 0 }
        ]
        defaultLists.forEach((list) => {
            addDefaultListToStorage(DEFAULT_LIST_LOCAL_STORAGE_KEY, list)
        })
        addDefaultListToStorage(DEFAULT_EVERYDAY_LIST_STORAGE_KEY, everydayDefaultList)
    }

    function addDefaultListToStorage(listKeyPrefix, list) {
        let inStorage = StorageClient.getList(`${listKeyPrefix}.${list.id}`)
        if (!inStorage) {
            StorageClient.saveList(list, listKeyPrefix)
        }
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
        let everydayDefaultList = StorageClient.getList(`${DEFAULT_EVERYDAY_LIST_STORAGE_KEY}.3`)
        let listEl = createListLiElement(everydayDefaultList, 'defaultEveryday')
        defaultListsContainer.appendChild(listEl)
    }

    function renderCustomLists() {
        customListsContainer.innerHTML = ''
        customListsKeys.forEach((item, i) => {
            let list = StorageClient.getList(customListsKeys[i])
            let listEl = createListLiElement(list, 'custom')
            customListsContainer.append(listEl)
        })
    }

    function initStartTime() {
        let storageHasStartHour = StorageClient.getStartTime()
        if (storageHasStartHour === null) {
            setStartTime(startHour)
        } else {
            let startTime = new Date(StorageClient.getStartTime())
            let currentTime = new Date()
            startHour = getHours(startTime)
            if (+differenceInHours(currentTime, startTime) > 24) {
                setStartTime(startHour)
                updateEverydayTasks()
            }
        }
    }

    function setStartTime(h) {
        let date = startOfToday()
        let newDate = setHours(date, h)
        StorageClient.setStartTime(newDate)
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
            case 'change-time-btn':
                changeStartOfDay()
                openEverydayListOnMain(currentList)
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
        let inputs = getInputsData()
        let isValid = FormTaskApi.validateFormInputs(inputs)
        if (!isValid) {
            alert('Allsdfasdfasdf')
            return;
        }
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

    function changeEverydayTask(taskId) {
        let input = popUpForm.querySelector('input')
        let changedTask = { title: input.value, checked: false }
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

    function changeStartOfDay() {
        let input = popUpForm.querySelector('input')
        let hour = input.value
        setStartTime(hour)
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
                if (listId === 'defaultEverydayList.3') {
                    openEverydayListOnMain(currentList)
                } else {
                    openListOnMain(currentList)
                }
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
                if (currentListKey === 'defaultEverydayList.3') {
                    FormChangeEverydayTaskApi.initForm()
                    FormChangeEverydayTaskApi.showForm()
                    let changeTaskBtn = container.querySelector('#change-task-btn')
                    changeTaskBtn.addEventListener('click', (e) => {
                        changeEverydayTask(index)
                        renderTodos(currentList)
                        FormEverydayTaskApi.hideForm()
                        e.preventDefault()
                    })
                    break;
                }
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
        let listContainer = baseListStructure(list)
        let addTodoBtn = listContainer.querySelector('#add-todo-btn')
        addTodoBtn.addEventListener('click', () => {
            FormTaskApi.initForm()
            FormTaskApi.showForm()
        })
        main.appendChild(listContainer)
        renderTodos(currentList)
    }

    function openEverydayListOnMain(list) {
        main.innerHTML = ''
        let listContainer = baseListStructure(list)
        let dayStartBtn = createElement('btn', ['btn'], 'start-time-btn', 'Set start of the day')
        dayStartBtn.addEventListener('click', () => {
            FormSetStartOfDayApi.initForm()
            FormSetStartOfDayApi.showForm()
        })
        let date = StorageClient.getStartTime()
        date = format(new Date(date), 'dd/MM/yyyy HH:mm')
        let startOfDayInfo = createElement('p', null, 'start-of-day-info', `Tasks for today - ${date}:`)
        listContainer.children[0].insertAdjacentElement('afterEnd', dayStartBtn)
        listContainer.children[1].insertAdjacentElement('afterEnd', startOfDayInfo)
        let addTodoBtn = listContainer.querySelector('#add-todo-btn')
        addTodoBtn.addEventListener('click', () => {
            FormEverydayTaskApi.initForm()
            FormEverydayTaskApi.showForm()
        })
        main.appendChild(listContainer)
        renderEverydayTodos(currentList)
    }

    function baseListStructure(list) {
        let listContainer = createElement('div', ['list-container'], null, null)
        let h2 = createElement('h2', null, 'list-title', list.name)
        let todosContainer = createElement('ul', ['todos-container'])
        let addTodoBtn = createElement('button', ['btn'], 'add-todo-btn', 'Add task')
        listContainer.append(h2, todosContainer, addTodoBtn)
        todosContainer.addEventListener('click', todosContainerClickHandler)
        return listContainer
    }

    function renderTodos(list) {
        let todosContainer = container.querySelector('.todos-container')
        todosContainer.innerHTML = ''
        list.todos.forEach(todo => {
            let todoEl = baseTodoStructure(todo)
            let todoInfoContainer = todoEl.querySelector('.todo-info-container')
            let todoElContainer = todoEl.querySelector('.todo-container')
            let todoDueDate = createElement('span', ['todo-date'], null, todo.dueDate)
            let priorityIcon = createElement('button', ['priority-icon'], null, '✗')
            const priorities = ['white', '#32c246', '#d6d436', '#d69136', '#d65036']
            priorityIcon.style.backgroundColor = `${priorities[todo.priority]}`
            todoInfoContainer.prepend(todoDueDate)
            todoInfoContainer.append(priorityIcon)
            todoEl.appendChild(todoElContainer)
            todosContainer.appendChild(todoEl)
        })
    }

    function renderEverydayTodos(list) {
        let todosContainer = container.querySelector('.todos-container')
        todosContainer.innerHTML = ''
        list.todos.forEach(todo => {
            let todoEl = baseTodoStructure(todo)
            todosContainer.appendChild(todoEl)
        })
    }

    function baseTodoStructure(todo) {
        let todoEl = createElement('li', ['todo-item'])
        let todoElContainer = createElement('div', ['todo-container'])
        let todoTitle = createElement('button', ['todo-title'], null, todo.title, 'todoEl', 'title')
        todo.checked ? todoTitle.classList.add('checked') : null
        let deleteTodoBtn = createElement('button', ['btn', 'delete-todo-btn'], null, '✗', 'todoEl', 'delete')
        let changeTodoBtn = createElement('button', ['btn', 'change-todo-btn'], null, '✎', 'todoEl', 'change')
        let todoInfoContainer = createElement('div', ['todo-info-container'])
        todoInfoContainer.append(deleteTodoBtn, changeTodoBtn)
        todoElContainer.append(todoTitle, todoInfoContainer)
        todoEl.appendChild(todoElContainer)
        return todoEl
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

    function updateEverydayTasks() {
        let everydayList = StorageClient.getList(`${DEFAULT_EVERYDAY_LIST_STORAGE_KEY}.3`)
        everydayList.todos.forEach((todo, i) => {
            if (todo.checked) todo.checked = false
        })
        StorageClient.updateList(`${DEFAULT_EVERYDAY_LIST_STORAGE_KEY}.3`, everydayList)
    }
}