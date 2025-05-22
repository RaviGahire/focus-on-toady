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

const allQuotes = [
  "Raise the bar by completing your goals!",
  "Well Begun is half done!",
  "Just astep away, keep going",
  "Whoa! You just completed all the goals, time for chill",
];

const allCheckList = document.querySelectorAll(".check-box");
const inputfeilds = document.querySelectorAll(".goal-input");
const error = document.querySelector(".error-lable");
const progressbar = document.querySelector(".progress-bar");
const progressValue = document.querySelector(".progress-value");
const progresslable = document.querySelector(".text-1");

const add_btn = document.querySelector("#input-btn-add");
const remove_btn = document.querySelector("#input-btn-remove");

//Here we set the object becuse of when new user open this app he well not get any error
// const allGoals = JSON.parse(localStorage.getItem("allGoals")) || {
//   first: {
//     name: "",
//     completed: false,
//   },
//   second: {
//     name: "",
//     completed: false,
//   },
//   third: {
//     name: "",
//     completed: false,
//   },
// };

const allGoals = JSON.parse(localStorage.getItem("allGoals")) || {};

let completedGoalsCount = Object.values(allGoals).filter(
  (goal) => goal.completed
).length;
progressValue.style.width = `${
  (completedGoalsCount / inputfeilds.length) * 100
}%`;
progressValue.firstElementChild.innerText = `${completedGoalsCount} /${inputfeilds.length} Completed`;
progresslable.innerText = allQuotes[completedGoalsCount];

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

      const inputId = checkbox.nextElementSibling.id;
      // console.log(   allGoals[inputId]);
      allGoals[inputId].completed = !allGoals[inputId].completed;
      completedGoalsCount = Object.values(allGoals).filter(
        (goal) => goal.completed
      ).length;
      progressValue.style.width = `${
        (completedGoalsCount / inputfeilds.length) * 100
      }%`;
      progressValue.firstElementChild.innerText = `${completedGoalsCount} /${inputfeilds.length} Completed`;

      progresslable.innerText = allQuotes[completedGoalsCount];
      localStorage.setItem("allGoals", JSON.stringify(allGoals));
    } else {
      error.style.display = "block";
    }
  });
});

inputfeilds.forEach((input) => {
  // Here we accesing values from the local storage and set them into input field
  if (allGoals[input.id]) {
    input.value = allGoals[input.id].name;

    // here we set the progress bar
    if (allGoals[input.id].completed) {
      input.parentElement.classList.add("completed");
    }
  }

  input.addEventListener("focus", () => {
    error.style.display = "none";
  });

  //Progerss bar and local storage
  input.addEventListener("input", (e) => {
    // Here we are capturing the what user typing in the input fields
    //There are two methods to capture the values of input fields
    // allGoals[input.id] = input.value; // Method first
    // allGoals[e.target.id] = e.target.value; // method second

    if (allGoals[input.id] && allGoals[input.id].completed) {
      input.value = allGoals[input.id].name;
      return;
    }

    if (allGoals[input.id]) {
      allGoals[input.id].name = input.value;
    } else {
      allGoals[input.id] = {
        name: input.value,
        completed: false,
      };
    }

    // Here we set the captured values in local storage
    localStorage.setItem("allGoals", JSON.stringify(allGoals)); // We are saving that object values in string using JSON.stringify(allGoals)
  });
});
