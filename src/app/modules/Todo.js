import { format } from 'date-fns'

class Todo {
  constructor(title) {
    this.title = title
    this.id = crypto.randomUUID()
    this.checked = false
    // new Date(Date.parse(date))
    this.creationDate = format(new Date(), 'HH:mm:ss yyyy/MM/dd')
  }
}

class CustomTodo extends Todo {
  constructor(title, dueDate, priority) {
    super(title)
    this.dueDate = format(new Date(dueDate), 'dd/MM/yyyy')
    this.priority = priority
  }
}

export { Todo, CustomTodo }
