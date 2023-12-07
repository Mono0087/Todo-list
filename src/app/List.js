import { setHours, startOfToday } from "date-fns"

export { List, DefaultList, CustomList, DefaultEverydayList }


class List {
    constructor(name) {
        this.name = name
    }
}

class DefaultList extends List {
    constructor(id, name) {
        super(name)
        this.id = id
        this.todos = []
    }
}

class CustomList extends List {
    constructor(name) {
        super(name)
        this.id = crypto.randomUUID()
        this.todos = []
    }
}

class DefaultEverydayList extends DefaultList {
    constructor(id, name) {
        super(id, name)
        this.todos = []
    }
}