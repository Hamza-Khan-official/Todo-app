
// Firebase Configuration & Initialization
var firebaseConfig = {
  apiKey: "AIzaSyBI_ydZiwaNpIOr5JL2GJCo0HMw9IDPtiY",
  authDomain: "todo-db-bc6ce.firebaseapp.com",
  databaseURL: "https://todo-db-bc6ce-default-rtdb.firebaseio.com",
  projectId: "todo-db-bc6ce",
  storageBucket: "todo-db-bc6ce.firebasestorage.app",
  messagingSenderId: "211718527225",
  appId: "1:211718527225:web:a615abf1fc08816c2b2a28",
  measurementId: "G-GGJ0ZBNJ3C"
};

// Firebase app aur database initialize karo
var app = firebase.initializeApp(firebaseConfig);
var database = firebase.database();


// Global Variables
var userInput = document.getElementById("todoInput");


// Add New Todo
function addTodo() {
  // Empty input check karo
  if (userInput.value === "") {
    alert("Empty Input");
    return;
  }

  var userobj_li = {
    list_obj: userInput.value
  };

  // Unique random ID generate karo
  var rand_id = Math.round(Math.random() * 514514515);

  // Firebase database mein save karo
  firebase.database().ref("lists").child(rand_id).set(userobj_li);

  // Input field clear karo
  userInput.value = "";
}



// Create Delete Button
function createDeleteButton(liElement) {
  var delBtnElement = document.createElement("button");
  var delBtnText = document.createTextNode("Delete");

  delBtnElement.appendChild(delBtnText);
  delBtnElement.setAttribute("onclick", "deleteSingleItem(this)");

  // Button styling
  delBtnElement.style.backgroundColor = "cyan";
  delBtnElement.style.boxShadow = "0 0 20px cyan";

  liElement.appendChild(delBtnElement);
}


// Create Edit Button
function createEditButton(liElement) {
  var editBtnElement = document.createElement("button");
  var editBtnText = document.createTextNode("Edit");

  editBtnElement.appendChild(editBtnText);
  editBtnElement.setAttribute("onclick", "editSingleItem(this)");

  // Button styling
  editBtnElement.style.backgroundColor = "yellow";
  editBtnElement.style.boxShadow = "0 0 20px yellow";

  liElement.appendChild(editBtnElement);
}


// Fetch & Display Data from Firebase
function getDataFromDatabase() {
  firebase
    .database()
    .ref("lists")
    .on("child_added", function (data) {
      console.log("Loaded todo:", data.val().list_obj);

      // DOM elements create karo
      var todoList = document.getElementById("list");
      var liElement = document.createElement("li");
      var liText = document.createTextNode(data.val().list_obj);
      liElement.appendChild(liText);

      // Firebase key (ID) ko element mein save karo
      liElement.setAttribute("data-id", data.key);

      // Delete aur Edit buttons add karo
      createDeleteButton(liElement);
      createEditButton(liElement);

      // List mein append karo
      todoList.appendChild(liElement);
    });
}

// Page load hote hi data fetch karo
getDataFromDatabase();


// Delete All Todos
function deleteAll() {
  var confirmDelete = confirm("Delete all todos?");

  if (confirmDelete) {
    // Firebase se saare todos delete karo
    firebase.database().ref("lists").remove();

    // UI se bhi clear karo
    var list = document.getElementById("list");
    list.innerHTML = "";
  }
}


// Delete Single Todo
function deleteSingleItem(btn) {
  // User se confirm karo
  var single_del_pop = confirm("Sure you want to delete?");

  if (single_del_pop) {
    // Todo ID nikalo data-id attribute se
    var todoId = btn.parentNode.getAttribute("data-id");

    console.log("Deleting todo with ID:", todoId);

    // Firebase se delete karo
    firebase.database().ref("lists").child(todoId).remove();

    // UI se bhi remove karo
    btn.parentNode.remove();
  }
}


// Edit Single Todo
function editSingleItem(btn) {
  // User se naya value input lo
  var updatedValue = prompt("Enter updated value");

  // Validation: empty ya cancel check karo
  if (updatedValue && updatedValue.trim() !== "") {
    // Todo ID nikalo
    var todoId = btn.parentNode.getAttribute("data-id");

    console.log("Editing todo with ID:", todoId);

    // Firebase mein update karo
    firebase.database().ref("lists").child(todoId).set({
      list_obj: updatedValue
    });

    // UI mein bhi text update karo
    btn.parentNode.childNodes[0].data = updatedValue;
  } else {
    alert("Please enter a valid value!");
  }
}