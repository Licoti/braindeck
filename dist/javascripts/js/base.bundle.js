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

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiamF2YXNjcmlwdHMvanMvYmFzZS5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSxjQUFjLEtBQXNDLElBQUksQ0FBK0I7O0FBRWhGO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0EsUUFBUSxDQUFDO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBOztBQUVBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTs7QUFFQSx1QkFBdUIsQ0FBQztBQUN4Qjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsTUFBTSxDQUFDO0FBQ1A7QUFDQSxPQUFPOztBQUVQLE1BQU0sQ0FBQyxpQ0FBaUMsU0FBUztBQUNqRCxLQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQSxNQUFNLENBQUM7QUFDUCx3QkFBd0IsaUJBQWlCO0FBQ3pDO0FBQ0E7O0FBRUE7QUFDQSwrQkFBK0IsU0FBUztBQUN4Qzs7QUFFQSxRQUFRLENBQUMsNkJBQTZCLGFBQWE7QUFDbkQsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2Jvb2tub2RlZ2VuZXJhdG9yLy4vcHVibGljL2pzL2Jhc2UuanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgZGVidWcgPSBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50JyB8fCBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ25vbmUnO1xuXG5leHBvcnQgZnVuY3Rpb24gaW5pdEhvbWUgKCkge1xuICBjb25zdCBCYXNlID0ge1xuICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChkZWJ1ZykgY29uc29sZS5sb2coJ0Jhc2UtaW5pdCAhJyk7XG5cbiAgICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhZGRCb29rJykubGVuZ3RoID4gMCkge1xuICAgICAgICAkKCcjc3VibWl0Qm9vaycpLm9uKCdjbGljaycsIHRoaXMuX2FkZEJvb2spO1xuICAgICAgfVxuXG4gICAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYm9va0xpc3QtbGlzdCcpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy5fbGlzdEJvb2soKTtcbiAgICAgIH1cblxuICAgIH0sXG5cbiAgICBfYWRkQm9vazogZnVuY3Rpb24gKGUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgaWYgKGRlYnVnKSBjb25zb2xlLmxvZygnX2FkZEJvb2snKTtcblxuICAgICAgY29uc3QgYm9va05hbWUgPSAkKCcjaW5wdXRCb29rTmFtZScpLnZhbCgpO1xuICAgICAgbGV0IGJvb2tJbmZvO1xuXG4gICAgICBib29rSW5mbyA9IHtcbiAgICAgICAgYm9va25hbWU6IGJvb2tOYW1lLFxuICAgICAgfTtcblxuICAgICAgJC5wb3N0KCcvYm9vaycsIGJvb2tJbmZvLCBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICBpZiAoZGVidWcpIGNvbnNvbGUubG9nKCdCb29rIERldGFpbCA6ICcsIGRhdGEpO1xuICAgICAgfSk7XG5cbiAgICAgICQoJy5ib29rTGlzdC1saXN0JykuYXBwZW5kKGA8bGk+JHtib29rTmFtZX08L2xpPmApO1xuICAgIH0sXG5cbiAgICBfbGlzdEJvb2s6IGZ1bmN0aW9uIChlKSB7XG4gICAgICBpZiAoZGVidWcpIGNvbnNvbGUubG9nKCdfbGlzdEJvb2snKTtcbiAgICAgIGxldCBkeW5uYW1pY05vdGUgPSAnJztcblxuICAgICAgJC5nZXQoJy9ib29rcycsIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgZGF0YS5sZW5ndGg7IGorKykge1xuICAgICAgICAgIGNvbnN0IGJvb2sgPSBkYXRhW2pdO1xuICAgICAgICAgIGNvbnN0IGJvb2tOYW1lID0gYm9vay5uYW1lO1xuXG4gICAgICAgICAgZHlubmFtaWNOb3RlICs9XG4gICAgICAgICAgICBgPGxpIGNsYXNzPVwiaGV5XCI+JHtib29rTmFtZX08L2xpPmA7XG4gICAgICAgIH1cblxuICAgICAgICAkKCcuYm9va0xpc3QtbGlzdCcpLmFwcGVuZChgJHtkeW5uYW1pY05vdGV9YCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgQmFzZS5pbml0KCk7XG59Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9