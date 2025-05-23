    // Budget Carousel Functionality
// Budget Carousel Functionality
const budgetCarousel = document.getElementById('budget-carousel');
const budgetCards = document.querySelectorAll('.budget-card');
const prevBtn = document.getElementById('budget-prev');
const nextBtn = document.getElementById('budget-next');
const indicators = document.querySelectorAll('.indicator');

if (budgetCarousel && budgetCards.length > 0) {
    let currentSlide = 0;
    const totalSlides = budgetCards.length;
    
    // Initialize carousel
    function initCarousel() {
        // Set initial styles for all cards
        budgetCards.forEach((card, index) => {
            if (index === 0) {
                card.style.display = 'block';
                card.classList.add('active');
            } else {
                card.style.display = 'none';
                card.classList.remove('active');
            }
        });
        updateControls();
    }
    
    // Update carousel display
    function updateCarousel() {
        budgetCards.forEach((card, index) => {
            if (index === currentSlide) {
                // Show the current card
                card.style.display = 'block';
                // Small delay to ensure display is applied before animation
                setTimeout(() => {
                    card.classList.add('active');
                }, 10);
            } else {
                // Hide other cards
                card.classList.remove('active');
                // Wait for animation to complete before hiding
                setTimeout(() => {
                    if (!card.classList.contains('active')) {
                        card.style.display = 'none';
                    }
                }, 500); // Match the CSS transition duration
            }
        });
        
        // Update indicators
        indicators.forEach((indicator, index) => {
            if (index === currentSlide) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }
    
    // Update control buttons
    function updateControls() {
        if (prevBtn) {
            prevBtn.disabled = currentSlide === 0;
        }
        if (nextBtn) {
            nextBtn.disabled = currentSlide === totalSlides - 1;
        }
    }
    
    // Go to specific slide
    function goToSlide(slideIndex) {
        if (slideIndex >= 0 && slideIndex < totalSlides && slideIndex !== currentSlide) {
            currentSlide = slideIndex;
            updateCarousel();
            updateControls();
        }
    }
    
    // Previous slide
    function prevSlide() {
        if (currentSlide > 0) {
            goToSlide(currentSlide - 1);
        }
    }
    
    // Next slide
    function nextSlide() {
        if (currentSlide < totalSlides - 1) {
            goToSlide(currentSlide + 1);
        }
    }
    
    // Event listeners
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
    
    // Indicator clicks
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            goToSlide(index);
        });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (budgetCarousel.closest('.budget-section')) {
            if (e.key === 'ArrowLeft') {
                prevSlide();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
            }
        }
    });
    
    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    budgetCarousel.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    budgetCarousel.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    }
    
    // Initialize the carousel
    initCarousel();
}
