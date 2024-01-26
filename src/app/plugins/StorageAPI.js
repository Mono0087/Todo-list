const localStorageAPI = {
  setTodoLists(lists, key) {
    localStorage.setItem(key, JSON.stringify(lists))
  },
  getTodoLists(key) {
    return JSON.parse(localStorage.getItem(key))
  },
}

const storages = { localStorage: localStorageAPI }

class Storage {
  constructor(storageName) {
    this.storageAPI = storages[storageName]
  }

  setTodoLists(lists, key) {
    this.storageAPI.setTodoLists(lists, key)
  }

  getTodoLists(key) {
    return this.storageAPI.getTodoLists(key)
  }
}

export default Storage
