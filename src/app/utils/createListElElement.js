import createElement from "./createElement"

export default function createListLiElement(listObj, listType) {
    let listEl = createElement('li', [`${listType}-list-item`], null, null, `listId`, `${listType}List.${listObj.id}`)
    let listElBtn = createElement('button', [`${listType}-list-item_btn`, `list-item_btn`], null, listObj.name, 'navEl', 'list-item-btn')
    listEl.appendChild(listElBtn)
    if (listType === 'custom') {
        let dropDownMenu = createElement('div', ['list_dropdown-menu'], null, null)
        let dropDownMenuBtn = createElement('button', ['dropdown-btn'], null, null, 'navEl', 'dropdown-btn')
        let btnDot = createElement('div', ['btn-dot'], null, null)
        dropDownMenuBtn.innerHTML = btnDot.outerHTML + btnDot.outerHTML + btnDot.outerHTML
        let dropDownMenuContent = createElement('menu', ['dropdown-content'])
        let deleteListBtn = createElement('button', ['delete-list-btn'], null, 'Delete project', 'navEl', 'delete-list-btn')
        dropDownMenuContent.append(deleteListBtn)
        dropDownMenu.append(dropDownMenuBtn, dropDownMenuContent)
        listEl.appendChild(dropDownMenu)
    }
    return listEl
}