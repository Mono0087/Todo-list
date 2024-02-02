/* eslint-disable indent */
import app from './app/app'
import DOM from './app/modules/DOM'
import {
  listForm,
  renameListForm,
  todoForm,
  changeTodoForm,
} from './app/modules/Forms'
import './SCSS/style.scss'

// CACHE DOM /////////////////////////////////////////////////////////////
const container = document.querySelector('.container')
const nav = container.querySelector('nav')
const main = container.querySelector('main')

// METHODS ///////////////////////////////////////////////////////////////

const navClickHandler = (Event) => {
  const target = Event.target.dataset.navEl
  switch (target) {
    case 'list-item-btn': {
      const { listId } = Event.target.parentElement.dataset
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
    default:
      break
  }
}

// INIT //////////////////////////////////////////////////////////////////
if (app.lists.length === 0) {
  app.setList('Today', 'default')
  app.setList('Week', 'default')
  app.setEverydayList('Everyday')
  app.setList('test', 'custom')
}
app.timeUpdate()
DOM.updateLists()
DOM.renderList(app.lists[0].id)

// BIND EVENTS ///////////////////////////////////////////////////////////
nav.addEventListener('click', navClickHandler)
main.addEventListener('click', listClickHandler)

window.app = app
