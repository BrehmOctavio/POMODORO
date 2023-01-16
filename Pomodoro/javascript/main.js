const pomodoroData = [
    {
        id: 1,
        title: "Name the task",
    },
    {
        id: 2,
        title: "Time 25 min",
    },
    {
        id: 3,
        title: "Focus time",
    },
    {
        id: 4,
        title: "Mark the progress",
    },
    {
        id: 5,
        title: "Take a break",
    },
];

const task = [];
let time = 0;
let timer = null;
let timerBreak = null;
let current = null;

const bAdd = document.querySelector(".bAdd");
const itTask = document.querySelector(".itTask");
const form = document.querySelector(".form");
const taskName = document.querySelector(".div-task-name");
const history = document.querySelector(".div-history");
const items = document.querySelector(".items");
const body = document.querySelector(".body");

//Pomodoro data
for(let item of pomodoroData){
    items.innerHTML += `
        <div style="margin:1rem;">
            <p style="font-style:italic;font-size:2rem;color:white;">${item.id}: ${item.title}</p>
        </div>
    `;
};

//Pomodoro App
const createTask = (value)=>{

    const newTask = {
        id: (Math.random()*100).toString(36).slice(3),
        title: value,
        completed: false
    };

    task.unshift(newTask);
};

const renderTime = ()=>{
    const timeDiv = document.querySelector(".div-value");
    const minutes = parseInt(time / 60);
    const seconds = parseInt(time % 60);
    timeDiv.textContent = `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    
    if(time > 0){
        body.style.backgroundColor = "rgb(210, 57, 49)";
    }else{
        body.style.backgroundColor = "rgb(75, 178, 75)";
    };
};

const markCompleted = ()=>{
    const taskIndex = task.findIndex(task => task.id == id);
    task[taskIndex].completed = true;
};

const timerBreakHandler = ()=>{
    timer--;
    renderTime();

    if(time ==0){
        clearInterval(timerBreak);
        current = null;
        timerBreak = null;
        taskName.textContent = "";
        renderTask();
    };
};

const startBreak = ()=>{
    time = 5 * 60;
    taskName.textContent = "Break";
    timerBreak = setInterval(()=>{
        timerBreakHandler();
    },1000);
};

const timeHandler = (id)=>{
    time--;
    renderTime();

    if(time == 0){
        clearInterval(timer);
        markCompleted(id);
        timer = null;
        renderTask();
        startBreak();
    };
};

const startBtnHandler = (id)=>{
    time = 25 * 60;
    current = id;
    const taskIndex = task.findIndex(task => task.id == id);
    taskName.textContent = task[taskIndex].title;
    timer = setInterval(()=>{
        timeHandler(id);
    },1000);
};

const renderTask = ()=>{
    const html = task.map(task =>{
        return `
            <div class="task">
                <div style ="font-size: 1rem;font-weight: lighter;font-family: sans-serif;color: rgb(0, 0, 0);" class="completed">${task.completed ? `<span class="done">Done</span>` : `<button style ="margin-bottom:2rem;height:2rem;width:auto;border-radius: 5px;margin-top:1rem;background-color:rgb(0, 0, 0);font-size: 1rem;font-weight: lighter;font-family: sans-serif;color: rgb(255, 255, 255);" class="start-btn" data-id="${task.id}">Start</button>`}</div>
                <div style ="font-size: 1rem;font-weight: lighter;font-family: sans-serif;color: rgb(0, 0, 0);" class="title">${task.title}</div>
            </div>
        `;
    });

    const taskContainer = document.querySelector(".div-tasks");
    taskContainer.innerHTML = html.join(" ");

    const startBtns = document.querySelectorAll(".task .start-btn");

    startBtns.forEach(btn =>{
        btn.addEventListener("click",(e)=>{
            if(!timer){
                const id = btn.getAttribute("data-id")
                startBtnHandler(id);
                btn.textContent = "In progress..";
            }
        });
    });
};

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    if(itTask.value !== ""){
        createTask(itTask.value);
        itTask.value = "";
        renderTask();
    };
});

renderTime();

