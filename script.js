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

async function generateAI() {
    const input = document.getElementById("searchBar").value;

    if (!input) {
        alert("Type something first!");
        return;
    }

    try {
        const res = await fetch("/api/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ input })
        });

        if (!res.ok) {
            alert("AI not working (server issue)");
            return;
        }

        const data = await res.json();

        if (!data.choices) {
            alert("AI response invalid");
            return;
        }

        const text = data.choices[0].message.content;

        const aiPrompts = text
            .split("\n")
            .filter(t => t.trim())
            .map(t => ({
                category: "AI",
                text: t
            }));

        displayPrompts(aiPrompts);

    } catch (err) {
        console.error(err);
        alert("AI failed, showing normal prompts");

        // fallback (IMPORTANT)
        displayPrompts(prompts);
    }
}
