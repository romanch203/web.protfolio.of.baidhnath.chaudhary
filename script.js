// script.js - Theme, language, and Nepali time/date logic

// Theme toggle
// Theme logic removed

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
    let hours = nepalTime.getHours();
    const minutes = nepalTime.getMinutes().toString().padStart(2, '0');
    const seconds = nepalTime.getSeconds().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const timeStr = `${hours.toString().padStart(2, '0')}:${minutes}:${seconds} ${ampm}`;
    document.getElementById('date').textContent = dateStr;
    document.getElementById('time').textContent = timeStr;
}
setInterval(updateNepalTime, 1000);
updateNepalTime();

// Force fresh ZIP download (mobile browsers often cache same-named files)
const visitingZipLink = document.querySelector('a[href$="digital-visiting-card.zip"]');
if (visitingZipLink) {
    visitingZipLink.addEventListener('click', async (e) => {
        e.preventDefault();

        const rawHref = visitingZipLink.getAttribute('href') || 'digital-visiting-card.zip';
        const url = new URL(rawHref, window.location.href);
        url.searchParams.set('v', Date.now().toString());

        try {
            const response = await fetch(url.toString(), { cache: 'no-store' });
            if (!response.ok) throw new Error(`HTTP ${response.status}`);

            const blob = await response.blob();
            const blobUrl = URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = blobUrl;
            const desiredName = (visitingZipLink.getAttribute('download') || '').trim();
            a.download = desiredName || 'digital-visiting-card.zip';
            document.body.appendChild(a);
            a.click();
            a.remove();

            setTimeout(() => URL.revokeObjectURL(blobUrl), 1500);
        } catch (err) {
            // Fallback to normal navigation download
            window.location.href = url.toString();
        }
    });
}
