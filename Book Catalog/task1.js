// /* commented out as it was for testing 
// you can add this back in for an example

// create and save an example list of books to sessionStorage
// let bookShelf = [
//     {title: "Foundation", author: "Isaac Asimov", genre: "Sci-Fi", theme:"Politics"},
//     {title: "The Hitchhiker's Guide to the Galaxy", author: "Douglas Adams", genre: "Sci-Fi", theme:"Humor, Comedy"},
//     {title: "1984", author: "George Orwell", genre: "Sci-Fi", theme:"Dystopian, Political"},
//     {title: "A Scanner Darkly", author: "Philip K. Dick", genre: "sci-fi", theme:"Psychological, Dystopian"}
//   ];
//   sessionStorage.setItem("books", JSON.stringify(bookShelf));
// //unicode for star charachter: \u272D
// */

//a function to create and display a list with the content of the sessionStorage in the HTML
function create() {

    if (sessionStorage.getItem("books") == null) {
        sessionStorage.setItem("books", JSON.stringify([]));
        //checks if a books sessionStorage file exists and creates an empy one if not
    } else {
        let myList = document.getElementById("bookList");
        myList.innerHTML = ""; //resets the list to avoid repeating it for each new entry
        let booksArr = JSON.parse(sessionStorage.getItem("books"));

        for (let i = 0; i < booksArr.length; i++) {
            let item = document.createElement("li"); //for each, create a li element 
            let span = document.createElement("span"); //for each, create a span element 
            let spanV = document.createElement("span"); //for each, create a span element 
            let input1 = document.createElement("input"); //create an input box from user input to be modified later
            let input2 = document.createElement("input");
            let input3 = document.createElement("input");
            let input4 = document.createElement("textarea"); //create a text box for longer text

            if (!input1 || !input2) {
                alert("please insert a value")
            }

            input1.value = booksArr[i].title;
            input2.value = booksArr[i].author;
            input3.value = booksArr[i].genre;
            input4.value = booksArr[i].theme;
            span.className = "close"; //create a css class and assign it to the span element 
            span.innerHTML = " \u00D7"; //add text to the span element (X)
            spanV.className = "update"; //create a css class and assign it to the span element 
            spanV.innerHTML = " \u2713"; //add text to the span element (X)
            item.id = "book " + i; //add li id with index number
            item.appendChild(input1); //append user inputs to the li elements 'item'
            item.appendChild(input2);
            item.appendChild(input3);
            item.appendChild(input4);
            item.appendChild(span); //appends the span element to <li>
            item.appendChild(spanV); //appends the span element to <li>
            myList.appendChild(item); // append the li 'item' to the parent list
            
            //add event listener on input change to display the V span if
            //an edit is made in either input box
            input1.addEventListener("input", function() {
                spanV.style.display = "inline"; // show the 'update' button when the title input changes
            });
            input2.addEventListener("input", function() {
                spanV.style.display = "inline"; // show the 'update' button when the author input changes
            });
            input3.addEventListener("input", function() {
                spanV.style.display = "inline"; // show the 'update' button when the author input changes
            });
            input4.addEventListener("input", function() {
                spanV.style.display = "inline"; // show the 'update' button when the author input changes
            });
            
            //add functionality to the V span to update the book entry
            spanV.addEventListener("click", function() {
                let newTitle = input1.value;
                let newAuthor = input2.value;
                let newGenre = input3.value;
                let newTheme = input4.value;
                let booksArr = JSON.parse(sessionStorage.getItem("books"));
                booksArr[i].title = newTitle;
                booksArr[i].author = newAuthor;
                booksArr[i].genre = newGenre;
                booksArr[i].theme = newTheme;
                sessionStorage.setItem("books", JSON.stringify(booksArr));
                spanV.style.display = "none"; // hide the 'update' button after the book has been updated
            });
            
            //add functionality to the X span to delete the book entry
            span.addEventListener("click", function() {
                booksArr.splice(i, 1) //removes item from the array
                if (booksArr.length === 0) { 
                    sessionStorage.removeItem("books");
                } else {
                sessionStorage.setItem("books", JSON.stringify(booksArr))
                } //checks if all items have been deleted and if so removes the sessionStorage
                //to prevent displaying an extra empty entry if a new book is added
                item.remove() //effectively removes item from the DOM
                create() //refresh the updated list making sure all <li> IDs
                //match the new index values
            })
        }
    }
}

//display my current example list of books created above for testing
create()


//book object constructor
function Book(title, author, genre, theme) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.theme = theme;
}
    
//create function to add book for the addBook button
//It creates a new object with the user entries and adds it to the sessionStorage
function addBook() {
    //get user entries from input box
    let bookTitle = document.getElementById("title").value.trim();
    let bookAuthor = document.getElementById("author").value.trim();
    let bookGenre = document.getElementById("genre").value.trim();
    let bookTheme = document.getElementById("theme").value.trim();
    //the trim() method makes sure there aren't empty spaces at the start and end of the input text

    // validate input
    if (!bookTitle || !bookAuthor) {
        alert("Please enter a book title and author.");
        return;
    } //no check for genre and theme, so there's only two minimum required entries


    //create new Book obj
    let myBook = new Book(bookTitle, bookAuthor, bookGenre, bookTheme);

    //parse content of sessionStorage into an array
    let booksArr = JSON.parse(sessionStorage.getItem("books"));
    //This ensures that booksArr is always an array if sessionStorage is empty and can have new books pushed to it without error
    if (!booksArr) {
        booksArr = [];
    }
    booksArr.push(myBook);
    sessionStorage.setItem("books", JSON.stringify(booksArr));

    //Reset placeholder display
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("genre").value = "";
    document.getElementById("theme").value = "";

    create();
}

//enable enter key to trigger the add button
document.getElementById("title").addEventListener("keyup", function(e) {
    if (e.keyCode === 13) { //if enter (keyCode 13) is pressed...
        document.getElementById("addButton").click(); //simulates click action on the addButton id element
    }
});
document.getElementById("author").addEventListener("keyup", function(e) {
    if (e.keyCode === 13) { //if enter (keyCode 13) is pressed...
        document.getElementById("addButton").click(); //simulates click action on the addButton id element
    }
});
document.getElementById("genre").addEventListener("keyup", function(e) {
    if (e.keyCode === 13) { //if enter (keyCode 13) is pressed...
        document.getElementById("addButton").click(); //simulates click action on the addButton id element
    }
});
document.getElementById("theme").addEventListener("keyup", function(e) {
    if (e.keyCode === 13) { //if enter (keyCode 13) is pressed...
        document.getElementById("addButton").click(); //simulates click action on the addButton id element
    }
});




/*

https://developer.mozilla.org/en-US/docs/Web/API/HTMLTableElement/insertRow
  [accessed 17/Feb/2023]

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
  [accessed 17/Feb/2023]

https://www.w3schools.com/html/html_form_elements.asp
  [accessed 18/Feb/2023]

*/