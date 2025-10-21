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

// Initialize Firebase and firebase db
var app = firebase.initializeApp(firebaseConfig);
var database = firebase.database();

// console.log(app);
// console.log(database);




var userInput = document.getElementById("todoInput");

function addTodo() {
  if (userInput.value === "") {
    alert("Empty Input");
  } else {
    var todoList = document.getElementById("list");
    var liElement = document.createElement("li");
    var liText = document.createTextNode(userInput.value);
    liElement.appendChild(liText);
    todoList.appendChild(liElement);

    // console.log(userInput.value) 

    // firebase database work  get data
    function savedata() {
      userobj_li = {
        list_obj: userInput.value
      };

      var rand_id = Math.round(Math.random() * 514514515);

      var saveData = firebase.database().ref("lists").child(rand_id).set(userobj_li);

    };

    savedata();
    // console.log(savedata);





    // delete button

    var delBtnElement = document.createElement("button");
    var delBtnText = document.createTextNode("Delete");

    delBtnElement.appendChild(delBtnText);

    delBtnElement.setAttribute("onclick", "deleteSingleItem(this)");

    liElement.appendChild(delBtnElement);

    delBtnElement.style.backgroundColor = "cyan";
    delBtnElement.style.boxShadow = "0 0 20px cyan";

    // Edit button

    var editBtnElement = document.createElement("button");
    var editBtnText = document.createTextNode("Edit");

    editBtnElement.appendChild(editBtnText);

    editBtnElement.setAttribute("onclick", "editSingleItem(this)");

    editBtnElement.style.backgroundColor = "yellow";
    editBtnElement.style.boxShadow = "0 0 20px yellow";

    liElement.appendChild(editBtnElement);

    userInput.value = "";
  }
  console.log(liElement);
}

// firebase database work  fetch data
// firebase database work  fetch data
function getDataFromDatabase() {
  firebase
    .database()
    .ref("lists")
    .on("child_added", function (data) {
      console.log(data.val().list_obj);
      
      // ✅ Yeh sab code ANDAR hona chahiye callback ke
      var todoList = document.getElementById("list");
      var liElement = document.createElement("li");
      var liText = document.createTextNode(data.val().list_obj);
      liElement.appendChild(liText);

      // delete button
      var delBtnElement = document.createElement("button");
      var delBtnText = document.createTextNode("Delete");
      delBtnElement.appendChild(delBtnText);
      delBtnElement.setAttribute("onclick", "deleteSingleItem(this)");
      liElement.appendChild(delBtnElement);
      delBtnElement.style.backgroundColor = "cyan";
      delBtnElement.style.boxShadow = "0 0 20px cyan";

      // Edit button
      var editBtnElement = document.createElement("button");
      var editBtnText = document.createTextNode("Edit");
      editBtnElement.appendChild(editBtnText);
      editBtnElement.setAttribute("onclick", "editSingleItem(this)");
      editBtnElement.style.backgroundColor = "yellow";
      editBtnElement.style.boxShadow = "0 0 20px yellow";
      liElement.appendChild(editBtnElement);

      todoList.appendChild(liElement);
    }); // ✅ Closing bracket yahan hai
}
// getDataFromDatabase();




function deleteAll() {
  var list = document.getElementById("list");


  list.innerHTML = "";
}

function deleteSingleItem(btn) {

  var single_del_pop = confirm("Sure you want to delete?");

  if (single_del_pop) {
    btn.parentNode.remove();

  } else {
    return;
  }

}

function editSingleItem(btn) {
  var updatedValue = prompt("enter updated Value");

  btn.parentNode.childNodes[0].data = updatedValue;
};
