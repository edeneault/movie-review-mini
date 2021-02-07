// TO DO List Assignment by: Etienne Deneault with a little Bootstrap 4 for fun


// Dark Mode implemented for fun
const toggleSwitch = document.querySelector('input[type="checkbox"]');

// CHECK TO SEE IF DARK MODE ENABLED IS IN LOCAL STORAGE!
if (localStorage.getItem('darkModeEnabled')) {
  document.body.className = 'dark';
  toggleSwitch.checked = true;
}

// When we click the switch, update local storage & change the className on the body
toggleSwitch.addEventListener('click', function (e) {
  const { checked } = toggleSwitch;
  if (checked) {
    localStorage.setItem('darkModeEnabled', true);
  } else {
    localStorage.removeItem('darkModeEnabled');
  }
  document.body.className = checked ? 'dark' : ''

})

// Jumbotron background - mousemap - color background
const jumbotron = document.querySelector(".jumbotron");
jumbotron.style.backgroundColor = `steelblue`;
jumbotron.addEventListener("mousemove", function(event){
    let x = Math.floor((event.clientX * 256) / window.innerWidth);
    let y = Math.floor((event.clientY * 256) / window.innerHeight);
    jumbotron.style.backgroundColor = `rgb(${x}, 0, ${y}`;
})

// Function to remove value by index in Array
function removeByIndex(arr,str) {
	const index = arr.indexOf(str);
	if (index > -1) {arr.splice(index, 1)} return (arr);
}

// Selectors
const form = document.querySelector('#add-movie');
const input = document.querySelector('#list-Item');
const toDoList = document.querySelector('#movie-list');

//retrieve todo-items in memory
const retrievedTodos = JSON.parse(localStorage.getItem("todos")) || [];
const completedTodos = JSON.parse(localStorage.getItem("completed")) || [];

// iterate through array-like object and build todo items
for (let item of retrievedTodos ) {
	//create HTML elements
	const newToDo = document.createElement('li');
	newToDo.classList.add("card-text", "list-group-item", "col-12", "col-sm-12");	
	const rowDiv = document.createElement('div');
	rowDiv.classList.add("row", "col-12", "col-sm-12");
	const textDiv = document.createElement('div');
	textDiv.classList.add( "mr-auto", "col-6", "align-self-center");
	const button1Div = document.createElement('div');
	button1Div.classList.add("p-4", "col-1");	
	const button2Div = document.createElement('div');
	button2Div.classList.add( "p-4","col-1");
	const removeBtn = document.createElement('button');
	removeBtn.innerHTML= '';
	removeBtn.classList.add("remove", "btn", "btn-danger", "far", "fa-trash-alt");	
	const completedBtn = document.createElement('button');
	completedBtn.innerHTML = '';
	completedBtn.classList.add("completed", "btn", "btn-info","far", "fa-check-circle");
	//Build newTodo
	newToDo.appendChild(rowDiv);
	rowDiv.appendChild(textDiv);
	textDiv.innerText = item;
	rowDiv.appendChild(button1Div);
	rowDiv.appendChild(button2Div);
	button1Div.appendChild(completedBtn);
	button2Div.appendChild(removeBtn);
	// check if newToDo is completed or not
	if (completedTodos.includes(item)) {
		newToDo.classList.toggle('completed');
	}
	toDoList.appendChild(newToDo);
	input.value = '';
}

// Listen for Event to Remove or mark completed
toDoList.addEventListener('click', function(e) {
	let clickedListItem = e.target;
	// If Button Remove is clicked, remove from local storage in Todos and Completed Key-Value Pairs	
	if (clickedListItem.classList[0] === 'remove') {
		let todoItem = clickedListItem.parentNode.parentNode.innerText;
		const indexRetrieved = removeByIndex(retrievedTodos, todoItem);
		const indexCompleted = removeByIndex(completedTodos, todoItem);
		
		localStorage.setItem("todos", JSON.stringify(retrievedTodos));
		localStorage.setItem("completed", JSON.stringify(completedTodos));
		e.target.parentNode.parentNode.parentNode.remove();
		}
	// If Button Completed is clicked, check if todo item is in local storage (completed), if it 
	// isn't: toggle the style of the parent <li> and add it to value array, then update local Storage.
	// If it is, remove it from the value array, update localStorage and toggle style of parent.
	if (clickedListItem.classList[0] === 'completed') {
		let completedItem = clickedListItem.parentNode.parentNode.innerText;
		const ind = completedTodos.indexOf(completedItem);

		if (ind === -1) {
			e.target.parentNode.parentNode.parentNode.classList.toggle('completed');
			completedTodos.push(clickedListItem.parentNode.parentNode.innerText);
			localStorage.setItem("completed", JSON.stringify(completedTodos));
			console.log("completedTodos: (in if) ", completedTodos);
		}
		else {
			completedTodos.splice(ind, 1);
			console.log("completedTodos: ", completedTodos);
			localStorage.setItem("completed", JSON.stringify(completedTodos));
			e.target.parentNode.parentNode.parentNode.classList.toggle('completed');
		}			
	}
});

// Add Item to TO DO List (there is probably a better way using a string literal)
form.addEventListener('submit', function(e) {
	e.preventDefault();
	//create HTML elements
	const newToDo = document.createElement('li');
	newToDo.classList.add("card-text", "list-group-item", "col-12", "col-sm-12");
	const rowDiv = document.createElement('div');
	rowDiv.classList.add("row", "col-12", "col-sm-12");
	const textDiv = document.createElement('div');
	textDiv.classList.add("mr-auto","col-6", "align-self-center");
	const button1Div = document.createElement('div');
	button1Div.classList.add("p-4", "col-1");
	const button2Div = document.createElement('div');
	button2Div.classList.add("p-4", "col-1");
	const removeBtn = document.createElement('button');
	removeBtn.innerHTML= '';
	removeBtn.classList.add("remove", "btn", "btn-danger", "far", "fa-trash-alt");
	const completedBtn = document.createElement('button');
	completedBtn.innerHTML = '';
	completedBtn.classList.add("completed", "btn", "btn-info","far", "fa-check-circle");
	//Build newTodo
	newToDo.appendChild(rowDiv);
	rowDiv.appendChild(textDiv);
	textDiv.innerText = input.value + " ";
	rowDiv.appendChild(button1Div);
	rowDiv.appendChild(button2Div);
	button1Div.appendChild(completedBtn);
	button2Div.appendChild(removeBtn);
	toDoList.appendChild(newToDo);
	input.value = '';
	// Add todo to value arrat and set in localStorage
	retrievedTodos.push(textDiv.innerText);
	localStorage.setItem("todos", JSON.stringify(retrievedTodos));
});
