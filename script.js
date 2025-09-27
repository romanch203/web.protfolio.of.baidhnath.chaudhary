// script.js - Theme, language, and Nepali time/date logic

// Theme toggle
const themeBtn = document.getElementById('theme-toggle-btn');
const root = document.documentElement;
function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}
function getPreferredTheme() {
    return localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
}
function toggleTheme() {
    const current = root.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
}
themeBtn.addEventListener('click', toggleTheme);
setTheme(getPreferredTheme());

// Language switch
const langBtns = document.querySelectorAll('.lang-btn');
let currentLang = 'en';
function setLang(lang) {
    currentLang = lang;
    langBtns.forEach(btn => btn.classList.remove('active'));
    document.getElementById(lang === 'np' ? 'lang-nepali' : 'lang-english').classList.add('active');
    // TODO: Add translation logic for content
}
document.getElementById('lang-nepali').addEventListener('click', () => setLang('np'));
document.getElementById('lang-english').addEventListener('click', () => setLang('en'));
setLang('en');

// Nepali time/date
function updateNepalTime() {
    const now = new Date();
    // Nepal is UTC+5:45
    const nepalOffset = 5.75 * 60;
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const nepalTime = new Date(utc + (nepalOffset * 60000));
    const dateStr = nepalTime.toLocaleDateString(currentLang === 'np' ? 'ne-NP' : 'en-GB', { year: 'numeric', month: 'long', day: 'numeric' });
    const timeStr = nepalTime.toLocaleTimeString(currentLang === 'np' ? 'ne-NP' : 'en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    document.getElementById('date').textContent = dateStr;
    document.getElementById('time').textContent = timeStr;
}
setInterval(updateNepalTime, 1000);
updateNepalTime();
