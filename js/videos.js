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
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeVideoModal();
            }
        });
    }

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.style.display === 'block') {
            closeVideoModal();
        }
    });

    // Initialize video cards with improved accessibility
    initializeVideoCards();
});

function initializeVideoCards() {
    const videoCards = document.querySelectorAll('.video-card');
    
    videoCards.forEach(card => {
        // Add keyboard accessibility
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', 'Play video');
        
        // Enhanced hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 12px 30px rgba(37, 99, 235, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        });

        // Keyboard support
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const playButton = this.querySelector('.video-overlay');
                if (playButton) {
                    playButton.click();
                }
            }
        });
    });
}

function filterVideos(filterValue) {
    const videoCards = document.querySelectorAll('.video-card');
    let visibleCount = 0;
    
    videoCards.forEach(card => {
        if (filterValue === 'all') {
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.3s ease-in';
            visibleCount++;
        } else {
            const cardCategory = card.getAttribute('data-category');
            if (cardCategory === filterValue) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.3s ease-in';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        }
    });
    
    // Update filter button text with count
    const activeButton = document.querySelector('.filter-btn.active');
    if (activeButton && filterValue !== 'all') {
        const originalText = activeButton.textContent.split(' (')[0];
        activeButton.textContent = `${originalText} (${visibleCount})`;
    }
}

function searchVideos(searchTerm) {
    const videoCards = document.querySelectorAll('.video-card');
    let visibleCount = 0;
    
    videoCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('.video-description').textContent.toLowerCase();
        const channel = card.querySelector('.video-channel').textContent.toLowerCase();

        if (title.includes(searchTerm) || description.includes(searchTerm) || channel.includes(searchTerm)) {
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.3s ease-in';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });
    
    // Show/hide no results message
    const noResults = document.getElementById('noResults');
    if (noResults) {
        noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    }
}

function openVideoModal(videoId, title) {
    const modal = document.getElementById('videoModal');
    const modalTitle = document.getElementById('modalTitle');
    const videoPlayer = document.getElementById('videoPlayer');
    const openYouTube = document.getElementById('openYouTube');

    if (!modal || !modalTitle || !videoPlayer || !openYouTube) {
        console.error('Modal elements not found');
        // Fallback: open YouTube directly
        window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
        return;
    }

    // Set title
    modalTitle.textContent = title;

    // Create YouTube embed with enhanced parameters
    const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&showinfo=0&controls=1&enablejsapi=1`;
    videoPlayer.innerHTML = `<iframe 
        src="${embedUrl}" 
        allowfullscreen 
        allow="autoplay; encrypted-media; picture-in-picture"
        title="${title}"
        loading="lazy">
    </iframe>`;

    // Set YouTube link
    openYouTube.href = `https://www.youtube.com/watch?v=${videoId}`;

    // Show modal with animation
    modal.style.display = 'block';
    modal.classList.add('modal-show');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling

    // Focus management for accessibility
    const closeButton = modal.querySelector('.close-btn');
    if (closeButton) {
        closeButton.focus();
    }

    // Analytics tracking (optional)
    if (typeof gtag !== 'undefined') {
        gtag('event', 'video_play', {
            'video_id': videoId,
            'video_title': title,
            'source': 'embedded_modal'
        });
    }

    // Track video engagement
    trackVideoEngagement(videoId, title);
}

function closeVideoModal() {
    const modal = document.getElementById('videoModal');
    const videoPlayer = document.getElementById('videoPlayer');

    if (!modal) return;

    // Hide modal with animation
    modal.classList.remove('modal-show');
    
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
        
        // Stop video by clearing iframe
        if (videoPlayer) {
            videoPlayer.innerHTML = '';
        }
    }, 300);

    // Return focus to the video card that opened the modal
    const focusTarget = document.querySelector('.video-card:focus') || document.querySelector('.video-card');
    if (focusTarget) {
        focusTarget.focus();
    }
}

function loadMoreVideos() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (!loadMoreBtn) return;
    
    loadMoreBtn.textContent = 'Loading more videos...';
    loadMoreBtn.disabled = true;
    loadMoreBtn.style.opacity = '0.6';

    // Simulate loading more videos from your dataset
    setTimeout(() => {
        // In a real implementation, you would load from your CSV data
        const newVideos = getMoreVideosFromDataset();
        
        if (newVideos.length > 0) {
            appendVideosToGrid(newVideos);
            loadMoreBtn.textContent = 'Load More Videos';
            loadMoreBtn.disabled = false;
            loadMoreBtn.style.opacity = '1';
        } else {
            loadMoreBtn.textContent = 'All Videos Loaded';
            loadMoreBtn.disabled = true;
            loadMoreBtn.style.display = 'none';
            
            // Show dataset link
            const datasetLink = document.querySelector('.btn-outline');
            if (datasetLink) {
                datasetLink.style.display = 'inline-block';
            }
        }
    }, 1500);
}

function getMoreVideosFromDataset() {
    // This would typically fetch from your CSV data
    // For now, return sample data structure
    return [
        {
            id: 'sample1',
            title: 'Additional Uchinaguchi Lesson',
            channel: 'Okinawan Learning',
            description: 'Learn more Uchinaguchi phrases and pronunciation',
            views: '1,234',
            duration: '8:45',
            category: 'lessons'
        }
        // Add more videos from your 291-video dataset
    ];
}

function appendVideosToGrid(videos) {
    const videoGrid = document.getElementById('videoGrid');
    if (!videoGrid) return;

    videos.forEach(video => {
        const videoCard = createVideoCard(video);
        videoGrid.appendChild(videoCard);
    });

    // Update counter
    const totalVideos = document.querySelectorAll('.video-card').length;
    const counterElement = document.querySelector('.load-more-section p');
    if (counterElement) {
        counterElement.textContent = `Showing ${totalVideos} of 291 videos`;
    }
}

function createVideoCard(video) {
    const card = document.createElement('div');
    card.className = 'video-card';
    card.setAttribute('data-category', video.category);
    card.setAttribute('data-views', video.views.replace(/,/g, ''));
    
    card.innerHTML = `
        <div class="video-thumbnail" onclick="openVideoModal('${video.id}', '${video.title}')">
            <img src="https://img.youtube.com/vi/${video.id}/maxresdefault.jpg" alt="Video thumbnail">
            <div class="video-overlay">
                <div class="play-button">▶️</div>
                <div class="play-text">Watch Here</div>
            </div>
        </div>
        <div class="video-info">
            <h3>${video.title}</h3>
            <p class="video-channel">${video.channel}</p>
            <p class="video-description">${video.description}</p>
            <div class="video-stats">
                <span class="views">👁️ ${video.views} views</span>
                <span class="duration">⏱️ ${video.duration}</span>
            </div>
            <div class="video-actions">
                <button onclick="openVideoModal('${video.id}', '${video.title}')" class="btn btn-primary">
                    ▶️ Watch Now
                </button>
                <a href="https://www.youtube.com/watch?v=${video.id}" target="_blank" class="btn btn-outline">
                    🔗 YouTube
                </a>
            </div>
        </div>
    `;
    
    return card;
}

function trackVideoEngagement(videoId, title) {
    // Track that user engaged with video content
    const engagement = {
        timestamp: new Date().toISOString(),
        videoId: videoId,
        title: title,
        action: 'modal_opened'
    };
    
    // Store in localStorage for basic analytics
    const engagements = JSON.parse(localStorage.getItem('uchinaguchi_video_engagement') || '[]');
    engagements.push(engagement);
    
    // Keep only last 100 engagements
    if (engagements.length > 100) {
        engagements.splice(0, engagements.length - 100);
    }
    
    localStorage.setItem('uchinaguchi_video_engagement', JSON.stringify(engagements));
}

// Utility function to format view counts
function formatViewCount(count) {
    const num = parseInt(count.replace(/,/g, ''));
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toLocaleString();
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .modal-show {
        animation: modalSlideIn 0.3s ease-out;
    }
    
    @keyframes modalSlideIn {
        from { 
            opacity: 0; 
            transform: scale(0.9) translateY(-20px); 
        }
        to { 
            opacity: 1; 
            transform: scale(1) translateY(0); 
        }
    }
    
    .video-card {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .video-overlay {
        transition: all 0.3s ease;
    }
    
    .play-button {
        transition: transform 0.2s ease;
    }
    
    .video-thumbnail:hover .play-button {
        transform: scale(1.1);
    }
`;

document.head.appendChild(style);

console.log('✅ Enhanced video functionality loaded successfully! 🎥');
