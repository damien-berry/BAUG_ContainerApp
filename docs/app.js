const pages = [
    'home',
    'problem',
    'runtime',
    'architecture',
    'demo-1',
    'demo-2',
    'sandboxes',
    'identity',
    'my-take',
    'demo-plan',
    'recap',
    'resources'
];

const pageLabels = {
    home: 'Home',
    recap: 'Recap',
    problem: 'Problem',
    runtime: 'Runtime',
    architecture: 'Architecture',
    'demo-1': 'Demo 1',
    'demo-2': 'Demo 2',
    sandboxes: 'Sandboxes',
    identity: 'Identity',
    'my-take': 'My Take',
    'demo-plan': 'Demo Plan',
    resources: 'Resources'
};

function setActiveNav(id) {
    document.querySelectorAll('.nav-links a').forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
    });
}

function getVisiblePages(currentId) {
    const currentIndex = pages.indexOf(currentId);
    const start = Math.max(0, currentIndex - 2);
    const end = Math.min(pages.length, currentIndex + 3);
    return pages.slice(start, end);
}

function renderPageLinks(currentId) {
    const container = document.getElementById('page-nav');

    if (!container) return;

    const visiblePages = getVisiblePages(currentId);
    container.innerHTML = visiblePages
        .map((pageId) => `<a class="nav-chip${pageId === currentId ? ' active' : ''}" href="#${pageId}">${pageLabels[pageId] || pageId}</a>`)
        .join('');

    container.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            goToPage(link.getAttribute('href').replace('#', ''));
        });
    });
}

function goToPage(id) {
    const page = document.getElementById(id);
    if (!page) return;

    pages.forEach((item) => {
        document.getElementById(item)?.classList.remove('active');
    });

    page.classList.add('active');
    setActiveNav(id);
    renderPageLinks(id);
    if (window.location.hash !== `#${id}`) {
        window.history.replaceState(null, '', `#${id}`);
    }
}

function nextPage() {
    const current = window.location.hash.replace('#', '') || 'home';
    const index = pages.indexOf(current);
    const next = pages[index + 1] || 'home';
    goToPage(next);
}

function previousPage() {
    const current = window.location.hash.replace('#', '') || 'home';
    const index = pages.indexOf(current);
    const previous = pages[index - 1] || 'home';
    goToPage(previous);
}

function applyReusableNotesLayout() {
    document.querySelectorAll('.deck-page').forEach((page) => {
        const shell = page.querySelector('.deck-card, .deck-page-inner');
        if (!shell) return;

        const existingNotes = page.querySelector('.notes-strip');
        if (existingNotes) return;

        const notesBoxes = Array.from(shell.querySelectorAll('.placeholder-box'));
        const notesStrip = document.createElement('aside');
        notesStrip.className = 'shell notes-strip';
        notesStrip.setAttribute('aria-label', `${page.id} notes`);

        if (notesBoxes.length > 0) {
            notesBoxes.forEach((box) => notesStrip.appendChild(box));
        } else {
            const placeholder = document.createElement('div');
            placeholder.className = 'placeholder-box';
            placeholder.textContent = 'Speaker notes for this slide will go here.';
            notesStrip.appendChild(placeholder);
        }

        page.appendChild(notesStrip);
    });
}

function initDeck() {
    applyReusableNotesLayout();

    const updatedDate = document.getElementById('updated-date');
    if (updatedDate) {
        updatedDate.textContent = new Date().toLocaleDateString('en-AU', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    document.querySelectorAll('.quick-card').forEach((link) => {
        link.addEventListener('click', (event) => {
            const target = link.getAttribute('href');
            if (target && target.startsWith('#')) {
                event.preventDefault();
                goToPage(target.replace('#', ''));
            }
        });
    });

    document.querySelectorAll('.nav-chip-nav').forEach((button) => {
        button.addEventListener('click', () => {
            if (button.dataset.direction === 'next') {
                nextPage();
            } else {
                previousPage();
            }
        });
    });

    const initialId = window.location.hash.replace('#', '') || 'home';
    goToPage(pages.includes(initialId) ? initialId : 'home');

    window.addEventListener('hashchange', () => {
        const nextId = window.location.hash.replace('#', '') || 'home';
        goToPage(pages.includes(nextId) ? nextId : 'home');
    });

    document.addEventListener('keydown', (event) => {
        if (event.target && ['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON', 'A'].includes(event.target.tagName)) {
            return;
        }

        if (event.key === 'ArrowRight' || event.key === ' ' || event.code === 'Space') {
            event.preventDefault();
            nextPage();
        }

        if (event.key === 'ArrowLeft') {
            event.preventDefault();
            previousPage();
        }

        if (event.key === 'Escape') {
            event.preventDefault();
            goToPage('home');
        }
    });
}

document.addEventListener('DOMContentLoaded', initDeck);
