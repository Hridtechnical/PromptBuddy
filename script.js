function generateAI() {
    alert("AI clicked"); // add this

function displayPrompts(prompts) {
    const container = document.getElementById('promptContainer');
    container.innerHTML = '';

    prompts.forEach(p => {
        const card = document.createElement('div');
        card.classList.add('prompt-card');

        card.innerHTML = `
            <h4>${p.category}</h4>
            <p>${p.text}</p>
            <button class="copy-btn" onclick="copyPrompt('${p.text.replace(/'/g, "\\'")}')">Copy</button>
        `;

        container.appendChild(card);
    });
}

function copyPrompt(text) {
    navigator.clipboard.writeText(text);
    alert('Prompt copied!');
}

function filterCategory(category) {
    if (category === 'All') {
        displayPrompts(prompts);
    } else {
        displayPrompts(prompts.filter(p => p.category === category));
    }
}

document.getElementById('searchBar').addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();

    const filtered = prompts.filter(p => {
        const combined = (p.text + " " + p.category).toLowerCase();
        return combined.includes(searchTerm);
    });

    displayPrompts(filtered);
});

displayPrompts(prompts);
