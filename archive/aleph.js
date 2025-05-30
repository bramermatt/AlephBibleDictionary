  const greekAlphabet = [
      { letter: "Α", name: "Alpha", transliteration: "A", pronunciation: "AL-fah" },
      { letter: "Β", name: "Beta", transliteration: "B", pronunciation: "BAY-tah" },
      { letter: "Γ", name: "Gamma", transliteration: "G", pronunciation: "GAM-ah" },
      { letter: "Δ", name: "Delta", transliteration: "D", pronunciation: "DEL-tah" },
      { letter: "Ε", name: "Epsilon", transliteration: "E", pronunciation: "EP-si-lon" },
      { letter: "Ζ", name: "Zeta", transliteration: "Z", pronunciation: "ZAY-tah" },
      { letter: "Η", name: "Eta", transliteration: "Ē", pronunciation: "AY-tah" },
      { letter: "Θ", name: "Theta", transliteration: "Th", pronunciation: "THAY-tah" },
      { letter: "Ι", name: "Iota", transliteration: "I", pronunciation: "eye-OH-tah" },
      { letter: "Κ", name: "Kappa", transliteration: "K", pronunciation: "KAP-ah" },
      { letter: "Λ", name: "Lambda", transliteration: "L", pronunciation: "LAM-dah" },
      { letter: "Μ", name: "Mu", transliteration: "M", pronunciation: "myoo" },
      { letter: "Ν", name: "Nu", transliteration: "N", pronunciation: "noo" },
      { letter: "Ξ", name: "Xi", transliteration: "X", pronunciation: "ksee" },
      { letter: "Ο", name: "Omicron", transliteration: "O", pronunciation: "OH-mi-kron" },
      { letter: "Π", name: "Pi", transliteration: "P", pronunciation: "pie" },
      { letter: "Ρ", name: "Rho", transliteration: "R", pronunciation: "row" },
      { letter: "Σ", name: "Sigma", transliteration: "S", pronunciation: "SIG-mah" },
      { letter: "Τ", name: "Tau", transliteration: "T", pronunciation: "tow" },
      { letter: "Υ", name: "Upsilon", transliteration: "U", pronunciation: "OOP-si-lon" },
      { letter: "Φ", name: "Phi", transliteration: "Ph", pronunciation: "fie" },
      { letter: "Χ", name: "Chi", transliteration: "Ch", pronunciation: "kie" },
      { letter: "Ψ", name: "Psi", transliteration: "Ps", pronunciation: "psee" },
      { letter: "Ω", name: "Omega", transliteration: "Ō", pronunciation: "oh-MAY-gah" },
    ];

    const hebrewAlphabet = [
      { letter: "א", name: "Aleph", transliteration: "ʾ", pronunciation: "AH-lef" },
      { letter: "ב", name: "Bet", transliteration: "B", pronunciation: "bayt" },
      { letter: "ג", name: "Gimel", transliteration: "G", pronunciation: "GEE-mel" },
      { letter: "ד", name: "Dalet", transliteration: "D", pronunciation: "DAH-let" },
      { letter: "ה", name: "He", transliteration: "H", pronunciation: "hay" },
      { letter: "ו", name: "Vav", transliteration: "V", pronunciation: "vahv" },
      { letter: "ז", name: "Zayin", transliteration: "Z", pronunciation: "ZAH-yin" },
      { letter: "ח", name: "Chet", transliteration: "Ḥ", pronunciation: "khet" },
      { letter: "ט", name: "Tet", transliteration: "Ṭ", pronunciation: "tayt" },
      { letter: "י", name: "Yod", transliteration: "Y", pronunciation: "yohd" },
      { letter: "כ", name: "Kaf", transliteration: "K", pronunciation: "kahf" },
      { letter: "ל", name: "Lamed", transliteration: "L", pronunciation: "LAH-med" },
      { letter: "מ", name: "Mem", transliteration: "M", pronunciation: "mem" },
      { letter: "נ", name: "Nun", transliteration: "N", pronunciation: "noon" },
      { letter: "ס", name: "Samekh", transliteration: "S", pronunciation: "SAH-mekh" },
      { letter: "ע", name: "Ayin", transliteration: "ʿ", pronunciation: "AH-yin" },
      { letter: "פ", name: "Pe", transliteration: "P", pronunciation: "pay" },
      { letter: "צ", name: "Tsade", transliteration: "Ṣ", pronunciation: "TSAH-day" },
      { letter: "ק", name: "Qof", transliteration: "Q", pronunciation: "kohf" },
      { letter: "ר", name: "Resh", transliteration: "R", pronunciation: "raysh" },
      { letter: "ש", name: "Shin", transliteration: "Sh/S", pronunciation: "sheen" },
      { letter: "ת", name: "Tav", transliteration: "T", pronunciation: "tahv" },
    ];

    let currentFilter = 'all';
    let searchTerm = '';
    let interactionCount = 0;
    let isDarkMode = false;

    function renderAlphabet(list, elementId, type) {
      const container = document.getElementById(elementId);
      container.innerHTML = "";
      
      const filteredList = list.filter(item => {
        const matchesSearch = searchTerm === '' || 
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.letter.includes(searchTerm);
        const matchesFilter = currentFilter === 'all' || currentFilter === type;
        return matchesSearch && matchesFilter;
      });
      
      filteredList.forEach(({ letter, name, transliteration, pronunciation }, index) => {
        const card = document.createElement("div");
        const isGreek = type === 'greek';
        const delay = index * 50;
        
        card.className = `card bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-2xl border-t-4 ${isGreek ? 'border-red-300 hover:border-red-500' : 'border-amber-300 hover:border-amber-500'} transform transition-all duration-300 cursor-pointer`;
        card.style.animationDelay = `${delay}ms`;
        
        card.innerHTML = `
          <div class="text-5xl font-bold ${isGreek ? 'text-red-600' : 'text-amber-600'} mb-3 hover:scale-110 transition-transform">${letter}</div>
          <div class="text-lg font-semibold text-gray-800 mb-1">${name}</div>
          <div class="text-sm text-gray-500 italic mb-2">(${transliteration})</div>
          <div class="text-xs text-gray-400 hidden pronunciation">${pronunciation}</div>
          <button class="audio-btn mt-2 px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition-all" data-letter="${name}">
            🔊 Hear
          </button>
        `;
        
        card.addEventListener('click', () => {
          card.classList.add('animate-pulse');
          setTimeout(() => card.classList.remove('animate-pulse'), 600);
          
          const pronunciation = card.querySelector('.pronunciation');
          pronunciation.classList.toggle('hidden');
          
          interactionCount++;
          updateStats();
        });
        
        container.appendChild(card);
      });
      
      updateStats();
    }

    function updateStats() {
      document.getElementById('totalLetters').textContent = greekAlphabet.length + hebrewAlphabet.length;
      document.getElementById('interactionCount').textContent = interactionCount;
      
      const greekVisible = document.getElementById('greek-list').children.length;
      const hebrewVisible = document.getElementById('hebrew-list').children.length;
      document.getElementById('filteredCount').textContent = greekVisible + hebrewVisible;
      document.getElementById('greekCount').textContent = `${greekVisible} letters`;
      document.getElementById('hebrewCount').textContent = `${hebrewVisible} letters`;
    }

    function setupFilters() {
      document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          document.querySelectorAll('.filter-btn').forEach(b => {
            b.className = 'filter-btn px-3 py-1 rounded-lg bg-gray-200 hover:bg-gray-300 transition-all';
          });
          btn.className = 'filter-btn px-3 py-1 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-all';
          
          currentFilter = btn.dataset.filter;
          
          if (currentFilter === 'greek') {
            document.getElementById('hebrewSection').style.display = 'none';
            document.getElementById('greekSection').style.display = 'block';
          } else if (currentFilter === 'hebrew') {
            document.getElementById('greekSection').style.display = 'none';
            document.getElementById('hebrewSection').style.display = 'block';
          } else {
            document.getElementById('greekSection').style.display = 'block';
            document.getElementById('hebrewSection').style.display = 'block';
          }
          
          renderAlphabet(greekAlphabet, "greek-list", "greek");
          renderAlphabet(hebrewAlphabet, "hebrew-list", "hebrew");
        });
      });

      document.getElementById('alphabetSearch').addEventListener('input', (e) => {
        searchTerm = e.target.value;
        renderAlphabet(greekAlphabet, "greek-list", "greek");
        renderAlphabet(hebrewAlphabet, "hebrew-list", "hebrew");
      });
    }

    function setupTheme() {
      const themeToggle = document.getElementById('themeToggle');
      const themeIcon = document.getElementById('themeIcon');
      
      themeToggle.addEventListener('click', () => {
        isDarkMode = !isDarkMode;
        document.body.classList.toggle('theme-dark', isDarkMode);
        themeIcon.textContent = isDarkMode ? '☀️' : '🌙';
        
        // Update card colors for dark mode
        if (isDarkMode) {
          document.body.className = document.body.className.replace(
            'bg-gradient-to-br from-amber-50 via-orange-50 to-red-50',
            'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
          );
        } else {
          document.body.className = document.body.className.replace(
            'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900',
            'bg-gradient-to-br from-amber-50 via-orange-50 to-red-50'
          );
        }
      });
    }

    function setupAudio() {
      // Text-to-speech for pronunciation
      function speak(text, lang = 'en') {
        if ('speechSynthesis' in window) {
          const utterance = new SpeechSynthesisUtterance(text);
          utterance.lang = lang;
          utterance.rate = 0.8;
          utterance.pitch = 1;
          speechSynthesis.speak(utterance);
        }
      }

      // Audio buttons for letters
      document.addEventListener('click', (e) => {
        if (e.target.classList.contains('audio-btn') && e.target.dataset.letter) {
          speak(e.target.dataset.letter);
          e.target.classList.add('pulse-ring');
          setTimeout(() => e.target.classList.remove('pulse-ring'), 1500);
        }
      });

      // Audio for Bible verses
      document.getElementById('audioButton')?.addEventListener('click', () => {
        const englishText = document.getElementById('englishText').textContent;
        speak(englishText);
      });
    }

    async function searchVerse() {
      const input = document.getElementById("verseInput").value.trim();
      const verseResult = document.getElementById("verseResult");
      const searchButton = document.getElementById("searchButton");

      if (!input) return;

      // Show loading state
      searchButton.textContent = "Searching...";
      searchButton.disabled = true;
      verseResult.classList.remove('hidden');
      document.getElementById("verseReference").textContent = input;
      document.getElementById("originalText").textContent = "Loading verse...";
      document.getElementById("translitText").textContent = "";
      document.getElementById("englishText").textContent = "";

      try {
        // Simulate API call with mock data for demo
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock verse data - in real implementation, this would come from an API
        const mockVerses = {
          'john 3:16': {
            greek: 'οὕτως γὰρ ἠγάπησεν ὁ θεὸς τὸν κόσμον',
            transliteration: 'houtōs gar ēgapēsen ho theos ton kosmon',
            english: 'For God so loved the world that he gave his one and only Son...'
          },
          'genesis 1:1': {
            hebrew: 'בְּרֵאשִׁית בָּרָא אֱלֹהִים אֵת הַשָּׁמַיִם וְאֵת הָאָרֶץ',
            transliteration: 'B\'reishit bara Elohim et hashamayim v\'et ha\'aretz',
            english: 'In the beginning God created the heavens and the earth.'
          }
        };

        const verse = mockVerses[input.toLowerCase()] || {
          greek: 'Verse not found in demo database',
          hebrew: 'Verse not found in demo database', 
          transliteration: 'Please try "John 3:16" or "Genesis 1:1"',
          english: 'This is a demo - only a few verses are available for testing.'
        };

        document.getElementById("originalText").textContent = verse.greek || verse.hebrew;
        document.getElementById("translitText").textContent = verse.transliteration;
        document.getElementById("englishText").textContent = verse.english;

      } catch (error) {
        document.getElementById("originalText").textContent = "Error loading verse";
        document.getElementById("translitText").textContent = "";
        document.getElementById("englishText").textContent = "Please check your connection and try again.";
      } finally {
        searchButton.textContent = "Search";
        searchButton.disabled = false;
      }
    }

    function setupSearch() {
      const searchButton = document.getElementById("searchButton");
      const verseInput = document.getElementById("verseInput");

      searchButton.addEventListener("click", searchVerse);
      
      verseInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
          event.preventDefault();
          searchVerse();
        }
      });

      verseInput.addEventListener("input", function () {
        const input = this.value.trim();
        searchButton.disabled = !input;
      });
    }

    function addEnhancedInteractivity() {
      // Add keyboard shortcuts
      document.addEventListener('keydown', (e) => {
        if (e.ctrlKey || e.metaKey) {
          switch(e.key) {
            case 'f':
              e.preventDefault();
              document.getElementById('alphabetSearch').focus();
              break;
            case 'Enter':
              if (document.activeElement === document.getElementById('verseInput')) {
                searchVerse();
              }
              break;
          }
        }
      });

      // Add letter click sounds
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      
      function playClickSound() {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
      }

      // Add sound to card interactions
      document.addEventListener('click', (e) => {
        if (e.target.closest('.card')) {
          try {
            playClickSound();
          } catch (err) {
            // Audio context might not be available
          }
        }
      });

      // Add scroll animations
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
          }
        });
      }, observerOptions);

      // Observe all cards
      setTimeout(() => {
        document.querySelectorAll('.card, .verse-card').forEach(card => {
          observer.observe(card);
        });
      }, 100);
    }

    // CSS animation for fade in
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `;
    document.head.appendChild(style);

    // Initialize everything
    document.addEventListener("DOMContentLoaded", function () {
      renderAlphabet(greekAlphabet, "greek-list", "greek");
      renderAlphabet(hebrewAlphabet, "hebrew-list", "hebrew");
      setupFilters();
      setupTheme();
      setupAudio();
      setupSearch();
      addEnhancedInteractivity();
      updateStats();
      
      // Focus on search input
      document.getElementById("verseInput").focus();
    });
  