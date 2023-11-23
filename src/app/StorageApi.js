export { Storage, localStorageApi }

class Storage {
    constructor(storageAPI) {
        this.storageAPI = storageAPI
    }
    addList(list, listType) {
        this.storageAPI.addList(list, listType)
    }
    getList(listName) {
        return this.storageAPI.getList(listName)
    }
    getAllLists() {

    }
    changeList() {

    }
    deleteList() {

    }
}

class localStorageApi {
    addList(list, listType) {
        localStorage.setItem(`${listType}.${list.id}`, JSON.stringify(list))
    }
    getList(listName) {
        let list = JSON.parse(localStorage.getItem(listName))
        return list
    }
}