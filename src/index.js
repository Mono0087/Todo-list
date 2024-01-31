/* eslint-disable indent */
import app from './app/app'
import { Todo, CustomTodo } from './app/utils/Todo'
import DOM from './app/plugins/DOM'
import { ListForm } from './app/plugins/Forms'
import './SCSS/style.scss'

// CACHE DOM /////////////////////////////////////////////////////////////
const container = document.querySelector('.container')
const nav = container.querySelector('nav')

// METHODS ///////////////////////////////////////////////////////////////

const navClickHandler = (Event) => {
  const target = Event.target.dataset.navEl
  let listId
  switch (target) {
    case 'list-item-btn': {
      listId = Event.target.parentElement.dataset.listId
      break
    }
    case 'add-project-btn':
      ListForm.showForm()
      break
    case 'delete-list-btn':
      app.deleteList(Event.target.closest('[data-list-id]').dataset.listId)
      DOM.updateLists()
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

// BIND EVENTS ///////////////////////////////////////////////////////////
nav.addEventListener('click', navClickHandler)

window.app = app
