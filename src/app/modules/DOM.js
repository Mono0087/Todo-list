/* eslint-disable prefer-destructuring */
import { format } from 'date-fns'
import app from '../app'
import DropDownMenu from './DropDownMenu'
import createElement from '../utils/createElement'

const container = document.querySelector('.container')
const nav = container.querySelector('nav')
const main = container.querySelector('main')

let currentListId = ''

const _createDefaultListEl = (list) => {
  const listEl = createElement(
    'li',
    [`${list.type}-list-item`],
    null,
    null,
    null,
    [
      { dataKey: 'listId', dataValue: list.id },
      { dataKey: 'dragAndDrop', dataValue: list.type === 'default' },
    ]
  )

  const todosAmountEl = `<span class="todos-amount">${
    list.todos.filter((todo) => !todo.checked).length || ''
  }</span>`

  listEl.insertAdjacentHTML(
    'afterbegin',
    `<button class="default-list-list-item_btn" data-nav-el="list-item-btn">${
      list.name
    } ${list.type === 'everyday' ? '⟳' : todosAmountEl}</button>`
  )
  return listEl
}

const _createCustomListEl = (list) => {
  const listEl = document.createElement('li')
  listEl.classList.add(`${list.type}-list-item`)
  listEl.dataset.listId = list.id
  listEl.dataset.dragAndDrop = true
  const todosAmountEl = `<span class="todos-amount">${
    list.todos.filter((todo) => !todo.checked).length || ''
  }</span>`
  listEl.insertAdjacentHTML(
    'afterbegin',
    `<button class="custom-list-item_btn list-item_btn" data-nav-el="list-item-btn">
          ${list.name} ${todosAmountEl}
        </button>
        <div class="list_dropdown-menu" data-dropdown>
          <button class="dropdown-btn" data-dropdown-btn>
            <div class="btn-dot"></div>
            <div class="btn-dot"></div>
            <div class="btn-dot"></div>
          </button>
          <ul class="dropdown-content" data-dropdown-options>
            <li>
              <button class="delete-list-btn" data-nav-el="delete-list-btn">
                Delete
              </button>
            </li>
            <li>
              <button class="rename-list-btn" data-nav-el="rename-list-btn">
                Rename
              </button>
            </li>
          </ul>
        </div>`
  )
  const dropdown = listEl.querySelector('[data-dropdown]')
  new DropDownMenu(dropdown).init()
  return listEl
}

const _createNotesListEl = (list) => {
  const listEl = createElement(
    'button',
    [`${list.type}-list-item`],
    null,
    null,
    'Notes ✎',
    [
      { dataKey: 'notesEl', dataValue: '' },
      { dataKey: 'navEl', dataValue: 'list-item-btn' },
      { dataKey: 'listId', dataValue: list.id },
      { dataKey: 'dragAndDrop', dataValue: false },
    ]
  )
  return listEl
}

const _renderListEl = (list) => {
  currentListId = list.id
  main.innerHTML = ''
  main.insertAdjacentHTML(
    'afterbegin',
    `<div class="list-container" data-list-container>
    <div class="list-top">
    <h2 id="list-title">${list.name}</h2>
    <ul class="list_controls">
        <li>
          <div class="sort_dropdown-menu" data-dropdown>
            <button class="btn sort-btn" data-list-el="sort-btn" class="dropdown-btn" data-dropdown-btn>Sort ↕️</button>
            <ul class="dropdown-content" data-dropdown-options>
            <li>
              <button data-list-el="sort" data-sort-type="priority">
                Priority !
              </button>
            </li>
            <li>
              <button data-list-el="sort" data-sort-type="creation">
                Creation Date 📅
              </button>
            </li>
            <li>
              <button data-list-el="sort" data-sort-type="done-first">
                Done first ✔️
              </button>
            </li>
            <li>
              <button data-list-el="sort" data-sort-type="deadline">
                Deadline ⏰
              </button>
            </li>
          </ul>
          </div>
        </li>
      </ul>
    </div>
      <ul class="todos-container" data-todos-container>
      </ul>
      <button class="btn" id="add-todo-btn" data-list-el="add-todo">Add task</button>
    </div>`
  )
  const dropdown = main.querySelector('[data-dropdown]')
  new DropDownMenu(dropdown).init()

  const todosContainer = main.querySelector('[data-todos-container]')
  list.todos.forEach((todo) => {
    const todoEl = `
    <li class="todo-item ${todo.checked ? 'checked' : ''}" data-todo-li>
      <div class="todo-container" data-todo-element draggable="true" data-todo-id="${
        todo.id
      }">
        <div class="todo_top-container">
          <button class="todo-title" data-list-el="todo-title">${
            todo.title
          }</button>
          <div class="todo-info-container">
            <span class="todo-date">${todo.dueDate}</span>
            <button class="btn delete-todo-btn" data-list-el="delete-todo">✗</button>
            <button class="btn change-todo-btn" data-list-el="change-todo">✎</button>
            <button class="priority-icon" data-priority='${todo.priority}'">
              ✗
            </button>
          </div>
        </div>
        <div class="todo-details">
          <p class="${todo.checked ? 'checked' : ''}">${todo.details}</p>
        </div>
      </div>
    </li>`
    todosContainer.insertAdjacentHTML('beforeend', todoEl)
  })
}

const _renderEverydayListEl = (list) => {
  currentListId = list.id
  main.innerHTML = ''
  main.insertAdjacentHTML(
    'afterbegin',
    `<div class="list-container everyday-list-container" data-list-container>
      <h2 id="list-title">Everyday ⟳</h2>
      <btn class="btn" id="start-time-btn" data-list-el="set-start-hour">Set start of the day</btn>
      <p id="start-of-day-info">Tasks for today - ${format(
        list.startOfDay,
        'dd/MM/yyyy HH:mm'
      )}</p>
      <ul class="todos-container" data-todos-container>
      </ul>
      <button class="btn" id="add-todo-btn" data-list-el="add-everyday-todo">Add task</button>
    </div>`
  )

  const todosContainer = main.querySelector('[data-todos-container]')
  list.todos.forEach((todo) => {
    const todoEl = `
    <li class="todo-item ${
      todo.checked ? 'checked' : ''
    }" data-todo-li data-everyday-todo>
      <div class="todo-container" data-todo-element draggable="true" data-todo-id="${
        todo.id
      }">
        <button class="todo-title ${
          todo.checked ? 'checked' : ''
        }" data-list-el="todo-title">${todo.title}</button>
        <div class="todo-info-container">
          <button class="btn delete-todo-btn" data-list-el="delete-todo">✗</button>
          <button class="btn change-todo-btn" data-list-el="change-everyday-todo">✎</button>
        </div>
      </div>
    </li>`
    todosContainer.insertAdjacentHTML('beforeend', todoEl)
  })
}

const _renderNotesListEl = (list) => {
  currentListId = list.id
  main.innerHTML = ''
  main.insertAdjacentHTML(
    'afterbegin',
    `<div class="list-container" data-list-container>
      <div class="notes-top">
        <h2 id="list-title">Notes</h2>     
        <input data-list-el="note-search-input" placeholder="Find note...">
        <button class="btn" id="add-note-btn" data-list-el="add-note">Add note</button>
      </div>
      <ul class="notes-container" data-notes-container>
      </ul>
    </div>`
  )

  const _createNoteElement = (note) => {
    const noteEl = `
    <li class="note-item" data-note-id="${note.id}" draggable="true">
      <div class="note-container" data-note-element>
        <button class="btn delete-note-btn" data-list-el="delete-note">✗</button>
        <div class="note-info-container">
          <input class="note-title" name="title" data-list-el="note-title" value="${note.title}">
          <textarea name="details">${note.details}</textarea>
        </div>
        <button class="note-expand-btn" data-note-expand-btn>|||</button>
      </div>
    </li>`
    return noteEl
  }

  const notesContainer = main.querySelector('[data-notes-container]')
  list.notes.forEach((note) => {
    notesContainer.insertAdjacentHTML('beforeend', _createNoteElement(note))
  })

  notesContainer.addEventListener('click', (Event) => {
    if (Event.target.hasAttribute('data-note-expand-btn')) {
      const targetNote = Event.target.closest('[data-note-id]')
      ;[...notesContainer.children].forEach((el) => {
        if (el === targetNote) return
        el.classList.remove('expanded-item')
      })
      targetNote.classList.toggle('expanded-item')
    }
  })

  const _filterNotes = (Event) => {
    notesContainer.innerHTML = ''
    list.notes.forEach((note) => {
      if (note.title.toLowerCase().includes(Event.target.value.toLowerCase())) {
        notesContainer.insertAdjacentHTML('beforeend', _createNoteElement(note))
      }
    })
  }

  const searchNoteInput = main.querySelector(
    '[data-list-el="note-search-input"]'
  )
  searchNoteInput.addEventListener('input', _filterNotes)

  const debounce = (callback, wait) => {
    let timeout
    return (...args) => {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        callback.apply(this, args)
      }, wait)
    }
  }

  notesContainer.addEventListener(
    'keyup',
    debounce((Event) => {
      const targetNote = Event.target.closest('[data-note-id]')
      const data = [...targetNote.querySelectorAll('input, textarea')].map(
        (el) => el.value
      )
      const { noteId } = targetNote.dataset
      const note = app.getNote(noteId)
      note.title = data[0]
      note.details = data[1]
      app.changeNote(noteId, note)
    }, 500)
  )
}

const _updateLists = () => {
  const defaultListsContainer = nav.querySelector('[data-default-lists]')
  const customListsContainer = nav.querySelector('[data-custom-lists]')
  const notesBtn = nav.querySelector('[data-notes-el]')
  defaultListsContainer.innerHTML = ''
  customListsContainer.innerHTML = ''
  if (notesBtn) notesBtn.remove()

  app.lists.forEach((list) => {
    switch (list.type) {
      case 'custom': {
        const listEl = _createCustomListEl(list)
        customListsContainer.appendChild(listEl)
        break
      }
      case 'notes': {
        const noteEl = _createNotesListEl(list)
        nav.appendChild(noteEl)
        break
      }
      default:
        {
          const listEl = _createDefaultListEl(list)
          defaultListsContainer.appendChild(listEl)
        }
        break
    }
  })
}

const _sortTodosByIDS = (todosContainer) => {
  const todos = todosContainer.querySelectorAll('[data-todo-element]')
  const ids = []
  ;[...todos].forEach((todo) => {
    ids.push(todo.dataset.todoId)
  })
  app.sortByIds(currentListId, ...ids)
}

const _addDraggableEvents = () => {
  const todosContainer = main.querySelector('[data-todos-container]')
  const draggables = [...todosContainer.querySelectorAll('[data-todo-element]')]

  let activeLI
  let currentDropTargetLi

  nav.addEventListener('dragover', (Event) => {
    const target = Event.target.closest('[data-list-id]')
    if (target && target.dataset.dragAndDrop === 'false') return
    if (activeLI && !activeLI.hasAttribute('data-everyday-todo'))
      if (target) {
        if (target.classList.contains('everyday-list-item')) return
        target.classList.add('drag-over')
        currentDropTargetLi = target
      }
  })

  nav.addEventListener('dragleave', (Event) => {
    const target = Event.target.closest('[data-list-id]')
    if (target) {
      target.classList.remove('drag-over')
      return
    }
    currentDropTargetLi = undefined
  })

  todosContainer.addEventListener('dragover', (Event) => {
    const target = Event.target.closest('[data-todo-li]')
    if (target && target !== activeLI) {
      target.classList.add('drag-over')
      currentDropTargetLi = target
    }
  })

  todosContainer.addEventListener('dragleave', (Event) => {
    const target = Event.target.closest('[data-todo-li]')
    if (target) {
      target.classList.remove('drag-over')
      return
    }
    currentDropTargetLi = undefined
  })

  draggables.forEach((el) => {
    el.addEventListener('dragstart', () => {
      activeLI = el.closest('[data-todo-li]')
      el.classList.add('dragging')
      setTimeout(() => {
        el.classList.add('hide')
      }, 0)
    })

    el.addEventListener('dragend', () => {
      el.classList.remove('dragging', 'hide')
      if (
        currentDropTargetLi &&
        currentDropTargetLi.closest('[data-list-id]')
      ) {
        const newListId = currentDropTargetLi.dataset.listId
        if (newListId === currentListId) return
        const { todoId } = el.dataset
        const todo = app.getTodo(currentListId, todoId)
        app.addTodo(newListId, todo)
        app.deleteTodo(currentListId, todoId)
        _renderListEl(app.getList(currentListId))
        _updateLists()
        return
      }
      if (currentDropTargetLi) {
        currentDropTargetLi.insertAdjacentElement('beforeBegin', activeLI)
        _sortTodosByIDS(todosContainer)
      }
    })
  })
}

const _renderList = (listId = currentListId) => {
  const list = app.getList(listId) ?? app.getList(app.lists[0].id)
  switch (list.type) {
    case 'everyday':
      _renderEverydayListEl(list)
      _addDraggableEvents()
      break
    case 'notes':
      _renderNotesListEl(list)
      return
    default:
      _renderListEl(list)
      _addDraggableEvents()
      break
  }
}

const DOM = {
  updateLists() {
    _updateLists()
  },

  renderList(listId = currentListId) {
    _renderList(listId)
  },

  addTodo(todo) {
    app.addTodo(currentListId, todo)
    this.updateLists()
    _renderList()
  },

  deleteTodo(todoId) {
    app.deleteTodo(currentListId, todoId)
    this.updateLists()
    _renderList()
  },

  changeTodo(todoId, newTodo) {
    app.changeTodo(currentListId, todoId, newTodo)
    _renderList()
  },

  addNote(note) {
    app.addNote(note)
    _renderList()
  },

  deleteNote(noteId) {
    app.deleteNote(noteId)
    _renderList()
  },

  toggleCrossOutTodo(todoId) {
    const todo = app.getTodo(currentListId, todoId)
    todo.checked = !todo.checked
    app.changeTodo(currentListId, todoId, todo)
    _renderList()
    _updateLists()
  },

  getCurrentListId() {
    return currentListId
  },
}

export default DOM
