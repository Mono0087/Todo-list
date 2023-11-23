export default function createElement(name, classList, id, textContent, datasetName, datasetKey) {
    let el = document.createElement(name)
    classList ? el.classList.add(...classList) : null
    textContent ? el.innerText = textContent : null
    id ? el.id = id : null
    datasetName ? el.dataset[datasetName] = '' : null
    datasetKey ? el.dataset[datasetName] = datasetKey : null
    return el
}