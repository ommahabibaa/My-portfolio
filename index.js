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

    // ---------------- Carousel Setup ----------------
    const carousels = document.querySelectorAll(".carousel");
    carousels.forEach(carousel => {
        const track = carousel.querySelector(".carousel-track");
        const slides = carousel.querySelectorAll(".carousel-slide");

        let index = 0;
        const total = slides.length;

        setInterval(() => {
            index = (index + 1) % total;
            track.style.transform = `translateX(-${index * 100}%)`;
        }, 1500);
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

    // ✅ Close Modal
    function closeModal() {
        modal.style.display = 'none';
        if (modalData.interval) clearInterval(modalData.interval);
    }

    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeModal();
    });

    modal.addEventListener('click', (e) => {
        if (!e.target.closest('.modal-content')) {
            closeModal();
        }
    });


    // ---------------- ✅ Force Download CV ----------------
    const downloadBtn = document.querySelector('a[href="images/Omma-HabibaCV.pdf"]');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function (e) {
            e.preventDefault();
            const link = document.createElement('a');
            link.href = 'images/Omma-HabibaCV.pdf';
            link.download = 'Omma-HabibaCV.pdf';
            link.click();
        });
    }

});
