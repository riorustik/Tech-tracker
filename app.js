const modal = document.querySelector('#modal');
const content = document.querySelector('#content');
const backdrop = document.querySelector('#backdrop');
const progress = document.querySelector('#progress');

content.addEventListener('click', openCard);
backdrop.addEventListener('click', closeCard)

const technologies = [
    {
        title: 'HTML',
        description: 'HTML TEXT',
        type: 'html',
        done: true,
    },
    {
        title: 'CSS',
        description: 'CSS TEXT',
        type: 'css',
        done: true,
    },
    {
        title: 'JAVASCRIPT',
        description: 'JAVASCRIPT TEXT',
        type: 'javascript',
        done: false,
    },
    {
        title: 'Git',
        description: 'Git TEXT',
        type: 'git',
        done: false,
    },
    {
        title: 'React',
        description: 'React TEXT',
        type: 'react',
        done: false,
    },
]

function init() {
    renderCards();
    renderProggess();
}

function renderProggess() {
    const percent = computeProgressPercent();
    let background;

    if(percent <= 30) background = '#F75A5A';
    else if(percent > 30 && percent < 70) background = '#F99415';
    else background = '#73BA3C';

    progress.style.background = background
    progress.style.width = `${percent}%`
    progress.textContent = percent ? `${percent}%` : '';

}

function computeProgressPercent() {

    if (technologies.length === 0) return 0

    let doneCount = 0;
    technologies.map(tech => {
        if(tech.done === true ) doneCount++ ;
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
    return `<div class="card ${doneClass}"><h3>${item.title}</h3></div>`
}


function openCard() {
    modal.classList.add('open');
}

function closeCard() {
    modal.classList.remove('open');
}

init()