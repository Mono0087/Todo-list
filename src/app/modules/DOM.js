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
    [{ dataKey: 'listId', dataValue: list.id }]
  )
  listEl.insertAdjacentHTML(
    'afterbegin',
    `<button class="default-list-list-item_btn" data-nav-el="list-item-btn">${list.name}</button>`
  )
  return listEl
}

const _createCustomListEl = (list) => {
  const listEl = document.createElement('li')
  listEl.classList.add(`${list.type}-list-item`)
  listEl.dataset.listId = list.id
  listEl.insertAdjacentHTML(
    'afterbegin',
    `<button class="custom-list-item_btn list-item_btn" data-nav-el="list-item-btn">
          ${list.name}
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
            <button class="btn sort-btn" data-list-el="sort" class="dropdown-btn" data-dropdown-btn>Sort ↕️</button>
            <ul class="dropdown-content" data-dropdown-options>
            <li>
              <button data-list-el="sort-priority">
                Priority !
              </button>
            </li>
            <li>
              <button data-list-el="sort-creation">
                Creation Date 📅
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
    <li class="todo-item">
      <div class="todo-container" data-todo-element data-todo-id="${todo.id}">
        <button class="todo-title ${todo.checked ? 'checked' : ''}" data-list-el="todo-title">${todo.title}</button>
        <div class="todo-info-container">
          <span class="todo-date">${todo.dueDate}</span>
          <button class="btn delete-todo-btn" data-list-el="delete-todo">✗</button>
          <button class="btn change-todo-btn" data-list-el="change-todo">✎</button>
          <button class="priority-icon" data-priority='${todo.priority}'">
            ✗
          </button>
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
      <h2 id="list-title">Everyday</h2>
      <btn class="btn" id="start-time-btn" data-list-el="set-start-hour">Set start of the day</btn>
      <p id="start-of-day-info">Tasks for today - ${format(list.startOfDay,'dd/MM/yyyy HH:mm')}</p>
      <ul class="todos-container" data-todos-container>
      </ul>
      <button class="btn" id="add-todo-btn" data-list-el="add-everyday-todo">Add task</button>
    </div>`
  )

  const todosContainer = main.querySelector('[data-todos-container]')
  list.todos.forEach((todo) => {
    const todoEl = `
    <li class="todo-item">
      <div class="todo-container" data-todo-element data-todo-id="${todo.id}">
        <button class="todo-title ${todo.checked ? 'checked' : ''}" data-list-el="todo-title">${todo.title}</button>
        <div class="todo-info-container">
          <button class="btn delete-todo-btn" data-list-el="delete-todo">✗</button>
          <button class="btn change-todo-btn" data-list-el="change-everyday-todo">✎</button>
        </div>
      </div>
    </li>`
    todosContainer.insertAdjacentHTML('beforeend', todoEl)
  })
}

const DOM = {
  updateLists() {
    const defaultListsContainer = nav.querySelector('[data-default-lists]')
    const customListsContainer = nav.querySelector('[data-custom-lists]')
    defaultListsContainer.innerHTML = ''
    customListsContainer.innerHTML = ''

    app.lists.forEach((list) => {
      switch (list.type) {
        case 'custom': {
          const listEl = _createCustomListEl(list)
          customListsContainer.appendChild(listEl)
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
  },

  renderList(listId = currentListId) {
    const list = app.getList(listId) ?? app.getList(app.lists[0].id)
    switch (list.type) {
      case 'everyday':
        _renderEverydayListEl(list)
        break
      default:
        _renderListEl(list)
        break
    }
  },

  addTodo(todo) {
    app.addTodo(currentListId, todo)
    this.renderList()
  },

  deleteTodo(todoId) {
    app.deleteTodo(currentListId, todoId)
    this.renderList()
  },

  changeTodo(todoId, newTodo) {
    app.changeTodo(currentListId, todoId, newTodo)
    this.renderList()
  },

  toggleCrossOutTodo(todoId) {
    const todo = app.getTodo(currentListId, todoId)
    todo.checked = !todo.checked
    app.changeTodo(currentListId, todoId, todo)
    this.renderList()
  },

  getCurrentListId() {
    return currentListId
  },
}

export default DOM
