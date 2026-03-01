const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("todo-list");

// Load saved todos from Local Storage (if any)
const saved = localStorage.getItem("todos");
const todos = saved ? JSON.parse(saved) : [];

// Save todos in local storage
function savetodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Create a DOM node for a todo object and return it
function createTodoNode(todo, index) {

    // Create <li> element
    const li = document.createElement("li");

    // Checkbox to mark todo as complete
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = !!todo.completed;

    checkbox.addEventListener("change", () => {
        todo.completed = checkbox.checked;
        savetodos();
        render();
    });

    // Span for todo text
    const textSpan = document.createElement("span");
    textSpan.textContent = todo.text;
    textSpan.style.margin = "0 8px";

    // Strike-through effect if completed
    if (todo.completed) {
        textSpan.style.textDecoration = "line-through";
    }

    // Double-click to edit todo
    textSpan.addEventListener("dblclick", () => {
        const newText = prompt("Edit todo", todo.text);

        if (newText !== null) {
            todo.text = newText.trim();
            textSpan.textContent = todo.text;
            savetodos();
        }
    });

    // Delete button
    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";

    delBtn.addEventListener("click", () => {
        todos.splice(index, 1);   // Remove todo from array
        savetodos();
        render();
    });

    // Append all elements inside <li>
    li.appendChild(checkbox);
    li.appendChild(textSpan);
    li.appendChild(delBtn);

    return li;
}

// Render the whole todo list from todos array
function render() {
    list.innerHTML = ""; // Clear old list

    // Re-create each todo and append it to list
    todos.forEach((todo, index) => {
        const node = createTodoNode(todo, index);
        list.appendChild(node);
    });
}

// Add a new todo
function addTodo() {
    const text = input.value.trim();
    if (!text) return;

    // Push new todo object
    todos.push({ text, completed: false });
    input.value = "";   // Clear input

    savetodos();
    render();
}

// Button click event
addBtn.addEventListener("click", addTodo);

// Initial render on page load
render();
