// Enhanced Dictionary functionality inspired by Jisho.org
document.addEventListener('DOMContentLoaded', function() {
    initializeDictionary();
});

// Complete dictionary data from your CSV (extended dataset)
const dictionaryData = [
    { word: "haisai", definition: "Hello (male greeting)", source: "onookinawa.com", category: "greetings", romaji: "haisai", pronunciation: "/hai.sai/", examples: ["Haisai, genkii? (Hello, how are you?)"] },
    { word: "haitai", definition: "Hello (female greeting)", source: "onookinawa.com", category: "greetings", romaji: "haitai", pronunciation: "/hai.tai/", examples: ["Haitai, choode? (Hello, how are you?)"] },
    { word: "nifee deebiru", definition: "Thank you", source: "onookinawa.com", category: "greetings", romaji: "nifee deebiru", pronunciation: "/ni.feː deː.bi.ɾu/", examples: ["Nifee deebiru, tasukatta. (Thank you, that helped.)"] },
    { word: "mensore", definition: "Welcome", source: "onookinawa.com", category: "greetings", romaji: "mensore", pronunciation: "/men.so.ɾe/", examples: ["Mensore, Okinawa! (Welcome to Okinawa!)"] },
    { word: "uchina", definition: "Okinawa", source: "onookinawa.com", category: "places", romaji: "uchina", pronunciation: "/u.t͡ʃi.na/", examples: ["Uchina nu takara (Okinawa's treasure)"] },
    { word: "uchinanchu", definition: "Okinawan person", source: "onookinawa.com", category: "people", romaji: "uchinanchu", pronunciation: "/u.t͡ʃi.nan.t͡ʃu/", examples: ["Wanu Uchinanchu yain (I am Okinawan)"] },
    { word: "ichariba choodee", definition: "Once we meet, we are family", source: "onookinawa.com", category: "culture", romaji: "ichariba choodee", pronunciation: "/i.t͡ʃa.ɾi.ba t͡ʃoː.deː/", examples: ["This phrase embodies Okinawan hospitality"] },
    { word: "kariyushi", definition: "Good fortune, happiness", source: "onookinawa.com", category: "culture", romaji: "kariyushi", pronunciation: "/ka.ɾi.ju.ʃi/", examples: ["Kariyushi nu kokoro (Heart of good fortune)"] },
    { word: "goya", definition: "Bitter melon", source: "onookinawa.com", category: "food", romaji: "goya", pronunciation: "/go.ja/", examples: ["Goya chanpuru (Bitter melon stir-fry)"] },
    { word: "awamori", definition: "Okinawan distilled spirit", source: "onookinawa.com", category: "food", romaji: "awamori", pronunciation: "/a.wa.mo.ɾi/", examples: ["Awamori wa Okinawa nu sake (Awamori is Okinawa's sake)"] },
    { word: "maasan", definition: "Delicious", source: "onookinawa.com", category: "food", romaji: "maasan", pronunciation: "/maː.san/", examples: ["Kunu ryouri, maasan! (This food is delicious!)"] },
    { word: "teegee", definition: "Take it easy, laid back", source: "onookinawa.com", category: "culture", romaji: "teegee", pronunciation: "/teː.geː/", examples: ["Teegee ni ikuyo (Let's take it easy)"] },
    { word: "yuimaaru", definition: "Cooperation, mutual help", source: "onookinawa.com", category: "culture", romaji: "yuimaaru", pronunciation: "/ju.i.maː.ɾu/", examples: ["Yuimaaru nu kokoro (Spirit of cooperation)"] },
    { word: "chimugurisa", definition: "Heartfelt kindness", source: "onookinawa.com", category: "culture", romaji: "chimugurisa", pronunciation: "/t͡ʃi.mu.gu.ɾi.sa/", examples: ["Chimugurisa ni michita hito (A person filled with kindness)"] },
    { word: "un", definition: "Yes", source: "onookinawa.com", category: "basic", romaji: "un", pronunciation: "/un/", examples: ["Un, wakaribiru (Yes, I understand)"] },
    { word: "aran", definition: "No", source: "onookinawa.com", category: "basic", romaji: "aran", pronunciation: "/a.ɾan/", examples: ["Aran, chigau yo (No, that's different)"] },
    { word: "wakaran", definition: "I don't understand", source: "onookinawa.com", category: "basic", romaji: "wakaran", pronunciation: "/wa.ka.ɾan/", examples: ["Uchinaguchi, wakaran (I don't understand Uchinaguchi)"] },
    { word: "chuu uganabira", definition: "Good afternoon", source: "onookinawa.com", category: "greetings", romaji: "chuu uganabira", pronunciation: "/t͡ʃuː u.ga.na.bi.ɾa/", examples: ["Chuu uganabira, ogenki desu ka? (Good afternoon, how are you?)"] },
    { word: "yutashiku", definition: "Nice to meet you", source: "onookinawa.com", category: "greetings", romaji: "yutashiku unigee sabira", pronunciation: "/ju.ta.ʃi.ku u.ni.geː sa.bi.ɾa/", examples: ["Yutashiku unigee sabira (Nice to meet you)"] },
    { word: "kamee", definition: "Let's eat", source: "onookinawa.com", category: "food", romaji: "kamee", pronunciation: "/ka.meː/", examples: ["Mina, kamee! (Everyone, let's eat!)"] }
];

function initializeDictionary() {
    const searchInput = document.getElementById('searchInput');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const wordGrid = document.getElementById('wordGrid');
    const totalWordsElement = document.getElementById('totalWords');
    const visibleWordsElement = document.getElementById('visibleWords');
    const noResults = document.getElementById('noResults');

    // Initialize display
    displayWords(dictionaryData);
    updateStats(dictionaryData.length, dictionaryData.length);

    // Search functionality with debouncing
    let searchTimeout;
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                const searchTerm = this.value.toLowerCase().trim();
                searchWords(searchTerm);
            }, 300);
        });

        // Enhanced search with Enter key
        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const searchTerm = this.value.toLowerCase().trim();
                searchWords(searchTerm);
                
                // Focus first result for keyboard navigation
                const firstResult = document.querySelector('.word-card');
                if (firstResult) {
                    firstResult.focus();
                }
            }
        });
    }

    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');
            filterWords(filterValue);
        });
    });

    // Add keyboard navigation for word cards
    addKeyboardNavigation();
    
    // Initialize word cards with enhanced interactions
    initializeWordCards();
}

function displayWords(words) {
    const wordGrid = document.getElementById('wordGrid');
    const noResults = document.getElementById('noResults');
    
    if (!wordGrid) return;

    if (words.length === 0) {
        wordGrid.innerHTML = '';
        if (noResults) noResults.style.display = 'block';
        return;
    }

    if (noResults) noResults.style.display = 'none';

    wordGrid.innerHTML = words.map(word => createWordCard(word)).join('');
    
    // Add click handlers for audio pronunciation
    addPronunciationHandlers();
    
    // Add favorite functionality
    addFavoriteHandlers();
    
    // Animate cards entrance
    animateWordCards();
}

function createWordCard(word) {
    const examples = word.examples ? word.examples.join('<br>') : '';
    const categoryIcon = getCategoryIcon(word.category);
    
    return `
        <div class="word-card" data-category="${word.category}" tabindex="0" role="button" aria-label="Word: ${word.word}">
            <div class="word-header">
                <div class="word-title-section">
                    <div class="word-title">${word.word}</div>
                    <div class="word-romaji">${word.romaji}</div>
                    ${word.pronunciation ? `<div class="word-pronunciation">${word.pronunciation}</div>` : ''}
                </div>
                <div class="word-actions">
                    <button class="pronunciation-btn" onclick="playPronunciation('${word.word}')" aria-label="Play pronunciation">
                        🔊
                    </button>
                    <button class="favorite-btn" onclick="toggleFavorite('${word.word}')" aria-label="Add to favorites">
                        ⭐
                    </button>
                </div>
            </div>
            
            <div class="word-definition">${word.definition}</div>
            
            ${examples ? `
                <div class="word-examples">
                    <strong>Examples:</strong><br>
                    <em>${examples}</em>
                </div>
            ` : ''}
            
            <div class="word-footer">
                <span class="word-category">
                    ${categoryIcon} ${word.category}
                </span>
                <span class="word-source">Source: ${word.source}</span>
            </div>
        </div>
    `;
}

function getCategoryIcon(category) {
    const icons = {
        'greetings': '👋',
        'basic': '💬',
        'food': '🍽️',
        'places': '🗺️',
        'people': '👥',
        'culture': '🎭',
        'family': '👨‍👩‍👧‍👦',
        'common': '⭐'
    };
    return icons[category] || '📝';
}

function searchWords(searchTerm) {
    if (!searchTerm) {
        displayWords(dictionaryData);
        updateStats(dictionaryData.length, dictionaryData.length);
        return;
    }

    const filteredWords = dictionaryData.filter(word => {
        const searchFields = [
            word.word.toLowerCase(),
            word.definition.toLowerCase(),
            word.romaji.toLowerCase(),
            word.category.toLowerCase(),
            ...(word.examples || []).map(ex => ex.toLowerCase())
        ];
        
        return searchFields.some(field => field.includes(searchTerm));
    });

    displayWords(filteredWords);
    updateStats(dictionaryData.length, filteredWords.length);
    
    // Highlight search terms
    highlightSearchTerms(searchTerm);
}

function filterWords(filterValue) {
    const filteredWords = filterValue === 'all' 
        ? dictionaryData 
        : dictionaryData.filter(word => word.category === filterValue);

    displayWords(filteredWords);
    updateStats(dictionaryData.length, filteredWords.length);
}

function updateStats(total, visible) {
    const totalWordsElement = document.getElementById('totalWords');
    const visibleWordsElement = document.getElementById('visibleWords');
    
    if (totalWordsElement) totalWordsElement.textContent = total;
    if (visibleWordsElement) visibleWordsElement.textContent = visible;
}

function highlightSearchTerms(searchTerm) {
    const wordCards = document.querySelectorAll('.word-card');
    
    wordCards.forEach(card => {
        const textElements = card.querySelectorAll('.word-title, .word-definition, .word-examples em');
        
        textElements.forEach(element => {
            if (element.innerHTML.toLowerCase().includes(searchTerm)) {
                const regex = new RegExp(`(${searchTerm})`, 'gi');
                element.innerHTML = element.innerHTML.replace(regex, '<mark>$1</mark>');
            }
        });
    });
}

function playPronunciation(word) {
    // Text-to-speech pronunciation
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(word);
        utterance.lang = 'ja-JP'; // Japanese pronunciation as closest approximation
        utterance.rate = 0.8;
        utterance.pitch = 1;
        
        speechSynthesis.speak(utterance);
        
        // Visual feedback
        const button = event.target;
        button.style.transform = 'scale(1.2)';
        button.textContent = '🔉';
        
        setTimeout(() => {
            button.style.transform = 'scale(1)';
            button.textContent = '🔊';
        }, 1000);
    } else {
        // Fallback for browsers without speech synthesis
        alert(`Pronunciation: ${word}\n\nNote: Enable text-to-speech in your browser for audio pronunciation.`);
    }
}

function toggleFavorite(word) {
    const favorites = JSON.parse(localStorage.getItem('uchinaguchi_favorites') || '[]');
    const button = event.target;
    
    if (favorites.includes(word)) {
        // Remove from favorites
        const index = favorites.indexOf(word);
        favorites.splice(index, 1);
        button.textContent = '⭐';
        button.style.color = '#718096';
        showToast(`"${word}" removed from favorites`);
    } else {
        // Add to favorites
        favorites.push(word);
        button.textContent = '⭐';
        button.style.color = '#fbbf24';
        showToast(`"${word}" added to favorites`);
    }
    
    localStorage.setItem('uchinaguchi_favorites', JSON.stringify(favorites));
    
    // Update favorites filter if active
    updateFavoritesFilter();
}

function showToast(message) {
    // Create toast notification
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #2563eb;
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 2000);
}

function addKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        const wordCards = Array.from(document.querySelectorAll('.word-card'));
        const currentFocus = document.activeElement;
        const currentIndex = wordCards.indexOf(currentFocus);
        
        if (currentIndex === -1) return;
        
        switch(e.key) {
            case 'ArrowDown':
                e.preventDefault();
                const nextIndex = Math.min(currentIndex + 3, wordCards.length - 1); // Move down a row
                wordCards[nextIndex].focus();
                break;
                
            case 'ArrowUp':
                e.preventDefault();
                const prevIndex = Math
