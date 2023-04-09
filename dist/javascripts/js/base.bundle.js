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
        //$('#uploadBook').on('click', this._uploadBook);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiamF2YXNjcmlwdHMvanMvYmFzZS5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGNBQWMsS0FBc0MsSUFBSSxDQUErQjtBQUN0RTs7QUFFVjtBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFFBQVEsQ0FBQztBQUNULFFBQVEsQ0FBQztBQUNUO0FBQ0EsUUFBUSxDQUFDO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7O0FBRUEsTUFBTSxDQUFDO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsaUJBQWlCO0FBQzNDO0FBQ0E7O0FBRUEsNEJBQTRCLHlCQUF5QjtBQUNyRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQSxPQUFPOztBQUVQO0FBQ0EsZ0VBQWdFLEtBQUs7O0FBRXJFLE1BQU0sQ0FBQztBQUNQO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixDQUFDOztBQUV0QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBLHVCQUF1QixDQUFDO0FBQ3hCO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx1QkFBdUIsQ0FBQzs7QUFFeEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCOztBQUVBO0FBQ0E7O0FBRUEsTUFBTSxDQUFDO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLE9BQU8sRUFBRTtBQUNULEtBQUs7O0FBRUw7QUFDQTs7QUFFQTs7QUFFQSx1QkFBdUIsQ0FBQztBQUN4QiwyQkFBMkIsQ0FBQztBQUM1QixxQ0FBcUMsQ0FBQztBQUN0Qzs7QUFFQSxzQkFBc0IsbUNBQW1DO0FBQ3pEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxNQUFNLENBQUM7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxPQUFPOztBQUVQLE1BQU0sQ0FBQyxxQ0FBcUMsZ0JBQWdCLElBQUksVUFBVSxJQUFJLHFDQUFxQztBQUNuSCxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7O0FBRUEscUJBQXFCLENBQUM7QUFDdEIsTUFBTSxDQUFDOztBQUVQLE1BQU0sQ0FBQztBQUNQO0FBQ0EseUJBQXlCLE9BQU87QUFDaEMsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUEsTUFBTSxDQUFDO0FBQ1Asd0JBQXdCLGlCQUFpQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsMEJBQTBCLHlCQUF5QjtBQUNuRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx1QkFBdUIsT0FBTyxJQUFJLFVBQVUsSUFBSSxrQkFBa0I7QUFDbEU7O0FBRUEsUUFBUSxDQUFDLDZCQUE2QixhQUFhO0FBQ25ELE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ib29rbm9kZWdlbmVyYXRvci8uL3B1YmxpYy9qcy9iYXNlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGRlYnVnID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcgfHwgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdub25lJztcbmltcG9ydCAnc2VsZWN0Mic7XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0SG9tZSAoKSB7XG4gIGNvbnN0IEJhc2UgPSB7XG4gICAgaW5pdDogZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKGRlYnVnKSBjb25zb2xlLmxvZygnQmFzZS1pbml0ICEnKTtcblxuICAgICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FkZEJvb2snKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICQoJyNzdWJtaXRCb29rJykub24oJ2NsaWNrJywgdGhpcy5fYWRkQm9vayk7XG4gICAgICAgICQoJy5ib29rTGlzdC1saXN0Jykub24oJ2NsaWNrJywgJ2xpIGJ1dHRvbicsIHRoaXMuX2RlbGV0ZUJvb2spO1xuICAgICAgICAvLyQoJyN1cGxvYWRCb29rJykub24oJ2NsaWNrJywgdGhpcy5fdXBsb2FkQm9vayk7XG4gICAgICAgICQoJyNpbnB1dE11bHRlcicpLm9uKCdjbGljaycsIHRoaXMuX3VwbG9hZEJvb2tNdWx0ZXIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYm9va0xpc3QtbGlzdCcpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy5fbGlzdEJvb2soKTtcbiAgICAgICAgdGhpcy5fY2F0ZWdvcnlCb29rKCk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIF9jYXRlZ29yeUJvb2s6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChkZWJ1ZykgY29uc29sZS5sb2coJ19jYXRlZ29yeUJvb2snKTtcblxuICAgICAgbGV0IGJvb2tDYXRlZ29yaWVzID0gW107XG5cbiAgICAgICQuYWpheCh7XG4gICAgICAgIHR5cGU6IFwiR0VUXCIsXG4gICAgICAgIHVybDogXCJhcGkvYm9va3NcIixcbiAgICAgICAgYXN5bmM6IGZhbHNlLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBkYXRhLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICBjb25zdCBib29rID0gZGF0YVtqXTtcbiAgICAgICAgICAgIGNvbnN0IGJvb2tDYXRlZ29yeSA9IGJvb2suY2F0ZWdvcnk7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgYm9va0NhdGVnb3J5Lmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgIGNvbnN0IGJvb2tDYXRlZ29yeU5hbWUgPSBib29rQ2F0ZWdvcnlbal0ubmFtZTtcbiAgICAgICAgICAgICAgY29uc3QgYm9va0NhdGVnb3J5SWQgPSBib29rQ2F0ZWdvcnlbal0uaWQ7XG5cbiAgICAgICAgICAgICAgYm9va0NhdGVnb3JpZXMucHVzaCh7XG4gICAgICAgICAgICAgICAgaWQ6IGJvb2tDYXRlZ29yeUlkLFxuICAgICAgICAgICAgICAgIHRleHQ6IGJvb2tDYXRlZ29yeU5hbWVcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgY29uc3QgdGV4dHMgPSBib29rQ2F0ZWdvcmllcy5tYXAobyA9PiBvLnRleHQpXG4gICAgICBjb25zdCBib29rQ2F0ZWdvcmllc1VuaXF1ZVRleHRzID0gYm9va0NhdGVnb3JpZXMuZmlsdGVyKCh7dGV4dH0sIGluZGV4KSA9PiAhdGV4dHMuaW5jbHVkZXModGV4dCwgaW5kZXggKyAxKSlcblxuICAgICAgJChcIiNpbnB1dEJvb2tDYXRlZ29yeVwiKS5zZWxlY3QyKHtcbiAgICAgICAgdGFnczogdHJ1ZSxcbiAgICAgICAgZGF0YTogYm9va0NhdGVnb3JpZXNVbmlxdWVUZXh0cyxcbiAgICAgICAgY3JlYXRlVGFnOiBmdW5jdGlvbiAocGFyYW1zKSB7XG4gICAgICAgICAgdmFyIHRlcm0gPSAkLnRyaW0ocGFyYW1zLnRlcm0pO1xuXG4gICAgICAgICAgaWYgKHRlcm0gPT09ICcnKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaWQ6IHRlcm0sXG4gICAgICAgICAgICB0ZXh0OiB0ZXJtLFxuICAgICAgICAgICAgbmV3VGFnOiB0cnVlXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0sXG5cbiAgICBfdXBsb2FkQm9vazogZnVuY3Rpb24gKGUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGlmIChkZWJ1ZykgY29uc29sZS5sb2coJ191cGxvYWRCb29rJyk7XG5cbiAgICAgIGNvbnN0IGJvb2tOYW1lID0gJCgnI2lucHV0Qm9va05hbWUyJykudmFsKCk7XG4gICAgICBjb25zdCBib29rVXBsb2FkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Zvcm1GaWxlQm9va05vdGUyJykuZmlsZXNbMF07XG4gICAgfSxcblxuICAgIF91cGxvYWRCb29rTXVsdGVyOiBmdW5jdGlvbiAoZSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgaWYgKGRlYnVnKSBjb25zb2xlLmxvZygnX3VwbG9hZEJvb2tNdWx0ZXInKTtcblxuICAgICAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ211bHRlckZvcm0nKSk7XG4gICAgICBjb25zdCBib29rTmFtZSA9ICQoJy50ZXh0TXVsdGVyJykudmFsKCk7XG5cbiAgICAgIGxldCBib29rSW5mbztcbiAgICAgIHZhciByYW5kQWQgPSBbXTtcblxuICAgICAgZm9yICh2YXIgW2tleSwgdmFsdWVdIG9mIGZvcm1EYXRhLmVudHJpZXMoKSkge1xuICAgICAgICByYW5kQWQucHVzaCh2YWx1ZSk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiRm9ybURhdGEgOiBcIiwgSlNPTi5zdHJpbmdpZnkodmFsdWUpKTtcbiAgICAgIH1cblxuXG4gICAgICBmb3IgKFtrZXksIHZhbHVlXSBvZiBmb3JtRGF0YS5lbnRyaWVzKCkpIHtcbiAgICAgICAgbGV0IHZhbDtcbiAgICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgRmlsZSkge1xuICAgICAgICAgIHZhbCA9IHZhbHVlLm5hbWU7XG4gICAgICAgICAgY29uc29sZS5sb2coJzA6Jyx2YWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFsID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coJ3Rlc3QgOiAnLCBrZXkgKyAnOiAnICsgdmFsKTtcbiAgICAgIH1cblxuXG4gICAgICBib29rSW5mbyA9IHtcbiAgICAgICAgYm9va2lkOiBEYXRlLm5vdygpLFxuICAgICAgICBib29rbmFtZTogYm9va05hbWUsXG4gICAgICAgIHJhbmRBOiB7J3RvdG8nOiAnaGV5J31cbiAgICAgIH07XG5cbiAgICAgIGNvbnNvbGUubG9nKFwicmFuZEFcIiwgcmFuZEFkWzBdKTtcbiAgICAgIGNvbnNvbGUubG9nKFwiQm9va2luZm9cIiwgYm9va0luZm8pO1xuXG4gICAgICAkLmFqYXgoe1xuICAgICAgICB0eXBlOlwiUE9TVFwiLFxuICAgICAgICBkYXRhVHlwZTpcImpzb25cIixcbiAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICBkYXRhOkpTT04uc3RyaW5naWZ5KGJvb2tJbmZvKSxcbiAgICAgICAgdXJsOlwiYXBpL3N0YXRzXCJcbiAgICAgIH0pLmRvbmUoZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgICAgICBjb25zb2xlLmxvZyhcIlJlc3BvbnNlIG9mIHVwZGF0ZTogXCIscmVzcG9uc2UpXG4gICAgICB9KS5mYWlsKGZ1bmN0aW9uKHhociwgdGV4dFN0YXR1cywgZXJyb3JUaHJvd24pe1xuICAgICAgICBjb25zb2xlLmxvZyhcIkVSUk9SOiBcIix4aHIucmVzcG9uc2VUZXh0KVxuICAgICAgICByZXR1cm4geGhyLnJlc3BvbnNlVGV4dDtcbiAgICAgIH0pO1xuXG4vKiAgICAgICQuYWpheCh7XG4gICAgICAgIHR5cGU6XCJQT1NUXCIsXG4gICAgICAgIGRhdGFUeXBlOlwianNvblwiLFxuICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgIGRhdGE6SlNPTi5zdHJpbmdpZnkoYm9va0luZm8pLFxuICAgICAgICB1cmw6XCJhcGkvc3RhdHNcIlxuICAgICAgfSkuZG9uZShmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiUmVzcG9uc2Ugb2YgdXBkYXRlOiBcIixyZXNwb25zZSlcbiAgICAgIH0pLmZhaWwoZnVuY3Rpb24oeGhyLCB0ZXh0U3RhdHVzLCBlcnJvclRocm93bil7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiRVJST1I6IFwiLHhoci5yZXNwb25zZVRleHQpXG4gICAgICAgIHJldHVybiB4aHIucmVzcG9uc2VUZXh0O1xuICAgICAgfSk7Ki9cbiAgICB9LFxuXG4gICAgX2FkZEJvb2s6IGZ1bmN0aW9uIChlKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIGlmIChkZWJ1ZykgY29uc29sZS5sb2coJ19hZGRCb29rJyk7XG5cbiAgICAgIGNvbnN0IGJvb2tOYW1lID0gJCgnI2lucHV0Qm9va05hbWUnKS52YWwoKTtcbiAgICAgIGNvbnN0IGJvb2tDYXRlZ29yeSA9ICQoJyNpbnB1dEJvb2tDYXRlZ29yeScpLnZhbCgpO1xuICAgICAgY29uc3QgZGF0YVNlbGVjdGVkQ2F0YWdvcmllcyA9ICQoJyNpbnB1dEJvb2tDYXRlZ29yeScpLnNlbGVjdDIoJ2RhdGEnKTtcbiAgICAgIGNvbnN0IGNhdGVnb3JpZXMgPSBbXTtcblxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBkYXRhU2VsZWN0ZWRDYXRhZ29yaWVzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIGNvbnN0IGNhdGVnb3J5ID0gZGF0YVNlbGVjdGVkQ2F0YWdvcmllc1tqXTtcbiAgICAgICAgY29uc3QgY2F0ZWdvcnlJZCA9IGNhdGVnb3J5Ll9yZXN1bHRJZDtcbiAgICAgICAgY29uc3QgY2F0ZWdvcnlOYW1lID0gY2F0ZWdvcnkudGV4dDtcblxuICAgICAgICBjYXRlZ29yaWVzLnB1c2goe1xuICAgICAgICAgIGlkOiBjYXRlZ29yeUlkLFxuICAgICAgICAgIG5hbWU6IGNhdGVnb3J5TmFtZVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgbGV0IGJvb2tJbmZvO1xuXG4gICAgICBib29rSW5mbyA9IHtcbiAgICAgICAgYm9va2lkOiBEYXRlLm5vdygpLFxuICAgICAgICBib29rbmFtZTogYm9va05hbWUsXG4gICAgICAgIGNhdGVnb3JpZXM6IGNhdGVnb3JpZXNcbiAgICAgIH07XG5cbiAgICAgICQuYWpheCh7XG4gICAgICAgIHR5cGU6XCJQT1NUXCIsXG4gICAgICAgIGRhdGFUeXBlOlwianNvblwiLFxuICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgIGRhdGE6SlNPTi5zdHJpbmdpZnkoYm9va0luZm8pLFxuICAgICAgICB1cmw6XCJhcGkvYm9va1wiXG4gICAgICB9KS5kb25lKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICAgICAgY29uc29sZS5sb2coXCJSZXNwb25zZSBvZiB1cGRhdGU6IFwiLHJlc3BvbnNlKVxuICAgICAgfSkuZmFpbChmdW5jdGlvbih4aHIsIHRleHRTdGF0dXMsIGVycm9yVGhyb3duKXtcbiAgICAgICAgY29uc29sZS5sb2coXCJFUlJPUjogXCIseGhyLnJlc3BvbnNlVGV4dClcbiAgICAgICAgcmV0dXJuIHhoci5yZXNwb25zZVRleHQ7XG4gICAgICB9KTtcblxuICAgICAgJCgnLmJvb2tMaXN0LWxpc3QnKS5hcHBlbmQoYDxsaSBpZD1cIiR7Ym9va0luZm8uYm9va2lkfVwiPiR7Ym9va05hbWV9IC0gJHtib29rSW5mby5jYXRlZ29yaWVzLm1hcCh4ID0+IHgubmFtZSl9PC9saT5gKTtcbiAgICB9LFxuXG4gICAgX2RlbGV0ZUJvb2s6IGZ1bmN0aW9uIChlKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIGlmIChkZWJ1ZykgY29uc29sZS5sb2coJ19hZGRCb29rJyk7XG5cbiAgICAgIGNvbnN0IGlkQm9vayA9ICQodGhpcykuY2xvc2VzdCgnbGknKS5hdHRyKFwiaWRcIik7XG4gICAgICAkKHRoaXMpLmNsb3Nlc3QoJ2xpJykucmVtb3ZlKCk7XG5cbiAgICAgICQuYWpheCh7XG4gICAgICAgIHR5cGU6XCJERUxFVEVcIixcbiAgICAgICAgdXJsOiBgYXBpL2Jvb2svJHtpZEJvb2t9YCxcbiAgICAgIH0pLmRvbmUoZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgICAgICBjb25zb2xlLmxvZyhcIlJlc3BvbnNlIG9mIHVwZGF0ZTogXCIscmVzcG9uc2UpXG4gICAgICB9KS5mYWlsKGZ1bmN0aW9uKHhociwgdGV4dFN0YXR1cywgZXJyb3JUaHJvd24pe1xuICAgICAgICBjb25zb2xlLmxvZyhcIkVSUk9SOiBcIix4aHIucmVzcG9uc2VUZXh0KVxuICAgICAgICByZXR1cm4geGhyLnJlc3BvbnNlVGV4dDtcbiAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBfbGlzdEJvb2s6IGZ1bmN0aW9uIChlKSB7XG4gICAgICBpZiAoZGVidWcpIGNvbnNvbGUubG9nKCdfbGlzdEJvb2snKTtcbiAgICAgIGxldCBkeW5uYW1pY05vdGUgPSAnJztcblxuICAgICAgJC5nZXQoJ2FwaS9ib29rcycsIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgZGF0YS5sZW5ndGg7IGorKykge1xuICAgICAgICAgIGNvbnN0IGJvb2sgPSBkYXRhW2pdO1xuICAgICAgICAgIGNvbnN0IGJvb2tOYW1lID0gYm9vay5uYW1lO1xuICAgICAgICAgIGNvbnN0IGJvb2tDYXRlZ29yeSA9IGJvb2suY2F0ZWdvcnk7XG4gICAgICAgICAgY29uc3QgYm9va0lkID0gYm9vay5ib29raWQ7XG4gICAgICAgICAgbGV0IGJvb2tDYXRlZ29yeU5hbWUgPSBbXTtcbiAgICAgICAgICBsZXQgYm9va0NhdGVnb3J5SWQgPSBbXTtcblxuICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgYm9va0NhdGVnb3J5Lmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICBib29rQ2F0ZWdvcnlOYW1lLnB1c2goYm9va0NhdGVnb3J5W2pdLm5hbWUpO1xuICAgICAgICAgICAgYm9va0NhdGVnb3J5SWQucHVzaChib29rQ2F0ZWdvcnlbal0uaWQpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGR5bm5hbWljTm90ZSArPVxuICAgICAgICAgICAgYDxsaSBpZD1cIiR7Ym9va0lkfVwiPiR7Ym9va05hbWV9IC0gJHtib29rQ2F0ZWdvcnlOYW1lfSA8YnV0dG9uPnN1cHByaW1lcjwvYnV0dG9uPjwvbGk+YDtcbiAgICAgICAgfVxuXG4gICAgICAgICQoJy5ib29rTGlzdC1saXN0JykuYXBwZW5kKGAke2R5bm5hbWljTm90ZX1gKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICBCYXNlLmluaXQoKTtcbn0iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=