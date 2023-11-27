import createElement from "./utils/createElement"

export default class Form {
    initForm() {
        const container = document.querySelector('.container')
        const overlay = createElement('div', ['hidden', 'visually-hidden'], 'overlay')
        const form = createElement('form', null, 'pop-up-form')
        form.action = "post"
        const h2 = createElement('h2', null, null, 'Add project')
        const nameLabel = createElement('label', null, null, 'Name:')
        nameLabel.htmlFor = "new-title"
        const nameInput = createElement('input', null, 'new-title')
        nameInput.type = "text"
        const addProjectBtn = createElement('button', ['btn'], 'add-list-btn', 'Add project')
        addProjectBtn.type = "submit"
        form.append(h2, nameLabel, nameInput, addProjectBtn)
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
