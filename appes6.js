// Class book
class Book{
  constructor(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}


// Class UI
class UI{
  constructor(){}

  addBookToList(book) {
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
  };


  showAlert(msg, className){
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
  };
  deleteBook(target){
    if(target.className === 'delete'){
      target.parentElement.parentElement.remove();
    }
  }
  clearFields(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }
}

// Local Storage Class
class Store{
  static getBooks(){
    let books;
    if(localStorage.getItem('books') === null){
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  };
  
  static displayBooks(){
    const books = Store.getBooks();
    books.forEach(function(book){
      const ui = new UI;

      ui.addBookToList(book);
    });
  };

  static addBook(book){
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(isbn){
    const books = Store.getBooks();
    books.forEach(function(book, index){
    if(book.isbn === isbn){
      books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }
}


// DOM load Event Listener Local Storage create UI
document.addEventListener('DOMContentLoaded', Store.displayBooks);

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
  const ui = new UI;


  // Validate fields
  if(title === '' || author === '' || isbn === ''){
  // Error Alert
  ui.showAlert('Please fill in all fields', 'error');  
  } else {
  //Add Book to UI
  ui.addBookToList(book);
  // Add to local Storage
  Store.addBook(book);
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
 // Delete book
 ui.deleteBook(e.target);
 // Remove from Local Storage
 Store.removeBook(e.target.parentElement.previousElementSibling.textContent);


 //Show Alert
 ui.showAlert('Book deleted', 'success');
  e.preventDefault();
})