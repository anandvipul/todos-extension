function updateLocalStorage(arr) {
  localStorage[`todo`] = JSON.stringify(arr);
  return JSON.parse(localStorage['todo']);
}


function updateUI(arr) {
  //Updates UI based on the array of objects given
  let taskContainer = document.querySelector("ul.taskContainer");

  taskContainer.innerHTML = "";

  arr.forEach((elem) => {
    let li = document.createElement("li");
    li.classList.add("taskItem");
    li.setAttribute("data-id", elem.taskIndex);

    let spanCheckDone = document.createElement("span");
    spanCheckDone.classList.add("checkDone");

    let inputCheckBox = document.createElement("input");
    inputCheckBox.type = "checkbox";
    inputCheckBox.name = "isDone";
    inputCheckBox.id = "isDone";
    inputCheckBox.addEventListener("change", () => toggleStatus(elem));
    inputCheckBox.checked = elem.isDone;
    inputCheckBox.checked ? li.classList.add('strike'): {};

    spanCheckDone.append(inputCheckBox);



    //
    let spanRemaining = document.createElement('span');
    spanRemaining.innerText = `10 Minutes Remaining`;
    spanRemaining.classList.add('timeRemaining');

    //
    let spanValue = document.createElement("span");
    spanValue.classList.add("task");
    spanValue.innerText = elem.taskName;

    li.append(spanCheckDone);
    li.append(spanRemaining);
    li.append(spanValue);

    taskContainer.append(li);
  });

  let num = sortData(arr, `Active`).length;
  document.querySelector(`span.numOfItems`).innerText = num;
}

function toggleStatus(elem) {
    let resArr = [];
    for (let i of tasksDictionaryArray) {
        if ( i.taskIndex == elem.taskIndex) {
            i.isDone = !elem.isDone;
        }
        resArr.push(i);
    }
    tasksDictionaryArray = updateLocalStorage(resArr);
    updateUI(resArr);

  }

function sortData(arr, filter) {
  //Returns Filtered Array based on the criterion
  //All - input = return array
  //Active = isDone == false
  //Completed = isdone == true
  let resArr = [];
  if (filter == "Active") {
    arr.forEach((elem) => (elem.isDone == false ? resArr.push(elem) : {}));
    return resArr;
  }
  if (filter == "Completed") {
    arr.forEach((elem) => (elem.isDone == true ? resArr.push(elem) : {}));
    return resArr;
  }
  if (filter == "reset") {
    arr.forEach((elem) =>
      typeof elem != undefined ? resArr.push(elem) : {}
    );
    return resArr;
  }
  if (filter == "All") {
    return arr;
  }
  if (filter == "clear") {
    arr.forEach((elem) => elem.isDone == true ? {} : resArr.push(elem));
    return resArr;
  }
}

function manipulateData(arr, key, filter, value) {
  //Returns Manipulated Array
  // Arr - Input Array
  // key - Index which has to be
  // filter {taskname, isDone}
  // value = value input by the user
}

let tasksDictionaryArray = [];

//Declaring Task Object
const taskObj = {
  taskName: "",
  isDone: false,
  taskIndex: 0,
};

let demo = Object.create(taskObj);
demo.taskName = "I am A Demo Task";
demo.isDone = true;
demo.taskIndex = 0;

let form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();

  let newTask = Object.create(taskObj);
  newTask.taskName = event.target.elements.inputTaskField.value;
  newTask.isDone = false;
  newTask.taskIndex = tasksDictionaryArray.length;

  tasksDictionaryArray.push(newTask);
  tasksDictionaryArray = updateLocalStorage(tasksDictionaryArray);

  updateUI(tasksDictionaryArray);
  event.target.elements.inputTaskField.value = "";

  console.log(tasksDictionaryArray);
});

let all = document.querySelector("span.all");
all.addEventListener("click", () => {
  let arr = sortData(tasksDictionaryArray, "All");
  updateUI(arr);
});

let active = document.querySelector("span.active");
active.addEventListener("click", () => {
  let arr = sortData(tasksDictionaryArray, "Active");
  updateUI(arr);
});

let completed = document.querySelector("span.completed");
completed.addEventListener("click", () => {
  let arr = sortData(tasksDictionaryArray, "Completed");
  updateUI(arr);
});


let clear = document.querySelector(`span.clear`);
clear.addEventListener('click', () => {
    let arr = sortData(tasksDictionaryArray, 'clear');
    tasksDictionaryArray = [...arr];
    updateLocalStorage(tasksDictionaryArray);
    updateUI(tasksDictionaryArray);
});


updateUI(JSON.parse(localStorage[`todo`]));

let inputField = document.querySelector('input[type=text]');


console.log(inputField);