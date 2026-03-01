const fs = require('fs');

const files = [
    '/Users/mac/Project Website/Real/I-Am-Is-System-Oriented-Full-Stack-Builder-dnb/src/lib/project-data.ts',
    '/Users/mac/Project Website/Real/I-Am-Is-System-Oriented-Full-Stack-Builder-dnb/src/messages/id.json',
    '/Users/mac/Project Website/Real/I-Am-Is-System-Oriented-Full-Stack-Builder-dnb/src/messages/en.json'
];

const target = 'marketplace-voltase-dashboard';

files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const lines = content.split('\n');
    lines.forEach((line, i) => {
        if (line.includes('marketplace')) {
            console.log(`\nFile: ${file}, Line: ${i + 1}`);
            console.log(`Content: ${line}`);
            for (let char of line) {
                const code = char.charCodeAt(0);
                if (code > 127 || code < 32 && code !== 9) {
                    console.log(`Special char found: ${char} (code: ${code})`);
                }
            }
        }
    });
});
