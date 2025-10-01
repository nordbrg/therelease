const originalReleaseDate = new Date('2025-06-30');
const today = new Date();
const diffTime = Math.abs(today - originalReleaseDate);
const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

const label = document.getElementById('releaseLabel');
const formattedDate = today.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
label.innerHTML = `</span><br><br>Number of wdays passed without release<br><span class="days-number">${diffDays}</span><br>Re-planned release date: <span class="release-date"><br>${formattedDate}`;

const infoMessages = [
    "Still waiting for the release...",
    "Any day now...",
    "The wait continues...",
    "Refresh for more waiting",
    "Patience is a virtue",
    "Release date: Soon™",
    "Coming when it's ready",
    "The show must go on... eventually",
    "Grab a coffee, this might take a while",
    "Maybe tomorrow?",
    "Progress: Still in development",
    "Random fact: We're still waiting"
];

const infoLine = document.getElementById('infoLine');
let lastMessage = '';

function updateInfoLine() {
    let randomMessage;
    do {
        randomMessage = infoMessages[Math.floor(Math.random() * infoMessages.length)];
    } while (randomMessage === lastMessage && infoMessages.length > 1);

    lastMessage = randomMessage;
    const textElement = document.createElement('span');
    textElement.className = 'info-line-text';
    textElement.textContent = randomMessage;
    infoLine.innerHTML = '';
    infoLine.appendChild(textElement);

    textElement.addEventListener('animationend', () => {
        setTimeout(updateInfoLine, 3000);
    }, { once: true });
}

fetch('hu.json')
    .then(response => response.json())
    .then(namedays => {
        const todayKey = `0000-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
        const todayNames = namedays[todayKey];

        if (todayNames && todayNames.length > 0) {
            const namesList = todayNames.join(', ');
            infoMessages.push(`Today's ${namesList} name day in Hungary - maybe today's the day.`);
        }

        updateInfoLine();
    })
    .catch(error => console.error('Error loading name days:', error));


