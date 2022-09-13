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
      console.log("development");

      this._hello();

      $('#registerForm').on('click', this._register);
    },

    _hello: function (e) {
      if (debug) console.log('_hello');
    },

    _register: function (e) {
      e.preventDefault();

      if (debug) console.log('_register');

      const user = $('#username').val();
      const pass = $('#password').val();
      let userInfo;

/*      userInfo.push({
        username: user,
        password: pass,
      });*/

      userInfo = {
        username: user,
        password: pass
      };

      $.post('/register', userInfo, function (data) {
        if (debug) console.log('data : ', data);
      });
    }
  };

  Base.init();
}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiamF2YXNjcmlwdHMvanMvYmFzZS5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSxjQUFjLEtBQXNDLElBQUksQ0FBK0I7O0FBRWhGO0FBQ1A7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLGFBQW9COztBQUV0Qzs7QUFFQSxNQUFNLENBQUM7QUFDUCxLQUFLOztBQUVMO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7O0FBRUEsbUJBQW1CLENBQUM7QUFDcEIsbUJBQW1CLENBQUM7QUFDcEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTyxFQUFFOztBQUVUO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE1BQU0sQ0FBQztBQUNQO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2Jvb2tub2RlZ2VuZXJhdG9yLy4vcHVibGljL2pzL2Jhc2UuanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgZGVidWcgPSBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50JyB8fCBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ25vbmUnO1xuXG5leHBvcnQgZnVuY3Rpb24gaW5pdEhvbWUgKCkge1xuICBjb25zdCBCYXNlID0ge1xuICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChkZWJ1ZykgY29uc29sZS5sb2coJ0Jhc2UtaW5pdCAhJyk7XG4gICAgICBjb25zb2xlLmxvZyhwcm9jZXNzLmVudi5OT0RFX0VOVik7XG5cbiAgICAgIHRoaXMuX2hlbGxvKCk7XG5cbiAgICAgICQoJyNyZWdpc3RlckZvcm0nKS5vbignY2xpY2snLCB0aGlzLl9yZWdpc3Rlcik7XG4gICAgfSxcblxuICAgIF9oZWxsbzogZnVuY3Rpb24gKGUpIHtcbiAgICAgIGlmIChkZWJ1ZykgY29uc29sZS5sb2coJ19oZWxsbycpO1xuICAgIH0sXG5cbiAgICBfcmVnaXN0ZXI6IGZ1bmN0aW9uIChlKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIGlmIChkZWJ1ZykgY29uc29sZS5sb2coJ19yZWdpc3RlcicpO1xuXG4gICAgICBjb25zdCB1c2VyID0gJCgnI3VzZXJuYW1lJykudmFsKCk7XG4gICAgICBjb25zdCBwYXNzID0gJCgnI3Bhc3N3b3JkJykudmFsKCk7XG4gICAgICBsZXQgdXNlckluZm87XG5cbi8qICAgICAgdXNlckluZm8ucHVzaCh7XG4gICAgICAgIHVzZXJuYW1lOiB1c2VyLFxuICAgICAgICBwYXNzd29yZDogcGFzcyxcbiAgICAgIH0pOyovXG5cbiAgICAgIHVzZXJJbmZvID0ge1xuICAgICAgICB1c2VybmFtZTogdXNlcixcbiAgICAgICAgcGFzc3dvcmQ6IHBhc3NcbiAgICAgIH07XG5cbiAgICAgICQucG9zdCgnL3JlZ2lzdGVyJywgdXNlckluZm8sIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIGlmIChkZWJ1ZykgY29uc29sZS5sb2coJ2RhdGEgOiAnLCBkYXRhKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICBCYXNlLmluaXQoKTtcbn0iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=