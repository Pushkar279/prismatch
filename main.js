// Mobile Navigation
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    burger.classList.toggle('toggle');
    
    // Animate links
    navLinksItems.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
});

// Close mobile menu when clicking on a link
navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        burger.classList.remove('toggle');
        navLinksItems.forEach(item => {
            item.style.animation = '';
        });
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Tournament Carousel (sample data)
const tournamentCarousel = document.querySelector('.tournament-carousel');

const tournaments = [
    {
        id: 1,
        game: 'BGMI',
        title: 'BGMI National Qualifiers',
        date: '2023-12-15',
        prize: '₹50,000',
        banner: 'images/bgmi-tournament.jpg',
        gameIcon: 'images/bgmi-icon.png'
    },
    {
        id: 2,
        game: 'Valorant',
        title: 'Valorant City Showdown',
        date: '2023-12-18',
        prize: '₹25,000',
        banner: 'images/valorant-tournament.jpg',
        gameIcon: 'images/valorant-icon.png'
    },
    {
        id: 3,
        game: 'Free Fire',
        title: 'Free Fire District Cup',
        date: '2023-12-20',
        prize: '₹15,000',
        banner: 'images/freefire-tournament.jpg',
        gameIcon: 'images/freefire-icon.png'
    },
    {
        id: 4,
        game: 'Call of Duty Mobile',
        title: 'CODM State Championship',
        date: '2023-12-22',
        prize: '₹30,000',
        banner: 'images/codm-tournament.jpg',
        gameIcon: 'images/codm-icon.png'
    }
];

function loadTournaments() {
    tournamentCarousel.innerHTML = '';
    
    tournaments.forEach(tournament => {
        const tournamentCard = document.createElement('div');
        tournamentCard.className = 'tournament-card hover-grow';
        
        tournamentCard.innerHTML = `
            <div class="tournament-banner" style="background-image: url('${tournament.banner}')"></div>
            <div class="tournament-info">
                <div class="tournament-game">
                    <img src="${tournament.gameIcon}" alt="${tournament.game}">
                    <span>${tournament.game}</span>
                </div>
                <h3 class="tournament-title">${tournament.title}</h3>
                <div class="tournament-details">
                    <span>${new Date(tournament.date).toLocaleDateString()}</span>
                    <span class="tournament-prize">${tournament.prize}</span>
                </div>
                <a href="tournaments.html" class="btn-primary" style="display: block; text-align: center;">Register Now</a>
            </div>
        `;
        
        tournamentCarousel.appendChild(tournamentCard);
    });
}

// Load tournaments when page loads
document.addEventListener('DOMContentLoaded', loadTournaments);

// Testimonials slider
const testimonials = [
    {
        name: "Rahul Sharma",
        role: "Professional BGMI Player",
        content: "Prismatch gave me the platform I needed to showcase my skills. After winning several local tournaments, I got selected for national championships!",
        avatar: "images/avatar1.jpg"
    },
    {
        name: "Priya Patel",
        role: "Valorant Streamer",
        content: "The automated matchmaking and fair prize distribution makes Prismatch my go-to platform for competitive gaming.",
        avatar: "images/avatar2.jpg"
    },
    {
        name: "Arjun Mehta",
        role: "Esports Coach",
        content: "I've been able to guide so many young talents through Prismatch's community features. It's revolutionizing Indian esports.",
        avatar: "images/avatar3.jpg"
    }
];

let currentTestimonial = 0;
const testimonialSlider = document.querySelector('.testimonial-slider');

function showTestimonial(index) {
    const testimonial = testimonials[index];
    
    testimonialSlider.innerHTML = `
        <div class="testimonial-content">
            <p>"${testimonial.content}"</p>
        </div>
        <div class="testimonial-author">
            <img src="${testimonial.avatar}" alt="${testimonial.name}">
            <div>
                <h4>${testimonial.name}</h4>
                <span>${testimonial.role}</span>
            </div>
        </div>
    `;
}

// Initialize first testimonial
showTestimonial(currentTestimonial);

// Auto-rotate testimonials
setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}, 5000);

// Add animation to nav links
const navLinksAll = document.querySelectorAll('.nav-links a');
navLinksAll.forEach(link => {
    link.classList.add('hover-underline');
});