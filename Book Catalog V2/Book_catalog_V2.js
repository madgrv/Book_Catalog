  //////////////////////
 // Book catalog app //
//////////////////////

/* This app will create book ojects and store them in sessionStorage within the browser.
It will populate a basic user interface through DOM manipulation and add functionality
via custom functions. */



// reference the form the user fills in from the HTML document
let addBook = document.getElementById("bookAddForm");
// area on page displaying the added books
let bookLibrary = document.getElementById("bookLibrary");
// create the book array
let bookArray = [];

// check if book array exists in session storage and load it if it does
// parse it into objects with JSON
if (sessionStorage.getItem("bookArray")) { // returns true if exists
    bookArray = JSON.parse(sessionStorage.getItem("bookArray"));
    displayBooks();  // calls a to display any books held in sessionStorage
} else {
    sessionStorage.setItem("bookArray", JSON.stringify([]));
    displayBooks();
}

// the object constructor
class Book {
    constructor(title, author, genre, review) {
        this.title = title; // title of book
        this.author = author; // author of book
        this.genre = genre; // genre of book
        this.review = review; // review of book
    }
}


// a function to create a new object from the user input
function createNewEntry() {
    // from the input form, assign user input values to variables
    let title = document.getElementById("bookTitle").value;
	let author = document.getElementById("author").value;
	let genre = document.getElementById("genre").value;
	let review = document.getElementById("review").value;
    // create new object with user input
    let latestBook = new Book(title, author, genre, review);
    // add entry to the array
    bookArray.push(latestBook);

    // Save the book array to session storage
    sessionStorage.setItem("bookArray", JSON.stringify(bookArray));

    // call display function
    displayBooks();

    // reset the form
    document.getElementById("bookAddForm").reset();
}

// assign fucntionality to the book add button on click
addBook.addEventListener("submit", function(event) {
    event.preventDefault(); // prevent the form from refreshing the page
    createNewEntry() // call the create function
});


// a function to create HTML elements in the dom and populate with the data in the sessionStorage/bookArray
function displayBooks() {  
    // clear the book library container before adding the books again
    bookLibrary.innerHTML = "";

    // loop through the array of books and add each book to the library container
    for (let i = 0; i < bookArray.length; i++) {
        // create a new div element for the book data
        let bookDiv = document.createElement("div");
        bookDiv.classList.add("addedBook");
        bookDiv.id = "book" + i

        // create <p> for each bit of book info
        let titlePara = document.createElement("h1"); // author <p>
        let authorPara = document.createElement("p"); // author <p>
        let genrePara = document.createElement("p"); // author <p>
        let reviewPara = document.createElement("p"); // author <p>
        let bookHr = document.createElement("hr"); // hr between books
        let editButton = document.createElement("button"); // edit button
        let deleteButton = document.createElement("button"); // delete button
        let divButtons = document.createElement("div"); // div to hold edit and delete buttons

        // setting up the contents of each paragraph
        titlePara.innerHTML = "Title: " + bookArray[i].title;
        authorPara.innerHTML = "Author: " + bookArray[i].author;
        genrePara.innerHTML = "Genre: " + bookArray[i].genre;
        reviewPara.innerHTML = "Review: " + bookArray[i].review;
        editButton.innerHTML = "Edit Book";
        editButton.classList.add("editButton");
        deleteButton.innerHTML = "Delete Book";
        deleteButton.classList.add("deleteButton");
        
        // Add the above html elements to the book div
        bookDiv.appendChild(titlePara); 
        bookDiv.appendChild(authorPara); 
        bookDiv.appendChild(genrePara); 
        bookDiv.appendChild(reviewPara);
        bookDiv.appendChild(divButtons); 
        bookDiv.appendChild(bookHr);
        divButtons.appendChild(editButton);
        divButtons.appendChild(deleteButton);
        // add the bookDiv to the bookLibrary section of the page
        bookLibrary.appendChild(bookDiv);

        // Add event listener to the edit button
        editButton.addEventListener("click", function() {
            editItem(i);
        });
        // Add event listener to the delete button
        deleteButton.addEventListener("click", function() {
            deleteItem(i);
        });
    }
};


// a function to remove an entry and clear it from the DOM
// it takes the index as an argument from the for loop innthe display function
function deleteItem(i) {
    // remove the book from the array
    bookArray.splice(i, 1);
    // Save the updated array to session storage
    sessionStorage.setItem("bookArray", JSON.stringify(bookArray));

    //check if all items have been deleted and if so removes the sessionStorage
    //to prevent displaying an extra empty entry if a new book is added
    if (bookArray.length === 0) { 
        sessionStorage.removeItem("bookArray");
    } else {
        sessionStorage.setItem("bookArray", JSON.stringify(bookArray))
    } 
    document.getElementById(`book${i}`).remove(i) //effectively removes item from the DOM
    // refresh the updated list making sure all <li> IDs
    //match the new index values
    displayBooks();
}


// function to edit existing book entries
// adds the information back into the input boxes and removes the previous entry
function editItem(i) { 
    // reference the input boxes by id and assign to vasriables
    let editTitle = document.getElementById("bookTitle")
    let editAuthor = document.getElementById("author")
    let editGenre = document.getElementById("genre")
    let editReview = document.getElementById("review")

    // adds the object values to the input boxes 
    editTitle.value = bookArray[i].title
    editAuthor.value = bookArray[i].author
    editGenre.value = bookArray[i].genre
    editReview.value = bookArray[i].review

    // removes the outdated entry
    deleteItem(i)
}
