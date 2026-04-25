/* ========================================
   NOIR ESSENCE™ — Product Detail JavaScript
   ======================================== */
document.addEventListener('DOMContentLoaded', () => {

    // Cursor Glow
    const cursorGlow = document.getElementById('cursorGlow');
    let mx = 0, my = 0, gx = 0, gy = 0;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
    (function loop() {
        gx += (mx - gx) * 0.08; gy += (my - gy) * 0.08;
        if (cursorGlow) { cursorGlow.style.left = gx + 'px'; cursorGlow.style.top = gy + 'px'; }
        requestAnimationFrame(loop);
    })();

    // Particles
    const pc = document.getElementById('particles');
    if (pc) {
        for (let i = 0; i < 15; i++) {
            const p = document.createElement('div');
            p.className = 'particle';
            p.style.left = Math.random() * 100 + '%';
            p.style.animationDelay = Math.random() * 10 + 's';
            p.style.animationDuration = (8 + Math.random() * 8) + 's';
            const colors = ['rgba(210,200,184,0.08)', 'rgba(230,223,213,0.06)', 'rgba(238,226,228,0.08)'];
            p.background = colors[Math.floor(Math.random() * colors.length)];
            p.style.background = p.background;
            const s = 1.5 + Math.random() * 2;
            p.style.width = s + 'px'; p.style.height = s + 'px';
            p.style.boxShadow = `0 0 ${s * 3}px ${p.style.background}`;
            pc.appendChild(p);
        }
    }

    // Navbar
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => { navbar.classList.toggle('scrolled', window.scrollY > 50); }, { passive: true });

    // Hamburger
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });
        navLinks.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', () => {
            hamburger.classList.remove('active'); navLinks.classList.remove('active'); document.body.style.overflow = '';
        }));
    }

    // 3D Bottle Tilt
    const bottle = document.getElementById('pd3DWrapper');
    const scene = document.querySelector('.pd-3d-scene');
    if (bottle && scene) {
        scene.addEventListener('mousemove', e => {
            const r = scene.getBoundingClientRect();
            const x = (e.clientX - r.left) / r.width - 0.5;
            const y = (e.clientY - r.top) / r.height - 0.5;
            bottle.style.animation = 'none';
            bottle.style.transform = `translateY(-10px) rotateX(${y * -10}deg) rotateY(${x * 10}deg)`;
        });
        scene.addEventListener('mouseleave', () => {
            bottle.style.transition = 'transform 0.5s ease';
            bottle.style.transform = '';
            setTimeout(() => { bottle.style.transition = ''; bottle.style.animation = ''; }, 500);
        });
    }

    // Variant Selector
    document.querySelectorAll('.pd-variant-options').forEach(group => {
        group.querySelectorAll('.pd-variant-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                group.querySelectorAll('.pd-variant-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Update Price
                const newPrice = btn.getAttribute('data-price');
                const oldPrice = btn.getAttribute('data-old-price');
                const priceNewEl = document.querySelector('.pd-price-new');
                const priceOldEl = document.querySelector('.pd-price-old');
                const priceSaveEl = document.querySelector('.pd-price-save');

                if (newPrice && priceNewEl) {
                    priceNewEl.textContent = `₹${newPrice}`;
                }
                if (oldPrice && priceOldEl) {
                    priceOldEl.textContent = `₹${oldPrice}`;
                }

                if (newPrice && oldPrice && priceSaveEl) {
                    const priceVal = parseInt(newPrice.replace(/,/g, ''));
                    const oldVal = parseInt(oldPrice.replace(/,/g, ''));
                    if (!isNaN(priceVal) && !isNaN(oldVal)) {
                        const savePercent = Math.round(((oldVal - priceVal) / oldVal) * 100);
                        priceSaveEl.textContent = `Save ${savePercent}%`;
                    }
                }
            });
        });
    });

    // Quantity
    const qi = document.getElementById('qtyInput');
    const qm = document.getElementById('qtyMinus');
    const qp = document.getElementById('qtyPlus');
    if (qi && qm && qp) {
        qm.addEventListener('click', () => { let v = parseInt(qi.value) || 1; if (v > 1) qi.value = v - 1; });
        qp.addEventListener('click', () => { let v = parseInt(qi.value) || 1; if (v < 10) qi.value = v + 1; });
    }

    // ════════════════════════════════
    // ADVANCED CART & DRAWER SYSTEM
    // ════════════════════════════════
    let cart = JSON.parse(localStorage.getItem('noir_cart')) || [];

    const addBtn = document.getElementById('pdAddCart');
    if (addBtn) {
        addBtn.addEventListener('click', () => {
            const qty = parseInt(qi?.value) || 1;
            const productName = document.querySelector('.pd-name')?.textContent || 'item';
            const priceEl = document.querySelector('.pd-price-new');
            let price = "5,999";
            if (priceEl) price = priceEl.textContent.replace('₹', '').trim();

            for (let i = 0; i < qty; i++) {
                cart.push({ id: Date.now() + i, name: productName, price: price, icon: '✨' });
            }

            localStorage.setItem('noir_cart', JSON.stringify(cart));
            updateCartDrawer();
            openCartDrawer();
            showToast(`${qty}x ${productName} added to bag.`);
        });
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
            initiateCheckout(`Your Collection (${cart.length} items)`, 1);
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
                <div class="cart-item-img"><span>✨</span></div>
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

    function initiateCheckout() {
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
            cartItemsHtml = cart.map((item) => {
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

    // Wishlist
    const wl = document.getElementById('pdWishlist');
    if (wl) {
        wl.addEventListener('click', () => {
            wl.classList.toggle('active');
            showToast(wl.classList.contains('active') ? 'Added to wishlist ♥' : 'Removed from wishlist');
        });
    }

    // Tabs
    document.querySelectorAll('.pd-tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-tab');
            document.querySelectorAll('.pd-tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.pd-tab-panel').forEach(p => p.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById(target)?.classList.add('active');
        });
    });

    // Toast
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toastMessage');
    function showToast(msg) {
        if (toast && toastMsg) { toastMsg.textContent = msg; toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 3000); }
    }
    window.showToast = showToast;

    // Scroll Animations
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                const d = e.target.getAttribute('data-aos-delay') || 0;
                setTimeout(() => e.target.classList.add('aos-animate'), parseInt(d));
                obs.unobserve(e.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    document.querySelectorAll('[data-aos]').forEach(el => obs.observe(el));

    // 3D Tilt on Collection Cards
    document.querySelectorAll('.collection-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const r = card.getBoundingClientRect();
            const x = (e.clientX - r.left) / r.width - 0.5;
            const y = (e.clientY - r.top) / r.height - 0.5;
            card.style.transform = `translateY(-8px) rotateX(${y * -5}deg) rotateY(${x * 5}deg)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transition = 'transform 0.4s ease'; card.style.transform = '';
            setTimeout(() => { card.style.transition = ''; }, 400);
        });
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', function (e) {
            e.preventDefault();
            const t = document.querySelector(this.getAttribute('href'));
            if (t) window.scrollTo({ top: t.offsetTop - 80, behavior: 'smooth' });
        });
    });

    // Page fade-in
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.6s ease';
    requestAnimationFrame(() => { document.body.style.opacity = '1'; });

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
