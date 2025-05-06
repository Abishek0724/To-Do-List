let tasks=[];
let selectedTaskIndex=null;
window.onload=function(){
    if(localStorage.getItem("tasks")){
        tasks=JSON.parse(localStorage.getItem("tasks"));
        renderTasks();
    }
    document.getElementById("taskInput").addEventListener("keydown",function(event){
        if(event.key==="Enter"){
            addTask();
        }
       
    });
    document.addEventListener("keydown",function(event){
        if(event.key==="Delete"&& selectedTaskIndex !==null){
            deleteTask(selectedTaskIndex);
            selectedTaskIndex=null;
        }
    });
};
function addTask(){
    const taskInput=document.getElementById("taskInput");
    const taskText=taskInput.value.trim();
    if(taskText===""){
        alert("Please enter a Task");
        return;
    }
    tasks.push({text:taskText,done:false})
    saveTasks();
    renderTasks();
    taskInput.value="";
}
// function toggleDone(index){
//     tasks[index].done=!tasks[index].done;
//     saveTasks();
//     renderTasks();
// }
function deleteTask(index){
    tasks.splice(index,1);
    saveTasks();
    renderTasks();
}
function clearAllTasks() {
    tasks = [];
    localStorage.removeItem("tasks");
    renderTasks();
  }
  
function saveTasks(){
    localStorage.setItem("tasks",JSON.stringify(tasks));
}
function renderTasks(){
    const taskList=document.getElementById("taskList");
    taskList.innerHTML="";
    tasks.forEach((task,index)=>{
        const listItem=document.createElement("li");
        listItem.className="task-item";
        if(index===selectedTaskIndex){
            listItem.classList.add("selected");
        }
        listItem.onclick=()=>{
            selectedTaskIndex=index;
            renderTasks();
        };
        // const checkbox=document.createElement("input");
        // checkbox.type="checkbox";
        // checkbox.checked=task.done;
        // checkbox.onchange=()=>toggleDone(index);
        const span=document.createElement("span");
        span.innerText=task.text;
        if(task.done){
            span.classList.add("done");
        }
        const deleteBtn=document.createElement("button");
        deleteBtn.innerText="Delete";
        deleteBtn.onclick=()=>deleteTask(index);
        // listItem.appendChild(checkbox);
        listItem.appendChild(span);
        listItem.appendChild(deleteBtn);
        taskList.appendChild(listItem);
        listItem.scrollIntoView({ behavior: "smooth", block: "center" });

    });
}