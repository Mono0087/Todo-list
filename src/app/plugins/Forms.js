import app from '../app'
import DOM from './DOM'

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
      self.hideForm()
    },
    { once: true }
  )
}

const _checkValidity = (formData) => {
  for (const data of formData) {
    if (data[1] === '') return false
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

  hideForm() {
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
      return
    }
    const data = formData.get('title')
    app.setList(data, 'custom')
    DOM.updateLists()
    this.hideForm()
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

  hideForm() {
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
      return
    }
    const title = formData.get('title')
    app.renameList(this.listId, title)
    DOM.updateLists()
    this.hideForm()
  },
}

export { listForm, renameListForm }
