import {
  differenceInHours,
  format,
  getHours,
  setHours,
  startOfToday,
} from 'date-fns'
import Storage from './plugins/StorageAPI'

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

  const setEverydayList = (title) => {
    lists.push({
      name: title,
      type: 'everyday',
      id: crypto.randomUUID(),
      todos: [],
      startOfDay: format(setHours(startOfToday(), 8), 'HH:mm:ss yyyy/MM/dd'),
    })
    _updateStorage()
  }

  const setStartOfDay = (hour) => {
    const list = lists.find((el) => el.type === 'everyday')
    list.startOfDay = format(
      setHours(startOfToday(), hour),
      'HH:mm:ss yyyy/MM/dd'
    )
    _updateStorage()
  }

  const timeUpdate = () => {
    const list = lists.find((el) => el.type === 'everyday')
    const start = list.startOfDay
    const isNextDay = differenceInHours(new Date(), start) > 24
    if (isNextDay) {
      const startHour = getHours(start)
      setStartOfDay(startHour)
    }
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

  const renameList = (listId, newTitle) => {
    lists.forEach((list, i) => {
      if (list.id === listId) {
        lists[i].name = newTitle
        _updateStorage()
      }
    })
  }

  const addTodo = (listId, newTodo) => {
    const list = lists.find((li) => li.id === listId)
    list.todos.push(newTodo)
    _updateStorage()
  }

  const deleteTodo = (listId, todoId) => {
    const list = lists.find((li) => li.id === listId)
    list.todos.forEach((todo, i) => {
      if (todo.id === todoId) {
        list.todos.splice(i, 1)
      }
    })
    _updateStorage()
  }

  const changeTodo = (listId, todoId, newTodo) => {
    const list = lists.find((li) => li.id === listId)
    list.todos.forEach((todo, i) => {
      if (todo.id === todoId) {
        list.todos[i] = newTodo
      }
    })
    _updateStorage()
  }

  const publicMethods = {
    lists,
    setList,
    getList,
    setEverydayList,
    setStartOfDay,
    deleteList,
    renameList,
    addTodo,
    deleteTodo,
    changeTodo,
    timeUpdate,
  }
  return publicMethods
}

const app = base()

export default app
