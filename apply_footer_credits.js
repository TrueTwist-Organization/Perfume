const fs = require('fs');
const path = require('path');

const directoryPath = 'd:\\NWORKS\\site\\PNF';
const files = fs.readdirSync(directoryPath);

const updatedFooterContent = `
            <div class="footer-bottom">
                <p>&copy; 2026 Noir Essence™. All rights reserved.</p>
                <p>Handcrafted with ♦ in India</p>
                <p>Design by <a href="https://truetwist.in" target="_blank" style="color: var(--gold); text-decoration: none; transition: color 0.3s;">truetwist.in</a> &nbsp;•&nbsp; Marketing by <a href="https://369network.com/" target="_blank" style="color: var(--gold); text-decoration: none; transition: color 0.3s;">369network.com</a></p>
            </div>`;

files.forEach(file => {
    if (file.endsWith('.html')) {
        const filePath = path.join(directoryPath, file);
        let content = fs.readFileSync(filePath, 'utf8');

        // Regex to find the footer-bottom div and its content
        const footerRegex = /<div class="footer-bottom">[\s\S]*?<\/div>/;
        
        if (footerRegex.test(content)) {
            const newContent = content.replace(footerRegex, updatedFooterContent);
            fs.writeFileSync(filePath, newContent, 'utf8');
            console.log(`Updated footer in: ${file}`);
        } else {
            console.log(`Footer bottom not found in: ${file}`);
        }
    }
});
