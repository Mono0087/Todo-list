import createElement from "./utils/createElement"
import Form from "./Form"
import { Storage, localStorageApi } from "./StorageApi"
import { DefaultList, CustomList } from "./List"

export const run = () => {
    const FormApi = new Form

    // CACHE DOM /////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////
    const container = document.querySelector('.container')
    const addListBtn = container.querySelector('#add-project-btn')
    FormApi.initForm() // Add form to DOM
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
    initDefaultLists()
    renderDefaultLists()
    renderCustomLists()

    // BIND EVENTS ///////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////
    customListsContainer.addEventListener('click', customListsContainerHandler)
    addListBtn.addEventListener('click', FormApi.showForm)
    overlay.addEventListener('click', handleForm)


    // FUNCTIONS /////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////
    function initDefaultLists() {
        let defaultLists = [
            new DefaultList(1, 'Today'),
            new DefaultList(2, 'Week'),
            new DefaultList(3, 'Everyday')
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

    function createListLiElement(listObj, listType) {
        let listEl = createElement('li', [`${listType}-list-item`], null, null, `${listType}ListId`, listObj.id)
        let listElBtn = createElement('button', [`${listType}-list-item_btn`], null, listObj.name)
        listEl.appendChild(listElBtn)
        if (listType === 'custom') {
            let dropDownMenu = createElement('div', ['list_dropdown-menu'], null, null)
            let dropDownMenuBtn = createElement('button', ['dropdown-btn'], null)
            let btnDot = createElement('div', ['btn-dot'])
            dropDownMenuBtn.innerHTML = btnDot.outerHTML + btnDot.outerHTML + btnDot.outerHTML
            let dropDownMenuContent = createElement('menu', ['dropdown-content'])
            let deleteListBtn = createElement('button', ['delete-list-btn'], null, 'Delete project')
            dropDownMenuContent.append(deleteListBtn)
            dropDownMenu.append(dropDownMenuBtn, dropDownMenuContent)
            listEl.appendChild(dropDownMenu)
        }
        return listEl
    }

    function handleForm(Event) {
        if (Event.target.id === 'overlay') FormApi.hideForm()
        if (Event.target.id === 'add-list-btn') {
            let inputsData = getInputsData()
            let isValid = FormApi.validateFormInputs(inputsData)
            if (!isValid) {
                alert('All fields must be filled up!')
                Event.preventDefault();
                return;
            }
            createList(inputsData[0])
            renderCustomLists()
            FormApi.hideForm()
            Event.preventDefault()
        }
        Event.stopPropagation()
    }

    function createList(listName) {
        let list = new CustomList(listName)
        let listKey = `${CUSTOM_LIST_LOCAL_STORAGE_KEY}.${list.id}`
        customListsKeys.push(listKey)
        StorageClient.updateListsKeys(CUSTOM_LISTS_KEYS_LOCAL_STORAGE_KEY, customListsKeys)
        StorageClient.saveList(list, CUSTOM_LIST_LOCAL_STORAGE_KEY)
    }

    function deleteList(listKey) {
        StorageClient.deleteList(listKey)
        customListsKeys.forEach((key, i) => {
            if (key == listKey) customListsKeys.splice(i, 1)
        })
        StorageClient.updateListsKeys(CUSTOM_LISTS_KEYS_LOCAL_STORAGE_KEY, customListsKeys)
        renderCustomLists()
    }

    function getInputsData() {
        let inputsData = [...popUpForm.querySelectorAll('input')].map((el) => {
            if (el.type === 'checkbox') return el.checked;
            return el.value;
        })
        return inputsData
    }

    function customListsContainerHandler(Event) {
        let target = Event.target
        if (target.classList.contains('custom-list-item_btn')) {
            // Show list on main
        } else if (target.classList.contains('dropdown-btn')) {
            openDropDownMenu(target)

        } else if (target.classList.contains('delete-list-btn')) {
            let listElId = target.parentElement.parentElement.parentElement.dataset.customListId
            deleteList(`customList.${listElId}`)

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

}