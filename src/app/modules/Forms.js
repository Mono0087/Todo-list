import { format } from 'date-fns'
import app from '../app'
import DOM from './DOM'
import { Todo, CustomTodo } from './Todo'

const overlay = document.querySelector('#overlay')

const _hideOverlay = () => {
  overlay.classList.add('visually-hidden')
  overlay.addEventListener(
    'transitionend',
    () => {
      overlay.classList.add('hidden')
    },
    {
      capture: false,
      once: true,
      passive: false,
    }
  )
}

const _showOverlay = () => {
  overlay.classList.remove('hidden')
  setTimeout(() => {
    overlay.classList.remove('visually-hidden')
  }, 5)
}

const _handleOverlayClick = (self) => {
  overlay.addEventListener(
    'click',
    (Event) => {
      if (Event.target.closest('#pop-up-form')) return
      self.closeForm()
    },
    { once: true }
  )
}

const _checkValidity = (formData) => {
  for (const data of formData) {
    if (data[1] === ''&&data[0]!=='details') return false
  }
  return true
}

const listForm = {
  showForm() {
    const formEl = document.createElement('form')
    formEl.id = 'pop-up-form'
    formEl.action = 'post'
    formEl.insertAdjacentHTML(
      'afterbegin',
      `<h2>Add list</h2>
       <label for="new-title">Title:</label>
       <input id="new-title" name= "title" type="text" />
       <p class="error-para" data-error-para>All fields must be filled up!</p>
       <button
         class="btn"
         id="save-list-btn"
         type="submit"
       >
         Add list
       </button>`
    )
    formEl.addEventListener('submit', this.checkForm.bind(this))
    overlay.appendChild(formEl)
    _showOverlay()
    _handleOverlayClick(this)
  },

  closeForm() {
    _hideOverlay()
    overlay.innerHTML = ''
  },

  checkForm(Event) {
    Event.preventDefault()
    const formEl = overlay.querySelector('form')
    const formData = new FormData(formEl)
    const isValid = _checkValidity(formData)
    if (!isValid) {
      formEl.querySelector('[data-error-para]').classList.add('error-active')
      _handleOverlayClick(this)
      return
    }
    const data = formData.get('title')
    app.setList(data, 'custom')
    DOM.updateLists()
    this.closeForm()
  },
}

const renameListForm = {
  listId: null,

  showForm(listId) {
    this.listId = listId

    const formEl = document.createElement('form')
    formEl.id = 'pop-up-form'
    formEl.action = 'post'
    formEl.insertAdjacentHTML(
      'afterbegin',
      `<h2>Rename list</h2>
       <label for="new-title">Title:</label>
       <input id="new-title" name= "title" type="text" />
       <p class="error-para" data-error-para>All fields must be filled up!</p>
       <button
         class="btn"
         id="save-list-btn"
         type="submit"
       >
         Rename
       </button>`
    )
    formEl.addEventListener('submit', this.checkForm.bind(this))
    overlay.appendChild(formEl)
    _showOverlay()
    _handleOverlayClick(this)
  },

  closeForm() {
    _hideOverlay()
    overlay.innerHTML = ''
    DOM._renderList()
  },

  checkForm(Event) {
    Event.preventDefault()
    const formEl = overlay.querySelector('form')
    const formData = new FormData(formEl)
    const isValid = _checkValidity(formData)
    if (!isValid) {
      formEl.querySelector('[data-error-para]').classList.add('error-active')
      _handleOverlayClick(this)
      return
    }
    const title = formData.get('title')
    app.renameList(this.listId, title)
    DOM.updateLists()
    this.closeForm()
  },
}

const todoForm = {
  showForm() {
    const formEl = document.createElement('form')
    formEl.id = 'pop-up-form'
    formEl.action = 'post'
    formEl.insertAdjacentHTML(
      'afterbegin',
      `<form id="pop-up-form" action="post">
        <h2>Add Task</h2>
        <label for="new-title">Task:</label>
        <input id="new-title" name="title" type="text" />
        <label for="new-details">Details(optional):</label>
        <textarea id="new-details" name="details"></textarea>
        <label for="new-due-date">Due date:</label>
        <input id="new-due-date" name="dueDate" type="date" />
        <label for="new-priority">Priority:</label>
        <input id="new-priority" name="priority" type="number" min="0" max="4" />
        <p class="error-para" data-error-para>All fields must be filled up!</p>
          <button
          class="btn"
          id="save-task-btn"
          type="submit">
          Add task
        </button>
      </form>`
    )
    formEl.addEventListener('submit', this.checkForm.bind(this))
    overlay.appendChild(formEl)
    _showOverlay()
    _handleOverlayClick(this)
  },

  closeForm() {
    _hideOverlay()
    overlay.innerHTML = ''
  },

  checkForm(Event) {
    Event.preventDefault()
    const formEl = overlay.querySelector('form')
    const formData = new FormData(formEl)
    const isValid = _checkValidity(formData)
    if (!isValid) {
      formEl.querySelector('[data-error-para]').classList.add('error-active')
      _handleOverlayClick(this)
      return
    }
    const todo = new CustomTodo(
      formData.get('title'),
      formData.get('details'),
      formData.get('dueDate'),
      formData.get('priority')
    )
    DOM.addTodo(todo)
    this.closeForm()
  },
}

const changeTodoForm = {
  showForm(todoId) {
    this.listId = DOM.getCurrentListId()
    const todo = app.getTodo(this.listId, todoId)
    this.todoId = todo.id
    const formattedDate = format(todo.dueDate, 'yyyy-MM-dd')
    const formEl = document.createElement('form')
    formEl.id = 'pop-up-form'
    formEl.action = 'post'
    formEl.insertAdjacentHTML(
      'afterbegin',
      `<form id="pop-up-form" action="post">
        <h2>Change Task</h2>
        <label for="new-title">Task:</label>
        <input id="new-title" name="title" type="text" value="${todo.title}" />
        <label for="new-details">Details(optional):</label>
        <textarea id="new-details" name="details">${todo.details}</textarea>
        <label for="new-due-date">Due date:</label>
        <input id="new-due-date" name="dueDate" type="date" value="${formattedDate}" />
        <label for="new-priority">Priority:</label>
        <input id="new-priority" name="priority" type="number" min="0" max="4" value="${todo.priority}" />
        <p class="error-para" data-error-para>All fields must be filled up!</p>
          <button
          class="btn"
          id="save-task-btn"
          type="submit">
          Change task
        </button>
      </form>`
    )
    formEl.addEventListener('submit', this.checkForm.bind(this))
    overlay.appendChild(formEl)
    _showOverlay()
    _handleOverlayClick(this)
  },

  closeForm() {
    _hideOverlay()
    overlay.innerHTML = ''
  },

  checkForm(Event) {
    Event.preventDefault()
    const formEl = overlay.querySelector('form')
    const formData = new FormData(formEl)
    const isValid = _checkValidity(formData)
    if (!isValid) {
      formEl.querySelector('[data-error-para]').classList.add('error-active')
      _handleOverlayClick(this)
      return
    }
    const todo = new CustomTodo(
      formData.get('title'),
      formData.get('details'),
      formData.get('dueDate'),
      formData.get('priority')
    )
    todo.creationDate = app.getTodo(
      DOM.getCurrentListId(),
      this.todoId
    ).creationDate
    DOM.changeTodo(this.todoId, todo)
    this.closeForm()
  },
}

const everydayTodoForm = {
  showForm() {
    const formEl = document.createElement('form')
    formEl.id = 'pop-up-form'
    formEl.action = 'post'
    formEl.insertAdjacentHTML(
      'afterbegin',
      `<form id="pop-up-form" action="post">
        <h2>Add Task</h2>
        <label for="new-title">Task:</label>
        <input id="new-title" name="title" type="text" />
        <p class="error-para" data-error-para>All fields must be filled up!</p>
          <button
          class="btn"
          id="save-task-btn"
          type="submit">
          Add task
        </button>
      </form>`
    )
    formEl.addEventListener('submit', this.checkForm.bind(this))
    overlay.appendChild(formEl)
    _showOverlay()
    _handleOverlayClick(this)
  },

  closeForm() {
    _hideOverlay()
    overlay.innerHTML = ''
  },

  checkForm(Event) {
    Event.preventDefault()
    const formEl = overlay.querySelector('form')
    const formData = new FormData(formEl)
    const isValid = _checkValidity(formData)
    if (!isValid) {
      formEl.querySelector('[data-error-para]').classList.add('error-active')
      _handleOverlayClick(this)
      return
    }
    const todo = new Todo(formData.get('title'))
    DOM.addTodo(todo)
    this.closeForm()
  },
}

const changeEverydayTodoForm = {
  showForm(todoId) {
    this.listId = DOM.getCurrentListId()
    const todo = app.getTodo(this.listId, todoId)
    this.todoId = todo.id
    const formEl = document.createElement('form')
    formEl.id = 'pop-up-form'
    formEl.action = 'post'
    formEl.insertAdjacentHTML(
      'afterbegin',
      `<form id="pop-up-form" action="post">
        <h2>Change Task</h2>
        <label for="new-title">Task:</label>
        <input id="new-title" name="title" type="text" value="${todo.title}" />
        <p class="error-para" data-error-para>All fields must be filled up!</p>
          <button
          class="btn"
          id="save-task-btn"
          type="submit">
          Change task
        </button>
      </form>`
    )
    formEl.addEventListener('submit', this.checkForm.bind(this))
    overlay.appendChild(formEl)
    _showOverlay()
    _handleOverlayClick(this)
  },

  closeForm() {
    _hideOverlay()
    overlay.innerHTML = ''
  },

  checkForm(Event) {
    Event.preventDefault()
    const formEl = overlay.querySelector('form')
    const formData = new FormData(formEl)
    const isValid = _checkValidity(formData)
    if (!isValid) {
      formEl.querySelector('[data-error-para]').classList.add('error-active')
      _handleOverlayClick(this)
      return
    }
    const todo = new Todo(formData.get('title'))
    DOM.changeTodo(this.todoId, todo)
    this.closeForm()
  },
}

const setStartHourForm = {
  showForm() {
    const formEl = document.createElement('form')
    formEl.id = 'pop-up-form'
    formEl.action = 'post'
    formEl.insertAdjacentHTML(
      'afterbegin',
      `<form id="pop-up-form" action="post">
        <h2>Set start hour:</h2>
        <input id="new-title" type="number" name="start-hour" min="0" max="24">
        <p class="error-para" data-error-para>All fields must be filled up!</p>
        <button class="btn" id="change-time-btn">Set time</button>
      </form>`
    )
    formEl.addEventListener('submit', this.checkForm.bind(this))
    overlay.appendChild(formEl)
    _showOverlay()
    _handleOverlayClick(this)
  },

  closeForm() {
    _hideOverlay()
    overlay.innerHTML = ''
  },

  checkForm(Event) {
    Event.preventDefault()
    const formEl = overlay.querySelector('form')
    const formData = new FormData(formEl)
    const hour = formData.get('start-hour')
    if (!hour) {
      formEl.querySelector('[data-error-para]').classList.add('error-active')
      _handleOverlayClick(this)
      return
    }
    app.setStartOfDay(Number(hour))
    DOM._renderList()
    this.closeForm()
  },
}

export {
  listForm,
  renameListForm,
  todoForm,
  changeTodoForm,
  everydayTodoForm,
  changeEverydayTodoForm,
  setStartHourForm,
}
