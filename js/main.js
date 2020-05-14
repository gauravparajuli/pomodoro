const zeroPad = (num, places) => String(num).padStart(places, '0');

/* start of code for global variables and flags */

var activeTimerId; // stores the id for currently running active timer
var isTimerActive = false; // flag for timer state
var snapshot; // stores the remaining time (in seconds) when stopping the timer
var activeModeDuration = 0; // stores current mode duration (in mins)

/* end of code for global variables and flags */



/* start of code for pomodoro object */
var pomodoro = {duration: 0, shortBreak:0, longBreak:0};

// function to load settings
pomodoro.loadSettings = function() {
    pomodoro.duration = parseInt(localStorage.getItem('duration')) || 25;
    pomodoro.shortBreak = parseInt(localStorage.getItem('shortBreak')) || 5;
    pomodoro.longBreak = parseInt(localStorage.getItem('longBreak')) || 10;
};

// function to start a pomodoro
pomodoro.startPomodoro = function() {
    pomodoro.startCountdown(pomodoro.duration*60);
    activeModeDuration = pomodoro.duration;
    
    // store total no of completed pomodoro and give alert
    pomodoro.showNotification(); // alert the user
};

// function to start a shortbreak
pomodoro.startShortBreak = function(){
    pomodoro.startCountdown(pomodoro.shortBreak*60);
    activeModeDuration = pomodoro.shortBreak;

    // give alert
    pomodoro.showNotification(); // alert the user
};

// function to start a longbreak
pomodoro.startLongBreak = function(){
    pomodoro.startCountdown(pomodoro.longBreak*60);
    activeModeDuration = pomodoro.longBreak;

    // give alert
    pomodoro.showNotification(); // alert the user
};

// function to notify the user
pomodoro.showNotification = function() {
    console.log('countdown complete!');
    document.title = 'Pomodoro Timer';
};

// function to start countdown for a given duration(secs)
pomodoro.startCountdown = function(duration) {
    
    clearInterval(activeTimerId); // clears any previously running timer
    
    var timePiece = document.getElementById('timepiece');
    var mins = 0; var seconds = 0; // mins and seconds will be displayed by time piece
    var display; // formated string

    isTimerActive = true; // starting timer, update the global flag
    // register the countdown process
    activeTimerId = setInterval(function(){
        
        snapshot = duration; // store the remaining time (in seconds) as snapshot

        mins = Math.trunc(duration / 60);
        seconds = duration - mins*60;
        display = zeroPad(mins,2) + ':' + zeroPad(seconds,2); // to insert leading zeroes
        timePiece.innerHTML = display; // display the countdown in the document
        document.title = '('+display+') Pomodoro Timer' // display the countdown in document title
        duration -= 1;

        if (duration < 0){
            timePiece.innerHTML = '00:00';
            clearInterval(activeTimerId); // countdown completed, shut the timer down
            isTimerActive = false; // countdown completed, update the global flag
        };
    }, 1000); // run the function every second
};

// code for resuming paused timer
pomodoro.startTimer = function() {
    if (isTimerActive === true || activeModeDuration === 0){
        return; // exit when timer is not running and also when no mode has been selected yet
    }

    pomodoro.startCountdown(snapshot); // restarts the timer
    isTimerActive = true;

};

// code for stopping running timer
pomodoro.stopTimer = function() {
    if (isTimerActive === false){
        return; // exit when timer is not running
    }

    clearInterval(activeTimerId); // shutdown active timer
    isTimerActive = false;
};

// code for resetting current mode
pomodoro.resetTimer = function() {
    if (typeof(activeModeDuration) === 'undefined') {
        return; // exit when no mode is active
    }
};
/* end of code for pomodoro object */



/* start of code for adding event listeners */

document.getElementById('pomodoro').addEventListener('click', function(){
    pomodoro.startPomodoro();
});

document.getElementById('shortbreak').addEventListener('click', function(){
    pomodoro.startShortBreak();
});

document.getElementById('longbreak').addEventListener('click', function(){
    pomodoro.startLongBreak();
});

document.getElementById('start').addEventListener('click', function(){
    pomodoro.startTimer();
});

document.getElementById('stop').addEventListener('click', function(){
    pomodoro.stopTimer();
});

document.getElementById('reset').addEventListener('click', function(){
    pomodoro.resetTimer();
});

/* end of code for adding event listeners */

/* Intitialization code */
pomodoro.loadSettings();