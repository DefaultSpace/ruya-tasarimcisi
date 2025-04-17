document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const appBody = document.getElementById('app-body');
    const dreamCreatorCard = document.getElementById('dream-creator-card');
    const dreamViewerCard = document.getElementById('dream-viewer-card');
    const dreamForm = document.getElementById('dream-form');
    const seedInput = document.getElementById('seed');
    const dreamSeed = document.getElementById('dream-seed');
    const dreamContent = document.getElementById('dream-content');
    const dreamImageContainer = document.getElementById('dream-image-container');
    const dreamImage = document.getElementById('dream-image');
    const loadingOverlay = document.getElementById('loading-overlay');
    const backToCreatorBtn = document.getElementById('back-to-creator');
    const emptyLibrary = document.getElementById('empty-library');
    const dreamList = document.getElementById('dream-list');
    const notification = document.getElementById('notification');
    const notificationContent = document.getElementById('notification-content');
    
    // API Settings Elements
    const apiSettingsBtn = document.getElementById('api-settings-btn');
    const apiSettingsModal = document.getElementById('api-settings-modal');
    const closeApiSettingsBtn = document.getElementById('close-api-settings');
    const geminiApiKeyInput = document.getElementById('gemini-api-key');
    const saveApiKeyBtn = document.getElementById('save-api-key');
    
    // Theme buttons
    const themeButtons = {
        peaceful: document.getElementById('theme-peaceful'),
        cosmic: document.getElementById('theme-cosmic'),
        minimal: document.getElementById('theme-minimal'),
        gothic: document.getElementById('theme-gothic'),
        childhood: document.getElementById('theme-childhood')
    };
    
    // Mode options
    const modeOptions = document.querySelectorAll('.mode-option');
    let selectedMode = 'classic';
    
    // Dream viewer buttons
    const musicBtn = document.getElementById('music-btn');
    const notesBtn = document.getElementById('notes-btn');
    const replayBtn = document.getElementById('replay-btn');
    
    // Music player elements
    const musicPlayer = document.getElementById('music-player');
    const musicTitle = document.getElementById('music-title');
    const musicProgressBar = document.getElementById('music-progress-bar');
    const musicTime = document.getElementById('music-time');
    const playPauseBtn = document.getElementById('play-pause');
    const prevTrackBtn = document.getElementById('prev-track');
    const nextTrackBtn = document.getElementById('next-track');
    const closeMusicPlayerBtn = document.getElementById('close-music-player');
    
    // Notes elements
    const notesContainer = document.getElementById('notes-container');
    const dreamNotes = document.getElementById('dream-notes');
    const saveNotesBtn = document.getElementById('save-notes');
    const closeNotesBtn = document.getElementById('close-notes');
    
    // Replay elements
    const replayOptions = document.getElementById('replay-options');
    const replayOptionBtns = document.querySelectorAll('.replay-option');
    const startReplayBtn = document.getElementById('start-replay');
    const closeReplayBtn = document.getElementById('close-replay');
    let selectedPerspective = 'first';
    
    // Feature buttons
    const featureCards = document.querySelectorAll('.feature-card');
    const featureInfoModal = document.getElementById('feature-info-modal');
    const featureInfoContent = document.getElementById('feature-info-content');
    const closeFeatureInfoModalBtn = document.getElementById('close-feature-info-modal');
    const closeFeatureInfoBtn = document.getElementById('close-feature-info');
    
    // Enhanced Dream Input elements
    const enhancedDreamInputModal = document.getElementById('enhanced-dream-input-modal');
    const closeEnhancedInputBtn = document.getElementById('close-enhanced-input');
    const enhancedSeed = document.getElementById('enhanced-seed');
    const applyEnhancedSeedBtn = document.getElementById('apply-enhanced-seed');
    
    // Dream Analysis elements
    const dreamAnalysisBtn = document.getElementById('dream-analysis-btn');
    const dreamAnalysisModal = document.getElementById('dream-analysis-modal');
    const closeDreamAnalysisBtn = document.getElementById('close-dream-analysis');
    const analysisContent = document.getElementById('analysis-content');
    
    // Dream Image Generator elements
    const dreamImageBtn = document.getElementById('dream-image-btn');
    dreamImageBtn.addEventListener('click', showDreamImage);
    
    // Dream Series elements
    const dreamSeriesBtn = document.getElementById('dream-series-btn');
    
    // Current theme
    let currentTheme = 'peaceful';
    
    // Current dream
    let currentDream = null;
    
    // Dreams storage
    let dreams = JSON.parse(localStorage.getItem('dreams')) || [];
    
    // Music tracks
    const musicTracks = {
        peaceful: [
            { title: 'Huzurlu Okyanus Sesleri', duration: 180 },
            { title: 'Yağmur ve Piyano', duration: 210 },
            { title: 'Orman Ambiyansı', duration: 195 }
        ],
        cosmic: [
            { title: 'Uzay Yolculuğu', duration: 240 },
            { title: 'Galaktik Meditasyon', duration: 225 },
            { title: 'Yıldızlar Arası', duration: 195 }
        ],
        minimal: [
            { title: 'Minimal Piyano', duration: 180 },
            { title: 'Sade Ambiyans', duration: 210 },
            { title: 'Sessizliğin Sesi', duration: 165 }
        ],
        gothic: [
            { title: 'Gotik Org', duration: 210 },
            { title: 'Karanlık Melodi', duration: 195 },
            { title: 'Gizemli Sesler', duration: 225 }
        ],
        childhood: [
            { title: 'Ninni', duration: 180 },
            { title: 'Çocukluk Anıları', duration: 165 },
            { title: 'Masal Müziği', duration: 195 }
        ]
    };
    
    // Current music state
    let musicState = {
        playing: false,
        currentTrack: 0,
        currentTime: 0,
        duration: 180,
        interval: null,
        theme: 'peaceful'
    };
    
    // Initialize the app
    function init() {
        // Load API key from storage
        if (getGeminiApiKey()) {
            geminiApiKeyInput.value = getGeminiApiKey();
        }
        
        // Set up event listeners
        setupEventListeners();
        
        // Update dream library
        updateDreamLibrary();
        
        // Check if API key is set
        checkApiKeyStatus();
    }
    
    // Check API key status and show notification if needed
    function checkApiKeyStatus() {
        if (!isApiKeySet()) {
            showNotification(
                '<i class="fas fa-info-circle text-blue-500 mr-2 text-xl"></i>' +
                '<div>' +
                '<div class="font-medium">API anahtarı ayarlanmamış</div>' +
                '<div class="text-sm opacity-70">Gelişmiş özellikleri kullanmak için API anahtarınızı ayarlayın</div>' +
                '</div>',
                'info',
                8000
            );
        }
    }
    
    // Set up event listeners
    function setupEventListeners() {
        // API Settings
        apiSettingsBtn.addEventListener('click', toggleApiSettingsModal);
        closeApiSettingsBtn.addEventListener('click', toggleApiSettingsModal);
        saveApiKeyBtn.addEventListener('click', saveApiKey);
        
        // Theme buttons
        Object.keys(themeButtons).forEach(theme => {
            themeButtons[theme].addEventListener('click', () => changeTheme(theme));
        });
        
        // Dream form submission
        dreamForm.addEventListener('submit', handleDreamFormSubmit);
        
        // Mode options
        modeOptions.forEach(option => {
            option.addEventListener('click', () => selectMode(option));
        });
        
        // Back to creator button
        backToCreatorBtn.addEventListener('click', showDreamCreator);
        
        // Dream viewer buttons
        musicBtn.addEventListener('click', toggleMusicPlayer);
        notesBtn.addEventListener('click', toggleNotesContainer);
        replayBtn.addEventListener('click', toggleReplayOptions);
        
        // Music player controls
        playPauseBtn.addEventListener('click', togglePlayPause);
        prevTrackBtn.addEventListener('click', playPreviousTrack);
        nextTrackBtn.addEventListener('click', playNextTrack);
        closeMusicPlayerBtn.addEventListener('click', toggleMusicPlayer);
        
        // Notes controls
        saveNotesBtn.addEventListener('click', saveNotes);
        closeNotesBtn.addEventListener('click', toggleNotesContainer);
        
        // Replay controls
        replayOptionBtns.forEach(option => {
            option.addEventListener('click', () => selectReplayPerspective(option));
        });
        startReplayBtn.addEventListener('click', startReplay);
        closeReplayBtn.addEventListener('click', toggleReplayOptions);
        
        // Feature cards
        featureCards.forEach(card => {
            card.addEventListener('click', (e) => handleFeatureCard(e.currentTarget.id));
        });
        
        // Feature info modal controls
        closeFeatureInfoModalBtn.addEventListener('click', closeFeatureInfoModal);
        closeFeatureInfoBtn.addEventListener('click', closeFeatureInfoModal);
        
        // Enhanced Dream Input controls
        closeEnhancedInputBtn.addEventListener('click', closeEnhancedInput);
        applyEnhancedSeedBtn.addEventListener('click', applyEnhancedSeed);
        
        // Dream Analysis controls
        closeDreamAnalysisBtn.addEventListener('click', closeDreamAnalysis);
    }
    
    // Toggle API Settings Modal
    function toggleApiSettingsModal() {
        apiSettingsModal.classList.toggle('hidden');
    }
    
    // Save API Key
    function saveApiKey() {
        const apiKey = geminiApiKeyInput.value.trim();
        if (apiKey) {
            if (setGeminiApiKey(apiKey)) {
                showNotification(
                    '<i class="fas fa-check-circle text-green-500 mr-2 text-xl"></i>' +
                    '<div>' +
                    '<div class="font-medium">API anahtarı başarıyla kaydedildi</div>' +
                    '<div class="text-sm opacity-70">Artık gelişmiş özellikleri kullanabilirsiniz</div>' +
                    '</div>',
                    'success'
                );
                toggleApiSettingsModal();
            } else {
                showNotification(
                    '<i class="fas fa-exclamation-circle text-red-500 mr-2 text-xl"></i>' +
                    '<div>' +
                    '<div class="font-medium">API anahtarı kaydedilemedi</div>' +
                    '<div class="text-sm opacity-70">Lütfen geçerli bir API anahtarı girin</div>' +
                    '</div>',
                    'error'
                );
            }
        } else {
            showNotification(
                '<i class="fas fa-exclamation-circle text-red-500 mr-2 text-xl"></i>' +
                '<div>' +
                '<div class="font-medium">API anahtarı boş olamaz</div>' +
                '<div class="text-sm opacity-70">Lütfen geçerli bir API anahtarı girin</div>' +
                '</div>',
                'error'
            );
        }
    }
    
    // Change theme
    function changeTheme(theme) {
        // Remove all theme classes
        appBody.classList.remove('theme-peaceful', 'theme-cosmic', 'theme-minimal', 'theme-gothic', 'theme-childhood');
        
        // Add selected theme class
        appBody.classList.add(`theme-${theme}`);
        
        // Update dream cards
        const dreamCards = document.querySelectorAll('[class*="dream-card-"]');
        dreamCards.forEach(card => {
            // Remove all theme classes
            card.classList.remove('dream-card-peaceful', 'dream-card-cosmic', 'dream-card-minimal', 'dream-card-gothic', 'dream-card-childhood');
            // Add new theme class
            card.classList.add(`dream-card-${theme}`);
        });
        
        // Update buttons
        const buttons = document.querySelectorAll('[class*="btn-"]');
        buttons.forEach(button => {
            // Remove all theme classes
            button.classList.remove('btn-peaceful', 'btn-cosmic', 'btn-minimal', 'btn-gothic', 'btn-childhood');
            // Add new theme class
            button.classList.add(`btn-${theme}`);
        });
        
        // Update input fields
        const inputs = document.querySelectorAll('[class*="input-"]');
        inputs.forEach(input => {
            // Remove all theme classes
            input.classList.remove('input-peaceful', 'input-cosmic', 'input-minimal', 'input-gothic', 'input-childhood');
            // Add new theme class
            input.classList.add(`input-${theme}`);
        });
        
        // Update mode options
        modeOptions.forEach(option => {
            option.classList.remove(
                'border-peaceful', 'border-cosmic', 'border-minimal', 'border-gothic', 'border-childhood',
                'border-peaceful-light/30', 'border-cosmic-light/30', 'border-minimal-light/30', 'border-gothic-light/30', 'border-childhood-light/30',
                'hover:border-peaceful', 'hover:border-cosmic', 'hover:border-minimal', 'hover:border-gothic', 'hover:border-childhood'
            );
            
            if (option.classList.contains('selected-mode')) {
                option.classList.add(`border-${theme}`);
            } else {
                option.classList.add(`border-${theme}-light/30`);
                option.classList.add(`hover:border-${theme}`);
            }
        });
        
        // Update replay options
        replayOptionBtns.forEach(option => {
            option.classList.remove(
                'border-peaceful', 'border-cosmic', 'border-minimal', 'border-gothic', 'border-childhood',
                'border-peaceful-light/30', 'border-cosmic-light/30', 'border-minimal-light/30', 'border-gothic-light/30', 'border-childhood-light/30',
                'hover:border-peaceful', 'hover:border-cosmic', 'hover:border-minimal', 'hover:border-gothic', 'hover:border-childhood'
            );
            
            if (option.classList.contains('selected-replay')) {
                option.classList.add(`border-${theme}`);
            } else {
                option.classList.add(`border-${theme}-light/30`);
                option.classList.add(`hover:border-${theme}`);
            }
        });
        
        // Update feature cards
        featureCards.forEach(btn => {
            btn.classList.remove(
                'border-peaceful-light/30', 'border-cosmic-light/30', 'border-minimal-light/30', 'border-gothic-light/30', 'border-childhood-light/30',
                'hover:border-peaceful', 'hover:border-cosmic', 'hover:border-minimal', 'hover:border-gothic', 'hover:border-childhood'
            );
            
            btn.classList.add(`border-${theme}-light/30`);
            btn.classList.add(`hover:border-${theme}`);
        });
        
        // Save current theme
        currentTheme = theme;
        
        // Update music theme if player is open
        if (!musicPlayer.classList.contains('hidden')) {
            musicState.theme = theme;
            updateMusicPlayer();
        }
    }
    
    // Select mode
    function selectMode(option) {
        // Remove selected class from all options
        modeOptions.forEach(opt => {
            opt.classList.remove('selected-mode');
            opt.classList.remove(`border-${currentTheme}`);
            opt.classList.add(`border-${currentTheme}-light/30`);
        });
        
        // Add selected class to clicked option
        option.classList.add('selected-mode');
        option.classList.remove(`border-${currentTheme}-light/30`);
        option.classList.add(`border-${currentTheme}`);
        
        // Update selected mode
        selectedMode = option.dataset.mode;
    }
    
    // Handle dream form submit
    function handleDreamFormSubmit(e) {
        e.preventDefault();
        
        const seed = seedInput.value.trim();
        if (!seed) {
            showNotification(
                '<i class="fas fa-exclamation-circle text-red-500 mr-2 text-xl"></i>' +
                '<div>' +
                '<div class="font-medium">Lütfen bir rüya tohumu girin</div>' +
                '</div>',
                'error'
            );
            return;
        }
        
        // Show loading overlay
        loadingOverlay.classList.remove('hidden');
        
        // Call the Gemini API to generate dream content
        generateDreamWithGeminiAPI(seed, selectedMode)
            .then(dreamText => {
                // Create new dream object
                currentDream = {
                    id: Date.now(),
                    seed: seed,
                    content: dreamText,
                    mode: selectedMode,
                    theme: currentTheme,
                    date: new Date().toLocaleDateString('tr-TR'),
                    notes: '',
                    hasImage: false
                };
                
                // Save dream to storage
                dreams.push(currentDream);
                localStorage.setItem('dreams', JSON.stringify(dreams));
                
                // Update dream library
                updateDreamLibrary();
                
                // Update dream viewer
                updateDreamViewer();
                
                // Show dream viewer
                showDreamViewer();
                
                // Hide loading overlay
                loadingOverlay.classList.add('hidden');
                
                // Show notification
                showNotification(
                    '<i class="fas fa-check-circle text-green-500 mr-2 text-xl"></i>' +
                    '<div>' +
                    '<div class="font-medium">Rüyanız başarıyla oluşturuldu!</div>' +
                    '</div>',
                    'success'
                );
            })
            .catch(error => {
                console.error('Rüya oluşturma hatası:', error);
                
                // Generate mock dream content as fallback
                const mockContent = generateMockDreamContent(seed, selectedMode);
                
                // Create new dream object
                currentDream = {
                    id: Date.now(),
                    seed: seed,
                    content: mockContent,
                    mode: selectedMode,
                    theme: currentTheme,
                    date: new Date().toLocaleDateString('tr-TR'),
                    notes: '',
                    hasImage: false
                };
                
                // Save dream to storage
                dreams.push(currentDream);
                localStorage.setItem('dreams', JSON.stringify(dreams));
                
                // Update dream library
                updateDreamLibrary();
                
                // Update dream viewer
                updateDreamViewer();
                
                // Show dream viewer
                showDreamViewer();
                
                // Hide loading overlay
                loadingOverlay.classList.add('hidden');
                
                // Show notification
                showNotification(
                    '<i class="fas fa-exclamation-circle text-yellow-500 mr-2 text-xl"></i>' +
                    '<div>' +
                    '<div class="font-medium">Rüyanız oluşturuldu (çevrimdışı mod)</div>' +
                    '<div class="text-sm opacity-70">API bağlantısı kurulamadı, yerel içerik kullanıldı</div>' +
                    '</div>',
                    'warning'
                );
            });
    }
    
    // Update dream viewer
    function updateDreamViewer() {
        if (currentDream) {
            dreamSeed.textContent = currentDream.seed;
            dreamContent.textContent = currentDream.content;
            dreamNotes.value = currentDream.notes || '';
            
            // Hide dream image by default
            dreamImageContainer.classList.add('hidden');
            
            // Update theme
            changeTheme(currentDream.theme);
        }
    }
    
    // Show dream viewer
    function showDreamViewer() {
        dreamCreatorCard.classList.add('hidden');
        dreamViewerCard.classList.remove('hidden');
    }
    
    // Show dream creator
    function showDreamCreator() {
        dreamViewerCard.classList.add('hidden');
        dreamCreatorCard.classList.remove('hidden');
        
        // Reset form
        seedInput.value = '';
    }
    
    // Update dream library
    function updateDreamLibrary() {
        // Clear dream list
        dreamList.innerHTML = '';
        
        if (dreams.length === 0) {
            // Show empty library message
            emptyLibrary.classList.remove('hidden');
        } else {
            // Hide empty library message
            emptyLibrary.classList.add('hidden');
            
            // Add dreams to list (most recent first)
            dreams.slice().reverse().forEach(dream => {
                const dreamCard = document.createElement('div');
                dreamCard.className = `dream-card-${currentTheme} p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer`;
                dreamCard.innerHTML = `
                    <div class="flex justify-between items-start">
                        <div>
                            <div class="font-medium">${dream.seed}</div>
                            <div class="text-sm opacity-70">${dream.date}</div>
                        </div>
                        <div class="flex space-x-1">
                            <span class="px-2 py-1 text-xs rounded-full bg-black/10">${getDreamModeName(dream.mode)}</span>
                        </div>
                    </div>
                    <div class="mt-2 text-sm line-clamp-3 opacity-80">
                        ${dream.content.substring(0, 150)}...
                    </div>
                `;
                
                // Add click event to view dream
                dreamCard.addEventListener('click', () => {
                    currentDream = dream;
                    updateDreamViewer();
                    showDreamViewer();
                });
                
                dreamList.appendChild(dreamCard);
            });
        }
    }
    
    // Toggle music player
    function toggleMusicPlayer() {
        musicPlayer.classList.toggle('hidden');
        
        if (!musicPlayer.classList.contains('hidden')) {
            // Update music player
            musicState.theme = currentTheme;
            updateMusicPlayer();
        } else {
            // Stop music
            stopMusic();
        }
    }
    
    // Update music player
    function updateMusicPlayer() {
        const tracks = musicTracks[musicState.theme];
        const track = tracks[musicState.currentTrack];
        
        musicTitle.textContent = track.title;
        musicState.duration = track.duration;
        musicTime.textContent = `0:00 / ${formatTime(track.duration)}`;
        musicProgressBar.style.width = '0%';
    }
    
    // Toggle play/pause
    function togglePlayPause() {
        if (musicState.playing) {
            pauseMusic();
        } else {
            playMusic();
        }
    }
    
    // Play music
    function playMusic() {
        musicState.playing = true;
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        
        // Start interval to update progress
        musicState.interval = setInterval(() => {
            musicState.currentTime++;
            
            if (musicState.currentTime >= musicState.duration) {
                // Move to next track
                playNextTrack();
            } else {
                // Update progress
                const progress = (musicState.currentTime / musicState.duration) * 100;
                musicProgressBar.style.width = `${progress}%`;
                musicTime.textContent = `${formatTime(musicState.currentTime)} / ${formatTime(musicState.duration)}`;
            }
        }, 1000);
    }
    
    // Pause music
    function pauseMusic() {
        musicState.playing = false;
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        
        // Clear interval
        clearInterval(musicState.interval);
    }
    
    // Stop music
    function stopMusic() {
        pauseMusic();
        musicState.currentTime = 0;
        musicProgressBar.style.width = '0%';
        musicTime.textContent = `0:00 / ${formatTime(musicState.duration)}`;
    }
    
    // Play previous track
    function playPreviousTrack() {
        const tracks = musicTracks[musicState.theme];
        
        // Decrement track index
        musicState.currentTrack--;
        if (musicState.currentTrack < 0) {
            musicState.currentTrack = tracks.length - 1;
        }
        
        // Reset time
        musicState.currentTime = 0;
        
        // Update player
        updateMusicPlayer();
        
        // Continue playing if already playing
        if (musicState.playing) {
            pauseMusic();
            playMusic();
        }
    }
    
    // Play next track
    function playNextTrack() {
        const tracks = musicTracks[musicState.theme];
        
        // Increment track index
        musicState.currentTrack++;
        if (musicState.currentTrack >= tracks.length) {
            musicState.currentTrack = 0;
        }
        
        // Reset time
        musicState.currentTime = 0;
        
        // Update player
        updateMusicPlayer();
        
        // Continue playing if already playing
        if (musicState.playing) {
            pauseMusic();
            playMusic();
        }
    }
    
    // Format time (seconds to MM:SS)
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    
    // Toggle notes container
    function toggleNotesContainer() {
        notesContainer.classList.toggle('hidden');
    }
    
    // Save notes
    function saveNotes() {
        if (currentDream) {
            currentDream.notes = dreamNotes.value;
            
            // Update dream in storage
            const dreamIndex = dreams.findIndex(d => d.id === currentDream.id);
            if (dreamIndex !== -1) {
                dreams[dreamIndex] = currentDream;
                localStorage.setItem('dreams', JSON.stringify(dreams));
            }
            
            // Show notification
            showNotification(
                '<i class="fas fa-check-circle text-green-500 mr-2 text-xl"></i>' +
                '<div>' +
                '<div class="font-medium">Notlarınız kaydedildi</div>' +
                '</div>',
                'success'
            );
        }
    }
    
    // Toggle replay options
    function toggleReplayOptions() {
        replayOptions.classList.toggle('hidden');
    }
    
    // Select replay perspective
    function selectReplayPerspective(option) {
        // Remove selected class from all options
        replayOptionBtns.forEach(opt => {
            opt.classList.remove('selected-replay');
            opt.classList.remove(`border-${currentTheme}`);
            opt.classList.add(`border-${currentTheme}-light/30`);
        });
        
        // Add selected class to clicked option
        option.classList.add('selected-replay');
        option.classList.remove(`border-${currentTheme}-light/30`);
        option.classList.add(`border-${currentTheme}`);
        
        // Update selected perspective
        selectedPerspective = option.dataset.perspective;
    }
    
    // Start replay
    function startReplay() {
        if (currentDream) {
            // Hide replay options
            toggleReplayOptions();
            
            // Show loading overlay
            loadingOverlay.classList.remove('hidden');
            
            // Simulate loading time
            setTimeout(() => {
                // Hide loading overlay
                loadingOverlay.classList.add('hidden');
                
                // Show notification
                showNotification(
                    '<i class="fas fa-play-circle text-green-500 mr-2 text-xl"></i>' +
                    '<div>' +
                    '<div class="font-medium">Rüya tekrar oynatılıyor</div>' +
                    '<div class="text-sm opacity-70">Perspektif: ' + getReplayPerspectiveName(selectedPerspective) + '</div>' +
                    '</div>',
                    'success'
                );
            }, 1500);
        }
    }
    
    // Get replay perspective name
    function getReplayPerspectiveName(perspective) {
        switch(perspective) {
            case 'first': return 'Birinci Şahıs';
            case 'third': return 'Üçüncü Şahıs';
            case 'observer': return 'Gözlemci';
            default: return 'Bilinmeyen Perspektif';
        }
    }
    
    // Handle feature card click
    function handleFeatureCard(id) {
        if (!isApiKeySet()) {
            showApiKeyRequiredNotification();
            return;
        }
        
        switch(id) {
            case 'dream-image-btn':
                showDreamImage();
                break;
            case 'dream-analysis-btn':
                showDreamAnalysis();
                break;
            case 'dream-series-btn':
                showDreamSeries();
                break;
        }
    }
    
    // Show API key required notification
    function showApiKeyRequiredNotification() {
        showNotification(
            '<i class="fas fa-key text-yellow-500 mr-2 text-xl"></i>' +
            '<div>' +
            '<div class="font-medium">API anahtarı gerekli</div>' +
            '<div class="text-sm opacity-70">Bu özelliği kullanmak için API anahtarınızı ayarlayın</div>' +
            '</div>',
            'warning'
        );
        
        // Show API settings modal
        toggleApiSettingsModal();
    }
    
    // Show dream image
    function showDreamImage() {
        if (!currentDream) {
            showNotification(
                '<i class="fas fa-exclamation-circle text-yellow-500 mr-2 text-xl"></i>' +
                '<div>' +
                '<div class="font-medium">Aktif rüya bulunamadı</div>' +
                '<div class="text-sm opacity-70">Lütfen önce bir rüya oluşturun</div>' +
                '</div>',
                'warning'
            );
            return;
        }
        
        if (!isApiKeySet()) {
            showApiKeyRequiredNotification();
            return;
        }
        
        // Show loading overlay
        loadingOverlay.classList.remove('hidden');
        
        // Generate image prompt
        generateImagePromptWithGeminiAPI(currentDream.content, currentDream.mode)
            .then(imagePrompt => {
                // Here you would normally call an image generation API with the prompt
                // For now, we'll just show a placeholder image based on the dream mode
                
                const modeImages = {
                    classic: 'images/bg-peaceful.jpeg',
                    lucid: 'images/bg-cosmic.webp',
                    nightmare: 'images/bg-gothic.webp',
                    complex: 'images/bg-minimal.jpeg'
                };
                
                const imageSrc = modeImages[currentDream.mode] || modeImages.classic;
                
                // Set image source
                dreamImage.src = imageSrc;
                
                // Show image container
                dreamImageContainer.classList.remove('hidden');
                
                // Update dream in storage
                currentDream.hasImage = true;
                const dreamIndex = dreams.findIndex(d => d.id === currentDream.id);
                if (dreamIndex !== -1) {
                    dreams[dreamIndex] = currentDream;
                    localStorage.setItem('dreams', JSON.stringify(dreams));
                }
                
                // Hide loading overlay
                loadingOverlay.classList.add('hidden');
                
                // Show notification
                showNotification(
                    '<i class="fas fa-image text-green-500 mr-2 text-xl"></i>' +
                    '<div>' +
                    '<div class="font-medium">Rüya görseli oluşturuldu</div>' +
                    '<div class="text-sm opacity-70">Görsel prompt: ' + imagePrompt.substring(0, 50) + '...</div>' +
                    '</div>',
                    'success'
                );
            })
            .catch(error => {
                console.error('Görsel oluşturma hatası:', error);
                
                // Hide loading overlay
                loadingOverlay.classList.add('hidden');
                
                // Show notification
                showNotification(
                    '<i class="fas fa-exclamation-circle text-red-500 mr-2 text-xl"></i>' +
                    '<div>' +
                    '<div class="font-medium">Görsel oluşturulamadı</div>' +
                    '<div class="text-sm opacity-70">Lütfen daha sonra tekrar deneyin</div>' +
                    '</div>',
                    'error'
                );
            });
    }
    
    // Show dream analysis
    function showDreamAnalysis() {
        if (!currentDream) {
            showNotification(
                '<i class="fas fa-exclamation-circle text-yellow-500 mr-2 text-xl"></i>' +
                '<div>' +
                '<div class="font-medium">Aktif rüya bulunamadı</div>' +
                '<div class="text-sm opacity-70">Lütfen önce bir rüya oluşturun</div>' +
                '</div>',
                'warning'
            );
            return;
        }
        
        if (!isApiKeySet()) {
            showApiKeyRequiredNotification();
            return;
        }
        
        // Show loading overlay
        loadingOverlay.classList.remove('hidden');
        
        // Analyze dream
        analyzeDreamWithGeminiAPI(currentDream.content, currentDream.mode)
            .then(analysis => {
                // Set analysis content
                analysisContent.innerHTML = analysis;
                
                // Show analysis modal
                dreamAnalysisModal.classList.remove('hidden');
                
                // Hide loading overlay
                loadingOverlay.classList.add('hidden');
            })
            .catch(error => {
                console.error('Rüya analizi hatası:', error);
                
                // Hide loading overlay
                loadingOverlay.classList.add('hidden');
                
                // Show notification
                showNotification(
                    '<i class="fas fa-exclamation-circle text-red-500 mr-2 text-xl"></i>' +
                    '<div>' +
                    '<div class="font-medium">Rüya analizi yapılamadı</div>' +
                    '<div class="text-sm opacity-70">Lütfen daha sonra tekrar deneyin</div>' +
                    '</div>',
                    'error'
                );
            });
    }
    
    // Close dream analysis
    function closeDreamAnalysis() {
        dreamAnalysisModal.classList.add('hidden');
    }
    
    // Show dream series
    function showDreamSeries() {
        if (!currentDream) {
            showNotification(
                '<i class="fas fa-exclamation-circle text-yellow-500 mr-2 text-xl"></i>' +
                '<div>' +
                '<div class="font-medium">Aktif rüya bulunamadı</div>' +
                '<div class="text-sm opacity-70">Lütfen önce bir rüya oluşturun</div>' +
                '</div>',
                'warning'
            );
            return;
        }
        
        if (!isApiKeySet()) {
            showApiKeyRequiredNotification();
            return;
        }
        
        // Show loading overlay
        loadingOverlay.classList.remove('hidden');
        
        // Generate dream series
        generateDreamSeriesWithGeminiAPI(currentDream.seed, currentDream.mode)
            .then(series => {
                // Set series content
                document.getElementById('series-content').innerHTML = series;
                
                // Show series modal
                document.getElementById('dream-series-modal').classList.remove('hidden');
                
                // Hide loading overlay
                loadingOverlay.classList.add('hidden');
                
                // Add event listener to close button
                document.getElementById('close-dream-series').addEventListener('click', () => {
                    document.getElementById('dream-series-modal').classList.add('hidden');
                });
            })
            .catch(error => {
                console.error('Rüya serisi oluşturma hatası:', error);
                
                // Hide loading overlay
                loadingOverlay.classList.add('hidden');
                
                // Show notification
                showNotification(
                    '<i class="fas fa-exclamation-circle text-red-500 mr-2 text-xl"></i>' +
                    '<div>' +
                    '<div class="font-medium">Rüya serisi oluşturulamadı</div>' +
                    '<div class="text-sm opacity-70">Lütfen daha sonra tekrar deneyin</div>' +
                    '</div>',
                    'error'
                );
            });
    }
    
    // Close feature info modal
    function closeFeatureInfoModal() {
        featureInfoModal.classList.add('hidden');
    }
    
    // Close enhanced input
    function closeEnhancedInput() {
        enhancedDreamInputModal.classList.add('hidden');
    }
    
    // Apply enhanced seed
    function applyEnhancedSeed() {
        const seed = enhancedSeed.value.trim();
        if (seed) {
            seedInput.value = seed;
            closeEnhancedInput();
        }
    }
    
    // Show notification
    function showNotification(content, type = 'info', duration = 5000) {
        // Set notification content
        notificationContent.innerHTML = content;
        
        // Set notification type
        notification.className = 'fixed bottom-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 max-w-sm animate-slide-up';
        
        switch(type) {
            case 'success':
                notification.classList.add('border-l-4', 'border-green-500');
                break;
            case 'error':
                notification.classList.add('border-l-4', 'border-red-500');
                break;
            case 'warning':
                notification.classList.add('border-l-4', 'border-yellow-500');
                break;
            default:
                notification.classList.add('border-l-4', 'border-blue-500');
        }
        
        // Show notification
        notification.classList.remove('hidden');
        
        // Hide notification after duration
        setTimeout(() => {
            notification.classList.add('hidden');
        }, duration);
    }
    
    // Helper function to get dream mode name
    function getDreamModeName(mode) {
        switch(mode) {
            case 'classic': return 'Klasik Rüya';
            case 'lucid': return 'Lucid Rüya';
            case 'nightmare': return 'Kabus Dönüşümü';
            case 'complex': return 'Karmaşık Evren';
            default: return 'Bilinmeyen Mod';
        }
    }
    
    // Initialize the app
    init();
});
