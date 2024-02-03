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
  constructor(title, details, dueDate, priority) {
    super(title)
    this.details = details
    this.dueDate = format( new Date( dueDate ), 'yyyy/MM/dd')
    this.priority = priority
  }
}

export { Todo, CustomTodo }
