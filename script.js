document.addEventListener('DOMContentLoaded', function() {
    // Timer durations in seconds
    const FOCUS_TIME = 25 * 60; // 25 minutes

    // Timer elements
    const focusTimeDisplay = document.querySelector('.timer-card .time');
    const startBtn = document.getElementById('start-btn');
    const resetBtn = document.getElementById('reset-btn');
    
    // Timer states
    let focusTimeRemaining = FOCUS_TIME;
    let focusTimerActive = false;
    let focusInterval;

    // Format time as MM:SS
    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        return `${mins}:${secs}`;
    }

    // Initialize displays
    focusTimeDisplay.textContent = formatTime(focusTimeRemaining);

    // Start button
    startBtn.addEventListener('click', function() {
        if (focusTimerActive) {
            // Pause timer
            clearInterval(focusInterval);
            focusTimerActive = false;
            startBtn.textContent = 'START';
            startBtn.classList.remove('active');
        } else {
            // Start timer
            focusTimerActive = true;
            startBtn.textContent = 'PAUSE';
            startBtn.classList.add('active');
            
            focusInterval = setInterval(function() {
                focusTimeRemaining--;
                focusTimeDisplay.textContent = formatTime(focusTimeRemaining);
                
                if (focusTimeRemaining <= 0) {
                    clearInterval(focusInterval);
                    focusTimerActive = false;
                    startBtn.textContent = 'START';
                    startBtn.classList.remove('active');
                    
                    // Play notification sound
                    const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3');
                    audio.play();
                    
                    // Reset timer
                    focusTimeRemaining = FOCUS_TIME;
                    focusTimeDisplay.textContent = formatTime(focusTimeRemaining);
                }
            }, 1000);
        }
    });

    // Reset button
    resetBtn.addEventListener('click', function() {
        // Stop timer if running
        if (focusTimerActive) {
            clearInterval(focusInterval);
            focusTimerActive = false;
            startBtn.textContent = 'START';
            startBtn.classList.remove('active');
        }
        
        // Reset timer
        focusTimeRemaining = FOCUS_TIME;
        focusTimeDisplay.textContent = formatTime(focusTimeRemaining);
    });
});