/* eslint-disable indent */
import app from './app/app'
import DOM from './app/plugins/DOM'
import { listForm, renameListForm } from './app/plugins/Forms'
import './SCSS/style.scss'

// CACHE DOM /////////////////////////////////////////////////////////////
const container = document.querySelector('.container')
const nav = container.querySelector('nav')

// METHODS ///////////////////////////////////////////////////////////////

const navClickHandler = (Event) => {
  const target = Event.target.dataset.navEl
  switch (target) {
    case 'list-item-btn': {
      const { listId } = Event.target.parentElement.dataset
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
