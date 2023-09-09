// creating a variable for accesing input in html
const inputBox = document.getElementById("hours");
const inputBox2 =document.getElementById("minutes")

const listContainer = document.getElementById("list-container");
const audio = document.getElementById("audio1");
let amPm;
// function for set time with condition
function setTime(){
    if(inputBox.value.trim()== '' && 12){
        alert("Ooop's, Set the time first!!");
    }else if(inputBox.value>24 || inputBox2.value>60 ) {
        alert("Set the correct Time");
    }
    
    else{
        
        
        const hoursInput = document.getElementById('hours');
        const minutesInput = document.getElementById('minutes');
        const amPmInput = document.getElementById('amPm');

        const hours = parseInt(hoursInput.value, 10);
        // const minutes = parseInt(minutesInput.value, 10);
        const minutes = minutesInput.value.trim() === '' ? 0 : parseInt(minutesInput.value, 10); //default value for minute
        amPm = amPmInput.value;

        const alarmTime = format12HourTime(hours, minutes, amPm) + ' ' + amPm;
        //  append the added alarm in list
        let li = document.createElement("li");
        li.innerHTML = alarmTime;
        listContainer.appendChild(li);

        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        
        

        // set the alarm
        setAlarm(hours, minutes, amPm);

    }
    inputBox.value='';
    inputBox2.value='';
    saveData();
    
}

// set alarm function
function setAlarm(hours, minutes, amPm) {
  const now = new Date();
  const alarmTime = new Date(now);

  if (amPm === 'PM' && hours !== 12 && minutes =='0') {
      alarmTime.setHours(hours + 12);
  } else {
      alarmTime.setHours(hours);
  }
  alarmTime.setMinutes(minutes);
  alarmTime.setSeconds(0);

  const timeUntilAlarm = alarmTime.getTime() - now.getTime();

  if (timeUntilAlarm <= 0 && minutes=='' ) {
      return;
  }

  setTimeout(() => {
    //   alarm music call after timeout
      audio.play();
      // hide the music symbol after alarm plays
    //   audio.addAttribute('display');
  }, timeUntilAlarm);
}




// checkedd alarm 
listContainer.addEventListener("click",function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        // playAudio();
        // audio.play();
        saveData();
    }
    // removing alarm in list
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
    
},false);
//  to save data in localstorage
function saveData(){
    localStorage.setItem("data",listContainer.innerHTML);
}
function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");

}
showTask()


// JavaScript for updating the clock
function updateClock() {
    var now = new Date();
    var timeString = now.toLocaleTimeString(); // Get current time as a string

    document.getElementById("clock").innerText = timeString;
}
setInterval(updateClock, 1000);

// 
// Function to convert 24-hour time to 12-hour time with AM/PM
function format12HourTime(hours, minutes) {
    // const amPm = hours > 12 ? '' : '';
    const amPm = '';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes.toString().padStart(2, '0');
    return `${formattedHours}:${formattedMinutes} ${amPm}`;
}
  





   