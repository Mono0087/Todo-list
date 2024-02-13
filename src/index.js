/* eslint-disable indent */
import app from './app/app'
import DOM from './app/modules/DOM'
import {
  listForm,
  renameListForm,
  todoForm,
  changeTodoForm,
  everydayTodoForm,
  changeEverydayTodoForm,
  noteForm,
  setStartHourForm,
  settingsModal,
} from './app/modules/Forms'
import './SCSS/style.scss'

// CACHE DOM /////////////////////////////////////////////////////////////
const container = document.querySelector('.container')
const nav = container.querySelector('nav')
const main = container.querySelector('main')
const settingsBtn = container.querySelector('[data-settings-btn]')

// METHODS ///////////////////////////////////////////////////////////////

const navClickHandler = (Event) => {
  const target = Event.target.dataset.navEl
  switch (target) {
    case 'list-item-btn': {
      const { listId } = Event.target.closest('[data-list-id]').dataset
      DOM.renderList(listId)
      break
    }
    case 'add-project-btn':
      listForm.showForm()
      break
    case 'delete-list-btn': {
      const { listId } = Event.target.closest('[data-list-id]').dataset
      app.deleteList(listId)
      DOM.updateLists()
      DOM.renderList()
      break
    }
    case 'rename-list-btn': {
      const { listId } = Event.target.closest('[data-list-id]').dataset
      renameListForm.showForm(listId)
      DOM.updateLists()
      break
    }
    default:
      break
  }
}

const listClickHandler = (Event) => {
  const target = Event.target.dataset.listEl
  switch (target) {
    case 'todo-title':
      {
        const { todoId } = Event.target.closest('[data-todo-element]').dataset
        DOM.toggleCrossOutTodo(todoId)
      }
      break
    case 'delete-todo':
      {
        const { todoId } = Event.target.closest('[data-todo-element]').dataset
        DOM.deleteTodo(todoId)
      }
      break
    case 'add-todo':
      todoForm.showForm()
      break
    case 'change-todo':
      {
        const { todoId } = Event.target.closest('[data-todo-element]').dataset
        changeTodoForm.showForm(todoId)
      }
      break
    case 'add-everyday-todo':
      everydayTodoForm.showForm()
      break
    case 'change-everyday-todo':
      {
        const { todoId } = Event.target.closest('[data-todo-element]').dataset
        changeEverydayTodoForm.showForm(todoId)
      }
      break
    case 'set-start-hour':
      setStartHourForm.showForm()
      break
    case 'add-note':
      noteForm.showForm()
      break
    case 'delete-note':
      {
        const { noteId } = Event.target.closest('[data-note-id]').dataset
        DOM.deleteNote(noteId)
      }
      break
    case 'sort': {
      app.sort(DOM.getCurrentListId(), Event.target.dataset.sortType)
      DOM.renderList()
      break
    }
    default:
      break
  }
}

// INIT //////////////////////////////////////////////////////////////////
if (app.lists.length === 0) {
  app.setList('Today', 'default')
  app.setList('Week', 'default')
  app.setEverydayList('Everyday')
  app.setNotes()
}
app.timeUpdate()
DOM.updateLists()
DOM.renderList(app.lists[0].id)

// BIND EVENTS ///////////////////////////////////////////////////////////
nav.addEventListener('click', navClickHandler)
main.addEventListener('click', listClickHandler)
settingsBtn.addEventListener('click', () => {
  settingsModal.show()
})
