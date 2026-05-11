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

        const data = await res.json();

        // If OpenAI quota issue
        if (data.error) {
            console.log(data);

            // smart fallback prompts
            const fallbackPrompts = [
                {
                    category: "AI",
                    text: `Explain ${input} in simple words`
                },
                {
                    category: "AI",
                    text: `Give me 5 examples of ${input}`
                },
                {
                    category: "AI",
                    text: `Create a step-by-step guide for ${input}`
                },
                {
                    category: "AI",
                    text: `Generate advanced prompts about ${input}`
                },
                {
                    category: "AI",
                    text: `Teach me ${input} like I am a beginner`
                }
            ];

            displayPrompts(fallbackPrompts);

            alert("AI quota finished — using smart mode");
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
        alert("AI failed");
    }
}
