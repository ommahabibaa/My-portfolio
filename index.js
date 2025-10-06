document.addEventListener("DOMContentLoaded", () => {

    // ---------------- Typing effect ----------------
    const typingContainer = document.querySelector(".typing-subtitle");
    const typedText = document.getElementById("typed-text");
    if (typingContainer && typedText) {
        const phrases = Array.from(typingContainer.querySelectorAll("p")).map(p => p.textContent);
        let phraseIndex = 0, charIndex = 0;
        const typingSpeed = 50, erasingSpeed = 30, delayBetween = 800;

        function type() {
            if (charIndex < phrases[phraseIndex].length) {
                typedText.textContent += phrases[phraseIndex].charAt(charIndex++);
                setTimeout(type, typingSpeed);
            } else setTimeout(erase, delayBetween);
        }

        function erase() {
            if (charIndex > 0) {
                typedText.textContent = phrases[phraseIndex].substring(0, --charIndex);
                setTimeout(erase, erasingSpeed);
            } else {
                phraseIndex = (phraseIndex + 1) % phrases.length;
                setTimeout(type, typingSpeed);
            }
        }

        type();
    }

    document.addEventListener("DOMContentLoaded", () => {
        const carousels = document.querySelectorAll(".carousel");

        carousels.forEach(carousel => {
            const track = carousel.querySelector(".carousel-track");
            const slides = carousel.querySelectorAll(".carousel-slide");

            let index = 0;
            const total = slides.length;

            // Auto-slide function (⚡ every 1.5 seconds)
            setInterval(() => {
                index = (index + 1) % total;
                track.style.transform = `translateX(-${index * 100}%)`;
            }, 1500); // 🔁 speed: 1500ms = 1.5 seconds per image
        });
    });


    // ---------------- Modal Setup ----------------
    const modal = document.getElementById('detailsModal');
    const modalImage = modal.querySelector('#modalImage');
    const modalTitle = modal.querySelector('#modalTitle');
    const modalDescription = modal.querySelector('#modalDescription');
    const modalMeta = modal.querySelector('#modalMeta');
    const modalGithub = modal.querySelector('#modalGithub');
    const indicatorsContainer = modal.querySelector('#slideIndicators');
    const closeBtn = modal.querySelector('#modalCloseBtn');

    const modalData = {
        images: [],
        index: 0,
        interval: null
    };

    // Helper functions
    function setActiveIndicator(index) {
        [...indicatorsContainer.children].forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        modalData.index = (modalData.index + 1) % modalData.images.length;
        modalImage.src = modalData.images[modalData.index];
        setActiveIndicator(modalData.index);
    }

    function goToSlide(i) {
        modalData.index = i;
        modalImage.src = modalData.images[i];
        setActiveIndicator(i);
        restartAutoSlide();
    }

    function createIndicators(count) {
        indicatorsContainer.innerHTML = '';
        for (let i = 0; i < count; i++) {
            const dot = document.createElement('span');
            dot.addEventListener('click', () => goToSlide(i));
            indicatorsContainer.appendChild(dot);
        }
    }

    function restartAutoSlide() {
        if (modalData.interval) clearInterval(modalData.interval);
        modalData.interval = setInterval(nextSlide, 4000);
    }

    // ✅ MAIN openModal function
    window.openModal = function (title, images, description, github = '#', meta = '') {
        modalData.images = images;
        modalData.index = 0;

        modalTitle.textContent = title;
        modalDescription.textContent = description;
        modalMeta.textContent = meta;
        modalGithub.href = github;
        modalImage.src = images[0];

        createIndicators(images.length);
        setActiveIndicator(0);

        modal.style.display = 'flex';
        restartAutoSlide();
    };

    // ✅ Close button — only added once
    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeModal();
    });

    // ✅ Click outside content to close
    modal.addEventListener('click', (e) => {
        if (!e.target.closest('.modal-content')) {
            closeModal();
        }
    });

    function closeModal() {
        modal.style.display = 'none';
        if (modalData.interval) clearInterval(modalData.interval);
    }

});
