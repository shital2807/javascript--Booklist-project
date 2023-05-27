class Book{
    constructor(title,author,isbn){
     this.title=title;
     this.author=author;
     this.isbn=isbn;   
    }
}

class UI {
    addBookToList(book){
        const list = document.getElementById('book-list');
    // Create tr element
    const row = document.createElement('tr');
    // Insert cols
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="delete">X<a></td>
    `;
  
    list.appendChild(row);

    }

    showAlert(message,className) {
        //create  div
    const div =document.createElement('div');
    // Add Classes
    div.className=`alert ${className}`;
    // Add text 
    div.appendChild
    (document.createTextNode(message));
    // Get parents
    const container =
    document.querySelector('.container');
    // Get form
    const form =document.querySelector
    ('#book-form');
    // Insert alert
    container.insertBefore(div,form);

    // Timeout after 3 sec
    setTimeout(function(){
        document.querySelector('.alert')
        .remove();
    },3000);

    }

    deleteBook(target){
        if(target.className==='delete'){
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
 class store{
    static getBooks() {
     let books;
     if(localStorage.getItem('books')=== null){
        books =[];
     } else {
        books =JSON.parse(localStorage.getItem('books'));
     }

     return books;
    }

    static displayBooks(){
     const books =store.getBooks();

     books.forEach(function(book){
        const ui =new UI;

        // add book to UI
        ui.addBookToList(book);
     });
    }

    static addBook(book){
      const books =store.getBooks();

      books.push(book);

      localStorage.setItem('books',JSON.stringify(books));
    }
    
    static removeBook(isbn){
        const books =store.getBooks(); 

        books.forEach(function(book,index){
            if(book.isbn===isbn){
                books.splice(index,1);
            }
        });
        localStorage.setItem('books',JSON.stringify(books));
    }
}

// DOM Load Event 
document.addEventListener('DOMContentLoaded',store.displayBooks);

// Event Listeners for add book
document.getElementById('book-form').addEventListener('submit', function(e){
    // Get form values
    const title = document.getElementById('title').value,
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value
       // Instantiate book
    const book = new Book(title, author, isbn);
  
    // Instantiate UI
    const ui = new UI();
   
    // Validte
    if(title===''|| author===''|| isbn===''){
      // Error Alert 
      ui.showAlert('please fill in all fields','error');
     } else {
     // Add book to list
      ui.addBookToList(book);

    //   Add to LS
    store.addBook(book);
  
      // Show success
      ui.showAlert('Book Added!','success');
  
     // Clear fields
      ui.clearFields();
  
     }
       
    e.preventDefault();
  });
  
  // Event Listener for delete
  document.getElementById('book-list').addEventListener
  ('click',function(e){
     // Instantiate UI
    const ui = new UI(); 
  // Delete book
    ui.deleteBook(e.target);

  // Remove from LS
   store.removeBook
   (e.target.parentElement.previousElementSibling.
    textContent);
  
  //   Shhow message
  ui.showAlert('Book Removed','success');
  
  e.preventDefault();
  })
    
   
   
