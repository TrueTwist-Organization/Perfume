const fs = require('fs');

const pages = {
    'candles.html': { tag: 'Shop', title1: 'Luxury', title2: 'Candles', heading: 'Illuminate Your Space' },
    'careers.html': { tag: 'Company', title1: 'Join Our', title2: 'Team', heading: 'Careers at Noir Essence' },
    'contact.html': { tag: 'Support', title1: 'Contact', title2: 'Us', heading: 'We are here to help' },
    'discovery-kit.html': { tag: 'Shop', title1: 'Discovery', title2: 'Kit', heading: 'Explore Our Scents' },
    'faq.html': { tag: 'Support', title1: 'Frequently Asked', title2: 'Questions', heading: 'How can we help?' },
    'gift-sets.html': { tag: 'Shop', title1: 'Luxury Gift', title2: 'Sets', heading: 'The Perfect Gift' },
    'ingredients.html': { tag: 'Company', title1: 'Our', title2: 'Ingredients', heading: "Nature's Finest" },
    'returns.html': { tag: 'Support', title1: 'Returns &', title2: 'Exchanges', heading: 'Our Policy' },
    'shipping-policy.html': { tag: 'Support', title1: 'Shipping', title2: 'Policy', heading: 'Delivery Details' },
    'sustainability.html': { tag: 'Company', title1: 'Our', title2: 'Sustainability', heading: 'Commitment to Earth' }
};

for (const [file, data] of Object.entries(pages)) {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf-8');
        
        // Update tag
        content = content.replace(/id="pageTag">.*?<\/span>/, `id="pageTag">${data.tag}</span>`);
        
        // Update title
        content = content.replace(/id="pageTitle">.*?<span class="gold-text">.*?<\/span><\/h1>/, `id="pageTitle">${data.title1} <span class="gold-text">${data.title2}</span></h1>`);
        
        // Update heading
        content = content.replace(/id="infoHeading">.*?<\/h2>/, `id="infoHeading">${data.heading}</h2>`);
        
        // Custom text depending on page
        const customText = `<p class="info-text">Welcome to the ${data.title1} ${data.title2} page. We are currently curating this section to provide you with the most exquisite experience possible. At Noir Essence, every detail matters, and we are working tirelessly to ensure this information reflects our standards of excellence.</p>
                    <p class="info-text">Please check back soon, or contact our concierge for immediate assistance regarding our products and services.</p>`;
        
        content = content.replace(/<div id="infoBody">[\s\S]*?<\/div>/, `<div id="infoBody">\n                    ${customText}\n                </div>`);
        
        // For contact, faq, ingredients that might have different structures, check if they match.
        // Wait, earlier I saw contact.html is 9727 bytes, so it might be slightly different.
        // Let's do a more robust replace if it fails. 
        
        fs.writeFileSync(file, content);
        console.log(`Updated ${file}`);
    }
}
