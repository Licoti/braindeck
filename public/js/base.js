const debug = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'none';

export function initHome () {
  const Base = {
    init: function () {
      if (debug) console.log('Base-init !');

      if (document.getElementsByClassName('addBook').length > 0) {
        $('#submitBook').on('click', this._addBook);
      }

      if (document.getElementsByClassName('bookList-list').length > 0) {
        this._listBook();
      }

    },

    _addBook: function (e) {
      e.preventDefault();

      if (debug) console.log('_addBook');

      const bookName = $('#inputBookName').val();
      let bookInfo;

      bookInfo = {
        bookname: bookName,
      };

      $.post('/book', bookInfo, function (data) {
        if (debug) console.log('Book Detail : ', data);
      });

      $('.bookList-list').append(`<li>${bookName}</li>`);
    },

    _listBook: function (e) {
      if (debug) console.log('_listBook');
      let dynnamicNote = '';

      $.get('/books', function (data) {
        for (let j = 0; j < data.length; j++) {
          const book = data[j];
          const bookName = book.name;

          dynnamicNote +=
            `<li class="hey">${bookName}</li>`;
        }

        $('.bookList-list').append(`${dynnamicNote}`);
      });
    }
  };

  Base.init();
}