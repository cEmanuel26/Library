const myLibrary = [];
const books = document.getElementById('book-list');
const addBook = document.getElementById('addNewBook');

function Book(title, author, pages, read) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    console.log(
      `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`
    );
  };
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function displayBooks(books) {
  return books.map((book) => book);
}

// Function to render all books in the library
function renderBooks() {
  books.innerHTML = ''; // Clear the current book list
  myLibrary.forEach((book) => {
    const bookCard = document.createElement('div');
    bookCard.classList.add('bookCard');
    bookCard.innerHTML = `
      <ul style="list-style: none; padding: 0; margin: 0; flex-grow: 1; display: flex; flex-direction: column; justify-content: space-between;">
        <li>
          <h3>${book.title}</h3>
          <p>Author: ${book.author}</p>
          <p>Pages: ${book.pages}</p>
          <p>Status: <span class="book-status">${book.read}</span></p>
        </li>
        <li class="buttons">
          <button class="toggle-status" data-title="${book.title}">Read/Unread Book</button>
          <button class="delete-book" data-title="${book.title}">Delete Book</button>
        </li>
      </ul>
    `;

    // Add event listener for the toggle status button
    const toggleButton = bookCard.querySelector('.toggle-status');
    toggleButton.addEventListener('click', function () {
      const bookIndex = myLibrary.findIndex(
        (b) => b.title === this.dataset.title
      );
      if (bookIndex !== -1) {
        const book = myLibrary[bookIndex];
        book.read = book.read === 'read' ? 'not read yet' : 'read';
        renderBooks(); // Re-render the book list
      }
    });
    bookCard.style.display = 'flex';
    bookCard.style.flexDirection = 'column';
    bookCard.style.justifyContent = 'space-between';
    books.appendChild(bookCard);
  });

  // Add event listeners to delete buttons
  document.querySelectorAll('.delete-book').forEach((button) => {
    button.addEventListener('click', function () {
      deleteBook(this.dataset.title);
    });
  });
}

function deleteBook(title) {
  const bookIndex = myLibrary.findIndex((book) => book.title === title);
  if (bookIndex !== -1) {
    myLibrary.splice(bookIndex, 1);
    renderBooks(); // Re-render the book list
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const submitButton = document.getElementById('submitBook');
  const modal = document.querySelector('.modal');

  // Initial render of any existing books
  renderBooks();

  // Event listener for the "Add New Book" button
  addBook.addEventListener('click', function () {
    modal.style.display = 'block';
  });

  // Event listener for the submit button
  submitButton.addEventListener('click', function () {
    const titleInput = document.getElementById('title');
    const authorInput = document.getElementById('author');
    const pagesInput = document.getElementById('pages');
    const readInput = document.getElementById('read');

    // Get values from the form
    const title = titleInput.value;
    const author = authorInput.value;
    const pages = pagesInput.value;
    const read = readInput.checked ? 'read' : 'not read yet';

    // Validate inputs
    if (!title || !author || !pages) {
      alert('Please fill out all fields');
      return;
    }

    // Create new book and add to library
    const newBook = new Book(title, author, pages, read);
    addBookToLibrary(newBook);

    // Clear form and hide modal
    titleInput.value = '';
    authorInput.value = '';
    pagesInput.value = '';
    readInput.checked = false;
    modal.style.display = 'none';

    // Update display
    renderBooks();
  });

  // Close modal when clicking outside
  window.addEventListener('click', function (event) {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
});
