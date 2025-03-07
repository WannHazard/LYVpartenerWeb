// Vänta tills DOM är helt laddad
document.addEventListener('DOMContentLoaded', () => {
    // Mobil meny funktionalitet
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            const isExpanded = navLinks.classList.contains('active');
            mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
            navLinks.classList.toggle('active');
        });

        // Stäng menyn när man klickar på en länk
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', false);
            });
        });
    }

    // Kontaktformulär hantering
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Simulerad bekräftelse
            const formMessage = document.createElement('p');
            formMessage.textContent = 'Tack för ditt meddelande! Vi återkommer så snart som möjligt.';
            formMessage.style.color = 'green';
            contactForm.appendChild(formMessage);

            // Rensa formuläret efter några sekunder
            setTimeout(() => {
                formMessage.remove();
                contactForm.reset();
            }, 5000);
        });
    }

    const dots = document.querySelectorAll('.slider-dot');
    const images = document.querySelectorAll('.slider-image');
    let galleryIndex = 0;
    let interval;

    function showImage(index) {
        images.forEach(img => img.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        images[index].classList.add('active');
        dots[index].classList.add('active');
        currentIndex = index;
    }

    function nextImage() {
        let nextIndex = (currentIndex + 1) % images.length;
        showImage(nextIndex);
    }

    // Start automatic slideshow
    function startSlideshow() {
        interval = setInterval(nextImage, 5000); // Change image every 5 seconds
    }

    // Stop slideshow on user interaction
    function stopSlideshow() {
        clearInterval(interval);
    }

    // Add click events to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopSlideshow();
            showImage(index);
            startSlideshow();
        });
    });

    // Start the slideshow
    startSlideshow();

    // Gallery functionality
    const track = document.querySelector('.gallery-track');
    const items = document.querySelectorAll('.gallery-item:not(.clone)');
    const prevButton = document.querySelector('.gallery-nav.prev');
    const nextButton = document.querySelector('.gallery-nav.next');
    let currentIndex = 0;
    let isTransitioning = false;
    const itemWidth = 316; // 300px width + 16px gap

    function updateGallery(direction) {
        if (isTransitioning) return;
        isTransitioning = true;
        
        currentIndex += direction;
        const translateX = -((currentIndex + 2) * itemWidth);
        track.style.transform = `translateX(${translateX}px)`;

        // Reset position when reaching ends
        if (currentIndex >= items.length) {
            setTimeout(() => {
                track.style.transition = 'none';
                currentIndex = 0;
                track.style.transform = `translateX(${-(2 * itemWidth)}px)`;
                setTimeout(() => {
                    track.style.transition = 'transform 0.5s ease-in-out';
                    isTransitioning = false;
                }, 10);
            }, 500);
        } else if (currentIndex < 0) {
            setTimeout(() => {
                track.style.transition = 'none';
                currentIndex = items.length - 1;
                track.style.transform = `translateX(${-((items.length + 1) * itemWidth)}px)`;
                setTimeout(() => {
                    track.style.transition = 'transform 0.5s ease-in-out';
                    isTransitioning = false;
                }, 10);
            }, 500);
        } else {
            setTimeout(() => {
                isTransitioning = false;
            }, 500);
        }
    }

    // Initialize position
    track.style.transform = `translateX(${-(2 * itemWidth)}px)`;

    // Event listeners
    prevButton.addEventListener('click', () => updateGallery(-1));
    nextButton.addEventListener('click', () => updateGallery(1));

    // Auto scroll
    let autoScrollInterval = setInterval(() => updateGallery(1), 5000);

    // Pause auto scroll on hover
    track.addEventListener('mouseenter', () => clearInterval(autoScrollInterval));
    track.addEventListener('mouseleave', () => {
        autoScrollInterval = setInterval(() => updateGallery(1), 5000);
    });

    // Lightbox functionality
    document.addEventListener('DOMContentLoaded', function() {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const items = document.querySelectorAll('.gallery-item:not(.clone)');
        let lightboxIndex = 0;
    
        // Lightbox navigation
        function openLightbox(index) {
            lightboxIndex = index;
            const imgSrc = items[index].querySelector('img').src;
            lightboxImg.src = imgSrc;
            lightbox.style.display = 'flex';
        }
    
        function closeLightbox() {
            lightbox.style.display = 'none';
        }
    
        function navigateLightbox(direction) {
            lightboxIndex = (lightboxIndex + direction + items.length) % items.length;
            const imgSrc = items[lightboxIndex].querySelector('img').src;
            lightboxImg.src = imgSrc;
        }
    
        // Event listeners for lightbox
        items.forEach((item, index) => {
            item.addEventListener('click', () => openLightbox(index));
        });
    
        document.querySelector('.close-lightbox').addEventListener('click', closeLightbox);
        document.querySelector('.lightbox-nav.prev').addEventListener('click', () => navigateLightbox(-1));
        document.querySelector('.lightbox-nav.next').addEventListener('click', () => navigateLightbox(1));
    
        // Close lightbox when clicking outside the image
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    });
});