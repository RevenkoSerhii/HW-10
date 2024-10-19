import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';
const timerInput = document.querySelector("#datetime-picker");
const button = document.querySelector('[data-start]');
const refs = {
  timerDay: document.querySelector('[data-days]'),
  timerHours: document.querySelector('[data-hours]'),
  timerMinutes: document.querySelector('[data-minutes]'),
  timerSeconds: document.querySelector('[data-seconds]')
}




    let timerId = null;
    let selectedDate = null;


    const options = {
      enableTime: true,
      time_24hr: true,
      defaultDate: new Date(),
      minuteIncrement: 1,
      onClose(selectedDates) {
        const startTime = Date.now();
        if (selectedDates[0] < startTime) {
          Notiflix.Notify.failure('Please choose a date in the future');
          // window.alert("Please choose a date in the future");
        } else {
          selectedDate = selectedDates[0];
          button.disabled = false;
          };
        }
      };

      button.disabled = true;
      button.addEventListener('click', () => {
        if(timerId) return;
        button.disabled = true;


        timerId = setInterval(() => {
         
          const currentTime = Date.now();
          const timeDifference = selectedDate.getTime() - currentTime;
          if(timeDifference <= 0){
            clearInterval(timerId);
            updateWatch({ days: "00", hours: "00", minutes: "00", seconds: "00" });
            return;
          }
          
          
          const time  = convertMs(timeDifference);
          updateWatch(time);
        }, 1000);
      })


  
    const counter = flatpickr(timerInput, options);


function updateWatch({seconds, minutes, hours, days}){
  refs.timerDay.textContent = days;
  refs.timerHours.textContent = hours;
  refs.timerMinutes.textContent = minutes;
  refs.timerSeconds.textContent = seconds;
}




function addLeadingZero(value){
  return String(value).padStart(2, "0");
}


 
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second)) ;

  return { days, hours, minutes, seconds };
}











