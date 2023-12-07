import createElement from "./utils/createElement"
export { Form, ListForm, TaskForm, EverydayTaskForm, ChangeEverydayTaskForm, ChangeTaskForm, SetStartOfDay}

class Form {
    initBaseStructure() {
        const container = document.querySelector('.container')
        const overlay = createElement('div', ['hidden', 'visually-hidden'], 'overlay')
        const form = createElement('form', null, 'pop-up-form')
        form.action = "post"
        overlay.append(form)
        container.append(overlay)
    }
    showForm() {
        overlay.classList.remove('hidden')
        setTimeout((function () {
            overlay.classList.remove('visually-hidden')
        }), 5)
    }
    hideForm() {
        overlay.classList.add('visually-hidden')
        overlay.addEventListener('transitionend', function (e) {
            overlay.classList.add('hidden')
        }, {
            capture: false,
            once: true,
            passive: false
        })
    }
    validateFormInputs(inputs) {
        let result = true;
        inputs.forEach(input => {
            if (input === '') {
                result = false;
            }
        })
        return result;
    }
}

class ListForm extends Form {
    initForm() {
        const form = document.querySelector('#pop-up-form')
        form.innerHTML = ''
        const h2 = createElement('h2', null, null, 'Add project')
        const nameLabel = createElement('label', null, null, 'Title:')
        nameLabel.htmlFor = "new-title"
        const nameInput = createElement('input', null, 'new-title')
        nameInput.type = "text"
        const saveProjectBtn = createElement('button', ['btn'], 'save-list-btn', 'Add project')
        saveProjectBtn.type = "submit"
        form.append(h2, nameLabel, nameInput, saveProjectBtn)
    }
}

class TaskForm extends Form {
    initForm() {
        const form = document.querySelector('#pop-up-form')
        form.innerHTML = ''
        const h2 = createElement('h2', null, null, 'Add Task')
        const inputs = createTaskInputs()
        const saveTaskBtn = createElement('button', ['btn'], 'save-task-btn', 'Add task')
        saveTaskBtn.type = "submit"
        form.append(h2, ...inputs, saveTaskBtn)
    }
}

class EverydayTaskForm extends Form {
    initForm() {
        const form = document.querySelector('#pop-up-form')
        form.innerHTML = ''
        const h2 = createElement('h2', null, null, 'Add Task')
        const nameLabel = createElement('label', null, null, 'Task:')
        nameLabel.htmlFor = "new-title"
        const nameInput = createElement('input', null, 'new-title')
        nameInput.type = "text"
        const saveTaskBtn = createElement('button', ['btn'], 'save-task-btn', 'Add task')
        saveTaskBtn.type = "submit"
        form.append(h2, nameLabel, nameInput, saveTaskBtn)
    }
}

class ChangeEverydayTaskForm extends Form {
    initForm() {
        const form = document.querySelector('#pop-up-form')
        form.innerHTML = ''
        const h2 = createElement('h2', null, null, 'Change Task')
        const nameLabel = createElement('label', null, null, 'Task:')
        nameLabel.htmlFor = "new-title"
        const nameInput = createElement('input', null, 'new-title')
        nameInput.type = "text"
        const saveTaskBtn = createElement('button', ['btn'], 'change-task-btn', 'Change task')
        saveTaskBtn.type = "submit"
        form.append(h2, nameLabel, nameInput, saveTaskBtn)
    }
}

class ChangeTaskForm extends Form {
    initForm() {
        const form = document.querySelector('#pop-up-form')
        form.innerHTML = ''
        const h2 = createElement('h2', null, null, 'Change Task')
        const inputs = createTaskInputs()
        const saveTaskBtn = createElement('button', ['btn'], 'change-task-btn', 'Change task')
        saveTaskBtn.type = "submit"
        form.append(h2, ...inputs, saveTaskBtn)
    }
}


function createTaskInputs() {
    const nameLabel = createElement('label', null, null, 'Task:')
    nameLabel.htmlFor = "new-title"
    const nameInput = createElement('input', null, 'new-title')
    nameInput.type = "text"
    const dueDateLabel = createElement('label', null, null, 'Due date:')
    dueDateLabel.htmlFor = "new-due-date"
    const dueDateInput = createElement('input', null, 'new-due-date')
    dueDateInput.type = "date"
    const priorityLabel = createElement('label', null, null, 'Priority:')
    priorityLabel.htmlFor = "new-priority"
    const priorityInput = createElement('input', null, 'new-priority')
    priorityInput.type = "number"
    priorityInput.min = '0'
    priorityInput.max = '4'
    return [nameLabel, nameInput, dueDateLabel, dueDateInput, priorityLabel, priorityInput]
}

class SetStartOfDay extends Form {
    initForm() {
        const form = document.querySelector('#pop-up-form')
        form.innerHTML = ''
        const h2 = createElement('h2', null, null, 'Set start hour:')
        const startHourInput = createElement('input', null, 'new-title')
        startHourInput.type = "number"
        startHourInput.min = '0'
        startHourInput.max = '24'
        const saveTimeBtn = createElement('button', ['btn'], 'change-time-btn', 'Save time')
        form.append(h2, startHourInput, saveTimeBtn)
    }
}