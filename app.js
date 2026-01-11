const fixBtn = document.getElementById('fixBtn');
const outputText = document.getElementById('outputText');

fixBtn.addEventListener('click', async () => {
    const text = document.getElementById('inputText').value;
    if (!text) return alert("Escribe algo primero");

    fixBtn.disabled = true;
    fixBtn.innerText = "Pensando...";
    outputText.innerText = "";

    try {
        const response = await fetch('/.netlify/functions/corregir', {
            method: 'POST',
            body: JSON.stringify({ text })
        });
        const data = await response.json();
        outputText.innerText = data.reply || "Error: " + data.error;
    } catch (e) {
        outputText.innerText = "Error de conexión.";
    }

    fixBtn.disabled = false;
    fixBtn.innerHTML = '<span class="material-icons">auto_fix_high</span> Corregir';
});

document.getElementById('copyBtn').addEventListener('click', () => {
    navigator.clipboard.writeText(outputText.innerText);
    alert("Copiado");
});