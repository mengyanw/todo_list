
addTask("Learn to wrap gifts", 1639944400000)
addTask("Buy milk")

function addTask(description, dueTime) {
    const task_list = document.querySelector("ul#task_list");
    const new_task = document.createElement('li');
    let date = null;
    if (dueTime) {
        let date = new Date(dueTime).toLocaleString("en-US");
        new_task.innerHTML = description + "<span class='due'>due " + date + "</span><button class='btn btn-sm btn-outline-danger done' type='button'>Done</button>";
    }
    else {
        new_task.innerHTML = description + "<button class='btn btn-sm btn-outline-danger done' type='button'>Done</button>";
    }
    task_list.append(new_task);
    new_task.addEventListener('click', function(event){
        event.preventDefault();
        event.target.parentElement.remove();
    })
}

function dateAndTimeToTimestamp(dateInputElement, timeInputElement) {
    const dueDate = dateInputElement.valueAsNumber; // Returns the timestamp at midnight for the given date
    const dueTime = timeInputElement.valueAsNumber; // Returns the number of milliseconds from midnight to the time

    if(dueDate && dueTime) { // The user specified both a due date & due time
        //Add the timezone offset to account for the fact that timestamps are specified by UTC
        const timezoneOffset =  (new Date()).getTimezoneOffset() * 60 * 1000;
        return dueDate + dueTime + timezoneOffset;
    } else {
        // if the user did not specify both a due date and due time, return false
        return false;
    }
}

function submitTask(){
    let description = document.querySelector("input#task_description_input");
    let duedate = document.querySelector("input#duedate_input");
    let duetime = document.querySelector("input#duetime_input");
    let timestamp = dateAndTimeToTimestamp(duedate, duetime)
    addTask(description.value, timestamp);
    description.value = '';
    duedate.value = '';
    duetime.value = '';
}

document.querySelector("#add_task").addEventListener('click', function(){
    submitTask();
})

document.querySelector("input#task_description_input").addEventListener('keydown', function(event){
    if (event.keyCode === 13) {
        submitTask();
    }
})