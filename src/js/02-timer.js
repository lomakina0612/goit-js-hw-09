// імпорт бібліотеки flatpickr
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
// імпорт бібліотеки Notiflix
import Notiflix from 'notiflix';
import "notiflix/dist/notiflix-3.2.5.min.css";

// Notiflix.Notify.init({});   //  установка параметрів користувача за замовченням

const input = document.querySelector('#datetime-picker');
const startButton = document.querySelector('button[data-start]');
const timer = document.querySelector('.timer');
const fields = document.querySelectorAll('.field');
const fieldValues = document.querySelectorAll('.field .value');
const fieldLabels = document.querySelectorAll('.field .label');

// додаємо стилі
timer.style.display = "flex";
timer.style.paddingTop = "20px";
fields.forEach(element => {
  element.style.marginRight = "20px";
  element.style.textAlign = "center";
})
fieldValues.forEach(element => {
  element.style.display = "block";
  element.style.fontSize = "30px";
});
fieldLabels.forEach(element => {
  element.style.textTransform = "uppercase";
  element.style.fontSize = "10px";
});

startButton.setAttribute('disabled', '');  // деактивуємо кнопку Start

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {        // onClose спрацьовує, коли календар закривається
    console.log(selectedDates[0]);
    if (isDateInFuture(selectedDates[0])) {
      startButton.removeAttribute('disabled', ''); // активуємо кнопку Start
    } else {
      startButton.setAttribute('disabled', '');
      Notiflix.Notify.failure("Please choose a date in the future");
    }
  },
};

const fp = flatpickr(input, options);   // отримуємо екземпляр flatpickr
startButton.addEventListener('click', handleStart);

// конвертує мілісекунди в об‘ект з кількістю днів, год, хв, сек
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// перевіряє, чи дата у майбутньому
function isDateInFuture(date) {
  const comparedDate = new Date(date);  // повертає дату та час вказану в аргументі
  const now = new Date();   // повертає поточну дату та час 
  return comparedDate > now;
}

// додає відсутні нулі
function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

// заповнює дані таймера
function fillTimer({ days, hours, minutes, seconds }) {
  document.querySelector('span[data-days]').innerText = addLeadingZero(days);
  document.querySelector('span[data-hours]').innerText = addLeadingZero(hours);
  document.querySelector('span[data-minutes]').innerText = addLeadingZero(minutes);
  document.querySelector('span[data-seconds]').innerText = addLeadingZero(seconds);
}

// опрацьовує подію click
function handleStart(e) {
  startButton.setAttribute('disabled', '');  // деактивуємо кнопку Start
  let timeLeftInMs, timeLeft;

  timerId = setInterval(() => {     // setInterval запускає callback раз на сек ита повертає свій id 
    timeLeftInMs = fp.selectedDates[0] - Date.now();  // час, що залишився у мсек
    timeLeft = convertMs(timeLeftInMs);   // конвертуємо в об‘ект з кількістю днів, год, хв, сек
    fillTimer(timeLeft);    // оновлюємо дані таймера

    if (timeLeftInMs <= 999) {
      clearInterval(timerId);   // якщо залишилось менше секунди зупиняємо setInterval
    } 
  }, 1000);
} 
