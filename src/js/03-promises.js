import Notiflix from 'notiflix';
const refs = {
  firstDelay:document.querySelector('input[name="delay"]'),
  step:document.querySelector('input[name="step"]'),
  amount:document.querySelector('input[name="amount"]'),
  form: document.querySelector('.form')
}
refs.form.addEventListener('submit', multiplyPromise);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.5;
return new Promise((resolve, reject)=> {
  setTimeout(()=> {
    if (shouldResolve) {
      resolve({ position, delay });
    } else {
      reject({ position, delay });
    }
  }, delay)
 
})
}

function multiplyPromise(value){
  value.preventDefault();
  for (let i = 0; i < refs.amount.value; i++) {
    const delay = Number(refs.firstDelay.value) + Number(refs.step.value) * i;
    createPromise(i+1, delay)
  .then(({ position, delay }) => {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`)
  })
  .catch(({ position, delay }) => {
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
}
}


