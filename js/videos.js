// Enhanced video functionality with modal player
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const videoCards = document.querySelectorAll('.video-card');
    const searchInput = document.getElementById('videoSearch');
    const modal = document.getElementById('videoModal');

    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');
            filterVideos(filterValue);
        });
    });

    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            searchVideos(searchTerm);
        });
    }

    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeVideoModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeVideoModal();
        }
    });
});

function filterVideos(filterValue) {
    const videoCards = document.querySelectorAll('.video-card');
    
    videoCards.forEach(card => {
        if (filterValue === 'all') {
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.3s ease-in';
        } else {
            const cardCategory = card.getAttribute('data-category');
            if (cardCategory === filterValue) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.3s ease-in';
            } else {
                card.style.display = 'none';
            }
        }
    });
}

function searchVideos(searchTerm) {
    const videoCards = document.querySelectorAll('.video-card');
    
    videoCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('.video-description').textContent.toLowerCase();
        const channel = card.querySelector('.video-channel').textContent.toLowerCase();

        if (title.includes(searchTerm) || description.includes(searchTerm) || channel.includes(searchTerm)) {
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.3s ease-in';
        } else {
            card.style.display = 'none';
        }
    });
}

function openVideoModal(videoId, title) {
    const modal = document.getElementById('videoModal');
    const modalTitle = document.getElementById('modalTitle');
    const videoPlayer = document.getElementById('videoPlayer');
    const openYouTube = document.getElementById('openYouTube');

    // Set title
    modalTitle.textContent = title;

    // Create YouTube embed
    const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
    videoPlayer.innerHTML = `<iframe src="${embedUrl}" allowfullscreen allow="autoplay; encrypted-media"></iframe>`;

    // Set YouTube link
    openYouTube.href = `https://www.youtube.com/watch?v=${videoId}`;

    // Show modal with animation
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling

    // Analytics tracking (optional)
    if (typeof gtag !== 'undefined') {
        gtag('event', 'video_play', {
            'video_id': videoId,
            'video_title': title
        });
    }
}

function closeVideoModal() {
    const modal = document.getElementById('videoModal');
    const videoPlayer = document.getElementById('videoPlayer');

    // Hide modal
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling

    // Stop video by clearing iframe
    videoPlayer.innerHTML = '';
}

function loadMoreVideos() {
    // This would typically load more videos from your dataset
    // For now, we'll show a message
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    loadMoreBtn.textContent = 'Loading more videos...';
    loadMoreBtn.disabled = true;

    // Simulate loading delay
    setTimeout(() => {
        alert('This feature will load more videos from your 291-video dataset. For now, you can view the complete dataset via the GitHub link.');
        loadMoreBtn.textContent = 'Load More Videos';
        loadMoreBtn.disabled = false;
    }, 1000);

    // In a real implementation, you would:
    // 1. Fetch more video data from your CSV
    // 2. Create new video cards
    // 3. Append them to the grid
    // 4. Update the counter
}

// Utility function to format view counts
function format
