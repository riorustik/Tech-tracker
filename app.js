const modal = document.querySelector('#modal');
const content = document.querySelector('#content');
const backdrop = document.querySelector('#backdrop');
const progress = document.querySelector('#progress');
const form = document.querySelector('#form');
const APP_TITLE = document.title;
const LS_KYE = '12345qwert'
content.addEventListener('click', openCard);
backdrop.addEventListener('click', closeCard)
modal.addEventListener('change', toggleTech);
form.addEventListener('submit', createTech)
modal.addEventListener('click', deleteTech);

let technologies = getState();

function init() {
    renderCards();
    renderProggess();
}

function renderProggess() {
    const percent = computeProgressPercent();
    let background;

    if (percent <= 30) background = '#F75A5A';
    else if (percent > 30 && percent < 70) background = '#F99415';
    else background = '#73BA3C';

    progress.style.background = background
    progress.style.width = `${percent}%`
    progress.textContent = percent ? `${percent}%` : '';

}

function computeProgressPercent() {
    if (technologies.length === 0) return 0

    let doneCount = 0;
    technologies.map(tech => {
        if (tech.done === true) doneCount++;
    })

    return Math.round((100 * doneCount) / technologies.length)
}

function renderCards() {
    if (technologies.length === 0) {
        content.innerHTML = `<p class="empty">Empty technologies </p>`
    } else {
        content.innerHTML = technologies.map(toCard).join('');
    }
}

function toCard(item) {
    const doneClass = item.done ? 'done' : '';
    return `<div class="card ${doneClass}" data-type="${item.type}"><h3>${item.title}</h3></div>`
}


function openCard(event) {
    const data = event.target.dataset;
    const tech = technologies.find(e => e.type === data.type);
    if (!tech) return;
    openModal(tech.title, toModal(tech));
}

function toModal(item) {
    const checked = item.done ? 'checked' : '';
    return `
        <h2>${item.title}</h2>
    <p>
        ${item.description}
    </p>
    <hr>
    <div class="controlPanel">
        <div>
            <input type="checkbox" id="done" ${checked} data-type="${item.type}">
            <label for="done">learned it</label>
        </div>
        <button type="button" id="delete" data-del="${item.type}">удалить</button>
    </div>
    `
}

function openModal(title = APP_TITLE, htmlText) {
    document.title = `${APP_TITLE} | ${title}`;
    modal.innerHTML = htmlText;
    modal.classList.add('open');
}

function toggleTech(event) {
    const type = event.target.dataset.type;
    technologies.map(e => e.type === type ? e.done = event.target.checked : e);
    saveState()
    init();
}

function closeCard() {
    document.title = APP_TITLE;
    modal.classList.remove('open');
}

function isInvalid(title, description) {
    return !title.value || !description.value
}

function createTech(event) {
    event.preventDefault();
    const {title, description} = event.target;

    if (isInvalid(title, description)) {
        if (!title.value) title.classList.add('invalid');
        if (!description.value) description.classList.add('invalid');

        setTimeout(() => {
            title.classList.remove('invalid');
            description.classList.remove('invalid');
        }, 2000)

        return
    }

    const newTech = {
        title: title.value,
        description: description.value,
        done: false,
        type: title.value.toLocaleLowerCase(),
    }
    title.value = '';
    description.value = ''

    technologies.push(newTech)
    saveState()
    init();
}

function saveState() {
    localStorage.setItem(LS_KYE, JSON.stringify(technologies));
}

function getState() {
    const raw = localStorage.getItem(LS_KYE);
    return raw ? JSON.parse(raw) : []
}

function deleteTech(event) {
    const deleteBtn = event.target.closest('#delete');
    if (deleteBtn) {
        let deleteTech = event.target.dataset.del;
        technologies = technologies.filter(e => e.type !== deleteTech)
        saveState()
        closeCard()
        init();
    }
}

init()