const form = document.querySelector('#task-form');
const bookInput = document.querySelector('#book');
const authorInput = document.querySelector('#author');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');

loadEventListeners();

function loadEventListeners(){
    form.addEventListener('submit', addTask);
    taskList.addEventListener('click', removeTask);
    clearBtn.addEventListener('click', removeTasks);
    document.addEventListener("DOMContentLoaded", getBooks);
}

function getBooks(){
    let books;

    if(localStorage.getItem('tasks') === null) {
        books = [];
    } else {
        books = JSON.parse(localStorage.getItem('tasks'));
    }

    books.forEach(book => {
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(book));
        const removeLink = document.createElement('a');
        removeLink.className = 'delete-item secondary-content';
        removeLink.innerHTML = 'X';
        li.appendChild(removeLink);

        taskList.appendChild(li);
    });
}

function addTask(event){
    if(bookInput.value === ''){
        alert('Add a book!');
    }

    else if(authorInput.value === ''){
        alert('Add a author!');
    }

    else {
        //create an li element (Элемент листа)
        const li = document.createElement('li');
        //assign a class name to the html element
        li.className = 'collection-item';
        //add text content to the li element
        li.appendChild(document.createTextNode("Book: "+bookInput.value));
        li.appendChild(document.createElement("br"));
        li.appendChild(document.createTextNode("Author: "+authorInput.value));
        //create an anchor tag
        const removeLink = document.createElement('a');
        //ad a class name to the removeLink element
        removeLink.className = 'delete-item secondary-content';
        removeLink.innerHTML = 'X';
        li.appendChild(removeLink);


        //add li element to the ul collection
        taskList.appendChild(li);

        //store the task in local storage
        storeInLocalStorage(bookInput.value, authorInput.value);

        bookInput.value = "";
        authorInput.value = "";
        event.preventDefault();
    }
}

function storeInLocalStorage(book, author){
    var br = document.createElement("br");
    //declane an array to read from local storage
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    //add the user's to the tasks array
    Abook = ("Book: "+book+" © "+author);

    tasks.push(Abook);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    return tasks;
}

function removeTask(event){
    //check if the area clicked contains the .delete-item element

    if(event.target.classList.contains('delete-item')){
        if(confirm('Are you sure you want to delete the book?')){
            event.target.parentElement.remove();
            removeItemFromLocalStorage(event.target.parentElement);
        }
        
    }
}

function removeItemFromLocalStorage(bookItem){
    let items;
    if(localStorage.getItem('tasks') === null){
        items =  [];
    } else {
        items = JSON.parse(localStorage.getItem('tasks'));
    }

    items.forEach(function(task, index) {
        if(bookItem.textContent.slice(0, -1) === task){
            items.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(items));
}

function removeTasks(event){
    if(confirm('Are you sure you want to delete the books?')){
        while(taskList.firstChild){
            taskList.removeChild(taskList.firstChild);
        }
        localStorage.clear();
    }
}