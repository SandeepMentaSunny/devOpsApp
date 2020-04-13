import { FetchReposFromGithubApi } from './modules/fetchRepos.js';
import { renderList } from './modules/renderList.js';
import { Notification } from './modules/Notification.js';
import { renderTableRow } from './modules/renderTableRow.js';
import { getLocalStorage, setLocalStorage } from './modules/storageData.js';

const apiUrl = 'https://api.github.com';
const sideNav = document.querySelector('.side-nav');
let projectList;
let previousSelectedProjectId = -1;
const organizationName = document.querySelector('#githubOrgName');
const accessToken = '0b9af0f50a41273d98a59976a6d985678e35acc9';
const notificationTag = document.querySelector('.notification');
const organizationBtn = document.querySelector('.add-organization');
const type = document.querySelector('#role');
let apiParamType = 'repos';
const tableBody = document.querySelector('.table-body');
const table = document.querySelector('table');

window.addEventListener('DOMContentLoaded', () => {
    if (!getLocalStorage('organizationRepos')) {
        Notification(notificationTag, true, `Please add ${apiParamType === 'repos' ? 'Repositories' : 'Organisations'}.`, false);
    } else {
        const res = getLocalStorage('organizationRepos');
        if (res.length > 0) {
            renderList(res, sideNav);
            projectList = document.querySelectorAll('.projects');
            if (projectList.length > 0) {
                for (let project of projectList) {
                    project.addEventListener('click', (e) => {
                        if (e.target.tagName === 'LI') {
                            toggleActiveClass(e);
                            if(previousSelectedProjectId > -1){
                                table.classList.remove('hide');
                                if(tableBody.children.length > 0){
                                    tableBody.innerHTML = '';
                                }
                                let data = res[e.target.getAttribute('data-id')];
                                data = {repoName: data[`name`], status: data[`private`] ? 'Private' : 'Public'};
                                notificationTag.innerHTML = '';
                                if(!data[`private`]){
                                    Notification(notificationTag, true, "Public Repository. No violations found");
                                }else{
                                    Notification(notificationTag, false, 'Violations found. Please check status on github');
                                }
                                renderTableRow(data, tableBody);
                            }
                        }
                    }, false);
                }
            }
        } else {
            Notification(notificationTag, true, 'No organisations exists.');
        }
    }
});

function toggleActiveClass(event) {
    let currentId = event.target.getAttribute('data-id');
    if (previousSelectedProjectId > -1 && previousSelectedProjectId !== currentId) {
        projectList[previousSelectedProjectId].classList.remove('active');
        previousSelectedProjectId = currentId;
        event.target.classList.add('active');
    }
    if (previousSelectedProjectId === -1) {
        previousSelectedProjectId = currentId;
        event.target.classList.add('active');
    }
}

organizationBtn.addEventListener('click', (e) => {
    fetchDataOfOrganization();
});

type.addEventListener('change', (e) => {
    console.log(e);
    apiParamType = e.target.value;
    organizationBtn.textContent = apiParamType === 'repos' ? 'Add Repositories' : 'Add Organizations';
});
function fetchDataOfOrganization() {
    if (organizationName.value.length > 0) {
        const data = FetchReposFromGithubApi(apiUrl, organizationName.value, apiParamType, accessToken);
        data.then((res) => {
            if (res.length > 0) {
                if (notificationTag.childNodes.length > 0) {
                    notificationTag.innerHTML = '';
                }
                if(sideNav.children.length > 0){
                    sideNav.innerHTML = '';
                    table.classList.add('hide');
                }
                renderList(res, sideNav);
                projectList = document.querySelectorAll('.projects');
                if (projectList.length > 0) {
                    for (let project of projectList) {
                        project.addEventListener('click', (e) => {
                            if (e.target.tagName === 'LI') {
                                toggleActiveClass(e);
                                if(previousSelectedProjectId > -1){
                                    table.classList.remove('hide');
                                    if(tableBody.children.length > 0){
                                        tableBody.innerHTML = '';
                                    }
                                    let data = res[e.target.getAttribute('data-id')];
                                    data = {repoName: data[`name`], status: data[`private`] ? 'Private' : 'Public'};
                                    notificationTag.innerHTML = '';
                                    if(!data[`private`]){
                                        Notification(notificationTag, true, "Public Repository. No violations found");
                                    }else{
                                        Notification(notificationTag, false, 'Violations found. Please check status on github');
                                    }
                                    renderTableRow(data, tableBody);
                                }
                            }
                        }, false);
                    }
                }
                setLocalStorage('organizationRepos', res, 'add');
                if(notificationTag.children.length > 0){
                    notificationTag.innerHTML = '';
                }
            } else {
                if(sideNav.children.length > 0){
                    sideNav.innerHTML = '';
                    table.classList.add('hide');
                }
                notificationTag.innerHTML = '';
                Notification(notificationTag, false, 'No organization exists :(');
            }
        }).catch((err) => console.error(err));
    }
}