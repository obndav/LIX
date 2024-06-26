// scripts.js

document.addEventListener('DOMContentLoaded', () => {
    const likeButtons = document.querySelectorAll('.like-btn');
    const shareButtons = document.querySelectorAll('.share-btn');
    const signInBtn = document.getElementById('sign-in-btn');
    const signUpBtn = document.getElementById('sign-up-btn');
    const signInModal = document.getElementById('sign-in-modal');
    const signUpModal = document.getElementById('sign-up-modal');
    const closeSignIn = document.getElementById('close-sign-in');
    const closeSignUp = document.getElementById('close-sign-up');
    const commentInputs = document.querySelectorAll('.comment-input input');
    const mobileMenu = document.getElementById('mobile-menu');
    const leftSidebar = document.querySelector('.left-sidebar');
    const storyModal = document.getElementById('story-modal');
    const closeStoryModal = document.getElementById('close-story-modal');
    const storyUsername = document.getElementById('story-username');
    const storyImage = document.getElementById('story-image');
    const storyVideo = document.getElementById('story-video');

    likeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const likeCount = button.querySelector('.like-count');
            const count = parseInt(likeCount.textContent, 10);
            likeCount.textContent = button.classList.toggle('liked') ? count + 1 : count - 1;
        });
    });

    shareButtons.forEach(button => {
        button.addEventListener('click', () => {
            const shareCount = button.querySelector('.share-count');
            const count = parseInt(shareCount.textContent, 10);
            shareCount.textContent = count + 1;
        });
    });

    signInBtn.addEventListener('click', () => {
        signInModal.style.display = 'flex';
        document.body.classList.add('modal-open');
    });

    signUpBtn.addEventListener('click', () => {
        signUpModal.style.display = 'flex';
        document.body.classList.add('modal-open');
    });

    closeSignIn.addEventListener('click', () => {
        signInModal.style.display = 'none';
        document.body.classList.remove('modal-open');
    });

    closeSignUp.addEventListener('click', () => {
        signUpModal.style.display = 'none';
        document.body.classList.remove('modal-open');
    });

    window.addEventListener('click', (event) => {
        if (event.target == signInModal) {
            signInModal.style.display = 'none';
            document.body.classList.remove('modal-open');
        } else if (event.target == signUpModal) {
            signUpModal.style.display = 'none';
            document.body.classList.remove('modal-open');
        }
    });

    commentInputs.forEach(input => {
        input.addEventListener('keypress', (event) => {
            if (event.key === 'Enter' && input.value.trim() !== '') {
                const comment = document.createElement('div');
                comment.classList.add('comment');
                comment.innerHTML = `<p><strong>You:</strong> ${input.value}</p>`;
                input.closest('.comments').insertBefore(comment, input.closest('.comment-input'));
                input.value = '';
            }
        });
    });

    // Randomly update likes and shares
    setInterval(() => {
        likeButtons.forEach(button => {
            const likeCount = button.querySelector('.like-count');
            const count = parseInt(likeCount.textContent, 10);
            likeCount.textContent = count + Math.floor(Math.random() * 5);
        });

        shareButtons.forEach(button => {
            const shareCount = button.querySelector('.share-count');
            const count = parseInt(shareCount.textContent, 10);
            shareCount.textContent = count + Math.floor(Math.random() * 3);
        });
    }, 5000);

    // Handle mobile menu toggle
    mobileMenu.addEventListener('click', () => {
        if (leftSidebar.classList.contains('open')) {
            leftSidebar.classList.remove('open');
            leftSidebar.classList.add('close');
        } else {
            leftSidebar.classList.remove('close');
            leftSidebar.classList.add('open');
        }
    });

    // Initialize Swiper for post images
    const swiperPosts = new Swiper('.swiper-container', {
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    // Initialize Swiper for stories
    const swiperStories = new Swiper('.stories', {
        slidesPerView: 4,
        spaceBetween: 10,
        freeMode: true,
    });

    // Handle story click
    document.querySelectorAll('.story').forEach(story => {
        story.addEventListener('click', () => {
            const username = story.getAttribute('data-username');
            const imageUrl = story.getAttribute('data-story-image');
            const storyType = story.getAttribute('data-story-type');

            storyUsername.textContent = username;
            if (storyType === 'image') {
                storyImage.src = imageUrl;
                storyImage.style.display = 'block';
                storyVideo.style.display = 'none';
            } else if (storyType === 'video') {
                storyVideo.querySelector('source').src = imageUrl;
                storyVideo.load();
                storyImage.style.display = 'none';
                storyVideo.style.display = 'block';
            }

            storyModal.style.display = 'flex';
            document.body.classList.add('modal-open');
        });
    });

    // Close story modal
    closeStoryModal.addEventListener('click', () => {
        storyModal.style.display = 'none';
        document.body.classList.remove('modal-open');
    });

    window.addEventListener('click', (event) => {
        if (event.target == storyModal) {
            storyModal.style.display = 'none';
            document.body.classList.remove('modal-open');
        }
    });
});
