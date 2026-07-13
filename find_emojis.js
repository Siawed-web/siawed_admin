const fs = require('fs');
const path = require('path');

function searchFiles(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (fullPath.includes('node_modules') || fullPath.includes('.next')) continue;
            searchFiles(fullPath);
        } else if (fullPath.match(/\.(js|jsx|ts|tsx)$/)) {
            const content = fs.readFileSync(fullPath, 'utf8');
            const lines = content.split('\n');
            for (let i = 0; i < lines.length; i++) {
                const line = lines[i];
                // check for non-ascii chars that might be emojis, usually char code > 8000
                // surrogate pairs are > 0xD800
                if (/[\uD800-\uDBFF][\uDC00-\uDFFF]/.test(line)) {
                    console.log(`${fullPath}:${i + 1}: ${line.trim()}`);
                }
            }
        }
    }
}
searchFiles('src');
