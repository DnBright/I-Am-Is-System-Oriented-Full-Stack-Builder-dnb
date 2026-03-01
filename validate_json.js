const fs = require('fs');
const path = require('path');

const files = [
    path.join(__dirname, 'src/messages/id.json'),
    path.join(__dirname, 'src/messages/en.json')
];

files.forEach(file => {
    try {
        const content = fs.readFileSync(file, 'utf8');
        JSON.parse(content);
        console.log(`PASS: ${file}`);
    } catch (e) {
        console.error(`FAIL: ${file}`);
        console.error(e.message);

        // Try to find the line number of the error
        const content = fs.readFileSync(file, 'utf8');
        const pos = e.message.match(/at position (\d+)/);
        if (pos) {
            const index = parseInt(pos[1]);
            const lines = content.substring(0, index).split('\n');
            console.error(`Error around line ${lines.length}`);
            const start = Math.max(0, index - 50);
            const end = Math.min(content.length, index + 50);
            console.error(content.substring(start, end));
            console.error(' '.repeat(index - start) + '^');
        }
    }
});
