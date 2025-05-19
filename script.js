// Product data
const products = [
    {
        id: "1",
        name: "Aeroponic Tower",
        price: 24999,
        image: "https://th.bing.com/th/id/OIP.W2t45QY8z67gr_VTd2m6ogHaHa?rs=1&pid=ImgDetMain",
        description: "A state-of-the-art aeroponic tower for efficient, soil-less farming. Perfect for urban gardeners and commercial farms.",
        inStock: true
    },
    {
        id: "2",
        name: "Water Pump",
        price: 4199,
        image: "https://images-na.ssl-images-amazon.com/images/I/81zxmNowlAL._SL1500_.jpg",
        description: "High-performance water pump designed for aeroponic systems, ensuring consistent water flow.",
        inStock: true
    },
    {
        id: "3",
        name: "Nutrients Pack",
        price: 2499,
        image: "https://www.plantoutlets.com/wp-content/uploads/2023/12/GR39542_1.jpg",
        description: "Balanced nutrient solution for optimal plant growth in aeroponic setups.",
        inStock: true
    },
    {
        id: "4",
        name: "LED Grow Light",
        price: 7499,
        image: "https://th.bing.com/th/id/OIP.SMWTl-fvMgRlZJtMOaV19QAAAA?rs=1&pid=ImgDetMain",
        description: "Energy-efficient LED grow light to enhance photosynthesis and plant growth.",
        inStock: true
    },
    {
        id: "5",
        name: "Water Pipes",
        price: 1699,
        image: "https://akinfotools.com/assets/upload/products/Transparent_Pipe_12mm.png",
        description: "Durable water pipes for seamless water distribution in aeroponic systems.",
        inStock: false
    }
];

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartCount = document.getElementById('cart-count');
    
    if (!cartItems || !cartTotal || !cartCount) return;
    
    cartItems.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        total += item.price * item.quantity;
        const itemElement = document.createElement('div');
        itemElement.className = 'flex justify-between items-center mb-4';
        itemElement.innerHTML = `
            <div>
                <p class="font-semibold">${item.name}</p>
                <p>₹${item.price.toLocaleString('en-IN')} x ${item.quantity}</p>
            </div>
            <button class="remove-from-cart text-red-600 hover:text-red-800 transition" data-id="${item.id}">Remove</button>
        `;
        cartItems.appendChild(itemElement);
    });
    
    cartTotal.textContent = total.toLocaleString('en-IN');
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    // Add remove event listeners
    document.querySelectorAll('.remove-from-cart').forEach(button => {
        button.addEventListener('click', () => {
            const id = button.dataset.id;
            cart = cart.filter(item => item.id !== id);
            saveCart();
            updateCart();
        });
    });
}

// Add to cart
function addToCartListeners() {
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const id = button.dataset.id;
            const name = button.dataset.name;
            const price = parseFloat(button.dataset.price);
            const quantity = parseInt(button.dataset.quantity) || 1;
            
            const existingItem = cart.find(item => item.id === id);
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.push({ id, name, price, quantity });
            }
            
            saveCart();
            updateCart();
        });
    });
}

// Cart sidebar toggle
function initCartSidebar() {
    const cartToggle = document.getElementById('cart-toggle');
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartClose = document.getElementById('cart-close');
    
    if (cartToggle && cartSidebar && cartClose) {
        cartToggle.addEventListener('click', () => {
            cartSidebar.classList.toggle('translate-x-full');
        });
        
        cartClose.addEventListener('click', () => {
            cartSidebar.classList.add('translate-x-full');
        });
    }
}

// Mobile menu toggle
function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
}

// Smooth scroll for nav links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

// Intersection Observer for section animations
function initAnimations() {
    const sections = document.querySelectorAll('.animate-fade-in, .animate-slide-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('opacity-100', 'translate-y-0', 'translate-x-0');
                entry.target.classList.remove('opacity-0', 'translate-y-20', 'translate-x-20');
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        section.classList.add('opacity-0', 'translate-y-20');
        observer.observe(section);
    });
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    updateCart();
    addToCartListeners();
    initCartSidebar();
    initMobileMenu();
    initSmoothScroll();
    initAnimations();
});