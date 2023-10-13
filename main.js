const myLibrary = [];

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

function addBookToLibrary() {
  // Do stuff here
}

function displayBooks() {
  let book1 = new Book("Captain Underpants", "Spongebob Squarepants", 240, true);
  let book2 = new Book("Captain Underpants", "Spongebob Squarepants", 240, true);
  myLibrary.push(book1);
  myLibrary.push(book2);
  
  const booksPage = document.querySelector("main.books");

  myLibrary.forEach((book) => {
    const bookContainer = document.createElement("div");
    bookContainer.classList.add("book");

    const title = document.createElement("p");
    const pages = document.createElement("p");
    const author = document.createElement("p");

    title.classList.add("title");
    pages.classList.add("pages");
    author.classList.add("author");

    title.textContent = book.title;
    pages.textContent = book.pages;
    author.textContent = book.author;

    bookContainer.appendChild(title);
    bookContainer.appendChild(pages);
    bookContainer.appendChild(author);

    booksPage.prepend(bookContainer);
  })
}

function createButton() {
  const books = document.querySelector("main.books");
  const addButton = document.createElement("button");
  addButton.textContent = "+";

  books.appendChild(addButton);
}

displayBooks();

const addBooks = document.querySelector("button.add");
const fillBook = document.querySelector("dialog.fillBook");

addBooks.addEventListener("click", () => {
  fillBook.showModal();
})

fillBook.addEventListener("close", () => {});