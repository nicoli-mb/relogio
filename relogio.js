const hourHand = document.querySelector('.hour-hand');
const minuteHand = document.querySelector('.minute-hand');
const secondHand = document.querySelector('.second-hand');
const clock = document.querySelector('.clock');
const tickSound = document.getElementById('tick-sound');
const startBtn = document.getElementById('start-btn'); 

let initialTickPlayed = false;

const updateBackgroundGradient = (minutes) => {
    const angle = minutes * 6;
    let gradient;

    if (angle <= 60) {
        gradient = `conic-gradient(
            #89bc89 0deg ${angle}deg,
            white ${angle}deg 360deg
        )`;
    } else if (angle <= 270) {
        gradient = `conic-gradient(
            #89bc89 0deg 60deg,
            rgb(209, 176, 232) 60deg ${angle}deg,
            white ${angle}deg 360deg
        )`;
    } else {
        gradient = `conic-gradient(
            #89bc89 0deg 60deg,
            rgb(209, 176, 232) 60deg 270deg,
            #e39a99 270deg ${angle}deg,
            white ${angle}deg 360deg
        )`;
    }

    clock.style.background = gradient;
};

const startClock = () => {
    let minutes = 0;
    let seconds = 0;

    setInterval(() => {
        secondHand.style.transform = `translate(0, -50%) rotate(${seconds * 6}deg)`;
        minuteHand.style.transform = `translate(0, -50%) rotate(${minutes * 6}deg)`;
        hourHand.style.transform = `translate(0, -50%) rotate(0deg)`;

        updateBackgroundGradient(minutes);

        if (minutes === 45 && seconds === 0) {
            tickSound.currentTime = 0;
            tickSound.play();
        }

        if (seconds === 1 && !initialTickPlayed) {
            tickSound.currentTime = 0;
            tickSound.play();
            initialTickPlayed = true; 
        }

        seconds++;
        if (seconds >= 60) {
            seconds = 0;
            minutes++;
            if (minutes >= 60) {
                minutes = 0;
            }
        }
    }, 1000);
};

startBtn.addEventListener('click', () => {
    startClock();
    startBtn.style.display = 'none'; 
});


