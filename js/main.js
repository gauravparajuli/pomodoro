var pomodoro = {duration: 0, shortBreak:0, longBreak:0};

const zeroPad = (num, places) => String(num).padStart(places, '0')

// function to load settings
pomodoro.loadSettings = function() {
    pomodoro.duration = parseInt(localStorage.getItem('duration')) || 25;
    pomodoro.shortBreak = parseInt(localStorage.getItem('shortBreak')) || 5;
    pomodoro.longBreak = parseInt(localStorage.getItem('longBreak')) || 10;
};

// function to start a pomodoro
pomodoro.startPomodoro = function() {
    pomodoro.startCountdown(pomodoro.Duration);
    
    // store total no of completed pomodoro and give alert
    pomodoro.showNotification(); // alert the user
};

// function to start a shortbreak
pomodoro.startShortBreak = function(){
    pomodoro.startCountdown(pomodoro.shortBreak);

    // give alert
    pomodoro.showNotification(); // alert the user
};

// function to start a longbreak
pomodoro.startLongBreak = function(){
    pomodoro.startCountdown(pomodoro.longBreak);

    // give alert
    pomodoro.showNotification(); // alert the user
};

// function to notify the user
pomodoro.showNotification = function() {
    console.log('countdown complete!');
    document.title = 'Pomodoro Timer';
};

// function to start countdown for a given duration(min)
pomodoro.startCountdown = function(duration) {
    var totalSeconds = duration*60;
    var timePiece = document.getElementById('timepiece');
    var mins = 0; var seconds = 0; // mins and seconds will be displayed by time piece
    var display; // formated string

    // register the countdown process
    var id = setInterval(function(){
        mins = Math.trunc(totalSeconds / 60);
        console.log(totalSeconds);
        seconds = totalSeconds - mins*60;
        display = zeroPad(mins,2) + ':' + zeroPad(seconds,2); // to insert leading zeroes
        timePiece.innerHTML = display; // display the countdown in the document
        document.title = '('+display+') Pomodoro Timer' // display the countdown in document title
        totalSeconds -= 1;
        if (totalSeconds < 0){
            timePiece.innerHTML = '00:00';
            clearInterval(id); // countdown completed, shut the timer down
        };
    }, 1000); // run the function every second
};

pomodoro.startCountdown(1);