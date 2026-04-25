/* ========================================
   NOIR ESSENCE™ — Luxury Perfume JavaScript
   Interactive 3D, Animations & Premium UX
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

    // CURSOR GLOW REMOVED
    /*
    const cursorGlow = document.getElementById('cursorGlow');
    ...
    */

    // GOLD PARTICLES REMOVED

    // BOKEH EFFECT REMOVED

    // ════════════════════════════════
    // NAVBAR SCROLL
    // ════════════════════════════════
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        // Navbar background
        navbar.classList.toggle('scrolled', window.scrollY > 60);

        // Active nav link
        let current = '';
        sections.forEach(section => {
            const top = section.offsetTop - 120;
            if (window.scrollY >= top) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }, { passive: true });

    // ════════════════════════════════
    // HAMBURGER MENU
    // ════════════════════════════════
    const hamburger = document.getElementById('hamburger');
    const navLinksContainer = document.getElementById('navLinks');

    if (hamburger && navLinksContainer) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinksContainer.classList.toggle('active');
            document.body.style.overflow = navLinksContainer.classList.contains('active') ? 'hidden' : '';
        });

        navLinksContainer.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinksContainer.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // 3D BOTTLE TILT removed as requested

    // COLLECTION CARDS 3D TILT removed

    // NOTE CARDS HOVER EFFECT removed

    // ════════════════════════════════
    // ADD TO CART / BAG
    // ════════════════════════════════
    window.addToCart = function (productName) {
        showToast(`${productName} added to your bag! 🛍️`);
    };

    // ════════════════════════════════
    // TOAST NOTIFICATIONS
    // ════════════════════════════════
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');

    function showToast(message) {
        if (toast && toastMessage) {
            toastMessage.textContent = message;
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 3000);
        }
    }
    window.showToast = showToast;

    // ════════════════════════════════
    // CTA FORM
    // ════════════════════════════════
    const ctaForm = document.getElementById('ctaForm');
    if (ctaForm) {
        ctaForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = ctaForm.querySelector('.cta-input');
            if (input && input.value) {
                showToast('Welcome to the Inner Circle! 💌');
                input.value = '';
            }
        });
    }

    // ════════════════════════════════
    // SCROLL ANIMATIONS (AOS-like)
    // ════════════════════════════════
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-aos-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('aos-animate');
                }, parseInt(delay));
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));

    // ════════════════════════════════
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ════════════════════════════════
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ════════════════════════════════
    // COUNTER ANIMATION (Hero Stats)
    // ════════════════════════════════
    let statsCounted = false;

    function animateCounters() {
        if (statsCounted) return;

        const statValues = document.querySelectorAll('.hero-stat-value');
        if (!statValues.length) return;

        const heroStats = document.querySelector('.hero-stats');
        if (!heroStats) return;

        const rect = heroStats.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            statsCounted = true;
            // The values have text like "50+", "12", "25K+", so we leave them as-is
            // Instead, add a subtle scale animation
            statValues.forEach((el, i) => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    el.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, i * 150);
            });
        }
    }

    window.addEventListener('scroll', animateCounters, { passive: true });
    animateCounters();

    // PARALLAX SUBTLE EFFECT removed



    // ════════════════════════════════
    // HERO PERFUME CYCLING (CAROUSEL)
    // ════════════════════════════════
    const heroPerfumes = [
        {
            name: "Velvet OUD",
            title: '<span class="line">Experience</span><span class="line"><span class="gold-text italic">Pure</span></span><span class="line">Luxury</span>',
            desc: "A rich, intoxicating blend of rare oud, warm amber, and smoky incense. Deep, resonant, and utterly captivating.",
            shape: "shape-square",
            body: "linear-gradient(135deg, #fffdfa, #fdfaf5)",
            liquid: "linear-gradient(180deg, rgba(210, 200, 184, 0.1), rgba(184, 172, 153, 0.15))",
            cap: "var(--cap-gradient, repeating-linear-gradient(90deg, #b8ac99 0px, #d2c8b8 2px, #e6dfd5 4px, #d2c8b8 6px, #b8ac99 8px))",
            mistColor: "rgba(210,200,184,0.06)",
            image: "velvet-oud-p.png",
            videoBg: "velvet-oud-bg.mp4"
        },
        {
            name: "Midnight ROSÉ",
            title: '<span class="line">Seduce the</span><span class="line"><span class="rose-text italic">Midnight</span></span><span class="line">Hour</span>',
            desc: "A dark, seductive velvet rose that blooms only under the moonlight. Mysterious, floral, and deeply unforgettable.",
            shape: "shape-slender",
            body: "linear-gradient(135deg, #fffdfa, #fdfaf5)",
            liquid: "linear-gradient(180deg, rgba(238, 226, 228, 0.12), rgba(214, 196, 200, 0.15))",
            cap: "repeating-linear-gradient(90deg, #d6c4c8 0px, #eee2e4 2px, #f5edef 4px, #eee2e4 6px, #d6c4c8 8px)",
            mistColor: "rgba(238, 226, 228, 0.06)",
            image: "midnight-rose-p.png",
            videoBg: "midnight-rose-bg.mp4"
        },
        {
            name: "Royal SANTAL",
            title: '<span class="line">Modern</span><span class="line"><span class="gold-text italic">Royalty</span></span><span class="line">Redefined</span>',
            desc: "Sacred Mysore sandalwood meets crisp Himalayan cedar. A regal, creamy woody symphony for the discerning soul.",
            shape: "shape-square",
            body: "linear-gradient(135deg, #fffdfa, #fdfaf5)",
            liquid: "linear-gradient(180deg, rgba(210, 200, 184, 0.12), rgba(184, 172, 153, 0.15))",
            cap: "var(--cap-gradient, repeating-linear-gradient(90deg, #b8ac99 0px, #d2c8b8 2px, #e6dfd5 4px, #d2c8b8 6px, #b8ac99 8px))",
            mistColor: "rgba(210,200,184,0.06)",
            image: "royal-santal-p.png",
            videoBg: "royal-santal-bg.mp4"
        },
        {
            name: "Ocean BREEZE",
            title: '<span class="line">Essence of</span><span class="line"><span style="color:#b0c8e0" class="italic">Sapphire</span></span><span class="line">Oceans</span>',
            desc: "Crisp Mediterranean sea salt and frozen lime. A breath of ozonic freshness that transports you to the sapphire coast.",
            shape: "shape-slender",
            body: "linear-gradient(135deg, #fffdfa, #fdfaf5)",
            liquid: "linear-gradient(180deg, rgba(176, 200, 224, 0.12), rgba(160, 184, 210, 0.15))",
            cap: "repeating-linear-gradient(90deg, #9bb8d4 0px, #b0c8e0 2px, #d4e3f2 4px, #b0c8e0 6px, #9bb8d4 8px)",
            mistColor: "rgba(176, 200, 224, 0.06)",
            image: "ocean-breeze-p.png",
            videoBg: "ocean-breeze-bg.mp4"
        },
        {
            name: "Mystic AMBER",
            title: '<span class="line">Ancient</span><span class="line"><span style="color:#d4c8af" class="italic">Mysteries</span></span><span class="line">Unveiled</span>',
            desc: "Warm frankincense and golden amber notes. A spiritual journey through the sacred temples of the East.",
            shape: "shape-square",
            body: "linear-gradient(135deg, #fffdfa, #fdfaf5)",
            liquid: "linear-gradient(180deg, rgba(212, 200, 175, 0.12), rgba(191, 160, 122, 0.15))",
            cap: "repeating-linear-gradient(90deg, #b8a27d 0px, #d4c8af 2px, #e8dfd0 4px, #d4c8af 6px, #b8a27d 8px)",
            mistColor: "rgba(212, 200, 175, 0.06)",
            image: "mystic-amber-p.png",
            videoBg: "mystic-amber-bg.mp4"
        },
        {
            name: "Luna NOIRE",
            title: '<span class="line">Under the</span><span class="line"><span style="color:#a496b8" class="italic">Celestial</span></span><span class="line">Glow</span>',
            desc: "Enchanting lavender and white musk. A serene, ethereal fragrance that captures the essence of midnight starlight.",
            shape: "shape-round",
            body: "linear-gradient(135deg, #f6f4f8, #eeeaf3)",
            liquid: "linear-gradient(180deg, rgba(164, 150, 184, 0.2), rgba(122, 106, 138, 0.4))",
            cap: "repeating-linear-gradient(90deg, #7a6a8a 0px, #a496b8 2px, #c4b6d8 4px, #a496b8 6px, #7a6a8a 8px)",
            mistColor: "rgba(164, 150, 184, 0.12)",
            image: "luna-noire-p.png",
            videoBg: "luna-noire-bg.mp4"
        }
    ];

    let currentPerfumeIdx = 0;
    let hero3DVisible = false;
    const heroTitleEl = document.getElementById('heroTitle');
    const heroDescEl = document.getElementById('heroDesc');
    // Already declared above: const bottle3D = document.getElementById('bottle3D');
    // Already declared above: const bottleScene = document.getElementById('bottleScene');
    const heroPerfumeEl = document.getElementById('heroPerfume');
    const heroCapEl = document.getElementById('heroCap');
    const heroBodyEl = document.getElementById('heroBody');
    const heroLiquidEl = document.getElementById('heroLiquid');
    const heroLabelNameEl = document.getElementById('heroLabelName');
    const sprayMistEl = document.getElementById('sprayMist');
    const heroImageContainer = document.getElementById('heroImageContainer');
    const heroProductImage = document.getElementById('heroProductImage');
    const heroCapPng = document.getElementById('heroCapPng');



    async function cyclePerfume() {
        if (!heroPerfumeEl) return;


        // 3. Fade out
        const heroBgVideo = document.getElementById('heroBgVideo');
        const targetVisual = hero3DVisible ? heroPerfumeEl : heroImageContainer;
        const elsToAnimate = [heroTitleEl, heroDescEl, targetVisual, heroBgVideo];
        elsToAnimate.forEach(el => {
            if (el) {
                el.style.opacity = '0';
                if (el !== heroBgVideo) {
                    el.style.transform = (el === targetVisual) ? 'scale(0.95) translateY(10px)' : 'translateY(10px)';
                }
                el.style.transition = 'all 0.6s var(--ease-smooth)';
            }
        });

        await new Promise(r => setTimeout(r, 600));

        // 4. Change content
        currentPerfumeIdx = (currentPerfumeIdx + 1) % heroPerfumes.length;
        const nextP = heroPerfumes[currentPerfumeIdx];

        if (heroBgVideo && nextP.videoBg) {
            heroBgVideo.src = nextP.videoBg;
            heroBgVideo.load();
            heroBgVideo.play();
        }

        if (heroTitleEl) heroTitleEl.innerHTML = nextP.title;
        if (heroDescEl) heroDescEl.textContent = nextP.desc;
        if (heroLabelNameEl) heroLabelNameEl.textContent = nextP.name;

        // Toggle between 3D bottle and Real Image
        if (nextP.image) {
            hero3DVisible = false;
            if (heroPerfumeEl) heroPerfumeEl.style.display = 'none';
            if (heroImageContainer) {
                heroImageContainer.style.display = 'flex';
                if (heroProductImage) heroProductImage.src = nextP.image;
            }
        } else {
            hero3DVisible = true;
            if (heroImageContainer) heroImageContainer.style.display = 'none';
            if (heroPerfumeEl) {
                heroPerfumeEl.style.display = 'flex';
                heroPerfumeEl.className = `perfume-bottle ${nextP.shape}`;
            }
            if (heroBodyEl) heroBodyEl.style.background = nextP.body;
            if (heroLiquidEl) heroLiquidEl.style.background = nextP.liquid;
            if (heroCapEl) {
                heroCapEl.style.background = nextP.cap;
            }
        }


        // Mood background shapes removed for clean theme

        // Update floating particles (b-float) for color harmony
        const floats = document.querySelectorAll('.b-float');
        if (nextP.mistColor) {
            floats.forEach((f, i) => {
                f.style.background = `linear-gradient(135deg, ${nextP.mistColor}, transparent)`;
            });
        }

        // 5. Fade in
        const newTargetVisual = hero3DVisible ? heroPerfumeEl : heroImageContainer;
        const newElsToAnimate = [heroTitleEl, heroDescEl, newTargetVisual, heroBgVideo];
        newElsToAnimate.forEach(el => {
            if (el) {
                el.style.opacity = (el === heroBgVideo) ? '0.85' : '1';
                if (el !== heroBgVideo) {
                    el.style.transform = (el === newTargetVisual) ? 'scale(1) translateY(0)' : 'translateY(0)';
                }
            }
        });

        // ── Pause 3 seconds so the bottle is fully visible before next change ──
        await new Promise(r => setTimeout(r, 3000));
    }

    if (heroPerfumeEl) {
        // Start the carousel: initial delay of 2s, then each cycle
        // includes its own 3-second rest after fade-in before looping.
        async function startCarousel() {
            await new Promise(r => setTimeout(r, 2000));
            while (true) {
                await cyclePerfume();
            }
        }
        startCarousel();
    }

    // ════════════════════════════════
    // ADVANCED CART & DRAWER SYSTEM
    // ════════════════════════════════
    let cart = JSON.parse(localStorage.getItem('noir_cart')) || [];

    window.addToCart = function (productName) {
        let price = "5,999";
        const allCards = document.querySelectorAll('.collection-card');
        allCards.forEach(card => {
            if (card.querySelector('.card-name')?.textContent.includes(productName)) {
                const pEl = card.querySelector('.card-price');
                if (pEl) {
                    price = pEl.innerText.split('₹')[1].split(' ')[0].trim();
                }
            }
        });

        const item = { id: Date.now(), name: productName, price: price, icon: '✨' };
        cart.push(item);
        localStorage.setItem('noir_cart', JSON.stringify(cart));
        updateCartDrawer();
        openCartDrawer();
        if (typeof showToast === 'function') showToast(`${productName} added to bag.`);
    }

    function openCartDrawer() {
        if (!document.getElementById('cartDrawer')) createCartDrawer();
        document.getElementById('drawerOverlay').classList.add('active');
        document.getElementById('cartDrawer').classList.add('active');
        updateCartDrawer();
    }

    const navCartBtn = document.getElementById('navCartBtn');
    if (navCartBtn) navCartBtn.onclick = openCartDrawer;

    function closeCartDrawer() {
        document.getElementById('drawerOverlay').classList.remove('active');
        document.getElementById('cartDrawer').classList.remove('active');
    }

    function createCartDrawer() {
        const overlay = document.createElement('div');
        overlay.className = 'drawer-overlay'; overlay.id = 'drawerOverlay';
        document.body.appendChild(overlay);

        const drawer = document.createElement('div');
        drawer.className = 'cart-drawer'; drawer.id = 'cartDrawer';
        drawer.innerHTML = `
            <div class="cart-header"><h2 class="cart-title">Your Collection</h2><button class="close-drawer" id="closeCartDrawer">&times;</button></div>
            <div class="cart-items" id="cartItemsList"></div>
            <div class="cart-footer">
                <div class="cart-total-row"><span class="cart-total-label">Subtotal</span><span class="cart-total-value" id="cartSubtotal">₹0</span></div>
                <div class="cart-actions">
                    <button class="payment-btn primary" id="proceedToCheckout">Proceed to Secure Payment</button>
                    <button class="payment-btn" id="continueExploring">Continue Exploring</button>
                </div>
            </div>
        `;
        document.body.appendChild(drawer);
        overlay.onclick = closeCartDrawer;
        document.getElementById('closeCartDrawer').onclick = closeCartDrawer;
        document.getElementById('continueExploring').onclick = closeCartDrawer;
        document.getElementById('proceedToCheckout').onclick = () => {
            closeCartDrawer();
            initiateGlobalCheckout(`Your Collection (${cart.length} items)`, 1);
        };
        updateCartDrawer();
    }

    function updateCartDrawer() {
        const list = document.getElementById('cartItemsList');
        const badge = document.getElementById('cartBadge');

        if (badge) {
            badge.textContent = cart.length;
            if (cart.length > 0) badge.classList.add('active');
            else badge.classList.remove('active');
        }

        if (!list) return;
        list.innerHTML = '';
        let total = 0;
        cart.forEach((item, index) => {
            const priceVal = parseInt(item.price.replace(/,/g, ''));
            total += priceVal;
            const div = document.createElement('div');
            div.className = 'cart-item';
            div.innerHTML = `
                <div class="cart-item-img"><span>${item.icon}</span></div>
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">₹${item.price}</div>
                    <button style="background:none;border:none;color:rgba(255,255,255,0.4);cursor:pointer;font-size:0.7rem;padding:0;margin-top:5px;" onclick="removeFromCart(${index})">Remove</button>
                </div>
            `;
            list.appendChild(div);
        });
        const subEl = document.getElementById('cartSubtotal');
        if (subEl) subEl.textContent = `₹${total.toLocaleString()}`;
    }
    updateCartDrawer();

    window.removeFromCart = function (index) {
        cart.splice(index, 1);
        localStorage.setItem('noir_cart', JSON.stringify(cart));
        updateCartDrawer();
    }

    function initiateGlobalCheckout() {
        if (!document.getElementById('checkoutOverlay')) {
            const overlay = document.createElement('div');
            overlay.className = 'checkout-overlay'; overlay.id = 'checkoutOverlay';
            document.body.appendChild(overlay);
        }
        
        const overlay = document.getElementById('checkoutOverlay');
        let totalVal = 0;
        let cartItemsHtml = '';
        
        if(cart.length === 0){
            cartItemsHtml = '<p style="color:#d2c8b8; margin:20px 0;">Your cart is empty.</p>';
        } else {
            cartItemsHtml = cart.map(item => {
                const p = parseInt(item.price.replace(/,/g, ''));
                totalVal += p;
                return `
                    <div style="display:flex; justify-content:space-between; align-items:center; padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.05); text-align:left;">
                        <div>
                            <div style="color:#fff; font-family:'Playfair Display',serif;">${item.name}</div>
                            <div style="color:var(--gold); font-size:0.8rem; font-family:'Outfit',sans-serif;">₹${item.price}</div>
                        </div>
                    </div>
                `;
            }).join('');
        }

        const subtotalHtml = cart.length > 0 ? `
            <div style="display:flex; justify-content:space-between; color:#fff; font-family:'Playfair Display',serif; font-size:1.2rem; margin: 20px 0; padding-top:10px; border-top:1px solid rgba(210,200,184,0.2);">
                <span>Total</span>
                <span style="color:var(--gold);">₹${totalVal.toLocaleString()}</span>
            </div>
        ` : '';

        overlay.innerHTML = `
            <div class="checkout-card">
                <button class="close-checkout" id="closeCheckout">&times;</button>
                
                <div class="checkout-progress">
                    <div class="progress-step active" id="stepCart"><span>1</span>Cart</div>
                    <div class="progress-line"></div>
                    <div class="progress-step" id="stepAddress"><span>2</span>Address</div>
                    <div class="progress-line"></div>
                    <div class="progress-step" id="stepPayment"><span>3</span>Payment</div>
                </div>

                <!-- Cart Review View -->
                <div class="checkout-view active" id="checkoutCartView">
                    <span class="checkout-icon">🛍️</span>
                    <h2 class="checkout-title">Review Cart</h2>
                    <div style="max-height: 200px; overflow-y: auto; margin-bottom: 10px;">
                        ${cartItemsHtml}
                    </div>
                    ${subtotalHtml}
                    ${cart.length > 0 ? `<button class="payment-btn primary" id="btnToAddress" style="margin-top: 10px;">Proceed to Address</button>` : `<button class="payment-btn primary" id="btnContinueShopping" style="margin-top: 10px;">Continue Exploring</button>`}
                </div>

                <!-- Address View -->
                <div class="checkout-view" id="checkoutAddressView">
                    <h2 class="checkout-title">Delivery Address</h2>
                    <div class="card-form">
                        <input type="text" placeholder="Full Name" class="card-input" required id="addrName">
                        <input type="tel" placeholder="Mobile Number" class="card-input" required id="addrPhone">
                        <textarea placeholder="Complete Address" class="card-input" rows="3" required id="addrText"></textarea>
                        <input type="text" placeholder="Pincode" class="card-input" required id="addrPin">
                    </div>
                    <button class="payment-btn primary" id="btnToPayment">Proceed to Payment</button>
                    <button class="link-btn" id="btnBackToCart">Back</button>
                </div>

                <!-- Main Payment Selection -->
                <div class="checkout-view" id="checkoutMainView">
                    <span class="checkout-icon">💳</span>
                    <h2 class="checkout-title">Payment Method</h2>
                    <p class="checkout-desc">Select your preferred payment method</p>
                    <div class="payment-methods">
                        <button class="payment-btn primary" id="btnUPI">⚡ Online Pay (UPI / Card)</button>
                        <button class="payment-btn" id="btnCOD">📦 Cash on Delivery</button>
                    </div>
                    <button class="link-btn" id="btnBackToAddress">Back</button>
                </div>

                <!-- Processing View -->
                <div class="checkout-view" id="processingView">
                    <div class="processing-loader"></div>
                    <h2 class="checkout-title" id="processTitle">Securely Processing...</h2>
                    <p class="checkout-desc">Please wait a moment</p>
                </div>

                <!-- Success View -->
                <div class="checkout-view" id="successView">
                    <span class="checkout-icon">✨</span>
                    <h2 class="checkout-title">Order Confirmed!</h2>
                    <p class="checkout-desc">Your luxury fragrance is on its way.</p>
                    <button class="payment-btn primary" id="btnDone">Done</button>
                </div>
            </div>
        `;

        // View Switching Logic
        const switchCheckoutView = function (viewId) {
            document.querySelectorAll('.checkout-view').forEach(v => v.classList.remove('active'));
            document.getElementById(viewId).classList.add('active');

            // Update Progress Steps
            const stepCart = document.getElementById('stepCart');
            const stepAddress = document.getElementById('stepAddress');
            const stepPayment = document.getElementById('stepPayment');

            if (viewId === 'checkoutCartView') {
                stepCart.classList.add('active');
                stepAddress.classList.remove('active');
                stepPayment.classList.remove('active');
            } else if (viewId === 'checkoutAddressView') {
                stepCart.classList.add('active');
                stepAddress.classList.add('active');
                stepPayment.classList.remove('active');
            } else if (viewId === 'checkoutMainView' || viewId === 'processingView' || viewId === 'successView') {
                stepCart.classList.add('active');
                stepAddress.classList.add('active');
                stepPayment.classList.add('active');
            }
        };

        // Event Handlers
        document.getElementById('closeCheckout').onclick = () => overlay.classList.remove('active');

        if(document.getElementById('btnContinueShopping')){
            document.getElementById('btnContinueShopping').onclick = () => overlay.classList.remove('active');
        }

        if(document.getElementById('btnToAddress')){
            document.getElementById('btnToAddress').onclick = () => switchCheckoutView('checkoutAddressView');
        }
        
        document.getElementById('btnBackToCart').onclick = () => switchCheckoutView('checkoutCartView');
        document.getElementById('btnToPayment').onclick = () => {
            const name = document.getElementById('addrName').value;
            const phone = document.getElementById('addrPhone').value;
            const text = document.getElementById('addrText').value;
            if (!name || !phone || !text) {
                showToast('Please fill all required address fields.');
                return;
            }
            switchCheckoutView('checkoutMainView');
        };
        document.getElementById('btnBackToAddress').onclick = () => switchCheckoutView('checkoutAddressView');

        const processPayment = (type) => {
            if(type === 'cod') {
                document.getElementById('processTitle').textContent = 'Confirming Order...';
            } else {
                document.getElementById('processTitle').textContent = 'Securely Processing...';
            }
            switchCheckoutView('processingView');
            setTimeout(() => {
                switchCheckoutView('successView');
            }, 2500);
        };

        document.getElementById('btnUPI').onclick = () => processPayment('online');
        document.getElementById('btnCOD').onclick = () => processPayment('cod');
        
        document.getElementById('btnDone').onclick = () => {
            cart = [];
            localStorage.removeItem('noir_cart'); 
            location.reload();
        };

        setTimeout(() => { overlay.classList.add('active'); }, 10);
    }

    // ════════════════════════════════
    // THEME TOGGLE (LIGHT / DARK)
    // ════════════════════════════════
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    if (themeToggleBtn) {
        // Check local storage for preference
        const savedTheme = localStorage.getItem('noir_theme');
        if (savedTheme === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
        }

        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            if (currentTheme === 'light') {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('noir_theme', 'dark');
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('noir_theme', 'light');
            }
        });
    }

});
