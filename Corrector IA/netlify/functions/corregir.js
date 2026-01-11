exports.handler = async function(event, context) {
    if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Solo POST' };
    
    try {
        const apiKey = process.env.GEMINI_API_KEY;
        const userText = JSON.parse(event.body).text;

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: 
                    "Actúa como experto en Atención al Cliente. Reescribe el siguiente texto para que sea amable, simple y fácil de entender. Sin palabras raras. Solo dame el texto corregido.\n\nTexto: " + userText 
                }] }]
            })
        });

        const data = await response.json();
        return { statusCode: 200, body: JSON.stringify({ reply: data.candidates[0].content.parts[0].text }) };
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ error: "Error en el servidor" }) };
    }
};