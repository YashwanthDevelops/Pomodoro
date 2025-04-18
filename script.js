document.addEventListener('DOMContentLoaded', function() {
    // Timer durations in seconds
    const FOCUS_TIME = 25 * 60; // 25 minutes
    const RELAX_TIME = 5 * 60;  // 5 minutes

    // Timer elements
    const focusTimeDisplay = document.querySelector('.timer-card .time');
    const startBtn = document.getElementById('start-btn');
    const resetBtn = document.getElementById('reset-btn');
    const modeToggleBtn = document.getElementById('mode-toggle');
    
    // Timer states
    let currentMode = 'focus'; // focus or relax
    let timeRemaining = FOCUS_TIME;
    let timerActive = false;
    let timerInterval;

    // Initialize displays
    focusTimeDisplay.textContent = formatTime(timeRemaining);

    // Mode toggle button
    // In your mode toggle event listener
    modeToggleBtn.addEventListener('click', function() {
        if (timerActive) {
            clearInterval(timerInterval);
            timerActive = false;
            startBtn.textContent = 'START';
            startBtn.classList.remove('active');
        }
        
        currentMode = currentMode === 'focus' ? 'relax' : 'focus';
        modeToggleBtn.innerHTML = currentMode === 'focus' ? '☀️' : '🌙';
        modeToggleBtn.className = `mode-toggle ${currentMode}`; // Add this line
        timeRemaining = currentMode === 'focus' ? FOCUS_TIME : RELAX_TIME;
        focusTimeDisplay.textContent = formatTime(timeRemaining);
    });

    // Format time as MM:SS
    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        return `${mins}:${secs}`;
    }

    // Start button
    startBtn.addEventListener('click', function() {
        if (timerActive) {  // Changed from focusTimerActive
            // Pause timer
            clearInterval(timerInterval);  // Changed from focusInterval
            timerActive = false;
            startBtn.textContent = 'START';
            startBtn.classList.remove('active');
        } else {
            // Start timer
            timerActive = true;
            startBtn.textContent = 'PAUSE';
            startBtn.classList.add('active');
            
            timerInterval = setInterval(function() {  // Changed from focusInterval
                timeRemaining--;  // Changed from focusTimeRemaining
                focusTimeDisplay.textContent = formatTime(timeRemaining);
                
                if (timeRemaining <= 0) {  // Changed from focusTimeRemaining
                    clearInterval(timerInterval);
                    timerActive = false;
                    startBtn.textContent = 'START';
                    startBtn.classList.remove('active');
                    
                    // Play notification sound
                    const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3');
                    audio.play();
                    
                    // Reset timer
                    timeRemaining = currentMode === 'focus' ? FOCUS_TIME : RELAX_TIME;  // Changed to support both modes
                    focusTimeDisplay.textContent = formatTime(timeRemaining);
                }
            }, 1000);
        }
    });

    // Reset button
    resetBtn.addEventListener('click', function() {
        // Stop timer if running
        if (timerActive) {
            clearInterval(timerInterval);
            timerActive = false;
            startBtn.textContent = 'START';
            startBtn.classList.remove('active');
        }
        
        // Reset timer based on current mode
        timeRemaining = currentMode === 'focus' ? FOCUS_TIME : RELAX_TIME;
        focusTimeDisplay.textContent = formatTime(timeRemaining);
    });
});


// Update current day
function updateCurrentDay() {
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const dateString = today.toLocaleDateString('en-US', options);
    document.getElementById('current-day').textContent = dateString;
}

// Initialize current day
updateCurrentDay();