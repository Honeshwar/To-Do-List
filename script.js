document.ready(function(){
  
//using IIFE
var ToDOListApp = (function (){

let tasks = [];
const taskList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');

// console.log('Working',tasks[0]);
let i=0;

function addTaskToDOM(task){
    

    const li=document.createElement('li');
    li.innerHTML= `
    <input type="checkbox" id="${task.id}"  ${task.completed ?'checked': ''} class="custom-checkbox">
    <label for="${task.id}">${task.title}</label>
    <img src="bin.svg" class="delete" data-id="${task.id}" />
                           `;//data-id="${task.id}" in input

     taskList.append(li);  
    //  taskList.append(`<div> ${task.id}</div>`)                    
                 
}
function renderList () {

    taskList.innerHTML = '';// anything at tasklist will goes to empty

    for(let ele of tasks){
        addTaskToDOM(ele);
    }

    tasksCounter.innerHTML = tasks.length;

    //  if(i<tasks.length)
    // taskList.prepend(tasks[i++].text);
}


async function fetchToDoFromAPI(){
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos/1')
        const data = await response.json();
        const tasks = json.slice(0,10);
          renderList();
      console.log(task);
    
    } catch (error) {
        
      console.log(error);
    
    }
   


    // GET request
//     fetch('https://jsonplaceholder.typicode.com/todos/1')
//   .then(response => response.json())
//   .then(json =>{
//     tasks = json.slice(0,10);
//     renderList();
//     console.log(json);
//   });
}




function  toggleTask(taskId) {//markTaskAsComplete
    // for(let ele of tasks){
    //     if(ele.id == taskId){
    //         ele.completed = !ele.completed;
    //         return;
    //     }
    // }

    const task=tasks.filter((t)=>t.id === Number(taskId));// internally for loop work

    if(task.length>0){
        const currentTask=task[0];

        currentTask.completed= !currentTask.completed;

        renderList()
        showNotification('toggle successfully')

        return;
    }
}

function deleteTask (taskId) {
    const newTasks = tasks.filter(function(task){// map, filter() also
        return task.id !== Number(taskId);
    })

    tasks=newTasks;
    renderList();
}

function addTask (task) {

    if(task){// empty obj=false , all true
/* we can post data to server and add to array also
     fetch('',{
        method:POST,
        headers:{
            'content-Type': 'application/json'

        },
        body:JSON.stringify(task),// here add task to server
     }).then((res)=> res.json()).then((data)=>{
        console.log(data);

        tasks.push(task);
        renderList();// render task at page, below input renter task
        return;
     });*/

        tasks.push(task);
        renderList();// render task at page, below input renter task
        return;
    }
    showNotification('task object is empty');
   
}

function showNotification(text) {
    alert(text);
}

function handleKeyPress(event){
if(event.key === 'Enter'){
const text = event.target.value; //dTaskInput.textContent;     
  if(text === "" ){//!text
    showNotification('You cannot create empty task')
    return;
 }
console.log(text);
const task ={
    title : text,     // shorthand way to write //text:text,
    id : Date.now() ,//.toString(),
    completed : false // state of task
}

// addTaskInput.innerHTML='';
event.target.value='';
addTask(task);
}

}


function handleClickListener(e){
    const target = e.target;
    if(target.className === 'delete'){
        const taskId = target.dataset.id;
        deleteTask(taskId);
    }else if(target.className === 'custom-checkbox'){
    const taskId = target.id;
    toggleTask(taskId);
}
}
function initializeApp(){
    fetchToDoFromAPI();
    addTaskInput.addEventListener('keyup',handleKeyPress);
    document.addEventListener('click',handleClickListener);
}
return {
    initializeApp : initializeApp,
    i:i,
}
})();

}
