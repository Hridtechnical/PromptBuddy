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

        // fallback mode if AI quota finished
        if (data.error) {

            let fallbackPrompts = [];
            const topic = input.toLowerCase();

            if (topic.includes("math")) {
                fallbackPrompts = [
                    { category: "Education", text: "Create a 7-day study plan for my math exam" },
                    { category: "Education", text: "Explain difficult math concepts using simple examples" },
                    { category: "Education", text: "Generate 10 important math questions for practice" },
                    { category: "Education", text: "Teach me algebra step-by-step" },
                    { category: "Education", text: "Give shortcuts for solving math problems faster" }
                ];
            }

            else if (topic.includes("study") || topic.includes("exam")) {
                fallbackPrompts = [
                    { category: "Education", text: "Create a perfect study timetable for exams" },
                    { category: "Education", text: "Help me revise quickly before exams" },
                    { category: "Education", text: "Teach this chapter like a fun teacher" },
                    { category: "Education", text: "Generate important exam questions" },
                    { category: "Education", text: "Help me remember concepts faster" }
                ];
            }

            else if (topic.includes("coding") || topic.includes("python")) {
                fallbackPrompts = [
                    { category: "Coding", text: "Teach me Python from beginner to advanced" },
                    { category: "Coding", text: "Give me beginner coding projects" },
                    { category: "Coding", text: "Explain coding mistakes and fixes" },
                    { category: "Coding", text: "Generate coding interview questions" },
                    { category: "Coding", text: "Build a beginner-friendly coding roadmap" }
                ];
            }

            else if (topic.includes("business") || topic.includes("startup")) {
                fallbackPrompts = [
                    { category: "Business", text: "Generate startup ideas for teenagers" },
                    { category: "Business", text: "Create a business plan for my idea" },
                    { category: "Business", text: "How can I earn money online?" },
                    { category: "Business", text: "Suggest profitable AI business ideas" },
                    { category: "Business", text: "Help me market my startup" }
                ];
            }

            else {
                fallbackPrompts = [
                    { category: "AI", text: `Teach me ${input} like a beginner` },
                    { category: "AI", text: `Create a roadmap to learn ${input}` },
                    { category: "AI", text: `Explain ${input} in simple words` },
                    { category: "AI", text: `Give real-life examples of ${input}` },
                    { category: "AI", text: `Generate advanced prompts about ${input}` }
                ];
            }

            displayPrompts(fallbackPrompts);
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

        // fallback mode if AI quota finished
        if (data.error) {

            let fallbackPrompts = [];
            const topic = input.toLowerCase();

            if (topic.includes("math")) {
                fallbackPrompts = [
                    { category: "Education", text: "Create a 7-day study plan for my math exam" },
                    { category: "Education", text: "Explain difficult math concepts using simple examples" },
                    { category: "Education", text: "Generate 10 important math questions for practice" },
                    { category: "Education", text: "Teach me algebra step-by-step" },
                    { category: "Education", text: "Give shortcuts for solving math problems faster" }
                ];
            }

            else if (topic.includes("study") || topic.includes("exam")) {
                fallbackPrompts = [
                    { category: "Education", text: "Create a perfect study timetable for exams" },
                    { category: "Education", text: "Help me revise quickly before exams" },
                    { category: "Education", text: "Teach this chapter like a fun teacher" },
                    { category: "Education", text: "Generate important exam questions" },
                    { category: "Education", text: "Help me remember concepts faster" }
                ];
            }

            else if (topic.includes("coding") || topic.includes("python")) {
                fallbackPrompts = [
                    { category: "Coding", text: "Teach me Python from beginner to advanced" },
                    { category: "Coding", text: "Give me beginner coding projects" },
                    { category: "Coding", text: "Explain coding mistakes and fixes" },
                    { category: "Coding", text: "Generate coding interview questions" },
                    { category: "Coding", text: "Build a beginner-friendly coding roadmap" }
                ];
            }

            else if (topic.includes("business") || topic.includes("startup")) {
                fallbackPrompts = [
                    { category: "Business", text: "Generate startup ideas for teenagers" },
                    { category: "Business", text: "Create a business plan for my idea" },
                    { category: "Business", text: "How can I earn money online?" },
                    { category: "Business", text: "Suggest profitable AI business ideas" },
                    { category: "Business", text: "Help me market my startup" }
                ];
            }

            else {
                fallbackPrompts = [
                    { category: "AI", text: `Teach me ${input} like a beginner` },
                    { category: "AI", text: `Create a roadmap to learn ${input}` },
                    { category: "AI", text: `Explain ${input} in simple words` },
                    { category: "AI", text: `Give real-life examples of ${input}` },
                    { category: "AI", text: `Generate advanced prompts about ${input}` }
                ];
            }

            displayPrompts(fallbackPrompts);
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
