function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function info() {
  let bookInfo = `${title} by ${author}, ${pages} pages, `;
  bookInfo = read ? bookInfo += "read" : bookInfo += "not read yet";
  return bookInfo;
}

function addBookToDisplay(book, booksPage) {
  const bookContainer = document.createElement("div");
  bookContainer.classList.add("book");
  bookContainer.dataset.index = booksPage.children.length - 2;

  const title = document.createElement("p");
  const pages = document.createElement("p");
  const author = document.createElement("p");
  const isRead = document.createElement("button");
  const remove = document.createElement("button");

  title.classList.add("title");
  pages.classList.add("pages");
  author.classList.add("author");
  isRead.classList.add("read");
  remove.classList.add("remove");

  if (book.read === true) {
    isRead.setAttribute("is-read", "read");
    isRead.textContent = "Status: READ";
  }
  else {
    isRead.setAttribute("is-read", "unread");
    isRead.textContent = "Status: UNREAD";
  }

  title.textContent = book.title;
  pages.textContent = book.pages;
  author.textContent = book.author;
  remove.textContent = "REMOVE";

  bookContainer.appendChild(title);
  bookContainer.appendChild(pages);
  bookContainer.appendChild(author);
  bookContainer.appendChild(isRead);
  bookContainer.appendChild(remove);

  booksPage.prepend(bookContainer);
}

function addBookToLibrary(book, bookPage) {
  myLibrary.push(book);
  addBookToDisplay(book, bookPage);
}

function removeBookFromLibrary(books, index) {
  myLibrary.splice(index, 1);
  const bookArray = Array.prototype.slice.call(books);
  const removeIndex = bookArray.findIndex(book => book.dataset.index === index);
  books[removeIndex].remove();
}

function displayBooks() {
  myLibrary.forEach((book) => {
    addBookToDisplay(book, booksPage);
  })
}

function changeReadStatus(book) {
  const isRead = book.querySelector(".read");
  if (isRead.getAttribute("is-read") === "read") {
    isRead.setAttribute("is-read", "unread");
    isRead.textContent = "Status: UNREAD";
  }
  else {
    isRead.setAttribute("is-read", "read");
    isRead.textContent = "Status: READ";
  }
}

function UpdateListener() {
  const books = booksPage.querySelectorAll(".book");
  books.forEach(book => {
    book.addEventListener("click", (e) => {
      if (e.target.matches("button.remove")) {
        removeBookFromLibrary(books, book.dataset.index);
      }
      else if (e.target.matches("button.read")) {
        changeReadStatus(book);
      }
    })
  })
}

const myLibrary = [];
let book1 = new Book("Captain Underpants", "Spongebob Squarepants", 240, true);
let book2 = new Book("Captain Underpants", "Spongebob Squarepants", 240, true);
myLibrary.push(book1);
myLibrary.push(book2);
const booksPage = document.querySelector("main.books");
displayBooks();

const addBooks = document.querySelector("button.add");
const fillBook = document.querySelector("dialog.fillBook");
const confirmBtn = fillBook.querySelector("#confirm");
const bookForm = fillBook.querySelector("form");
const books = booksPage.querySelectorAll(".book");

addBooks.addEventListener("click", () => {
  fillBook.showModal();
});

fillBook.addEventListener("close", () => {});

confirmBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const title = bookForm.querySelector("#title").value;
  const author = bookForm.querySelector("#author").value;
  const pages = bookForm.querySelector("#pages").value;
  const isRead = bookForm.querySelector("#is-read").checked;

  addBookToLibrary(new Book(title, author, pages, isRead), booksPage);
  bookForm.reset();
  UpdateListener();
  fillBook.close();
});

books.forEach((book) => {
  book.addEventListener("click", (e) => {
    if (e.target.matches("button.remove")) {
      removeBookFromLibrary(books, book.dataset.index);
    }
    else if (e.target.matches("button.read")) {
      changeReadStatus(book);
    }
  })
})