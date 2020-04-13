export async function renderList(repos, sideNavTag) {
    const docFrag = document.createDocumentFragment();
    const unorderedTag = document.createElement('ul');
    repos.forEach((repo, i) => {
        const listTag = document.createElement('li');
        const anchorTag = document.createElement('a');
        anchorTag.textContent = repo.name;
        anchorTag.setAttribute('title', repo.description);
        anchorTag.setAttribute('href', repo.url);
        anchorTag.setAttribute('target', '_blank');
        listTag.classList.add('projects');
        const typeOfProject = document.createElement('span');
        typeOfProject.textContent = repo.private ? 'Private' : 'Public';
        listTag.setAttribute('data-id', i);
        listTag.appendChild(anchorTag);
        listTag.appendChild(typeOfProject);
        unorderedTag.appendChild(listTag);
    })
    docFrag.appendChild(unorderedTag);
    sideNavTag.appendChild(docFrag);
}