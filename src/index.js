import { addDays, format } from 'date-fns'
import createElement from './app/utils/createElement'
import base from './app/app'
import './SCSS/style.scss'

const app = base()

const _setDefaultLists = () => {
  app.setList('Today', 'default')
  app.setList('Week', 'default')
  app.setEverydayList('Everyday', 'defaultEveryday')
}

if (app.lists.length === 0) {
  _setDefaultLists()
}
