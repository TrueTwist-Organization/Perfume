const fs = require('fs');

const files = [
    'candles.html', 'careers.html', 'contact.html', 'discovery-kit.html', 
    'faq.html', 'gift-sets.html', 'ingredients.html', 'returns.html', 
    'shipping-policy.html', 'sustainability.html'
];

for (const file of files) {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf-8');
        
        // Check if the responsive styles are already there
        if (!content.includes('@media (max-width: 768px)')) {
            const responsiveCSS = `
        @media (max-width: 768px) {
            .page-header {
                padding: 120px 0 40px;
            }
            .content-section {
                padding: 40px 0;
            }
            .info-card {
                padding: 30px 20px;
                border-radius: 20px;
            }
            .info-title {
                font-size: 24px;
            }
            .info-text {
                font-size: 16px;
            }
        }
    </style>`;
            content = content.replace(/<\/style>/, responsiveCSS);
            fs.writeFileSync(file, content);
            console.log(`Added responsive CSS to ${file}`);
        }
    }
}
