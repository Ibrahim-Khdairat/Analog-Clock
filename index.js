const HOURHAND = document.querySelector("#hour");
const MINUTEHAND = document.querySelector("#minute");
const SECONDHAND = document.querySelector("#second");
const DIGITALCLOCK = document.querySelector('.digitalClock #time');
const DIGITALDATE  = document.querySelector('.digitalClock #date');

function leadingZero(time) {
    if (time <= 9) {
        time = "0" + time;
    }
    return time;
}

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

    let hrPosition = (hr * 360 / 12) + (min * (360 / 60) / 12);
    let minPosition = (min * 360 / 60) + (sec * (360 / 60) / 60);
    let secPosition = sec * 360 / 60;

    HOURHAND.style.transform = "rotate(" + hrPosition + "deg)";
    MINUTEHAND.style.transform = "rotate(" + minPosition + "deg)";
    SECONDHAND.style.transform = "rotate(" + secPosition + "deg)";
    DIGITALCLOCK.textContent =leadingZero(hr) + ":" + leadingZero(min) + ":" + leadingZero(sec);
    DIGITALDATE.textContent = daysOfWeek[day]+ ", " + dayNum+ "-" + months[month]+ "-" + year;
}

var interval = setInterval(runClock, 1000);