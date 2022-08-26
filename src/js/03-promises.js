// імпорт бібліотеки Notiflix
import Notiflix from 'notiflix';
import "notiflix/dist/notiflix-3.2.5.min.css";

Notiflix.Notify.init({});   //  глобальна установка параметрів користувача
Notiflix.Notify.merge({     //  локальне налаштування параметрів 
  width: '310px',
  timeout: 10000,
});


const form = document.querySelector('.form');
const inputs = document.querySelectorAll('input');

// налаштування стилів для форми
form.style.display = 'flex';
form.style.alignItems = 'flex-end';
form.style.fontSize = '13px';
form.style.gap = '10px';
inputs.forEach(el => {
  el.style.display = 'block';
});


form.addEventListener("submit", handleSubmit);


function handleSubmit(event) {
  event.preventDefault();   // скасування дії submit за умовчанням
  const {
    elements: { delay, step, amount } // властивість elements форми містить об'єкт із посиланнями
  } = event.currentTarget;            // на всі її елементи які мають атрибут name

  let delayValue = Number(delay.value);   // перетворюю дані інпутів на числа, 
  let stepValue = Number(step.value);     // щоб у подальшому уникнути конкатенації
  let amountValue = Number(amount.value); // строк замість додавання 
  Notiflix.Notify.info(`delay: ${delayValue}, step: ${stepValue}, amount: ${amountValue}`); // повідомлення про введені дані
    // event.currentTarget.reset();   // очищення інпутів
  
  for (let position = 1; position <= amountValue; position += 1) {
    createPromise(position, delayValue)       // функція createPromise повертає проміс, до якого додаємо виклик .then та .catch
        .then(({ position, delay }) => {      // .then отримує функцію resolve з необхідними даними
          Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {      // .catch отримує функцію reject з необхідними даними
          Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        });
    
    delayValue += stepValue;    // збільшуємо затримку на розмір крока
  }
}


function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;    // елемент випадковості
  
  const promise = new Promise((resolve, reject) => {  // аргументом промісу є функція,параметрами якого є дві функції resolve та reject
    setTimeout(() => {
      if (shouldResolve) {
        return resolve({ position, delay }) // у випадку Fulfill повертаємо функцію resolve з деструктурізованим об'єктом даних у параметрі
      } else {
        return reject({ position, delay })  // у випадку Reject повертаємо функцію reject з деструктурізованим об'єктом даних у параметрі
      }
    }, delay);
  })
  return promise;   // функція createPromise повертає проміс, до якого можна додати виклик .then
}
