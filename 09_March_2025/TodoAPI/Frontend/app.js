const API = "http://localhost:5167/api/todo";

let allTasks = [];

async function loadTasks(){

const res = await fetch(API);
const data = await res.json();

allTasks = data;

displayTasks(data);

}

function displayTasks(tasks){

const list = document.getElementById("taskList");
list.innerHTML="";

tasks.forEach(t=>{

const li=document.createElement("li");

li.innerHTML = `

<div>
<input type="checkbox" ${t.isCompleted ? "checked" : ""} 
onclick="toggleComplete(${t.id},'${t.title}',${t.isCompleted})">

<span style="${t.isCompleted ? 'text-decoration:line-through' : ''}">
${t.title}
</span>
</div>

<div>
<button onclick="editTask(${t.id},'${t.title}',${t.isCompleted})">Edit</button>
<button onclick="deleteTask(${t.id})">Delete</button>
</div>
`;

list.appendChild(li);

});

}

async function addTask(){

const input=document.getElementById("taskInput");
const title=input.value;

await fetch(API,{
method:"POST",
headers:{'Content-Type':'application/json'},
body:JSON.stringify({title:title,isCompleted:false})
});

input.value="";
loadTasks();

}

async function deleteTask(id){

await fetch(API+"/"+id,{
method:"DELETE"
});

loadTasks();

}

async function toggleComplete(id,title,status){

await fetch(API+"/"+id,{
method:"PUT",
headers:{'Content-Type':'application/json'},
body:JSON.stringify({
id:id,
title:title,
isCompleted:!status
})
});

loadTasks();

}

async function editTask(id,title,status){

const newTitle=prompt("Edit task:",title);

if(newTitle){

await fetch(API+"/"+id,{
method:"PUT",
headers:{'Content-Type':'application/json'},
body:JSON.stringify({
id:id,
title:newTitle,
isCompleted:status
})
});

loadTasks();

}

}

function searchTask(){

const search=document.getElementById("searchInput").value.toLowerCase();

const filtered = allTasks.filter(t =>
t.title.toLowerCase().includes(search)
);

displayTasks(filtered);

}

function filterTasks(type){

let filtered = allTasks;

if(type==="active")
filtered = allTasks.filter(t=>!t.isCompleted);

if(type==="completed")
filtered = allTasks.filter(t=>t.isCompleted);

displayTasks(filtered);

}

function toggleDark(){
document.body.classList.toggle("dark");
}

loadTasks();
