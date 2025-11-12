// Cart state
let cart = [];
const deliveryFee = 15000;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    setupCategoryFilters();
    setupMenuSearch();
    setupAddButtons();
});

// Load cart from localStorage
function loadCart() {
    const saved = localStorage.getItem('kfc-cart');
    if (saved) {
        cart = JSON.parse(saved);
        renderCart();
    }
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('kfc-cart', JSON.stringify(cart));
    renderCart();
}

// Setup category filter buttons
function setupCategoryFilters() {
    const buttons = document.querySelectorAll('.category-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const category = btn.dataset.category;
            const items = document.querySelectorAll('.menu-item');

            items.forEach(item => {
                if (category === 'all') {
                    item.style.display = 'block';
                } else {
                    item.style.display = item.dataset.category === category ? 'block' : 'none';
                }
            });
        });
    });
}

// Setup menu search
function setupMenuSearch() {
    const searchInput = document.getElementById('menuSearch');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const items = document.querySelectorAll('.menu-item');

            items.forEach(item => {
                const name = item.querySelector('h3').textContent.toLowerCase();
                const description = item.querySelector('.description')?.textContent.toLowerCase() || '';
                const matches = name.includes(query) || description.includes(query);
                item.style.display = matches ? 'block' : 'none';
            });
        });
    }
}

// Setup add to cart buttons
function setupAddButtons() {
    const buttons = document.querySelectorAll('.add-btn');
    buttons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            const item = btn.closest('.menu-item');
            const name = item.querySelector('h3').textContent;
            const priceText = item.querySelector('.price').textContent;
            const price = parseInt(priceText.replace(/[^0-9]/g, ''));
            const image = item.querySelector('img').src;

            addToCart({ name, price, image, id: Date.now() + index });
        });
    });
}

// Add item to cart
function addToCart(item) {
    const existing = cart.find(i => i.name === item.name);
    if (existing) {
        existing.qty++;
    } else {
        cart.push({ ...item, qty: 1 });
    }
    saveCart();
    showNotification(`${item.name} đã được thêm vào giỏ!`);
}

// Remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
}

// Update item quantity
function updateQty(index, qty) {
    if (qty <= 0) {
        removeFromCart(index);
    } else {
        cart[index].qty = qty;
        saveCart();
    }
}

// Render cart
function renderCart() {
    const container = document.getElementById('cartContainer');
    const totalPriceEl = document.getElementById('totalPrice');
    const finalPriceEl = document.getElementById('finalPrice');

    if (cart.length === 0) {
        container.innerHTML = '<p class="empty-cart">Chưa có món ăn nào trong giỏ</p>';
        totalPriceEl.textContent = '₫0';
        finalPriceEl.textContent = '₫15,000';
        return;
    }

    let html = '';
    let total = 0;

    cart.forEach((item, index) => {
        const subtotal = item.price * item.qty;
        total += subtotal;
        html += `
            <div class="cart-item">
                <span class="cart-item-name">${item.name}</span>
                <div class="cart-item-qty">
                    <button class="qty-btn" onclick="updateQty(${index}, ${item.qty - 1})">-</button>
                    <span>${item.qty}</span>
                    <button class="qty-btn" onclick="updateQty(${index}, ${item.qty + 1})">+</button>
                </div>
                <span class="cart-item-price">₫${subtotal.toLocaleString()}</span>
                <button class="cart-item-remove" onclick="removeFromCart(${index})">Xóa</button>
            </div>
        `;
    });

    container.innerHTML = html;
    totalPriceEl.textContent = `₫${total.toLocaleString()}`;
    finalPriceEl.textContent = `₫${(total + deliveryFee).toLocaleString()}`;
}

// Show notification
function showNotification(message) {
    // Simple notification (could be enhanced with a toast library)
    alert(message);
}

// Checkout
document.querySelector('.checkout-btn')?.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Vui lòng chọn ít nhất một món ăn');
        return;
    }
    alert('Cảm ơn bạn! Đơn hàng của bạn đã được gửi.');
    cart = [];
    saveCart();
});
