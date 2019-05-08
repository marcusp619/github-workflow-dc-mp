var listOfIdeas = [];

function Todo(name, body) {
  this.name = name;
  this.body = body;
  this.id = Date.now();
}

function createNewTodo(event) {
  event.preventDefault();
  var name = document.querySelector(".new-item-form--name").value;
  var body = document.querySelector(".new-item-form--body").value;
  var todo = new Todo(name, body);
  appendTodoToList(todo);
  storage(todo);
}

function appendTodoToList(todo) {
  var ul = document.querySelector("ul");
  var li = document.createElement("li");
  var form = document.querySelector(".new-item-form");
  li.innerHTML = `
  <h2 class="${todo.id}">${todo.name}</h2>
  <p>${todo.body}</p>
  <button class="delete-btn">delete</button>
  <button class="edit-btn">edit</button>
  `;
  ul.appendChild(li);
  form.reset();
}

function deleteTodo(event) {
  if (event.target.className === "delete-btn") {
    event.target.parentElement.remove();
    updateStorage(event);
  }
}

function storage(todo) {
  listOfIdeas.push(todo);
  localStorage.setItem("Todo", JSON.stringify(listOfIdeas));
}

function updateStorage(event) {
  var todoId = event.target.parentElement.firstElementChild.className;
  console.log(todoId);
  var newListOfIdeas = listOfIdeas.filter(function(todo) {
    return todo.id != todoId;
  });
  localStorage.setItem("item", JSON.stringify(newListOfIdeas));
}

document
  .querySelector(".new-item-form--submit")
  .addEventListener("click", createNewTodo);

document.querySelector(".item-list").addEventListener("click", function(event) {
  if (event.target.className === "delete-btn") {
    deleteTodo(event);
  }
});
