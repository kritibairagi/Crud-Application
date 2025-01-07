var selectedRow = null;

function onFormSubmit(event) {
  event.preventDefault();
  var formData = readFormData();

  // Get existing records from localStorage
  let records = JSON.parse(localStorage.getItem("crudRecords")) || [];
  const editIndex = localStorage.getItem("editIndex");

  if (editIndex === null) {
    // Insert new record
    records.push(formData);
  } else {
    // Update existing record
    records[editIndex] = formData;
    localStorage.removeItem("editIndex"); // Clear the edit index after update
  }

  localStorage.setItem("crudRecords", JSON.stringify(records));
  resetForm();

  // Redirect to table.html
  window.location.href = "table.html";
}

// Retrieve form data
function readFormData() {
  return {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    email: document.getElementById("email").value,
    age: document.getElementById("age").value,
  };
}

// Load data in the table on table.html
function loadTableData() {
  const records = JSON.parse(localStorage.getItem("crudRecords")) || [];
  const table = document.getElementById("store-list").getElementsByTagName("tbody")[0];
  table.innerHTML = "";

  records.forEach((data, index) => {
    var newRow = table.insertRow(table.rows.length);
    newRow.insertCell(0).innerHTML = data.firstName;
    newRow.insertCell(1).innerHTML = data.lastName;
    newRow.insertCell(2).innerHTML = data.email;
    newRow.insertCell(3).innerHTML = data.age;
    newRow.insertCell(4).innerHTML = `<button onclick="onEdit(${index})">Edit</button> <button onclick="onDelete(${index})">Delete</button>`;
  });
}

// Edit data function
function onEdit(index) {
  // Save the edit index in localStorage and redirect to form page
  localStorage.setItem("editIndex", index);
  window.location.href = "index.html";
}

// Pre-fill form fields if editing an existing record
function prefillFormForEdit() {
  const editIndex = localStorage.getItem("editIndex");
  if (editIndex !== null) {
    const records = JSON.parse(localStorage.getItem("crudRecords")) || [];
    const record = records[editIndex];

    document.getElementById("firstName").value = record.firstName;
    document.getElementById("lastName").value = record.lastName;
    document.getElementById("email").value = record.email;
    document.getElementById("age").value = record.age;
  }
}

// Delete data function
function onDelete(index) {
  if (confirm("Do you want to delete this record?")) {
    let records = JSON.parse(localStorage.getItem("crudRecords")) || [];
    records.splice(index, 1);
    localStorage.setItem("crudRecords", JSON.stringify(records));
    window.location.href = "index.html";
  }
}

// Reset form
function resetForm() {
  document.getElementById("firstName").value = "";
  document.getElementById("lastName").value = "";
  document.getElementById("email").value = "";
  document.getElementById("age").value = "";
  localStorage.removeItem("editIndex");
}

// Check if on index.html to pre-fill form if editing
if (window.location.pathname.includes("index.html")) {
  prefillFormForEdit();
}

// Automatically load table data if on table.html
if (window.location.pathname.includes("table.html")) {
  loadTableData();
}
