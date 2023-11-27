export { Storage, localStorageApi }

class Storage {
    constructor(storageAPI) {
        this.storageAPI = storageAPI
    }
    saveList(list, listType) {
        this.storageAPI.saveList(list, listType)
    }
    getList(listKey) {
        return this.storageAPI.getList(listKey)
    }
    deleteList(listKey) {
        this.storageAPI.deleteList(listKey)
    }
    updateListsKeys(key, keysArray) {
        this.storageAPI.updateListsKeys(key, keysArray)
    }
    getListsKeys(key) {
        return this.storageAPI. getListsKeys(key)
    }
}

class localStorageApi {

    saveList(list, listType) {
        localStorage.setItem(`${listType}.${list.id}`, JSON.stringify(list))
    }
    getList(listKey) {
        let list = JSON.parse(localStorage.getItem(listKey))
        return list
    }
    deleteList(listKey) {
        localStorage.removeItem(listKey)
    }

    updateListsKeys(key, keysArray) {
        localStorage.setItem(key, JSON.stringify(keysArray))
    }
    getListsKeys(key) {
        let customListsKeys = JSON.parse(localStorage.getItem(key))
        return customListsKeys ? customListsKeys : null
    }

}