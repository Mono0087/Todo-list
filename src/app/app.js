/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import {
  differenceInHours,
  format,
  getHours,
  isBefore,
  setHours,
  startOfToday,
} from 'date-fns'
import Storage from './modules/StorageAPI'

const LISTS_LOCAL_STORAGE_KEY = 'LISTS'

const base = () => {
  const StorageClient = new Storage('localStorage')
  const lists = StorageClient.getTodoLists(LISTS_LOCAL_STORAGE_KEY) || []

  const updateStorage = (listsData = lists) => {
    StorageClient.setTodoLists(listsData, LISTS_LOCAL_STORAGE_KEY)
  }

  const setList = (title, listType) => {
    lists.push({
      name: title,
      type: listType,
      id: crypto.randomUUID(),
      todos: [],
    })
    updateStorage()
  }

  const setEverydayList = (title) => {
    lists.push({
      name: title,
      type: 'everyday',
      id: crypto.randomUUID(),
      todos: [],
      startOfDay: format(setHours(startOfToday(), 8), 'HH:mm:ss yyyy/MM/dd'),
    })
    updateStorage()
  }

  const setStartOfDay = (hour) => {
    const list = lists[2]
    list.startOfDay = format(
      setHours(startOfToday(), hour),
      'HH:mm:ss yyyy/MM/dd'
    )
    updateStorage()
  }

  const timeUpdate = () => {
    const list = lists.find((el) => el.type === 'everyday')
    const start = list.startOfDay
    const isNextDay = differenceInHours(new Date(), start) > 24
    if (isNextDay) {
      const startHour = getHours(start)
      setStartOfDay(startHour)
      lists[2].todos.forEach((todo) => {
        // eslint-disable-next-line no-param-reassign
        todo.checked = false
      })
      updateStorage()
    }
  }

  const getList = (listId) => lists.find((list) => list.id === listId)

  const deleteList = (listId) => {
    lists.forEach((list, i) => {
      if (list.id === listId) {
        lists.splice(i, 1)
        updateStorage()
      }
    })
  }

  const changeList = (listId, newList) => {
    lists.forEach((list, i) => {
      if (list.id === listId) {
        lists[i] = newList
        updateStorage()
      }
    })
  }

  const renameList = (listId, newTitle) => {
    lists.forEach((list, i) => {
      if (list.id === listId) {
        lists[i].name = newTitle
        updateStorage()
      }
    })
  }

  const addTodo = (listId, newTodo) => {
    const list = lists.find((li) => li.id === listId)
    list.todos.push(newTodo)
    updateStorage()
  }

  const getTodo = (listId, todoId) => {
    const list = lists.find((li) => li.id === listId)
    return list.todos.find((todo) => todo.id === todoId)
  }

  const deleteTodo = (listId, todoId) => {
    const list = lists.find((li) => li.id === listId)
    list.todos.forEach((todo, i) => {
      if (todo.id === todoId) {
        list.todos.splice(i, 1)
      }
    })
    updateStorage()
  }

  const changeTodo = (listId, todoId, newTodo) => {
    const list = lists.find((li) => li.id === listId)
    list.todos.forEach((todo, i) => {
      if (todo.id === todoId) {
        list.todos[i] = newTodo
      }
    })
    updateStorage()
  }

  const setNotes = () => {
    lists.push({
      name: 'Notes',
      type: 'notes',
      id: crypto.randomUUID(),
      notes: [],
    })
    updateStorage()
  }

  const addNote = (newNote) => {
    const list = lists.find((li) => li.type === 'notes')
    list.notes.push(newNote)
    updateStorage()
  }

  const getNote = (noteId) => {
    const list = lists.find((li) => li.type === 'notes')
    return list.notes.find((note) => note.id === noteId)
  }

  const deleteNote = (noteId) => {
    const list = lists.find((li) => li.type === 'notes')
    list.notes.forEach((note, i) => {
      if (note.id === noteId) {
        list.notes.splice(i, 1)
      }
    })
    updateStorage()
  }

  const changeNote = (noteId, newNote) => {
    const list = lists.find((li) => li.type === 'notes')
    list.notes.forEach((note, i) => {
      if (note.id === noteId) {
        list.notes[i] = newNote
      }
    })
    updateStorage()
  }

  const sort = (listId, type) => {
    const list = getList(listId)
    switch (type) {
      case 'priority': {
        list.todos.sort((curr, next) => {
          if (curr.priority < next.priority) return 1
          if (curr.priority === next.priority) return 0
          if (curr.priority > next.priority) return -1
        })
        changeList(listId, list)
        break
      }
      case 'creation': {
        list.todos.sort((curr, next) => {
          if (isBefore(curr.creationDate, next.creationDate)) return 1
          if (!isBefore(curr.creationDate, next.creationDate)) return -1
        })
        changeList(listId, list)
        break
      }
      case 'done-first': {
        list.todos.sort((todo) => {
          if (!todo.checked) return 1
          return -1
        })
        changeList(listId, list)
        break
      }
      default:
        break
    }
    updateStorage()
  }

  const sortByIds = (listId, ...ids) => {
    const list = { ...getList(listId) }
    const todos = []
    list.todos.forEach((todo, i) => {
      todos.push(getTodo(listId, ids[i]))
    })
    list.todos = todos
    changeList(listId, list)
  }

  const publicMethods = {
    lists,
    updateStorage,
    setList,
    getList,
    setEverydayList,
    setStartOfDay,
    deleteList,
    renameList,
    addTodo,
    getTodo,
    deleteTodo,
    changeTodo,
    timeUpdate,
    sort,
    sortByIds,
    setNotes,
    addNote,
    getNote,
    deleteNote,
    changeNote,
  }
  return publicMethods
}

const app = base()

export default app
