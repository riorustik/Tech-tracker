const modal = document.querySelector('#modal');
const content = document.querySelector('#content');
const backdrop = document.querySelector('#backdrop');

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
// const technologies = []

function  init(){
    if(technologies.length === 0) {
        content.innerHTML = `<p class="empty">Empty technologies </p>`
    }
    else{
        content.innerHTML = technologies.map(toCard).join('');
    }
}

function toCard(item){

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