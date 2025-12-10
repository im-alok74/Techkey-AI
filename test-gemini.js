// check-models.js
const https = require('https');
require('dotenv').config();

const apiKey = process.env.GEMINI_API_KEY;
const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

console.log("Checking available models...");

https.get(url, (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    const response = JSON.parse(data);
    if (response.error) {
        console.error("API Error:", response.error.message);
    } else {
        console.log("\n--- AVAILABLE MODELS FOR YOUR KEY ---");
        // Filter for "generateContent" supported models
        const available = response.models
            .filter(m => m.supportedGenerationMethods.includes("generateContent"))
            .map(m => m.name.replace("models/", ""));
            
        console.log(available.join("\n"));
    }
  });
}).on('error', (e) => {
  console.error("Connection error:", e);
});