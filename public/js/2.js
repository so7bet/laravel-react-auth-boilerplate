(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{

/***/ "./resources/assets/js/constants/regexes.js":
/*!**************************************************!*\
  !*** ./resources/assets/js/constants/regexes.js ***!
  \**************************************************/
/*! exports provided: email */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "email", function() { return email; });
(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).enterModule;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};

const email = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(email, "email", "C:\\xampp\\htdocs\\react-laravel-boilerplate\\resources\\assets\\js\\constants\\regexes.js");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).leaveModule;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./resources/assets/js/pages/ForgotPassword/ForgotPassword.jsx":
/*!*********************************************************************!*\
  !*** ./resources/assets/js/pages/ForgotPassword/ForgotPassword.jsx ***!
  \*********************************************************************/
/*! exports provided: ForgotPasswordComponent, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ForgotPasswordComponent", function() { return ForgotPasswordComponent; });
/* harmony import */ var core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.promise */ "./node_modules/core-js/modules/es.promise.js");
/* harmony import */ var core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_router_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-router-redux */ "./node_modules/react-router-redux/es/index.js");
/* harmony import */ var redux_form__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! redux-form */ "./node_modules/redux-form/es/index.js");
/* harmony import */ var store_action_creators_flashMessages__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! store/action-creators/flashMessages */ "./resources/assets/js/store/action-creators/flashMessages/index.js");
/* harmony import */ var _ForgotPasswordForm__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ForgotPasswordForm */ "./resources/assets/js/pages/ForgotPassword/ForgotPasswordForm.jsx");


(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).enterModule;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};








const ForgotPasswordComponent = props => {
  const {
    submitForgotPassword
  } = props;
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_ForgotPasswordForm__WEBPACK_IMPORTED_MODULE_7__["ForgotPasswordForm"], {
    onSubmit: submitForgotPassword
  });
};

const mapDispatchToProps = dispatch => ({
  submitForgotPassword: async values => {
    try {
      await axios__WEBPACK_IMPORTED_MODULE_2___default.a.post('/api/forgot-password', values);
      dispatch(Object(react_router_redux__WEBPACK_IMPORTED_MODULE_4__["push"])('/login'));
      dispatch(Object(store_action_creators_flashMessages__WEBPACK_IMPORTED_MODULE_6__["flashMessage"])('success', 'The password reset request has been sent to your Email inbox.'));
    } catch (error) {
      throw new redux_form__WEBPACK_IMPORTED_MODULE_5__["SubmissionError"](error.response.data);
    }
  }
});

const _default = Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["connect"])(null, mapDispatchToProps)(ForgotPasswordComponent);

/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(ForgotPasswordComponent, "ForgotPasswordComponent", "C:\\xampp\\htdocs\\react-laravel-boilerplate\\resources\\assets\\js\\pages\\ForgotPassword\\ForgotPassword.jsx");
  reactHotLoader.register(mapDispatchToProps, "mapDispatchToProps", "C:\\xampp\\htdocs\\react-laravel-boilerplate\\resources\\assets\\js\\pages\\ForgotPassword\\ForgotPassword.jsx");
  reactHotLoader.register(_default, "default", "C:\\xampp\\htdocs\\react-laravel-boilerplate\\resources\\assets\\js\\pages\\ForgotPassword\\ForgotPassword.jsx");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).leaveModule;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./resources/assets/js/pages/ForgotPassword/ForgotPasswordForm.jsx":
/*!*************************************************************************!*\
  !*** ./resources/assets/js/pages/ForgotPassword/ForgotPasswordForm.jsx ***!
  \*************************************************************************/
/*! exports provided: ForgotPasswordFormComponent, ForgotPasswordForm */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ForgotPasswordFormComponent", function() { return ForgotPasswordFormComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ForgotPasswordForm", function() { return ForgotPasswordForm; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var redux_form__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux-form */ "./node_modules/redux-form/es/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");
/* harmony import */ var components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! components */ "./resources/assets/js/components/index.js");
/* harmony import */ var constants_styles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! constants/styles */ "./resources/assets/js/constants/styles.js");
/* harmony import */ var constants_regexes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! constants/regexes */ "./resources/assets/js/constants/regexes.js");
(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).enterModule;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};








const validate = values => {
  let errors = {};

  if (!values.email) {
    errors.email = 'This field is required';
  } else if (!constants_regexes__WEBPACK_IMPORTED_MODULE_5__["email"].test(values.email)) {
    errors.email = 'Invalid email address';
  }

  return errors;
};

const ForgotPasswordFormComponent = props => {
  const {
    handleSubmit
  } = props;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", {
    onSubmit: handleSubmit
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(redux_form__WEBPACK_IMPORTED_MODULE_1__["Field"], {
    type: "text",
    name: "email",
    labelText: "Enter Your Email Address",
    component: components__WEBPACK_IMPORTED_MODULE_3__["TextFormLine"]
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "flex items-center"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], {
    className: constants_styles__WEBPACK_IMPORTED_MODULE_4__["linkStyle"],
    to: "/login"
  }, "Back to Login"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(components__WEBPACK_IMPORTED_MODULE_3__["NeutralButton"], {
    className: "ml-auto",
    type: "submit"
  }, "Request")));
};
const ForgotPasswordForm = Object(redux_form__WEBPACK_IMPORTED_MODULE_1__["reduxForm"])({
  form: 'forgotPassword',
  validate
})(ForgotPasswordFormComponent);
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(validate, "validate", "C:\\xampp\\htdocs\\react-laravel-boilerplate\\resources\\assets\\js\\pages\\ForgotPassword\\ForgotPasswordForm.jsx");
  reactHotLoader.register(ForgotPasswordFormComponent, "ForgotPasswordFormComponent", "C:\\xampp\\htdocs\\react-laravel-boilerplate\\resources\\assets\\js\\pages\\ForgotPassword\\ForgotPasswordForm.jsx");
  reactHotLoader.register(ForgotPasswordForm, "ForgotPasswordForm", "C:\\xampp\\htdocs\\react-laravel-boilerplate\\resources\\assets\\js\\pages\\ForgotPassword\\ForgotPasswordForm.jsx");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).leaveModule;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbnN0YW50cy9yZWdleGVzLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvcGFnZXMvRm9yZ290UGFzc3dvcmQvRm9yZ290UGFzc3dvcmQuanN4Iiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvcGFnZXMvRm9yZ290UGFzc3dvcmQvRm9yZ290UGFzc3dvcmRGb3JtLmpzeCJdLCJuYW1lcyI6WyJlbWFpbCIsIkZvcmdvdFBhc3N3b3JkQ29tcG9uZW50IiwicHJvcHMiLCJzdWJtaXRGb3Jnb3RQYXNzd29yZCIsIm1hcERpc3BhdGNoVG9Qcm9wcyIsImRpc3BhdGNoIiwidmFsdWVzIiwiYXhpb3MiLCJwb3N0IiwicHVzaCIsImZsYXNoTWVzc2FnZSIsImVycm9yIiwiU3VibWlzc2lvbkVycm9yIiwicmVzcG9uc2UiLCJkYXRhIiwiY29ubmVjdCIsInZhbGlkYXRlIiwiZXJyb3JzIiwiZW1haWxSZWdleCIsInRlc3QiLCJGb3Jnb3RQYXNzd29yZEZvcm1Db21wb25lbnQiLCJoYW5kbGVTdWJtaXQiLCJUZXh0Rm9ybUxpbmUiLCJsaW5rU3R5bGUiLCJGb3Jnb3RQYXNzd29yZEZvcm0iLCJyZWR1eEZvcm0iLCJmb3JtIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBTyxNQUFNQSxLQUFLLEdBQUcsdUpBQWQ7Ozs7Ozs7Ozs7MEJBQU1BLEs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRU8sTUFBTUMsdUJBQXVCLEdBQUdDLEtBQUssSUFBSTtBQUM5QyxRQUFNO0FBQUVDO0FBQUYsTUFBMkJELEtBQWpDO0FBQ0EsU0FBTywyREFBQyxzRUFBRDtBQUFvQixZQUFRLEVBQUVDO0FBQTlCLElBQVA7QUFDRCxDQUhNOztBQUtQLE1BQU1DLGtCQUFrQixHQUFHQyxRQUFRLEtBQUs7QUFDdENGLHNCQUFvQixFQUFFLE1BQU1HLE1BQU4sSUFBZ0I7QUFDcEMsUUFBSTtBQUNGLFlBQU1DLDRDQUFLLENBQUNDLElBQU4sQ0FBVyxzQkFBWCxFQUFtQ0YsTUFBbkMsQ0FBTjtBQUVBRCxjQUFRLENBQUNJLCtEQUFJLENBQUMsUUFBRCxDQUFMLENBQVI7QUFDQUosY0FBUSxDQUNOSyx3RkFBWSxDQUNWLFNBRFUsRUFFViwrREFGVSxDQUROLENBQVI7QUFNRCxLQVZELENBVUUsT0FBT0MsS0FBUCxFQUFjO0FBQ2QsWUFBTSxJQUFJQywwREFBSixDQUFvQkQsS0FBSyxDQUFDRSxRQUFOLENBQWVDLElBQW5DLENBQU47QUFDRDtBQUNGO0FBZnFDLENBQUwsQ0FBbkM7O2lCQWtCZUMsMkRBQU8sQ0FDcEIsSUFEb0IsRUFFcEJYLGtCQUZvQixDQUFQLENBR2JILHVCQUhhLEM7O0FBQUE7Ozs7Ozs7Ozs7MEJBdkJGQSx1QjswQkFLUEcsa0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDZE47QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBOztBQUVBLE1BQU1ZLFFBQVEsR0FBR1YsTUFBTSxJQUFJO0FBQ3pCLE1BQUlXLE1BQU0sR0FBRyxFQUFiOztBQUVBLE1BQUksQ0FBQ1gsTUFBTSxDQUFDTixLQUFaLEVBQW1CO0FBQ2pCaUIsVUFBTSxDQUFDakIsS0FBUCxHQUFlLHdCQUFmO0FBQ0QsR0FGRCxNQUVPLElBQUksQ0FBQ2tCLHVEQUFVLENBQUNDLElBQVgsQ0FBZ0JiLE1BQU0sQ0FBQ04sS0FBdkIsQ0FBTCxFQUFvQztBQUN6Q2lCLFVBQU0sQ0FBQ2pCLEtBQVAsR0FBZSx1QkFBZjtBQUNEOztBQUVELFNBQU9pQixNQUFQO0FBQ0QsQ0FWRDs7QUFZTyxNQUFNRywyQkFBMkIsR0FBR2xCLEtBQUssSUFBSTtBQUNsRCxRQUFNO0FBQUVtQjtBQUFGLE1BQW1CbkIsS0FBekI7QUFFQSxTQUNFO0FBQU0sWUFBUSxFQUFFbUI7QUFBaEIsS0FDRSwyREFBQyxnREFBRDtBQUNFLFFBQUksRUFBQyxNQURQO0FBRUUsUUFBSSxFQUFDLE9BRlA7QUFHRSxhQUFTLEVBQUMsMEJBSFo7QUFJRSxhQUFTLEVBQUVDLHVEQUFZQTtBQUp6QixJQURGLEVBUUU7QUFBSyxhQUFTLEVBQUM7QUFBZixLQUNFLDJEQUFDLHFEQUFEO0FBQU0sYUFBUyxFQUFFQywwREFBakI7QUFBNEIsTUFBRSxFQUFDO0FBQS9CLHFCQURGLEVBSUUsMkRBQUMsd0RBQUQ7QUFBZSxhQUFTLEVBQUMsU0FBekI7QUFBbUMsUUFBSSxFQUFDO0FBQXhDLGVBSkYsQ0FSRixDQURGO0FBbUJELENBdEJNO0FBd0JBLE1BQU1DLGtCQUFrQixHQUFHQyw0REFBUyxDQUFDO0FBQzFDQyxNQUFJLEVBQUUsZ0JBRG9DO0FBRTFDVjtBQUYwQyxDQUFELENBQVQsQ0FHL0JJLDJCQUgrQixDQUEzQjs7Ozs7Ozs7OzswQkFwQ0RKLFE7MEJBWU9JLDJCOzBCQXdCQUksa0IiLCJmaWxlIjoianMvMi5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBlbWFpbCA9IC9eKChbXjw+KClbXFxdXFxcXC4sOzpcXHNAXCJdKyhcXC5bXjw+KClbXFxdXFxcXC4sOzpcXHNAXCJdKykqKXwoXCIuK1wiKSlAKChcXFtbMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcLlswLTldezEsM31cXC5bMC05XXsxLDN9XFxdKXwoKFthLXpBLVpcXC0wLTldK1xcLikrW2EtekEtWl17Mix9KSkkL1xyXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXHJcbmltcG9ydCBheGlvcyBmcm9tICdheGlvcydcclxuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4J1xyXG5pbXBvcnQgeyBwdXNoIH0gZnJvbSAncmVhY3Qtcm91dGVyLXJlZHV4J1xyXG5pbXBvcnQgeyBTdWJtaXNzaW9uRXJyb3IgfSBmcm9tICdyZWR1eC1mb3JtJ1xyXG5pbXBvcnQgeyBmbGFzaE1lc3NhZ2UgfSBmcm9tICdzdG9yZS9hY3Rpb24tY3JlYXRvcnMvZmxhc2hNZXNzYWdlcydcclxuXHJcbmltcG9ydCB7IEZvcmdvdFBhc3N3b3JkRm9ybSB9IGZyb20gJy4vRm9yZ290UGFzc3dvcmRGb3JtJ1xyXG5cclxuZXhwb3J0IGNvbnN0IEZvcmdvdFBhc3N3b3JkQ29tcG9uZW50ID0gcHJvcHMgPT4ge1xyXG4gIGNvbnN0IHsgc3VibWl0Rm9yZ290UGFzc3dvcmQgfSA9IHByb3BzXHJcbiAgcmV0dXJuIDxGb3Jnb3RQYXNzd29yZEZvcm0gb25TdWJtaXQ9e3N1Ym1pdEZvcmdvdFBhc3N3b3JkfSAvPlxyXG59XHJcblxyXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSBkaXNwYXRjaCA9PiAoe1xyXG4gIHN1Ym1pdEZvcmdvdFBhc3N3b3JkOiBhc3luYyB2YWx1ZXMgPT4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgYXdhaXQgYXhpb3MucG9zdCgnL2FwaS9mb3Jnb3QtcGFzc3dvcmQnLCB2YWx1ZXMpXHJcblxyXG4gICAgICBkaXNwYXRjaChwdXNoKCcvbG9naW4nKSlcclxuICAgICAgZGlzcGF0Y2goXHJcbiAgICAgICAgZmxhc2hNZXNzYWdlKFxyXG4gICAgICAgICAgJ3N1Y2Nlc3MnLFxyXG4gICAgICAgICAgJ1RoZSBwYXNzd29yZCByZXNldCByZXF1ZXN0IGhhcyBiZWVuIHNlbnQgdG8geW91ciBFbWFpbCBpbmJveC4nXHJcbiAgICAgICAgKVxyXG4gICAgICApXHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICB0aHJvdyBuZXcgU3VibWlzc2lvbkVycm9yKGVycm9yLnJlc3BvbnNlLmRhdGEpXHJcbiAgICB9XHJcbiAgfVxyXG59KVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChcclxuICBudWxsLFxyXG4gIG1hcERpc3BhdGNoVG9Qcm9wc1xyXG4pKEZvcmdvdFBhc3N3b3JkQ29tcG9uZW50KVxyXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXHJcbmltcG9ydCB7IHJlZHV4Rm9ybSwgRmllbGQgfSBmcm9tICdyZWR1eC1mb3JtJ1xyXG5pbXBvcnQgeyBMaW5rIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSdcclxuXHJcbmltcG9ydCB7IE5ldXRyYWxCdXR0b24sIFRleHRGb3JtTGluZSB9IGZyb20gJ2NvbXBvbmVudHMnXHJcbmltcG9ydCB7IGxpbmtTdHlsZSB9IGZyb20gJ2NvbnN0YW50cy9zdHlsZXMnXHJcblxyXG5pbXBvcnQgeyBlbWFpbCBhcyBlbWFpbFJlZ2V4IH0gZnJvbSAnY29uc3RhbnRzL3JlZ2V4ZXMnXHJcblxyXG5jb25zdCB2YWxpZGF0ZSA9IHZhbHVlcyA9PiB7XHJcbiAgbGV0IGVycm9ycyA9IHt9XHJcblxyXG4gIGlmICghdmFsdWVzLmVtYWlsKSB7XHJcbiAgICBlcnJvcnMuZW1haWwgPSAnVGhpcyBmaWVsZCBpcyByZXF1aXJlZCdcclxuICB9IGVsc2UgaWYgKCFlbWFpbFJlZ2V4LnRlc3QodmFsdWVzLmVtYWlsKSkge1xyXG4gICAgZXJyb3JzLmVtYWlsID0gJ0ludmFsaWQgZW1haWwgYWRkcmVzcydcclxuICB9XHJcblxyXG4gIHJldHVybiBlcnJvcnNcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IEZvcmdvdFBhc3N3b3JkRm9ybUNvbXBvbmVudCA9IHByb3BzID0+IHtcclxuICBjb25zdCB7IGhhbmRsZVN1Ym1pdCB9ID0gcHJvcHNcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxmb3JtIG9uU3VibWl0PXtoYW5kbGVTdWJtaXR9PlxyXG4gICAgICA8RmllbGRcclxuICAgICAgICB0eXBlPVwidGV4dFwiXHJcbiAgICAgICAgbmFtZT1cImVtYWlsXCJcclxuICAgICAgICBsYWJlbFRleHQ9XCJFbnRlciBZb3VyIEVtYWlsIEFkZHJlc3NcIlxyXG4gICAgICAgIGNvbXBvbmVudD17VGV4dEZvcm1MaW5lfVxyXG4gICAgICAvPlxyXG5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlclwiPlxyXG4gICAgICAgIDxMaW5rIGNsYXNzTmFtZT17bGlua1N0eWxlfSB0bz1cIi9sb2dpblwiPlxyXG4gICAgICAgICAgQmFjayB0byBMb2dpblxyXG4gICAgICAgIDwvTGluaz5cclxuICAgICAgICA8TmV1dHJhbEJ1dHRvbiBjbGFzc05hbWU9XCJtbC1hdXRvXCIgdHlwZT1cInN1Ym1pdFwiPlxyXG4gICAgICAgICAgUmVxdWVzdFxyXG4gICAgICAgIDwvTmV1dHJhbEJ1dHRvbj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Zvcm0+XHJcbiAgKVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgRm9yZ290UGFzc3dvcmRGb3JtID0gcmVkdXhGb3JtKHtcclxuICBmb3JtOiAnZm9yZ290UGFzc3dvcmQnLFxyXG4gIHZhbGlkYXRlXHJcbn0pKEZvcmdvdFBhc3N3b3JkRm9ybUNvbXBvbmVudClcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==