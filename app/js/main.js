var GoogleBooks = (function() {

  var parentListElement = document.getElementById("book-list");
  var descriptionLength = 200;

  var maxResults = 20;
  var orderBy = 'newest';
  var queryString = 'javascript';

  // future improvement would allow the query string values to be modified in the UI; free search box, order by drop down, max results selection (and pagination), and then re-run the fetch request.
  // a loader function is also required while waiting for API requests, so the UI can instruct the user something is happening.
  var url = 'https://www.googleapis.com/books/v1/volumes?q='+queryString+'&maxResults='+maxResults+'&orderBy='+orderBy;

  var fetchGoogleBooks = function() {
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var bookData = JSON.parse(this.responseText);
        readBooks(bookData.items);
      } else {
        // basic error handling of inability to retrieve data
      }
    };
    req.open("GET", url, true);
    req.send();
  };

  var readBooks = function(bookData) {
    for (var bookIndex in bookData) {
      if(bookData[bookIndex].volumeInfo) {
        // all the info we need is contained within volumeInfo
        var book = bookData[bookIndex].volumeInfo;

        // construct the HTML for the book entry seperately, there's some further logic required
        var innerHTML = buildBookHTML(book);

        var bookElement = document.createElement("div");
        bookElement.className = 'entry';
        bookElement.innerHTML = innerHTML;

        parentListElement.appendChild(bookElement);
      }
    }
  };

  var buildBookHTML = function(book) {

    // just a simple heading, paragraph and a check for the image as some books don't have thumbnails
    var html = '<h1>' + book.title + '</h1>';

    if(book.imageLinks) {
      html += '<img src="'+ book.imageLinks.thumbnail +'" class="book-thumbnail" />';
    } else {
      html += '<img src="images/no_cover_thumb.gif" class="book-thumbnail" />';
    }

    html += '<p>' + truncateDescription(book.description) + '</p>';

    return html;
  };

  var truncateDescription = function(description) {
    if(description.length > descriptionLength) {
      return description.substring(0,descriptionLength)+'...';
    } else {
      return description;
    }
  };

  // expose public methods; all exposed for simplified unit test coverage
  return {
    fetchGoogleBooks: fetchGoogleBooks,
    readBooks: readBooks,
    buildBookHTML: buildBookHTML,
    truncateDescription: truncateDescription
  };

})();