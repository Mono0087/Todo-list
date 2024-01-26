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
      type: 'everydayList',
      id: crypto.randomUUID(),
      todos: [],
      startOfDay: format(setHours(startOfToday(), 8), 'hh:mm:ss yyyy/MM/dd'),
    })
    _updateStorage()
  }

  const setStartOfDay = (hour) => {
    const list = lists.find((el) => el.type === 'everydayList')
    list.startOfDay = format(
      setHours(startOfToday(), hour),
      'hh:mm:ss yyyy/MM/dd'
    )
    _updateStorage()
  }

  const timeUpdate = () => {
    const list = lists.find((el) => el.type === 'everydayList')
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
    setEverydayList,
    setStartOfDay,
    deleteList,
    changeList,
    addTodo,
    deleteTodo,
    changeTodo,
    timeUpdate,
  }
  return publicMethods
}

export default base
