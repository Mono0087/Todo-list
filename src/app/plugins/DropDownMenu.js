const closeDropdowns = function closeOtherDropdowns(...exceptions) {
  ;[...document.querySelectorAll('[data-dropdown]')].forEach((dropdown) => {
    if (!exceptions.includes(dropdown)) {
      const list = dropdown.querySelector('[data-dropdown-options]')
      list.removeAttribute('data-dropdown-visible')
      dropdown.removeAttribute('data-dropdown-active')
    }
  })
}

const windowClickHandler = (e) => {
  const dropdown = e.target.closest('[data-dropdown]')
  let currentMainDropdown = dropdown
  if (dropdown && dropdown.hasAttribute('data-dropdown-nested')) {
    currentMainDropdown = dropdown.parentElement.closest('[data-dropdown]')
    closeDropdowns(dropdown, currentMainDropdown)
  } else {
    closeDropdowns(currentMainDropdown)
  }
  if (!dropdown) {
    window.removeEventListener('click', windowClickHandler)
  }
}

export default class DropDownMenu {
  constructor(element) {
    this.element = element
  }

  init() {
    const btn = this.element.querySelector('[data-dropdown-btn]')
    const optionsList = this.element.querySelector('[data-dropdown-options]')
    btn.addEventListener('click', () => {
      const dropdown = btn.closest('[data-dropdown]')
      dropdown.toggleAttribute('data-dropdown-active')
      optionsList.toggleAttribute('data-dropdown-visible')
      window.addEventListener('click', windowClickHandler)
    })
  }
}
