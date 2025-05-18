// Using the week days array we set the week day
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let daySpan = document.querySelector(".week-day");
const date = new Date();
let day = weekdays[date.getDay()];
daySpan.append(day);

const allCheckList = document.querySelectorAll(".check-box");
const inputfeilds = document.querySelectorAll(".goal-input");
const error = document.querySelector(".error-lable");

const progressbar = document.querySelector(".progress-bar");
const progressValue = document.querySelector(".progress-value");

allCheckList.forEach((checkbox) => {
  checkbox.addEventListener("click", (e) => {
    //Here creating one variable to check all input fields are fields with value or not. and also using very array method.
    //Step : first we are convert the inputfeilds in array. Then returning false or true value using every array method.
    const allGoalsAdd = [...inputfeilds].every((userInput) => {
      return userInput.value;
    });
    // Here we are checking if allFieldsFilled is checked then its return true otherwise false
    if (allGoalsAdd) {
      checkbox.parentElement.classList.toggle("completed");
      progressValue.style.width = "33.3%";
      
    } else {
      error.style.display = "block";
    }
  });
});

inputfeilds.forEach((input) => {
  input.addEventListener("focus", () => {
    error.style.display = "none";
  });
});

// Progerss bar
