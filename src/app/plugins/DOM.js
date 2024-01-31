import app from '../app'
import DropDownMenu from './DropDownMenu'
import createElement from '../utils/createElement'

const container = document.querySelector('.container')
const nav = container.querySelector('nav')

const DOM = {
  updateLists() {
    const defaultListsContainer = nav.querySelector('[data-default-lists]')
    const customListsContainer = nav.querySelector('[data-custom-lists]')
    defaultListsContainer.innerHTML = ''
    customListsContainer.innerHTML = ''

    app.lists.forEach((list) => {
      switch (list.type) {
        case 'custom': {
          const listEl = DOM.createCustomListEl(list)
          customListsContainer.appendChild(listEl)
          break
        }
        default:
          {
            const listEl = DOM.createDefaultListEl(list)
            defaultListsContainer.appendChild(listEl)
          }
          break
      }
    })
  },

  createDefaultListEl(list) {
    const listEl = createElement(
      'li',
      [`${list.type}-list-item`],
      null,
      null,
      null,
      [{ dataKey: 'listId', dataValue: list.id }]
    )
    listEl.insertAdjacentHTML(
      'afterbegin',
      `<button class="default-list-list-item_btn" data-nav-el="list-item-btn">${list.name}</button>`
    )
    return listEl
  },

  createCustomListEl(list) {
    const listEl = document.createElement('li')
    listEl.classList.add(`${list.type}-list-item`)
    listEl.dataset.listId = list.id
    listEl.insertAdjacentHTML(
      'afterbegin',
      `<button class="custom-list-item_btn list-item_btn" data-nav-el="list-item-btn">
          ${list.name}
        </button>
        <div class="list_dropdown-menu" data-dropdown>
          <button class="dropdown-btn" data-dropdown-btn>
            <div class="btn-dot"></div>
            <div class="btn-dot"></div>
            <div class="btn-dot"></div>
          </button>
          <ul class="dropdown-content" data-dropdown-options>
            <li>
              <button class="delete-list-btn" data-nav-el="delete-list-btn">
                Delete
              </button>
            </li>
            <li>
              <button class="rename-list-btn" data-nav-el="rename-list-btn">
                Rename
              </button>
            </li>
          </ul>
        </div>`
    )
    const dropdown = listEl.querySelector('[data-dropdown]')
    new DropDownMenu(dropdown).init()
    return listEl
  },
}

export default DOM
