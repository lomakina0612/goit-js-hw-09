const startButton = document.querySelector('button[data-start]');
const stopButton = document.querySelector('button[data-stop]');
let timerId = 0;

stopButton.setAttribute('disabled', '');  // деактивируем кнопку Stop установив атрибут disabled

startButton.addEventListener('click', handleStart);
stopButton.addEventListener('click', handleStop);     


function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`; //возвращает рандомные цвета
}

function handleStart(e) {
  timerId = setInterval(() => {       // setInterval запускает callback раз в сек и возвращает свой id 
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  startButton.setAttribute('disabled', ''); // деактивируем кнопку Start,устанавливаем атрибут disabled
  stopButton.removeAttribute('disabled', ''); // активируем кнопку Stop,удаляем атрибут disabled
}

function handleStop(e) {
  clearInterval(timerId);   // очищаем Interval по его id
  stopButton.setAttribute('disabled', ''); // деактивируем кнопку Stop
  startButton.removeAttribute('disabled', ''); // активируем кнопку Start
}
