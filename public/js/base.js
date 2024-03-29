const debug = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'none';
import 'select2';

export function initHome () {
  const Base = {
    init: function () {
      if (debug) console.log('Base-init !');

      if (document.getElementsByClassName('addBook').length > 0) {
        $('#submitBook').on('click', this._addBook);
        $('.bookList-list').on('click', 'li button', this._deleteBook);
        $('#uploadBook').on('click', this._uploadBook);
        $('#inputMulter').on('click', this._uploadBookMulter);
      }

      if (document.getElementsByClassName('bookList-list').length > 0) {
        this._listBook();
        this._categoryBook();
      }
    },

    _categoryBook: function () {
      if (debug) console.log('_categoryBook');

      let bookCategories = [];

      $.ajax({
        type: "GET",
        url: "api/books",
        async: false,
        success: function(data) {
          for (let j = 0; j < data.length; j++) {
            const book = data[j];
            const bookCategory = book.category;

            for (let j = 0; j < bookCategory.length; j++) {
              const bookCategoryName = bookCategory[j].name;
              const bookCategoryId = bookCategory[j].id;

              bookCategories.push({
                id: bookCategoryId,
                text: bookCategoryName
              });
            }
          }
        }
      });

      const texts = bookCategories.map(o => o.text)
      const bookCategoriesUniqueTexts = bookCategories.filter(({text}, index) => !texts.includes(text, index + 1))

      $("#inputBookCategory").select2({
        tags: true,
        data: bookCategoriesUniqueTexts,
        createTag: function (params) {
          var term = $.trim(params.term);

          if (term === '') {
            return null;
          }

          return {
            id: term,
            text: term,
            newTag: true
          }
        }
      })
    },

    _uploadBook: function (e) {
      e.preventDefault();
      if (debug) console.log('_uploadBook');

      const bookName = $('#inputBookName2').val();
      const bookUpload = document.getElementById('formFileBookNote2').files[0];
    },

    _uploadBookMulter: function (e) {
      e.preventDefault();
      if (debug) console.log('_uploadBookMulter');

      const formData = new FormData(document.getElementById('multerForm'));
      const bookName = $('.textMulter').val();

      let bookInfo;
      var randAd = [];

      for (var [key, value] of formData.entries()) {
        randAd.push(value);
        console.log("FormData : ", JSON.stringify(value));
      }


      for ([key, value] of formData.entries()) {
        let val;
        if (value instanceof File) {
          val = value.name;
          console.log('0:',value);
        } else {
          val = value;
        }
        console.log('test : ', key + ': ' + val);
      }


      bookInfo = {
        bookid: Date.now(),
        bookname: bookName,
        randA: {'toto': 'hey'}
      };

      console.log("randA", randAd[0]);
      console.log("Bookinfo", bookInfo);

      $.ajax({
        type:"POST",
        dataType:"json",
        contentType: "application/json",
        data:JSON.stringify(bookInfo),
        url:"api/stats"
      }).done(function(response){
        console.log("Response of update: ",response)
      }).fail(function(xhr, textStatus, errorThrown){
        console.log("ERROR: ",xhr.responseText)
        return xhr.responseText;
      });

/*      $.ajax({
        type:"POST",
        dataType:"json",
        contentType: "application/json",
        data:JSON.stringify(bookInfo),
        url:"api/stats"
      }).done(function(response){
        console.log("Response of update: ",response)
      }).fail(function(xhr, textStatus, errorThrown){
        console.log("ERROR: ",xhr.responseText)
        return xhr.responseText;
      });*/
    },

    _addBook: function (e) {
      e.preventDefault();

      if (debug) console.log('_addBook');

      const bookName = $('#inputBookName').val();
      const bookCategory = $('#inputBookCategory').val();
      const dataSelectedCatagories = $('#inputBookCategory').select2('data');
      const categories = [];

      for (let j = 0; j < dataSelectedCatagories.length; j++) {
        const category = dataSelectedCatagories[j];
        const categoryId = category._resultId;
        const categoryName = category.text;

        categories.push({
          id: categoryId,
          name: categoryName
        });
      }

      let bookInfo;

      bookInfo = {
        bookid: Date.now(),
        bookname: bookName,
        categories: categories
      };

      $.ajax({
        type:"POST",
        dataType:"json",
        contentType: "application/json",
        data:JSON.stringify(bookInfo),
        url:"api/book"
      }).done(function(response){
        console.log("Response of update: ",response)
      }).fail(function(xhr, textStatus, errorThrown){
        console.log("ERROR: ",xhr.responseText)
        return xhr.responseText;
      });

      $('.bookList-list').append(`<li id="${bookInfo.bookid}">${bookName} - ${bookInfo.categories.map(x => x.name)}</li>`);
    },

    _deleteBook: function (e) {
      e.preventDefault();

      if (debug) console.log('_addBook');

      const idBook = $(this).closest('li').attr("id");
      $(this).closest('li').remove();

      $.ajax({
        type:"DELETE",
        url: `api/book/${idBook}`,
      }).done(function(response){
        console.log("Response of update: ",response)
      }).fail(function(xhr, textStatus, errorThrown){
        console.log("ERROR: ",xhr.responseText)
        return xhr.responseText;
      });
    },

    _listBook: function (e) {
      if (debug) console.log('_listBook');
      let dynnamicNote = '';

      $.get('api/books', function (data) {
        for (let j = 0; j < data.length; j++) {
          const book = data[j];
          const bookName = book.name;
          const bookCategory = book.category;
          const bookId = book.bookid;
          let bookCategoryName = [];
          let bookCategoryId = [];

          for (let j = 0; j < bookCategory.length; j++) {
            bookCategoryName.push(bookCategory[j].name);
            bookCategoryId.push(bookCategory[j].id);
          }

          dynnamicNote +=
            `<li id="${bookId}">${bookName} - ${bookCategoryName} <button>supprimer</button></li>`;
        }

        $('.bookList-list').append(`${dynnamicNote}`);
      });
    }
  };

  Base.init();
}