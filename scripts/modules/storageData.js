export function setLocalStorage(type, data, event){
    if(type && event === 'add'){
        localStorage.setItem(type, JSON.stringify(data));
    } else if(localStorage.length > 0 && event === 'update'){
        const usersData = JSON.parse(localStorage.getItem(type));
        usersData.push(data);
        localStorage.setItem(type, JSON.stringify(usersData));
    }
}

export function getLocalStorage(type) {
    return JSON.parse(localStorage.getItem(type));
}