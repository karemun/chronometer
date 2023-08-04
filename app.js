const chronometer = document.getElementById('chronometer');
const btnStartPause = document.getElementById('btn-start-pause');
const btnRestart = document.getElementById('btn-restart');

let [hours, minutes, seconds] = [0, 0, 0];

let timeInterval;
let chronometerStatus = 'paused';

function updateChronometer() {
    // Update time
    seconds++;

    if(seconds/60 === 1) {
        seconds = 0;
        minutes++;

        if(minutes/60 === 1) {
            minutes = 0;
            hours++;
        }
    }

    // Format time
    const formattedSeconds = format(seconds);
    const formattedMinutes = format(minutes);
    const formattedHours = format(hours);

    // Update content
    chronometer.innerText = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

// Add format to time
function format(timeUnit) {
    return timeUnit < 10 ? '0' + timeUnit : timeUnit;
}

// Update button when time is running
function updateBtnPause() {
    btnStartPause.innerHTML = '<i class="bi bi-pause-fill"></i>'; // Pause icon
    btnStartPause.classList.remove('start'); // Delete start class
    btnStartPause.classList.add('pause');   // Add class pause
    chronometerStatus = 'started';  // Update chronometer status
}

// Update button when time is ready to start
function updateBtnStart() {
    window.clearInterval(timeInterval); // Deletes the last time interval
    btnStartPause.innerHTML = '<i class="bi bi-play-fill"></i>'; // Play icon
    btnStartPause.classList.remove('pause'); // Delete start class
    btnStartPause.classList.add('start');   // Add class pause
    chronometerStatus = 'paused';  // Update chronometer status
}


// EventListener for start and pause button
btnStartPause.addEventListener('click', () => {
    if(chronometerStatus === 'paused') {
        timeInterval = window.setInterval(updateChronometer, 1000); // Runs function every one second
        updateBtnPause();
    } else {
        updateBtnStart();
    }
});

// EventListener for restart button
btnRestart.addEventListener('click', () => {
    window.clearInterval(timeInterval); // Deletes the last time interval

    // Restart time
    hours = 0;
    minutes = 0;
    seconds = 0;

    // Restart content
    chronometer.innerText = '00:00:00';

    // Update button icon
    updateBtnStart();
});
