import base from './app/app'
import { Todo, CustomTodo } from './app/utils/Todo'
import createElement from './app/utils/createElement'
import './SCSS/style.scss'

const app = base()

const _setDefaultLists = () => {
  app.setList('Today', 'default')
  app.setList('Week', 'default')
  app.setEverydayList('Everyday')
}

if (app.lists.length === 0) {
  _setDefaultLists()
}

app.timeUpdate()