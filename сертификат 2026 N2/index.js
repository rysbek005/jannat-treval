
const toursData = [
    {
        id: 1,
        name: "Ысык-Көл жээги",
        duration: "3 күн / 2 түн",
        price: "3500 сом",
        image: "https://images.pexels.com/photos/14031137/pexels-photo-14031137.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
        id: 2,
        name: "Ала-Арча улуттук паркы",
        duration: "1 күн",
        price: "1200 сом",
        image: "https://images.pexels.com/photos/2101740/pexels-photo-2101740.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
        id: 3,
        name: "Соң-Көл көлү",
        duration: "4 күн / 3 түн",
        price: "5500 сом",
        image: "https://images.pexels.com/photos/1677403/pexels-photo-1677403.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
        id: 4,
        name: "Жети-Өгүз капчыгайы",
        duration: "2 күн / 1 түн",
        price: "2800 сом",
        image: "https://images.pexels.com/photos/1561297/pexels-photo-1561297.jpeg?auto=compress&cs=tinysrgb&w=600"
    }
];

const destinationsData = [
    {
        title: "Бурана мунарасы",
        description: "Байыркы Баласагын шаарынын калдыктары",
        image: "https://images.pexels.com/photos/3254631/pexels-photo-3254631.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
        title: "Таш-Рабат",
        description: "Неолит доорундагы үңкүр шаар",
        image: "https://images.pexels.com/photos/3777768/pexels-photo-3777768.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
        title: "Арсланбоб жаңгак токою",
        description: "Дүйнөдөгү эң чоң жаңгак токою",
        image: "https://images.pexels.com/photos/2063830/pexels-photo-2063830.jpeg?auto=compress&cs=tinysrgb&w=600"
    }
];

const reviewsData = [
    { name: "Айжан К.", review: "Өтө жакшы уюштурулган тур! Гиддер кесипкөй.", rating: 5 },
    { name: "Михаил П.", review: "Ысык-Көл абдан жакты. Баалары арзан.", rating: 5 },
    { name: "Нурсултан Т.", review: "Кийинки жылы дагы келем!", rating: 4 },
    { name: "Гульнара М.", review: "Балдар менен эс алдык, абдан ыңгайлуу.", rating: 5 },
    { name: "Эрмек Б.", review: "Сунуштайм! Бардыгы тез жана так.", rating: 4 }
];


let favoriteTours = JSON.parse(localStorage.getItem('favoriteTours')) || [];

function saveFavoritesToLocalStorage() {
    localStorage.setItem('favoriteTours', JSON.stringify(favoriteTours));
}


function renderTours() {
    const toursGrid = document.getElementById('toursGrid');
    if (!toursGrid) return;
    
    toursGrid.innerHTML = toursData.map(tour => `
        <div class="tour-card">
            <img src="${tour.image}" alt="${tour.name}" loading="lazy">
            <div class="tour-card-content">
                <h3>🏕️ ${tour.name}</h3>
                <p>⏱️ ${tour.duration}</p>
                <p class="tour-price">💰 ${tour.price}</p>
                <button class="fav-btn" data-id="${tour.id}">
                    ${favoriteTours.includes(tour.id) ? '❤️ Избранное' : '🤍 Избранноеге кошуу'}
                </button>
            </div>
        </div>
    `).join('');
    
    // listener кошуу
    document.querySelectorAll('.fav-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(btn.dataset.id);
            if (favoriteTours.includes(id)) {
                favoriteTours = favoriteTours.filter(favId => favId !== id);
            } else {
                favoriteTours.push(id);
            }
            saveFavoritesToLocalStorage();
            renderTours(); // Рендерди жаңыртуу
            showToast('Избранное жаңыртылды!', 'success');
        });
    });
}


function renderDestinations() {
    const destinationsRow = document.getElementById('destinationsRow');
    if (!destinationsRow) return;
    
    destinationsRow.innerHTML = '';
    destinationsData.forEach(dest => {
        const col = document.createElement('div');
        col.className = 'col-lg-4 col-md-6';
        col.innerHTML = `
            <div class="card h-100 shadow-sm">
                <img src="${dest.image}" class="card-img-top" alt="${dest.title}" style="height: 220px; object-fit: cover;">
                <div class="card-body">
                    <h5 class="card-title">📍 ${dest.title}</h5>
                    <p class="card-text">${dest.description}</p>
                    <button class="btn btn-outline-warning btn-sm">Көбүрөөк билүү</button>
                </div>
            </div>
        `;
        destinationsRow.appendChild(col);
    });
}


function renderReviews() {
    const reviewsContainer = document.getElementById('reviewsContainer');
    if (!reviewsContainer) return;
    
    const highRatedReviews = reviewsData.filter(review => review.rating >= 4);
    
    reviewsContainer.innerHTML = highRatedReviews.map(review => `
        <div class="review-card">
            <h4>👤 ${review.name}</h4>
            <p class="review-text">"${review.review}"</p>
            <div class="stars">${'⭐'.repeat(review.rating)}</div>
        </div>
    `).join('');
}


function setupFormValidation() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const messageDiv = document.getElementById('formMessage');
        
        if (name === '' || email === '' || phone === '') {
            messageDiv.innerHTML = '<div class="alert alert-danger">❌ Бардык милдеттүү талааларды толтуруңуз!</div>';
            messageDiv.style.display = 'block';
            
            
            setTimeout(() => {
                messageDiv.style.display = 'none';
            }, 3000);
            return;
        }
        
        if (!email.includes('@') || !email.includes('.')) {
            messageDiv.innerHTML = '<div class="alert alert-danger">❌ Туура email дарегин жазыңыз!</div>';
            setTimeout(() => {
                messageDiv.style.display = 'none';
            }, 3000);
            return;
        }
        
        
        messageDiv.innerHTML = '<div class="alert alert-success">✅ Маалыматыңыз сакталды! Биз сизге тез арада байланышабыз.</div>';
        messageDiv.style.display = 'block';
        
        
        const lastContact = { name, email, phone, date: new Date().toLocaleString() };
        localStorage.setItem('lastContact', JSON.stringify(lastContact));
        
        
        form.reset();
        
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 4000);
    });
    
    // localStorage дагы бар маалыматты көрсөтүү (мисалы, консольго)
    const savedContact = localStorage.getItem('lastContact');
    if (savedContact) {
        console.log('Мурунку байланыш:', JSON.parse(savedContact));
    }
}


function showToast(message, type = 'info') {
    const toastDiv = document.createElement('div');
    toastDiv.className = `alert alert-${type === 'success' ? 'success' : 'info'} position-fixed bottom-0 end-0 m-3`;
    toastDiv.style.zIndex = '9999';
    toastDiv.innerHTML = message;
    document.body.appendChild(toastDiv);
    
    setTimeout(() => {
        toastDiv.remove();
    }, 2000);
}


function setupHeroButton() {
    const exploreBtn = document.getElementById('exploreBtn');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', () => {
            document.getElementById('tours')?.scrollIntoView({ behavior: 'smooth' });
            showToast('Турлар бөлүмүнө өтүү!', 'info');
        });
    }
}


function setupSmoothScroll() {
    document.querySelectorAll('.nav-link, .footer-links a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const hash = this.getAttribute('href');
            if (hash && hash.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(hash);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}


document.addEventListener('DOMContentLoaded', () => {
    renderTours();
    renderDestinations();
    renderReviews();
    setupFormValidation();
    setupHeroButton();
    setupSmoothScroll();
    
    
    console.log('Favorite турлар:', favoriteTours);
    
    // акыркы кирүү убактысын сактоо
    const lastVisit = localStorage.getItem('lastVisit');
    if (!lastVisit) {
        localStorage.setItem('lastVisit', new Date().toLocaleString());
    } else {
        console.log('Акыркы кирүү убактысы:', lastVisit);
    }
});