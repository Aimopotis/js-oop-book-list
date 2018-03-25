// Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor
function UI() {}

//Prototype UI
// UI Add Book function
UI.prototype.addBookToList = function (book) {
  const list = document.getElementById('book-list');
  // Create tr Element
  const row = document.createElement('tr');
  // Insert cols
  row.innerHTML = `
<td>${book.title}</td>
<td>${book.author}</td>
<td>${book.isbn}</td>
<td><a href="#" class="delete">X</a></td>
`;
  list.appendChild(row);
}

// UI showAlert function
UI.prototype.showAlert = function(msg, className){
  // Creat Alert div
  const div = document.createElement('div');
  // Create div class
  div.className = `alert ${className}`;
  // Create Text 
  div.appendChild(document.createTextNode(msg));
  // Get Parent
  const container = document.querySelector('.container');
  // Get Sibling
  const form = document.getElementById('book-form');
  // Append div
  container.insertBefore(div, form);
  // Timeout Disapear after 3sec
  setTimeout(function(){
    document.querySelector('.alert').remove();
  }, 3000);
}

// Delete Book
UI.prototype.deleteBook = function(target){
  if(target.className === 'delete'){
    target.parentElement.parentElement.remove();
  }
}

// UI Clear Fields function
UI.prototype.clearFields = function () {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
}

// Event Listener for add book
document.getElementById('book-form').addEventListener('submit', function (e) {
  e.preventDefault();
  // Get Form Values
  const title = document.getElementById('title').value,
    author = document.getElementById('author').value,
    isbn = document.getElementById('isbn').value;
  // Instansiete a Book object
  const book = new Book(title, author, isbn);

  //Instantiate a UI object
  const ui = new UI();

  // Validate fields
  if(title === '' || author === '' || isbn === ''){
  // Error Alert
  ui.showAlert('Please fill in all fields', 'error');  
  } else {
  //Add Book to UI
  ui.addBookToList(book);
  // Show Alert
  ui.showAlert('Book Added!', 'success');
  // Clear field
  ui.clearFields();

  }
});

// Event Listener for delete
document.getElementById('book-list').addEventListener('click', function(e){
 //Instantiate a UI object
 const ui = new UI();
 // Delet book
 ui.deleteBook(e.target);

 //Show Alert
 ui.showAlert('Book deleted', 'success');
  e.preventDefault();
})