export default function createElement(name, classList, id, textContent, datasetKey, datasetValue) {
    let el = document.createElement(name)
    classList ? el.classList.add(...classList) : null
    textContent ? el.innerText = textContent : null
    id ? el.id = id : null
    datasetKey ? el.dataset[datasetKey] = '' : null
    datasetValue ? el.dataset[datasetKey] = datasetValue : null
    return el
}