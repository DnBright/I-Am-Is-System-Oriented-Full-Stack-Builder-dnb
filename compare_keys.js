const fs = require('fs');

function getKeys(obj, prefix = '') {
    let keys = [];
    for (let key in obj) {
        if (typeof obj[key] === 'object' && !Array.isArray(obj[key]) && obj[key] !== null) {
            keys = keys.concat(getKeys(obj[key], prefix + key + '.'));
        } else {
            keys.push(prefix + key);
        }
    }
    return keys;
}

const id = JSON.parse(fs.readFileSync('/Users/mac/Project Website/Real/I-Am-Is-System-Oriented-Full-Stack-Builder-dnb/src/messages/id.json', 'utf8'));
const en = JSON.parse(fs.readFileSync('/Users/mac/Project Website/Real/I-Am-Is-System-Oriented-Full-Stack-Builder-dnb/src/messages/en.json', 'utf8'));

const idKeys = getKeys(id);
const enKeys = getKeys(en);

console.log('Keys in ID but not in EN:');
console.log(idKeys.filter(k => !enKeys.includes(k)));

console.log('\nKeys in EN but not in ID:');
console.log(enKeys.filter(k => !idKeys.includes(k)));
