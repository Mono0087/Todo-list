import createElement from "./utils/createElement"
import { Storage, localStorageApi } from "./StorageApi"

export const run = () => {
    const container = document.querySelector('.container')

    let StorageClient = new Storage(new localStorageApi)
    const DEFAULT_LIST_LOCAL_STORAGE_KEY = 'defaultList'
    const CUSTOM_LIST_LOCAL_STORAGE_KEY = 'customList'
    initDefaultLists()
    renderDefaultLists()


    function initDefaultLists() {
        let defaultLists = [
            { id: 1, name: 'Today', todos: [] },
            { id: 2, name: 'Week', todos: [] },
            { id: 3, name: 'Everyday', todos: [] }
        ]

        for (let i = 0; i < defaultLists.length; ++i) {
            let list = defaultLists[i]
            StorageClient.addList(list, DEFAULT_LIST_LOCAL_STORAGE_KEY)
        }
    }

    function renderDefaultLists() {
        const defaultListsContainer = document.querySelector('[data-default-lists]')
        let i = 0
        while (true) {
            let list = StorageClient.getList(`${DEFAULT_LIST_LOCAL_STORAGE_KEY}.${i + 1}`)
            if (!list) break
            let listEl = createElement('li', ['default-list-item'])
            let listElBtn = createElement('button', null, null, list.name, `defaultListId`, list.id)
            listEl.appendChild(listElBtn)
            defaultListsContainer.appendChild(listEl)
            ++i
        }
    }
    
}