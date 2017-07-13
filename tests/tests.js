// do we have lift off?
QUnit.test("GoogleBooks basics", function( assert ) {
  assert.ok(typeof(GoogleBooks) == "object", "GoogleBooks object is present");
});

// truncateDescription function
QUnit.test("GoogleBooks truncateDescription returns 200 or less characters", function( assert ) {
  
  var largeText = "Once you learn to code using JavaScript, the world of gaming opens up. If you already know a bit about JavaScript, it's time to pick up the pace! In this book, learn how to build mind-bending games, that you'll want to play for hours and will amaze your friends. Along the way, learn about core coding and gaming concepts like variables, random numbers, key presses and arrays. The Generation Code series is a hands-on guide to computer coding, designed to train you in the coding languages used by real-world computer programmers. You'll discover how to code exciting programs, web pages, apps and games, and learn how the tools and functions you're using can be applied to other situations. Other books in the Generation Code series: I'm an Advanced Scratch Coder I'm a Python Programmer I'm an HTML Web Page Builder I'm an App Developer I'm a JavaScript Games Maker: The Basics";
  var result = GoogleBooks.truncateDescription(largeText);

  // ellipsis adds 3 characters to the total count of truncation
  assert.equal(result.length, 203, "GoogleBooks truncate trims large text to 200");

  var smallText = "Once you learn to code using JavaScript, the world of gaming opens up.";
  var result = GoogleBooks.truncateDescription(smallText);

  assert.equal(result.length, 70, "GoogleBooks truncate leaves smaller text untouched");
});

// buildBookHTML function
QUnit.test("GoogleBooks buildBookHTML returns correctly formatted HTML", function( assert ) {
  
  var bookDataWithImage = { title: "JavaScript", description: "Once you learn to code using JavaScript, the world of gaming opens up.", imageLinks: { thumbnail: "test.jpg" } };
  var bookDataWithoutImage = { title: "JavaScript", description: "Once you learn to code using JavaScript, the world of gaming opens up." };

  var result = GoogleBooks.buildBookHTML(bookDataWithImage);
  var expected = "<h1>JavaScript</h1><img src=\"test.jpg\" class=\"book-thumbnail\" /><p>Once you learn to code using JavaScript, the world of gaming opens up.</p>";
  assert.equal(result, expected, "GoogleBooks correctly outputs HTML entry block with image");

  var result = GoogleBooks.buildBookHTML(bookDataWithoutImage);
  var expected = "<h1>JavaScript</h1><img src=\"images/no_cover_thumb.gif\" class=\"book-thumbnail\" /><p>Once you learn to code using JavaScript, the world of gaming opens up.</p>";
  assert.equal(result, expected, "GoogleBooks correctly outputs HTML entry block without image");
});

// readBooks function should populate the book list
QUnit.test("GoogleBooks readBooks should populate the list", function( assert ) {

  var bookList = document.getElementById("book-list").innerHTML === "";
  assert.equal(bookList, true, "GoogleBooks list starts off empty");

  GoogleBooks.readBooks(bookData.items);
  var bookList = document.getElementById("book-list").innerHTML !== "";
  var bookListLength = document.getElementById("book-list").children.length;
  assert.equal(bookList, true, "GoogleBooks list is now populated");
  assert.equal(bookListLength, 1, "GoogleBooks list should have one entry, as per the test data object");
});




// Typical response from book API

var bookData = { 
  items :
  [
    {
      "kind": "books#volume",
      "id": "1oc0vgAACAAJ",
      "etag": "nhkGmedvpiw",
      "selfLink": "https://www.googleapis.com/books/v1/volumes/1oc0vgAACAAJ",
      "volumeInfo": {
        "title": "I'm a JavaScript Games Maker: Advanced Coding",
        "authors": [
          "Max Wainewright"
        ],
        "publisher": "Wayland",
        "publishedDate": "2017-09-28",
        "description": "Once you learn to code using JavaScript, the world of gaming opens up. If you already know a bit about JavaScript, it's time to pick up the pace! In this book, learn how to build mind-bending games, that you'll want to play for hours and will amaze your friends. Along the way, learn about core coding and gaming concepts like variables, random numbers, key presses and arrays. The Generation Code series is a hands-on guide to computer coding, designed to train you in the coding languages used by real-world computer programmers. You'll discover how to code exciting programs, web pages, apps and games, and learn how the tools and functions you're using can be applied to other situations. Other books in the Generation Code series: I'm an Advanced Scratch Coder I'm a Python Programmer I'm an HTML Web Page Builder I'm an App Developer I'm a JavaScript Games Maker: The Basics",
        "industryIdentifiers": [
          {
            "type": "ISBN_10",
            "identifier": "1526301105"
          },
          {
            "type": "ISBN_13",
            "identifier": "9781526301109"
          }
        ],
        "readingModes": {
          "text": false,
          "image": false
        },
        "pageCount": 32,
        "printType": "BOOK",
        "maturityRating": "NOT_MATURE",
        "allowAnonLogging": false,
        "contentVersion": "preview-1.0.0",
        "panelizationSummary": {
          "containsEpubBubbles": false,
          "containsImageBubbles": false
        },
        "imageLinks": {
          "smallThumbnail": "http://books.google.com/books/content?id=1oc0vgAACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
          "thumbnail": "http://books.google.com/books/content?id=1oc0vgAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
        },
        "language": "en",
        "previewLink": "http://books.google.co.uk/books?id=1oc0vgAACAAJ&dq=javascript&hl=&cd=1&source=gbs_api",
        "infoLink": "http://books.google.co.uk/books?id=1oc0vgAACAAJ&dq=javascript&hl=&source=gbs_api",
        "canonicalVolumeLink": "https://books.google.com/books/about/I_m_a_JavaScript_Games_Maker_Advanced_Co.html?hl=&id=1oc0vgAACAAJ"
      },
      "saleInfo": {
        "country": "GB",
        "saleability": "NOT_FOR_SALE",
        "isEbook": false
      },
      "accessInfo": {
        "country": "GB",
        "viewability": "NO_PAGES",
        "embeddable": false,
        "publicDomain": false,
        "textToSpeechPermission": "ALLOWED",
        "epub": {
          "isAvailable": false
        },
        "pdf": {
          "isAvailable": false
        },
        "webReaderLink": "http://play.google.com/books/reader?id=1oc0vgAACAAJ&hl=&printsec=frontcover&source=gbs_api",
        "accessViewStatus": "NONE",
        "quoteSharingAllowed": false
      },
      "searchInfo": {
        "textSnippet": "If you already know a bit about JavaScript, it&#39;s time to pick up the pace! In this book, learn how to build mind-bending games, that you&#39;ll want to play for hours and will amaze your friends."
      }
    }
  ]
};