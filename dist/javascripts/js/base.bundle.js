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

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiamF2YXNjcmlwdHMvanMvYmFzZS5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGNBQWMsS0FBc0MsSUFBSSxDQUErQjtBQUN0RTs7QUFFVjtBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFFBQVEsQ0FBQztBQUNULFFBQVEsQ0FBQztBQUNULFFBQVEsQ0FBQztBQUNULFFBQVEsQ0FBQztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBOztBQUVBLE1BQU0sQ0FBQztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLGlCQUFpQjtBQUMzQztBQUNBOztBQUVBLDRCQUE0Qix5QkFBeUI7QUFDckQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBLGdFQUFnRSxLQUFLOztBQUVyRSxNQUFNLENBQUM7QUFDUDtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsQ0FBQzs7QUFFdEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQSx1QkFBdUIsQ0FBQztBQUN4QjtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBO0FBQ0EsdUJBQXVCLENBQUM7O0FBRXhCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjs7QUFFQTtBQUNBOztBQUVBLE1BQU0sQ0FBQztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxPQUFPLEVBQUU7QUFDVCxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7O0FBRUEsdUJBQXVCLENBQUM7QUFDeEIsMkJBQTJCLENBQUM7QUFDNUIscUNBQXFDLENBQUM7QUFDdEM7O0FBRUEsc0JBQXNCLG1DQUFtQztBQUN6RDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsTUFBTSxDQUFDO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTzs7QUFFUCxNQUFNLENBQUMscUNBQXFDLGdCQUFnQixJQUFJLFVBQVUsSUFBSSxxQ0FBcUM7QUFDbkgsS0FBSzs7QUFFTDtBQUNBOztBQUVBOztBQUVBLHFCQUFxQixDQUFDO0FBQ3RCLE1BQU0sQ0FBQzs7QUFFUCxNQUFNLENBQUM7QUFDUDtBQUNBLHlCQUF5QixPQUFPO0FBQ2hDLE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBLE1BQU0sQ0FBQztBQUNQLHdCQUF3QixpQkFBaUI7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDBCQUEwQix5QkFBeUI7QUFDbkQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsdUJBQXVCLE9BQU8sSUFBSSxVQUFVLElBQUksa0JBQWtCO0FBQ2xFOztBQUVBLFFBQVEsQ0FBQyw2QkFBNkIsYUFBYTtBQUNuRCxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYm9va25vZGVnZW5lcmF0b3IvLi9wdWJsaWMvanMvYmFzZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBkZWJ1ZyA9IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnIHx8IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAnbm9uZSc7XG5pbXBvcnQgJ3NlbGVjdDInO1xuXG5leHBvcnQgZnVuY3Rpb24gaW5pdEhvbWUgKCkge1xuICBjb25zdCBCYXNlID0ge1xuICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChkZWJ1ZykgY29uc29sZS5sb2coJ0Jhc2UtaW5pdCAhJyk7XG5cbiAgICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhZGRCb29rJykubGVuZ3RoID4gMCkge1xuICAgICAgICAkKCcjc3VibWl0Qm9vaycpLm9uKCdjbGljaycsIHRoaXMuX2FkZEJvb2spO1xuICAgICAgICAkKCcuYm9va0xpc3QtbGlzdCcpLm9uKCdjbGljaycsICdsaSBidXR0b24nLCB0aGlzLl9kZWxldGVCb29rKTtcbiAgICAgICAgJCgnI3VwbG9hZEJvb2snKS5vbignY2xpY2snLCB0aGlzLl91cGxvYWRCb29rKTtcbiAgICAgICAgJCgnI2lucHV0TXVsdGVyJykub24oJ2NsaWNrJywgdGhpcy5fdXBsb2FkQm9va011bHRlcik7XG4gICAgICB9XG5cbiAgICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdib29rTGlzdC1saXN0JykubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLl9saXN0Qm9vaygpO1xuICAgICAgICB0aGlzLl9jYXRlZ29yeUJvb2soKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgX2NhdGVnb3J5Qm9vazogZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKGRlYnVnKSBjb25zb2xlLmxvZygnX2NhdGVnb3J5Qm9vaycpO1xuXG4gICAgICBsZXQgYm9va0NhdGVnb3JpZXMgPSBbXTtcblxuICAgICAgJC5hamF4KHtcbiAgICAgICAgdHlwZTogXCJHRVRcIixcbiAgICAgICAgdXJsOiBcImFwaS9ib29rc1wiLFxuICAgICAgICBhc3luYzogZmFsc2UsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGRhdGEubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGJvb2sgPSBkYXRhW2pdO1xuICAgICAgICAgICAgY29uc3QgYm9va0NhdGVnb3J5ID0gYm9vay5jYXRlZ29yeTtcblxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBib29rQ2F0ZWdvcnkubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgY29uc3QgYm9va0NhdGVnb3J5TmFtZSA9IGJvb2tDYXRlZ29yeVtqXS5uYW1lO1xuICAgICAgICAgICAgICBjb25zdCBib29rQ2F0ZWdvcnlJZCA9IGJvb2tDYXRlZ29yeVtqXS5pZDtcblxuICAgICAgICAgICAgICBib29rQ2F0ZWdvcmllcy5wdXNoKHtcbiAgICAgICAgICAgICAgICBpZDogYm9va0NhdGVnb3J5SWQsXG4gICAgICAgICAgICAgICAgdGV4dDogYm9va0NhdGVnb3J5TmFtZVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCB0ZXh0cyA9IGJvb2tDYXRlZ29yaWVzLm1hcChvID0+IG8udGV4dClcbiAgICAgIGNvbnN0IGJvb2tDYXRlZ29yaWVzVW5pcXVlVGV4dHMgPSBib29rQ2F0ZWdvcmllcy5maWx0ZXIoKHt0ZXh0fSwgaW5kZXgpID0+ICF0ZXh0cy5pbmNsdWRlcyh0ZXh0LCBpbmRleCArIDEpKVxuXG4gICAgICAkKFwiI2lucHV0Qm9va0NhdGVnb3J5XCIpLnNlbGVjdDIoe1xuICAgICAgICB0YWdzOiB0cnVlLFxuICAgICAgICBkYXRhOiBib29rQ2F0ZWdvcmllc1VuaXF1ZVRleHRzLFxuICAgICAgICBjcmVhdGVUYWc6IGZ1bmN0aW9uIChwYXJhbXMpIHtcbiAgICAgICAgICB2YXIgdGVybSA9ICQudHJpbShwYXJhbXMudGVybSk7XG5cbiAgICAgICAgICBpZiAodGVybSA9PT0gJycpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpZDogdGVybSxcbiAgICAgICAgICAgIHRleHQ6IHRlcm0sXG4gICAgICAgICAgICBuZXdUYWc6IHRydWVcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSxcblxuICAgIF91cGxvYWRCb29rOiBmdW5jdGlvbiAoZSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgaWYgKGRlYnVnKSBjb25zb2xlLmxvZygnX3VwbG9hZEJvb2snKTtcblxuICAgICAgY29uc3QgYm9va05hbWUgPSAkKCcjaW5wdXRCb29rTmFtZTInKS52YWwoKTtcbiAgICAgIGNvbnN0IGJvb2tVcGxvYWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZm9ybUZpbGVCb29rTm90ZTInKS5maWxlc1swXTtcbiAgICB9LFxuXG4gICAgX3VwbG9hZEJvb2tNdWx0ZXI6IGZ1bmN0aW9uIChlKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBpZiAoZGVidWcpIGNvbnNvbGUubG9nKCdfdXBsb2FkQm9va011bHRlcicpO1xuXG4gICAgICBjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YShkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbXVsdGVyRm9ybScpKTtcbiAgICAgIGNvbnN0IGJvb2tOYW1lID0gJCgnLnRleHRNdWx0ZXInKS52YWwoKTtcblxuICAgICAgbGV0IGJvb2tJbmZvO1xuICAgICAgdmFyIHJhbmRBZCA9IFtdO1xuXG4gICAgICBmb3IgKHZhciBba2V5LCB2YWx1ZV0gb2YgZm9ybURhdGEuZW50cmllcygpKSB7XG4gICAgICAgIHJhbmRBZC5wdXNoKHZhbHVlKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJGb3JtRGF0YSA6IFwiLCBKU09OLnN0cmluZ2lmeSh2YWx1ZSkpO1xuICAgICAgfVxuXG5cbiAgICAgIGZvciAoW2tleSwgdmFsdWVdIG9mIGZvcm1EYXRhLmVudHJpZXMoKSkge1xuICAgICAgICBsZXQgdmFsO1xuICAgICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBGaWxlKSB7XG4gICAgICAgICAgdmFsID0gdmFsdWUubmFtZTtcbiAgICAgICAgICBjb25zb2xlLmxvZygnMDonLHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YWwgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZygndGVzdCA6ICcsIGtleSArICc6ICcgKyB2YWwpO1xuICAgICAgfVxuXG5cbiAgICAgIGJvb2tJbmZvID0ge1xuICAgICAgICBib29raWQ6IERhdGUubm93KCksXG4gICAgICAgIGJvb2tuYW1lOiBib29rTmFtZSxcbiAgICAgICAgcmFuZEE6IHsndG90byc6ICdoZXknfVxuICAgICAgfTtcblxuICAgICAgY29uc29sZS5sb2coXCJyYW5kQVwiLCByYW5kQWRbMF0pO1xuICAgICAgY29uc29sZS5sb2coXCJCb29raW5mb1wiLCBib29rSW5mbyk7XG5cbiAgICAgICQuYWpheCh7XG4gICAgICAgIHR5cGU6XCJQT1NUXCIsXG4gICAgICAgIGRhdGFUeXBlOlwianNvblwiLFxuICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgIGRhdGE6SlNPTi5zdHJpbmdpZnkoYm9va0luZm8pLFxuICAgICAgICB1cmw6XCJhcGkvc3RhdHNcIlxuICAgICAgfSkuZG9uZShmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiUmVzcG9uc2Ugb2YgdXBkYXRlOiBcIixyZXNwb25zZSlcbiAgICAgIH0pLmZhaWwoZnVuY3Rpb24oeGhyLCB0ZXh0U3RhdHVzLCBlcnJvclRocm93bil7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiRVJST1I6IFwiLHhoci5yZXNwb25zZVRleHQpXG4gICAgICAgIHJldHVybiB4aHIucmVzcG9uc2VUZXh0O1xuICAgICAgfSk7XG5cbi8qICAgICAgJC5hamF4KHtcbiAgICAgICAgdHlwZTpcIlBPU1RcIixcbiAgICAgICAgZGF0YVR5cGU6XCJqc29uXCIsXG4gICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgZGF0YTpKU09OLnN0cmluZ2lmeShib29rSW5mbyksXG4gICAgICAgIHVybDpcImFwaS9zdGF0c1wiXG4gICAgICB9KS5kb25lKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICAgICAgY29uc29sZS5sb2coXCJSZXNwb25zZSBvZiB1cGRhdGU6IFwiLHJlc3BvbnNlKVxuICAgICAgfSkuZmFpbChmdW5jdGlvbih4aHIsIHRleHRTdGF0dXMsIGVycm9yVGhyb3duKXtcbiAgICAgICAgY29uc29sZS5sb2coXCJFUlJPUjogXCIseGhyLnJlc3BvbnNlVGV4dClcbiAgICAgICAgcmV0dXJuIHhoci5yZXNwb25zZVRleHQ7XG4gICAgICB9KTsqL1xuICAgIH0sXG5cbiAgICBfYWRkQm9vazogZnVuY3Rpb24gKGUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgaWYgKGRlYnVnKSBjb25zb2xlLmxvZygnX2FkZEJvb2snKTtcblxuICAgICAgY29uc3QgYm9va05hbWUgPSAkKCcjaW5wdXRCb29rTmFtZScpLnZhbCgpO1xuICAgICAgY29uc3QgYm9va0NhdGVnb3J5ID0gJCgnI2lucHV0Qm9va0NhdGVnb3J5JykudmFsKCk7XG4gICAgICBjb25zdCBkYXRhU2VsZWN0ZWRDYXRhZ29yaWVzID0gJCgnI2lucHV0Qm9va0NhdGVnb3J5Jykuc2VsZWN0MignZGF0YScpO1xuICAgICAgY29uc3QgY2F0ZWdvcmllcyA9IFtdO1xuXG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGRhdGFTZWxlY3RlZENhdGFnb3JpZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgY29uc3QgY2F0ZWdvcnkgPSBkYXRhU2VsZWN0ZWRDYXRhZ29yaWVzW2pdO1xuICAgICAgICBjb25zdCBjYXRlZ29yeUlkID0gY2F0ZWdvcnkuX3Jlc3VsdElkO1xuICAgICAgICBjb25zdCBjYXRlZ29yeU5hbWUgPSBjYXRlZ29yeS50ZXh0O1xuXG4gICAgICAgIGNhdGVnb3JpZXMucHVzaCh7XG4gICAgICAgICAgaWQ6IGNhdGVnb3J5SWQsXG4gICAgICAgICAgbmFtZTogY2F0ZWdvcnlOYW1lXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBsZXQgYm9va0luZm87XG5cbiAgICAgIGJvb2tJbmZvID0ge1xuICAgICAgICBib29raWQ6IERhdGUubm93KCksXG4gICAgICAgIGJvb2tuYW1lOiBib29rTmFtZSxcbiAgICAgICAgY2F0ZWdvcmllczogY2F0ZWdvcmllc1xuICAgICAgfTtcblxuICAgICAgJC5hamF4KHtcbiAgICAgICAgdHlwZTpcIlBPU1RcIixcbiAgICAgICAgZGF0YVR5cGU6XCJqc29uXCIsXG4gICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgZGF0YTpKU09OLnN0cmluZ2lmeShib29rSW5mbyksXG4gICAgICAgIHVybDpcImFwaS9ib29rXCJcbiAgICAgIH0pLmRvbmUoZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgICAgICBjb25zb2xlLmxvZyhcIlJlc3BvbnNlIG9mIHVwZGF0ZTogXCIscmVzcG9uc2UpXG4gICAgICB9KS5mYWlsKGZ1bmN0aW9uKHhociwgdGV4dFN0YXR1cywgZXJyb3JUaHJvd24pe1xuICAgICAgICBjb25zb2xlLmxvZyhcIkVSUk9SOiBcIix4aHIucmVzcG9uc2VUZXh0KVxuICAgICAgICByZXR1cm4geGhyLnJlc3BvbnNlVGV4dDtcbiAgICAgIH0pO1xuXG4gICAgICAkKCcuYm9va0xpc3QtbGlzdCcpLmFwcGVuZChgPGxpIGlkPVwiJHtib29rSW5mby5ib29raWR9XCI+JHtib29rTmFtZX0gLSAke2Jvb2tJbmZvLmNhdGVnb3JpZXMubWFwKHggPT4geC5uYW1lKX08L2xpPmApO1xuICAgIH0sXG5cbiAgICBfZGVsZXRlQm9vazogZnVuY3Rpb24gKGUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgaWYgKGRlYnVnKSBjb25zb2xlLmxvZygnX2FkZEJvb2snKTtcblxuICAgICAgY29uc3QgaWRCb29rID0gJCh0aGlzKS5jbG9zZXN0KCdsaScpLmF0dHIoXCJpZFwiKTtcbiAgICAgICQodGhpcykuY2xvc2VzdCgnbGknKS5yZW1vdmUoKTtcblxuICAgICAgJC5hamF4KHtcbiAgICAgICAgdHlwZTpcIkRFTEVURVwiLFxuICAgICAgICB1cmw6IGBhcGkvYm9vay8ke2lkQm9va31gLFxuICAgICAgfSkuZG9uZShmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiUmVzcG9uc2Ugb2YgdXBkYXRlOiBcIixyZXNwb25zZSlcbiAgICAgIH0pLmZhaWwoZnVuY3Rpb24oeGhyLCB0ZXh0U3RhdHVzLCBlcnJvclRocm93bil7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiRVJST1I6IFwiLHhoci5yZXNwb25zZVRleHQpXG4gICAgICAgIHJldHVybiB4aHIucmVzcG9uc2VUZXh0O1xuICAgICAgfSk7XG4gICAgfSxcblxuICAgIF9saXN0Qm9vazogZnVuY3Rpb24gKGUpIHtcbiAgICAgIGlmIChkZWJ1ZykgY29uc29sZS5sb2coJ19saXN0Qm9vaycpO1xuICAgICAgbGV0IGR5bm5hbWljTm90ZSA9ICcnO1xuXG4gICAgICAkLmdldCgnYXBpL2Jvb2tzJywgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBkYXRhLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgY29uc3QgYm9vayA9IGRhdGFbal07XG4gICAgICAgICAgY29uc3QgYm9va05hbWUgPSBib29rLm5hbWU7XG4gICAgICAgICAgY29uc3QgYm9va0NhdGVnb3J5ID0gYm9vay5jYXRlZ29yeTtcbiAgICAgICAgICBjb25zdCBib29rSWQgPSBib29rLmJvb2tpZDtcbiAgICAgICAgICBsZXQgYm9va0NhdGVnb3J5TmFtZSA9IFtdO1xuICAgICAgICAgIGxldCBib29rQ2F0ZWdvcnlJZCA9IFtdO1xuXG4gICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBib29rQ2F0ZWdvcnkubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIGJvb2tDYXRlZ29yeU5hbWUucHVzaChib29rQ2F0ZWdvcnlbal0ubmFtZSk7XG4gICAgICAgICAgICBib29rQ2F0ZWdvcnlJZC5wdXNoKGJvb2tDYXRlZ29yeVtqXS5pZCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZHlubmFtaWNOb3RlICs9XG4gICAgICAgICAgICBgPGxpIGlkPVwiJHtib29rSWR9XCI+JHtib29rTmFtZX0gLSAke2Jvb2tDYXRlZ29yeU5hbWV9IDxidXR0b24+c3VwcHJpbWVyPC9idXR0b24+PC9saT5gO1xuICAgICAgICB9XG5cbiAgICAgICAgJCgnLmJvb2tMaXN0LWxpc3QnKS5hcHBlbmQoYCR7ZHlubmFtaWNOb3RlfWApO1xuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIEJhc2UuaW5pdCgpO1xufSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==