import Storage from './plugins/StorageAPI'
import { Todo, CustomTodo } from './utils/Todo'

const LISTS_LOCAL_STORAGE_KEY = 'LISTS'

const base = () => {
  const StorageClient = new Storage('localStorage')
  const lists = StorageClient.getTodoLists(LISTS_LOCAL_STORAGE_KEY) || []

  const _updateStorage = () => {
    StorageClient.setTodoLists(lists, LISTS_LOCAL_STORAGE_KEY)
  }

  const setList = (title, listType) => {
    lists.push({
      name: title,
      type: listType,
      id: crypto.randomUUID(),
      todos: [],
    })
    _updateStorage()
  }

  const getList = (listId) => lists.find((list) => list.id === listId)

  const deleteList = (listId) => {
    lists.forEach((list, i) => {
      if (list.id === listId) {
        lists.splice(i, 1)
        _updateStorage()
      }
    })
  }

  const changeList = (listId, newList) => {
    lists.forEach((list, i) => {
      if (list.id === listId) {
        lists[i] = newList
        _updateStorage()
      }
    })
  }

  const addTodo = (listId, newTodo) => {
    const list = lists.find((li) => li.id === listId)
    list.todos.push(newTodo)
    changeList(listId, list)
  }

  const deleteTodo = (listId, todoId) => {
    const list = lists.find((li) => li.id === listId)
    list.todos.forEach((todo, i) => {
      if (todo.id === todoId) {
        list.todos.splice(i, 1)
        changeList(listId, list)
      }
    })
  }

  const changeTodo = (listId, todoId, newTodo) => {
    const list = lists.find((li) => li.id === listId)
    list.todos.forEach((todo, i) => {
      if (todo.id === todoId) {
        list.todos[i] = newTodo
        changeList(listId, list)
      }
    })
  }


  const publicMethods = {
    lists,
    setList,
    getList,
    deleteList,
    changeList,
    addTodo,
    deleteTodo,
    changeTodo,
  }
  return publicMethods
}

export default base

/* 
class EverydayList extends List {
  #startOfDay = format(setHours(startOfToday(), 8), 'hh:mm:ss yyyy/MM/dd')

  constructor() {
    super('Everyday')
    this.setStartOfDay(8)
    lists.push(this)
    _updateStorage()
  }

  setStartOfDay(hour) {
    this.#startOfDay = format(
      setHours(this.#startOfDay, hour),
      'hh:mm:ss yyyy/MM/dd'
    )
  } */