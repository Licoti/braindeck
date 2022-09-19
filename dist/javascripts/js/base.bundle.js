"use strict";
(self["webpackChunkbooknodegenerator"] = self["webpackChunkbooknodegenerator"] || []).push([["js/base"],{

/***/ "./public/js/base.js":
/*!***************************!*\
  !*** ./public/js/base.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "initHome": () => (/* binding */ initHome)
/* harmony export */ });
/* harmony import */ var select2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! select2 */ "./node_modules/select2/dist/js/select2.js");
/* harmony import */ var select2__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(select2__WEBPACK_IMPORTED_MODULE_0__);
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
const debug =  true || 0;


function initHome () {
  const Base = {
    init: function () {
      if (debug) console.log('Base-init !');

      if (document.getElementsByClassName('addBook').length > 0) {
        $('#submitBook').on('click', this._addBook);
        $('.bookList-list').on('click', 'li button', this._deleteBook);
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
        url: "/books",
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
        url:"/book"
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
        url: `/book/${idBook}`,
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

      $.get('/books', function (data) {
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

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiamF2YXNjcmlwdHMvanMvYmFzZS5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGNBQWMsS0FBc0MsSUFBSSxDQUErQjtBQUN0RTs7QUFFVjtBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFFBQVEsQ0FBQztBQUNULFFBQVEsQ0FBQztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBOztBQUVBLE1BQU0sQ0FBQztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLGlCQUFpQjtBQUMzQztBQUNBOztBQUVBLDRCQUE0Qix5QkFBeUI7QUFDckQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBLGdFQUFnRSxLQUFLOztBQUVyRSxNQUFNLENBQUM7QUFDUDtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsQ0FBQzs7QUFFdEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7O0FBRUEsdUJBQXVCLENBQUM7QUFDeEIsMkJBQTJCLENBQUM7QUFDNUIscUNBQXFDLENBQUM7QUFDdEM7O0FBRUEsc0JBQXNCLG1DQUFtQztBQUN6RDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsTUFBTSxDQUFDO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTzs7QUFFUCxNQUFNLENBQUMscUNBQXFDLGdCQUFnQixJQUFJLFVBQVUsSUFBSSxxQ0FBcUM7QUFDbkgsS0FBSzs7QUFFTDtBQUNBOztBQUVBOztBQUVBLHFCQUFxQixDQUFDO0FBQ3RCLE1BQU0sQ0FBQzs7QUFFUCxNQUFNLENBQUM7QUFDUDtBQUNBLHNCQUFzQixPQUFPO0FBQzdCLE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBLE1BQU0sQ0FBQztBQUNQLHdCQUF3QixpQkFBaUI7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDBCQUEwQix5QkFBeUI7QUFDbkQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsdUJBQXVCLE9BQU8sSUFBSSxVQUFVLElBQUksa0JBQWtCO0FBQ2xFOztBQUVBLFFBQVEsQ0FBQyw2QkFBNkIsYUFBYTtBQUNuRCxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYm9va25vZGVnZW5lcmF0b3IvLi9wdWJsaWMvanMvYmFzZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBkZWJ1ZyA9IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnIHx8IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAnbm9uZSc7XG5pbXBvcnQgJ3NlbGVjdDInO1xuXG5leHBvcnQgZnVuY3Rpb24gaW5pdEhvbWUgKCkge1xuICBjb25zdCBCYXNlID0ge1xuICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChkZWJ1ZykgY29uc29sZS5sb2coJ0Jhc2UtaW5pdCAhJyk7XG5cbiAgICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhZGRCb29rJykubGVuZ3RoID4gMCkge1xuICAgICAgICAkKCcjc3VibWl0Qm9vaycpLm9uKCdjbGljaycsIHRoaXMuX2FkZEJvb2spO1xuICAgICAgICAkKCcuYm9va0xpc3QtbGlzdCcpLm9uKCdjbGljaycsICdsaSBidXR0b24nLCB0aGlzLl9kZWxldGVCb29rKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2Jvb2tMaXN0LWxpc3QnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMuX2xpc3RCb29rKCk7XG4gICAgICAgIHRoaXMuX2NhdGVnb3J5Qm9vaygpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBfY2F0ZWdvcnlCb29rOiBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoZGVidWcpIGNvbnNvbGUubG9nKCdfY2F0ZWdvcnlCb29rJyk7XG5cbiAgICAgIGxldCBib29rQ2F0ZWdvcmllcyA9IFtdO1xuXG4gICAgICAkLmFqYXgoe1xuICAgICAgICB0eXBlOiBcIkdFVFwiLFxuICAgICAgICB1cmw6IFwiL2Jvb2tzXCIsXG4gICAgICAgIGFzeW5jOiBmYWxzZSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgZGF0YS5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgY29uc3QgYm9vayA9IGRhdGFbal07XG4gICAgICAgICAgICBjb25zdCBib29rQ2F0ZWdvcnkgPSBib29rLmNhdGVnb3J5O1xuXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGJvb2tDYXRlZ29yeS5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICBjb25zdCBib29rQ2F0ZWdvcnlOYW1lID0gYm9va0NhdGVnb3J5W2pdLm5hbWU7XG4gICAgICAgICAgICAgIGNvbnN0IGJvb2tDYXRlZ29yeUlkID0gYm9va0NhdGVnb3J5W2pdLmlkO1xuXG4gICAgICAgICAgICAgIGJvb2tDYXRlZ29yaWVzLnB1c2goe1xuICAgICAgICAgICAgICAgIGlkOiBib29rQ2F0ZWdvcnlJZCxcbiAgICAgICAgICAgICAgICB0ZXh0OiBib29rQ2F0ZWdvcnlOYW1lXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IHRleHRzID0gYm9va0NhdGVnb3JpZXMubWFwKG8gPT4gby50ZXh0KVxuICAgICAgY29uc3QgYm9va0NhdGVnb3JpZXNVbmlxdWVUZXh0cyA9IGJvb2tDYXRlZ29yaWVzLmZpbHRlcigoe3RleHR9LCBpbmRleCkgPT4gIXRleHRzLmluY2x1ZGVzKHRleHQsIGluZGV4ICsgMSkpXG5cbiAgICAgICQoXCIjaW5wdXRCb29rQ2F0ZWdvcnlcIikuc2VsZWN0Mih7XG4gICAgICAgIHRhZ3M6IHRydWUsXG4gICAgICAgIGRhdGE6IGJvb2tDYXRlZ29yaWVzVW5pcXVlVGV4dHMsXG4gICAgICAgIGNyZWF0ZVRhZzogZnVuY3Rpb24gKHBhcmFtcykge1xuICAgICAgICAgIHZhciB0ZXJtID0gJC50cmltKHBhcmFtcy50ZXJtKTtcblxuICAgICAgICAgIGlmICh0ZXJtID09PSAnJykge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGlkOiB0ZXJtLFxuICAgICAgICAgICAgdGV4dDogdGVybSxcbiAgICAgICAgICAgIG5ld1RhZzogdHJ1ZVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9LFxuXG4gICAgX2FkZEJvb2s6IGZ1bmN0aW9uIChlKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIGlmIChkZWJ1ZykgY29uc29sZS5sb2coJ19hZGRCb29rJyk7XG5cbiAgICAgIGNvbnN0IGJvb2tOYW1lID0gJCgnI2lucHV0Qm9va05hbWUnKS52YWwoKTtcbiAgICAgIGNvbnN0IGJvb2tDYXRlZ29yeSA9ICQoJyNpbnB1dEJvb2tDYXRlZ29yeScpLnZhbCgpO1xuICAgICAgY29uc3QgZGF0YVNlbGVjdGVkQ2F0YWdvcmllcyA9ICQoJyNpbnB1dEJvb2tDYXRlZ29yeScpLnNlbGVjdDIoJ2RhdGEnKTtcbiAgICAgIGNvbnN0IGNhdGVnb3JpZXMgPSBbXTtcblxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBkYXRhU2VsZWN0ZWRDYXRhZ29yaWVzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIGNvbnN0IGNhdGVnb3J5ID0gZGF0YVNlbGVjdGVkQ2F0YWdvcmllc1tqXTtcbiAgICAgICAgY29uc3QgY2F0ZWdvcnlJZCA9IGNhdGVnb3J5Ll9yZXN1bHRJZDtcbiAgICAgICAgY29uc3QgY2F0ZWdvcnlOYW1lID0gY2F0ZWdvcnkudGV4dDtcblxuICAgICAgICBjYXRlZ29yaWVzLnB1c2goe1xuICAgICAgICAgIGlkOiBjYXRlZ29yeUlkLFxuICAgICAgICAgIG5hbWU6IGNhdGVnb3J5TmFtZVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgbGV0IGJvb2tJbmZvO1xuXG4gICAgICBib29rSW5mbyA9IHtcbiAgICAgICAgYm9va2lkOiBEYXRlLm5vdygpLFxuICAgICAgICBib29rbmFtZTogYm9va05hbWUsXG4gICAgICAgIGNhdGVnb3JpZXM6IGNhdGVnb3JpZXNcbiAgICAgIH07XG5cbiAgICAgICQuYWpheCh7XG4gICAgICAgIHR5cGU6XCJQT1NUXCIsXG4gICAgICAgIGRhdGFUeXBlOlwianNvblwiLFxuICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgIGRhdGE6SlNPTi5zdHJpbmdpZnkoYm9va0luZm8pLFxuICAgICAgICB1cmw6XCIvYm9va1wiXG4gICAgICB9KS5kb25lKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICAgICAgY29uc29sZS5sb2coXCJSZXNwb25zZSBvZiB1cGRhdGU6IFwiLHJlc3BvbnNlKVxuICAgICAgfSkuZmFpbChmdW5jdGlvbih4aHIsIHRleHRTdGF0dXMsIGVycm9yVGhyb3duKXtcbiAgICAgICAgY29uc29sZS5sb2coXCJFUlJPUjogXCIseGhyLnJlc3BvbnNlVGV4dClcbiAgICAgICAgcmV0dXJuIHhoci5yZXNwb25zZVRleHQ7XG4gICAgICB9KTtcblxuICAgICAgJCgnLmJvb2tMaXN0LWxpc3QnKS5hcHBlbmQoYDxsaSBpZD1cIiR7Ym9va0luZm8uYm9va2lkfVwiPiR7Ym9va05hbWV9IC0gJHtib29rSW5mby5jYXRlZ29yaWVzLm1hcCh4ID0+IHgubmFtZSl9PC9saT5gKTtcbiAgICB9LFxuXG4gICAgX2RlbGV0ZUJvb2s6IGZ1bmN0aW9uIChlKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIGlmIChkZWJ1ZykgY29uc29sZS5sb2coJ19hZGRCb29rJyk7XG5cbiAgICAgIGNvbnN0IGlkQm9vayA9ICQodGhpcykuY2xvc2VzdCgnbGknKS5hdHRyKFwiaWRcIik7XG4gICAgICAkKHRoaXMpLmNsb3Nlc3QoJ2xpJykucmVtb3ZlKCk7XG5cbiAgICAgICQuYWpheCh7XG4gICAgICAgIHR5cGU6XCJERUxFVEVcIixcbiAgICAgICAgdXJsOiBgL2Jvb2svJHtpZEJvb2t9YCxcbiAgICAgIH0pLmRvbmUoZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgICAgICBjb25zb2xlLmxvZyhcIlJlc3BvbnNlIG9mIHVwZGF0ZTogXCIscmVzcG9uc2UpXG4gICAgICB9KS5mYWlsKGZ1bmN0aW9uKHhociwgdGV4dFN0YXR1cywgZXJyb3JUaHJvd24pe1xuICAgICAgICBjb25zb2xlLmxvZyhcIkVSUk9SOiBcIix4aHIucmVzcG9uc2VUZXh0KVxuICAgICAgICByZXR1cm4geGhyLnJlc3BvbnNlVGV4dDtcbiAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBfbGlzdEJvb2s6IGZ1bmN0aW9uIChlKSB7XG4gICAgICBpZiAoZGVidWcpIGNvbnNvbGUubG9nKCdfbGlzdEJvb2snKTtcbiAgICAgIGxldCBkeW5uYW1pY05vdGUgPSAnJztcblxuICAgICAgJC5nZXQoJy9ib29rcycsIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgZGF0YS5sZW5ndGg7IGorKykge1xuICAgICAgICAgIGNvbnN0IGJvb2sgPSBkYXRhW2pdO1xuICAgICAgICAgIGNvbnN0IGJvb2tOYW1lID0gYm9vay5uYW1lO1xuICAgICAgICAgIGNvbnN0IGJvb2tDYXRlZ29yeSA9IGJvb2suY2F0ZWdvcnk7XG4gICAgICAgICAgY29uc3QgYm9va0lkID0gYm9vay5ib29raWQ7XG4gICAgICAgICAgbGV0IGJvb2tDYXRlZ29yeU5hbWUgPSBbXTtcbiAgICAgICAgICBsZXQgYm9va0NhdGVnb3J5SWQgPSBbXTtcblxuICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgYm9va0NhdGVnb3J5Lmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICBib29rQ2F0ZWdvcnlOYW1lLnB1c2goYm9va0NhdGVnb3J5W2pdLm5hbWUpO1xuICAgICAgICAgICAgYm9va0NhdGVnb3J5SWQucHVzaChib29rQ2F0ZWdvcnlbal0uaWQpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGR5bm5hbWljTm90ZSArPVxuICAgICAgICAgICAgYDxsaSBpZD1cIiR7Ym9va0lkfVwiPiR7Ym9va05hbWV9IC0gJHtib29rQ2F0ZWdvcnlOYW1lfSA8YnV0dG9uPnN1cHByaW1lcjwvYnV0dG9uPjwvbGk+YDtcbiAgICAgICAgfVxuXG4gICAgICAgICQoJy5ib29rTGlzdC1saXN0JykuYXBwZW5kKGAke2R5bm5hbWljTm90ZX1gKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICBCYXNlLmluaXQoKTtcbn0iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=