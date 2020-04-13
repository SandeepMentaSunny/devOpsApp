export function renderTableRow(data, tableBody){
    const fragment = document.createDocumentFragment();
    const row = document.createElement('tr');
    for(let key in data){
        const dataTag = document.createElement('td');
        dataTag.textContent = data[key];
        row.appendChild(dataTag);
    }
    fragment.appendChild(row);
    tableBody.appendChild(fragment);
}