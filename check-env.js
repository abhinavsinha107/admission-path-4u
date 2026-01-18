const fs = require('fs');
const path = require('path');

const envPath = path.join(process.cwd(), '.env');
try {
    const content = fs.readFileSync(envPath, 'utf8');

    console.log("--- .env content analysis ---");
    const lines = content.split('\n');
    lines.forEach(line => {
        if (line.startsWith('CLOUDINARY')) {
            const parts = line.split('=');
            if (parts.length >= 2) {
                const key = parts[0];
                const value = parts.slice(1).join('=');
                console.log(`Key: ${key}`);
                console.log(`Value length: ${value.length}`);
                console.log(`Value trimmed length: ${value.trim().length}`);
                console.log(`Has trailing/leading whitespace? ${value.length !== value.trim().length}`);
                console.log(`First char code: ${value.charCodeAt(0)}`);
                console.log(`Last char code: ${value.charCodeAt(value.length - 1)}`);
            }
        }
    });

} catch (e) {
    console.error("Error reading .env:", e);
}
