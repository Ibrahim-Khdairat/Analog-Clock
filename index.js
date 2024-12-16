const HOURHAND = document.querySelector("#hour");
const MINUTEHAND = document.querySelector("#minute");
const SECONDHAND = document.querySelector("#second");
const DIGITALCLOCK = document.querySelector('.digitalClock #time');
const DIGITALDATE = document.querySelector('.digitalClock #date');
const ALARM_SOUND = document.querySelector("#alarm-sound");
const TURN_OFF_ALARM_BUTTON = document.querySelector("#turn-off-alarm");

const FIXED_ALARM_TIME = "18:00:00"; // Set a fixed alarm time (18:00:00)

let alarmTriggered = false;

// Function to add leading zero for time formatting
function leadingZero(time) {
    if (time <= 9) {
        time = "0" + time;
    }
    return time;
}

// Function to check if the current time matches the alarm time
function checkAlarm(hr, min, sec) {
    if (alarmTriggered) return; // If alarm has already triggered, don't check again

    const currentTime = `${leadingZero(hr)}:${leadingZero(min)}:${leadingZero(sec)}`;

    // If the current time matches the alarm time, trigger the alarm
    if (currentTime === FIXED_ALARM_TIME) {
        ALARM_SOUND.loop = true; // Enable looping for continuous alarm sound
        ALARM_SOUND.play(); // Play the alarm sound
        // alert("It's time!"); // Show a message
        TURN_OFF_ALARM_BUTTON.style.display = "inline-block"; // Show the turn-off button
        alarmTriggered = true; // Set the alarm as triggered
    }
}
TURN_OFF_ALARM_BUTTON.addEventListener('click', function () {
    ALARM_SOUND.pause(); // Stop the alarm sound
    ALARM_SOUND.currentTime = 0; // Reset the sound to the beginning
    TURN_OFF_ALARM_BUTTON.style.display = "none"; // Hide the turn-off button
    alarmTriggered = false; // Reset alarm trigger flag
});
// Function to run the clock
function runClock() {
    var date = new Date();
    let hr = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();

    let dayNum = date.getDate();
    let day = date.getDay();
    let month = date.getMonth();
    let year = date.getFullYear();
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    // Calculate the positions for the hands of the clock
    let hrPosition = (hr * 360 / 12) + (min * (360 / 60) / 12);
    let minPosition = (min * 360 / 60) + (sec * (360 / 60) / 60);
    let secPosition = sec * 360 / 60;

    // Set the CSS transforms for the clock hands
    HOURHAND.style.transform = "rotate(" + hrPosition + "deg)";
    MINUTEHAND.style.transform = "rotate(" + minPosition + "deg)";
    SECONDHAND.style.transform = "rotate(" + secPosition + "deg)";

    // Update the digital clock display
    DIGITALCLOCK.textContent = leadingZero(hr) + ":" + leadingZero(min) + ":" + leadingZero(sec);
    DIGITALDATE.textContent = daysOfWeek[day] + ", " + dayNum + "-" + months[month] + "-" + year;

    // Check if it's time for the alarm
    checkAlarm(hr, min, sec);
}

// Function to turn off the alarm
TURN_OFF_ALARM_BUTTON.addEventListener('click', function () {
    ALARM_SOUND.pause(); // Stop the alarm sound
    ALARM_SOUND.currentTime = 0; // Reset the sound to the beginning
    TURN_OFF_ALARM_BUTTON.style.display = "none"; // Hide the turn-off button
    alarmTriggered = false; // Reset alarm trigger flag
});

// Run the clock every second
var interval = setInterval(runClock, 1000);
