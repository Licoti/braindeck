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

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiamF2YXNjcmlwdHMvanMvYmFzZS5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGNBQWMsS0FBc0MsSUFBSSxDQUErQjtBQUN0RTs7QUFFVjtBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFFBQVEsQ0FBQztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTs7QUFFQSxNQUFNLENBQUM7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQixpQkFBaUI7QUFDM0M7QUFDQTs7QUFFQSw0QkFBNEIseUJBQXlCO0FBQ3JEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQSxnRUFBZ0UsS0FBSzs7QUFFckUsTUFBTSxDQUFDO0FBQ1A7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLENBQUM7O0FBRXRCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSzs7QUFFTDtBQUNBOztBQUVBOztBQUVBLHVCQUF1QixDQUFDO0FBQ3hCLDJCQUEyQixDQUFDO0FBQzVCLHFDQUFxQyxDQUFDO0FBQ3RDOztBQUVBLHNCQUFzQixtQ0FBbUM7QUFDekQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxNQUFNLENBQUM7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxPQUFPOztBQUVQLE1BQU0sQ0FBQyxpQ0FBaUMsU0FBUztBQUNqRCxLQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQSxNQUFNLENBQUM7QUFDUCx3QkFBd0IsaUJBQWlCO0FBQ3pDO0FBQ0E7O0FBRUE7QUFDQSwrQkFBK0IsU0FBUztBQUN4Qzs7QUFFQSxRQUFRLENBQUMsNkJBQTZCLGFBQWE7QUFDbkQsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2Jvb2tub2RlZ2VuZXJhdG9yLy4vcHVibGljL2pzL2Jhc2UuanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgZGVidWcgPSBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50JyB8fCBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ25vbmUnO1xuaW1wb3J0ICdzZWxlY3QyJztcblxuZXhwb3J0IGZ1bmN0aW9uIGluaXRIb21lICgpIHtcbiAgY29uc3QgQmFzZSA9IHtcbiAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoZGVidWcpIGNvbnNvbGUubG9nKCdCYXNlLWluaXQgIScpO1xuXG4gICAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYWRkQm9vaycpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgJCgnI3N1Ym1pdEJvb2snKS5vbignY2xpY2snLCB0aGlzLl9hZGRCb29rKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2Jvb2tMaXN0LWxpc3QnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMuX2xpc3RCb29rKCk7XG4gICAgICAgIHRoaXMuX2NhdGVnb3J5Qm9vaygpO1xuICAgICAgfVxuXG4gICAgfSxcblxuICAgIF9jYXRlZ29yeUJvb2s6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChkZWJ1ZykgY29uc29sZS5sb2coJ19jYXRlZ29yeUJvb2snKTtcblxuICAgICAgbGV0IGJvb2tDYXRlZ29yaWVzID0gW107XG5cbiAgICAgICQuYWpheCh7XG4gICAgICAgIHR5cGU6IFwiR0VUXCIsXG4gICAgICAgIHVybDogXCIvYm9va3NcIixcbiAgICAgICAgYXN5bmM6IGZhbHNlLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBkYXRhLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICBjb25zdCBib29rID0gZGF0YVtqXTtcbiAgICAgICAgICAgIGNvbnN0IGJvb2tDYXRlZ29yeSA9IGJvb2suY2F0ZWdvcnk7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgYm9va0NhdGVnb3J5Lmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgIGNvbnN0IGJvb2tDYXRlZ29yeU5hbWUgPSBib29rQ2F0ZWdvcnlbal0ubmFtZTtcbiAgICAgICAgICAgICAgY29uc3QgYm9va0NhdGVnb3J5SWQgPSBib29rQ2F0ZWdvcnlbal0uaWQ7XG5cbiAgICAgICAgICAgICAgYm9va0NhdGVnb3JpZXMucHVzaCh7XG4gICAgICAgICAgICAgICAgaWQ6IGJvb2tDYXRlZ29yeUlkLFxuICAgICAgICAgICAgICAgIHRleHQ6IGJvb2tDYXRlZ29yeU5hbWVcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgY29uc3QgdGV4dHMgPSBib29rQ2F0ZWdvcmllcy5tYXAobyA9PiBvLnRleHQpXG4gICAgICBjb25zdCBib29rQ2F0ZWdvcmllc1VuaXF1ZVRleHRzID0gYm9va0NhdGVnb3JpZXMuZmlsdGVyKCh7dGV4dH0sIGluZGV4KSA9PiAhdGV4dHMuaW5jbHVkZXModGV4dCwgaW5kZXggKyAxKSlcblxuICAgICAgJChcIiNpbnB1dEJvb2tDYXRlZ29yeVwiKS5zZWxlY3QyKHtcbiAgICAgICAgdGFnczogdHJ1ZSxcbiAgICAgICAgZGF0YTogYm9va0NhdGVnb3JpZXNVbmlxdWVUZXh0cyxcbiAgICAgICAgY3JlYXRlVGFnOiBmdW5jdGlvbiAocGFyYW1zKSB7XG4gICAgICAgICAgdmFyIHRlcm0gPSAkLnRyaW0ocGFyYW1zLnRlcm0pO1xuXG4gICAgICAgICAgaWYgKHRlcm0gPT09ICcnKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaWQ6IHRlcm0sXG4gICAgICAgICAgICB0ZXh0OiB0ZXJtLFxuICAgICAgICAgICAgbmV3VGFnOiB0cnVlXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0sXG5cbiAgICBfYWRkQm9vazogZnVuY3Rpb24gKGUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgaWYgKGRlYnVnKSBjb25zb2xlLmxvZygnX2FkZEJvb2snKTtcblxuICAgICAgY29uc3QgYm9va05hbWUgPSAkKCcjaW5wdXRCb29rTmFtZScpLnZhbCgpO1xuICAgICAgY29uc3QgYm9va0NhdGVnb3J5ID0gJCgnI2lucHV0Qm9va0NhdGVnb3J5JykudmFsKCk7XG4gICAgICBjb25zdCBkYXRhU2VsZWN0ZWRDYXRhZ29yaWVzID0gJCgnI2lucHV0Qm9va0NhdGVnb3J5Jykuc2VsZWN0MignZGF0YScpO1xuICAgICAgY29uc3QgY2F0ZWdvcmllcyA9IFtdO1xuXG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGRhdGFTZWxlY3RlZENhdGFnb3JpZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgY29uc3QgY2F0ZWdvcnkgPSBkYXRhU2VsZWN0ZWRDYXRhZ29yaWVzW2pdO1xuICAgICAgICBjb25zdCBjYXRlZ29yeUlkID0gY2F0ZWdvcnkuX3Jlc3VsdElkO1xuICAgICAgICBjb25zdCBjYXRlZ29yeU5hbWUgPSBjYXRlZ29yeS50ZXh0O1xuXG4gICAgICAgIGNhdGVnb3JpZXMucHVzaCh7XG4gICAgICAgICAgaWQ6IGNhdGVnb3J5SWQsXG4gICAgICAgICAgbmFtZTogY2F0ZWdvcnlOYW1lXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBsZXQgYm9va0luZm87XG5cbiAgICAgIGJvb2tJbmZvID0ge1xuICAgICAgICBib29rbmFtZTogYm9va05hbWUsXG4gICAgICAgIGNhdGVnb3JpZXM6IGNhdGVnb3JpZXNcbiAgICAgIH07XG5cbiAgICAgICQuYWpheCh7XG4gICAgICAgIHR5cGU6XCJQT1NUXCIsXG4gICAgICAgIGRhdGFUeXBlOlwianNvblwiLFxuICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgIGRhdGE6SlNPTi5zdHJpbmdpZnkoYm9va0luZm8pLFxuICAgICAgICB1cmw6XCIvYm9va1wiXG4gICAgICB9KS5kb25lKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICAgICAgY29uc29sZS5sb2coXCJSZXNwb25zZSBvZiB1cGRhdGU6IFwiLHJlc3BvbnNlKVxuICAgICAgfSkuZmFpbChmdW5jdGlvbih4aHIsIHRleHRTdGF0dXMsIGVycm9yVGhyb3duKXtcbiAgICAgICAgY29uc29sZS5sb2coXCJFUlJPUjogXCIseGhyLnJlc3BvbnNlVGV4dClcbiAgICAgICAgcmV0dXJuIHhoci5yZXNwb25zZVRleHQ7XG4gICAgICB9KTtcblxuICAgICAgJCgnLmJvb2tMaXN0LWxpc3QnKS5hcHBlbmQoYDxsaT4ke2Jvb2tOYW1lfTwvbGk+YCk7XG4gICAgfSxcblxuICAgIF9saXN0Qm9vazogZnVuY3Rpb24gKGUpIHtcbiAgICAgIGlmIChkZWJ1ZykgY29uc29sZS5sb2coJ19saXN0Qm9vaycpO1xuICAgICAgbGV0IGR5bm5hbWljTm90ZSA9ICcnO1xuXG4gICAgICAkLmdldCgnL2Jvb2tzJywgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBkYXRhLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgY29uc3QgYm9vayA9IGRhdGFbal07XG4gICAgICAgICAgY29uc3QgYm9va05hbWUgPSBib29rLm5hbWU7XG5cbiAgICAgICAgICBkeW5uYW1pY05vdGUgKz1cbiAgICAgICAgICAgIGA8bGkgY2xhc3M9XCJoZXlcIj4ke2Jvb2tOYW1lfTwvbGk+YDtcbiAgICAgICAgfVxuXG4gICAgICAgICQoJy5ib29rTGlzdC1saXN0JykuYXBwZW5kKGAke2R5bm5hbWljTm90ZX1gKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICBCYXNlLmluaXQoKTtcbn0iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=