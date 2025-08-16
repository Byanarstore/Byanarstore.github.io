// Global variables
let isPlaying = false;
let candlesBlown = false;
let birthdayWishes = [
    {
        id: 1,
        sender: "Sevən Dost",
        message: "Ad günün mübarək! Həyatının ən gözəl günlərindən biri olsun. Sənə ən xoş arzularımı göndərirəm. Sevinc, xoşbəxtlik və sevgi həmişə yanında olsun! 🎉💖",
        createdAt: new Date(),
        iconType: 'heart'
    },
    {
        id: 2,
        sender: "Qiymətli İnsan",
        message: "Bugün sənin xüsusi günündür! Bütün arzuların gerçəkləşsin, həyatın həmişə parlaq və sevgi dolu olsun. Ad günün mübarək, ən əziz insan! 🌟✨",
        createdAt: new Date(),
        iconType: 'star'
    },
    {
        id: 3,
        sender: "Həyat Yoldaşı",
        message: "Sən mənim həyatımın ən gözəl hədiyyəsisən! Bu xüsusi gündə sənə sonsuz sevgi və xoşbəxtlik arzu edirəm. Ad günün mübarək, canım! 💕🎂",
        createdAt: new Date(),
        iconType: 'gift'
    }
];

// Confetti Canvas Animation
function initConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const confetti = [];
    const confettiColors = ['#FFD700', '#FF69B4', '#8A2BE2', '#FF7F7F'];
    
    // Resize canvas
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    // Confetti piece class
    class ConfettiPiece {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height - canvas.height;
            this.w = Math.random() * 10 + 5;
            this.h = Math.random() * 10 + 5;
            this.color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
            this.speed = Math.random() * 3 + 1;
            this.angle = Math.random() * Math.PI * 2;
            this.angularSpeed = Math.random() * 0.1 + 0.05;
        }
        
        update() {
            this.angle += this.angularSpeed;
            this.y += this.speed;
            this.x += Math.sin(this.angle) * 2;
            
            if (this.y > canvas.height) {
                this.y = -10;
                this.x = Math.random() * canvas.width;
            }
        }
        
        draw() {
            ctx.save();
            ctx.translate(this.x + this.w / 2, this.y + this.h / 2);
            ctx.rotate(this.angle);
            ctx.fillStyle = this.color;
            ctx.fillRect(-this.w / 2, -this.h / 2, this.w, this.h);
            ctx.restore();
        }
    }
    
    // Initialize confetti pieces
    for (let i = 0; i < 50; i++) {
        confetti.push(new ConfettiPiece());
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        confetti.forEach(piece => {
            piece.update();
            piece.draw();
        });
        requestAnimationFrame(animate);
    }
    
    resizeCanvas();
    animate();
    
    window.addEventListener('resize', resizeCanvas);
}

// Music Player
function initMusicPlayer() {
    const musicPlayer = document.getElementById('music-player');
    const musicIcon = document.getElementById('music-icon');
    const pauseIcon = document.getElementById('pause-icon');
    
    musicPlayer.addEventListener('click', () => {
        isPlaying = !isPlaying;
        
        if (isPlaying) {
            musicIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
        } else {
            musicIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
        }
        
        // Here you would implement actual music playback
        console.log(isPlaying ? 'Music started' : 'Music paused');
    });
}

// Countdown Timer
function initCountdown() {
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    
    // Calculate next birthday (assume next year for demo)
    const nextBirthday = new Date();
    nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = nextBirthday.getTime() - now;
        
        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            daysEl.textContent = days.toString().padStart(2, '0');
            hoursEl.textContent = hours.toString().padStart(2, '0');
            minutesEl.textContent = minutes.toString().padStart(2, '0');
            secondsEl.textContent = seconds.toString().padStart(2, '0');
        } else {
            daysEl.textContent = '00';
            hoursEl.textContent = '00';
            minutesEl.textContent = '00';
            secondsEl.textContent = '00';
        }
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Birthday Cake Interaction
function blowCandles() {
    if (candlesBlown) return;
    
    const candles = document.getElementById('candles');
    const wishMessage = document.getElementById('wish-message');
    
    candlesBlown = true;
    candles.classList.add('blown');
    
    // Set delay for each candle
    const candleElements = candles.querySelectorAll('.candle');
    candleElements.forEach((candle, index) => {
        candle.style.setProperty('--delay', index);
    });
    
    setTimeout(() => {
        wishMessage.classList.add('show');
    }, 1000);
    
    // Reset after 5 seconds
    setTimeout(() => {
        candlesBlown = false;
        candles.classList.remove('blown');
        wishMessage.classList.remove('show');
    }, 5000);
}

// Gift Box Interaction
function openGift(index) {
    const giftSurprise = document.getElementById(`gift-${index}`);
    
    if (giftSurprise.classList.contains('show')) return;
    
    giftSurprise.classList.add('show');
    
    setTimeout(() => {
        giftSurprise.classList.remove('show');
    }, 3000);
}

// Video Player
function playVideo() {
    const playButton = document.getElementById('play-button');
    const videoLoading = document.getElementById('video-loading');
    
    playButton.style.display = 'none';
    videoLoading.classList.add('show');
    
    // Simulate video loading
    setTimeout(() => {
        videoLoading.classList.remove('show');
        playButton.style.display = 'flex';
        alert('Video özelliği yakında eklenecek! 🎬');
    }, 2000);
}

// Birthday Wishes Management
function loadWishes() {
    const wishesContainer = document.getElementById('wishes-container');
    
    if (!wishesContainer) return;
    
    wishesContainer.innerHTML = '';
    
    birthdayWishes.forEach((wish, index) => {
        const wishCard = document.createElement('div');
        wishCard.className = 'wish-card';
        
        const iconEmojis = {
            heart: '💖',
            star: '⭐',
            gift: '🎁'
        };
        
        const iconClasses = {
            heart: 'wish-icon heart',
            star: 'wish-icon star',
            gift: 'wish-icon gift'
        };
        
        wishCard.innerHTML = `
            <div class="wish-header">
                <div class="${iconClasses[wish.iconType] || iconClasses.heart}">
                    ${iconEmojis[wish.iconType] || iconEmojis.heart}
                </div>
                <div>
                    <div class="wish-sender">${wish.sender}</div>
                    <div class="wish-date">${wish.createdAt.toLocaleDateString('az-AZ')}</div>
                </div>
            </div>
            <div class="wish-message-text">${wish.message}</div>
            <div class="wish-actions">
                <button class="wish-like" onclick="likeWish(${wish.id})">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="m19,14c0,5-4.5,5.5-4.5,5.5,0,0-4.5,-0.5-4.5,-5.5,0,-4.5,6-5.5,6-5.5s2,1,3,5.5z"></path>
                    </svg>
                </button>
            </div>
        `;
        
        wishesContainer.appendChild(wishCard);
    });
}

function likeWish(wishId) {
    // Add heart animation or notification
    const heartElement = event.target.closest('.wish-like');
    heartElement.style.transform = 'scale(1.3)';
    heartElement.style.color = '#ff7f7f';
    
    setTimeout(() => {
        heartElement.style.transform = 'scale(1)';
        heartElement.style.color = '';
    }, 200);
}

function submitWish() {
    const senderInput = document.getElementById('sender-name');
    const messageInput = document.getElementById('wish-message-input');
    const submitButton = document.getElementById('submit-button');
    
    const senderName = senderInput.value.trim();
    const wishMessage = messageInput.value.trim();
    
    if (!senderName || !wishMessage) {
        alert('Xahiş edirik adınızı və təbrikinizi yazın.');
        return;
    }
    
    // Show loading state
    submitButton.disabled = true;
    submitButton.innerHTML = 'Göndərilir... <div class="loading"></div>';
    
    // Simulate API call
    setTimeout(() => {
        const newWish = {
            id: Date.now(),
            sender: senderName,
            message: wishMessage,
            createdAt: new Date(),
            iconType: ['heart', 'star', 'gift'][Math.floor(Math.random() * 3)]
        };
        
        birthdayWishes.unshift(newWish);
        loadWishes();
        
        // Clear form
        senderInput.value = '';
        messageInput.value = '';
        
        // Reset button
        submitButton.disabled = false;
        submitButton.innerHTML = 'Təbriki Göndər 💌';
        
        // Show success message
        showNotification('Təşəkkür edirik! Təbrikiniz uğurla göndərildi 💖');
        
    }, 1500);
}

// Notification System
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(45deg, #ffd700, #ff7f7f);
        color: #1e1b3a;
        padding: 16px 32px;
        border-radius: 12px;
        font-family: 'Poppins', sans-serif;
        font-weight: 600;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
        z-index: 1000;
        opacity: 0;
        transition: all 0.3s ease;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(-50%) translateY(10px)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(-50%) translateY(-10px)';
        
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Smooth Scrolling
function scrollToNextSection() {
    window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
    });
}

// Initialize current year in footer
function initCurrentYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Intersection Observer for animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'all 0.6s ease';
        observer.observe(section);
    });
}

// Performance optimizations
function optimizeImages() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
        
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
    });
}

// Touch gestures for mobile
function initTouchGestures() {
    let startY = 0;
    
    document.addEventListener('touchstart', (e) => {
        startY = e.touches[0].clientY;
    });
    
    document.addEventListener('touchend', (e) => {
        const endY = e.changedTouches[0].clientY;
        const diffY = startY - endY;
        
        // Swipe up detection
        if (diffY > 50 && Math.abs(diffY) > Math.abs(startY - endY)) {
            scrollToNextSection();
        }
    });
}

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎉 Birthday website loaded!');
    
    // Initialize all components
    initConfetti();
    initMusicPlayer();
    initCountdown();
    initCurrentYear();
    loadWishes();
    initScrollAnimations();
    optimizeImages();
    initTouchGestures();
    
    // Add some extra sparkle
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Page visibility API for performance
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when tab is not visible
        console.log('Page hidden - pausing animations');
    } else {
        // Resume animations when tab is visible
        console.log('Page visible - resuming animations');
    }
});

// Preload critical images
function preloadImages() {
    const imageUrls = [
        'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400',
        'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600',
        'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600'
    ];
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Start preloading
preloadImages();