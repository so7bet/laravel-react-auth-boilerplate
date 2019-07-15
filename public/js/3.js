(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[3],{

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

/***/ "./resources/assets/js/pages/LogIn/LogIn.jsx":
/*!***************************************************!*\
  !*** ./resources/assets/js/pages/LogIn/LogIn.jsx ***!
  \***************************************************/
/*! exports provided: LogInComponent, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LogInComponent", function() { return LogInComponent; });
/* harmony import */ var core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.promise */ "./node_modules/core-js/modules/es.promise.js");
/* harmony import */ var core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_router_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-redux */ "./node_modules/react-router-redux/es/index.js");
/* harmony import */ var redux_form__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! redux-form */ "./node_modules/redux-form/es/index.js");
/* harmony import */ var store_action_creators_session__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! store/action-creators/session */ "./resources/assets/js/store/action-creators/session/index.js");
/* harmony import */ var _LogInForm__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./LogInForm */ "./resources/assets/js/pages/LogIn/LogInForm.jsx");


(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).enterModule;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};







const LogInComponent = props => {
  const {
    attemptLogin
  } = props;
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_LogInForm__WEBPACK_IMPORTED_MODULE_6__["default"], {
    onSubmit: attemptLogin
  });
};

const parseValidationFromResponse = response => {
  let errors = {};

  if (response.errors === true && response.message === 'Incorrect login details') {
    errors.email = 'Incorrect login details';
  }

  return errors;
};

const mapDispatchToProps = dispatch => ({
  attemptLogin: async loginDetails => {
    try {
      await dispatch(Object(store_action_creators_session__WEBPACK_IMPORTED_MODULE_5__["logIn"])(loginDetails));
      dispatch(Object(react_router_redux__WEBPACK_IMPORTED_MODULE_3__["push"])('/'));
    } catch (error) {
      throw new redux_form__WEBPACK_IMPORTED_MODULE_4__["SubmissionError"](parseValidationFromResponse(error.response.data));
    }
  }
});

const _default = Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(null, mapDispatchToProps)(LogInComponent);

/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(LogInComponent, "LogInComponent", "C:\\xampp\\htdocs\\react-laravel-boilerplate\\resources\\assets\\js\\pages\\LogIn\\LogIn.jsx");
  reactHotLoader.register(parseValidationFromResponse, "parseValidationFromResponse", "C:\\xampp\\htdocs\\react-laravel-boilerplate\\resources\\assets\\js\\pages\\LogIn\\LogIn.jsx");
  reactHotLoader.register(mapDispatchToProps, "mapDispatchToProps", "C:\\xampp\\htdocs\\react-laravel-boilerplate\\resources\\assets\\js\\pages\\LogIn\\LogIn.jsx");
  reactHotLoader.register(_default, "default", "C:\\xampp\\htdocs\\react-laravel-boilerplate\\resources\\assets\\js\\pages\\LogIn\\LogIn.jsx");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).leaveModule;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./resources/assets/js/pages/LogIn/LogInForm.jsx":
/*!*******************************************************!*\
  !*** ./resources/assets/js/pages/LogIn/LogInForm.jsx ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");
/* harmony import */ var redux_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux-form */ "./node_modules/redux-form/es/index.js");
/* harmony import */ var components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! components */ "./resources/assets/js/components/index.js");
/* harmony import */ var constants_regexes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! constants/regexes */ "./resources/assets/js/constants/regexes.js");
/* harmony import */ var constants_styles__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! constants/styles */ "./resources/assets/js/constants/styles.js");
(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).enterModule;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};








const validateLogin = values => {
  let errors = {};

  if (!values.email) {
    errors.email = 'This field is required';
  } else if (!constants_regexes__WEBPACK_IMPORTED_MODULE_4__["email"].test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'This field is required';
  }

  return errors;
};

const LoginForm = props => {
  const {
    handleSubmit
  } = props;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", {
    onSubmit: handleSubmit
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(redux_form__WEBPACK_IMPORTED_MODULE_2__["Field"], {
    component: components__WEBPACK_IMPORTED_MODULE_3__["TextFormLine"],
    type: "text",
    name: "email",
    labelText: "Email"
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(redux_form__WEBPACK_IMPORTED_MODULE_2__["Field"], {
    component: components__WEBPACK_IMPORTED_MODULE_3__["PasswordFormLine"],
    type: "password",
    name: "password",
    labelText: "Password"
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "flex items-center"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], {
    className: constants_styles__WEBPACK_IMPORTED_MODULE_5__["linkStyle"],
    to: "/signup"
  }, "Or Signup"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "inline-block px-2"
  }, "|"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], {
    className: constants_styles__WEBPACK_IMPORTED_MODULE_5__["linkStyle"],
    to: "/forgot-password"
  }, "Forgot Password?"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(components__WEBPACK_IMPORTED_MODULE_3__["NeutralButton"], {
    className: "ml-auto",
    type: "submit"
  }, "Log In")));
};

const _default = Object(redux_form__WEBPACK_IMPORTED_MODULE_2__["reduxForm"])({
  form: 'login',
  validate: validateLogin
})(LoginForm);

/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(validateLogin, "validateLogin", "C:\\xampp\\htdocs\\react-laravel-boilerplate\\resources\\assets\\js\\pages\\LogIn\\LogInForm.jsx");
  reactHotLoader.register(LoginForm, "LoginForm", "C:\\xampp\\htdocs\\react-laravel-boilerplate\\resources\\assets\\js\\pages\\LogIn\\LogInForm.jsx");
  reactHotLoader.register(_default, "default", "C:\\xampp\\htdocs\\react-laravel-boilerplate\\resources\\assets\\js\\pages\\LogIn\\LogInForm.jsx");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).leaveModule;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbnN0YW50cy9yZWdleGVzLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvcGFnZXMvTG9nSW4vTG9nSW4uanN4Iiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvcGFnZXMvTG9nSW4vTG9nSW5Gb3JtLmpzeCJdLCJuYW1lcyI6WyJlbWFpbCIsIkxvZ0luQ29tcG9uZW50IiwicHJvcHMiLCJhdHRlbXB0TG9naW4iLCJwYXJzZVZhbGlkYXRpb25Gcm9tUmVzcG9uc2UiLCJyZXNwb25zZSIsImVycm9ycyIsIm1lc3NhZ2UiLCJtYXBEaXNwYXRjaFRvUHJvcHMiLCJkaXNwYXRjaCIsImxvZ2luRGV0YWlscyIsImxvZ0luIiwicHVzaCIsImVycm9yIiwiU3VibWlzc2lvbkVycm9yIiwiZGF0YSIsImNvbm5lY3QiLCJ2YWxpZGF0ZUxvZ2luIiwidmFsdWVzIiwiZW1haWxSZWdleCIsInRlc3QiLCJwYXNzd29yZCIsIkxvZ2luRm9ybSIsImhhbmRsZVN1Ym1pdCIsIlRleHRGb3JtTGluZSIsIlBhc3N3b3JkRm9ybUxpbmUiLCJsaW5rU3R5bGUiLCJyZWR1eEZvcm0iLCJmb3JtIiwidmFsaWRhdGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFPLE1BQU1BLEtBQUssR0FBRyx1SkFBZDs7Ozs7Ozs7OzswQkFBTUEsSzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FiO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUVPLE1BQU1DLGNBQWMsR0FBR0MsS0FBSyxJQUFJO0FBQ3JDLFFBQU07QUFBRUM7QUFBRixNQUFtQkQsS0FBekI7QUFFQSxTQUFPLDJEQUFDLGtEQUFEO0FBQVcsWUFBUSxFQUFFQztBQUFyQixJQUFQO0FBQ0QsQ0FKTTs7QUFNUCxNQUFNQywyQkFBMkIsR0FBR0MsUUFBUSxJQUFJO0FBQzlDLE1BQUlDLE1BQU0sR0FBRyxFQUFiOztBQUNBLE1BQ0VELFFBQVEsQ0FBQ0MsTUFBVCxLQUFvQixJQUFwQixJQUNBRCxRQUFRLENBQUNFLE9BQVQsS0FBcUIseUJBRnZCLEVBR0U7QUFDQUQsVUFBTSxDQUFDTixLQUFQLEdBQWUseUJBQWY7QUFDRDs7QUFFRCxTQUFPTSxNQUFQO0FBQ0QsQ0FWRDs7QUFZQSxNQUFNRSxrQkFBa0IsR0FBR0MsUUFBUSxLQUFLO0FBQ3RDTixjQUFZLEVBQUUsTUFBTU8sWUFBTixJQUFzQjtBQUNsQyxRQUFJO0FBQ0YsWUFBTUQsUUFBUSxDQUFDRSwyRUFBSyxDQUFDRCxZQUFELENBQU4sQ0FBZDtBQUNBRCxjQUFRLENBQUNHLCtEQUFJLENBQUMsR0FBRCxDQUFMLENBQVI7QUFDRCxLQUhELENBR0UsT0FBT0MsS0FBUCxFQUFjO0FBQ2QsWUFBTSxJQUFJQywwREFBSixDQUNKViwyQkFBMkIsQ0FBQ1MsS0FBSyxDQUFDUixRQUFOLENBQWVVLElBQWhCLENBRHZCLENBQU47QUFHRDtBQUNGO0FBVnFDLENBQUwsQ0FBbkM7O2lCQWFlQywyREFBTyxDQUNwQixJQURvQixFQUVwQlIsa0JBRm9CLENBQVAsQ0FHYlAsY0FIYSxDOztBQUFBOzs7Ozs7Ozs7OzBCQS9CRkEsYzswQkFNUEcsMkI7MEJBWUFJLGtCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzQk47QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBOztBQUVBLE1BQU1TLGFBQWEsR0FBR0MsTUFBTSxJQUFJO0FBQzlCLE1BQUlaLE1BQU0sR0FBRyxFQUFiOztBQUVBLE1BQUksQ0FBQ1ksTUFBTSxDQUFDbEIsS0FBWixFQUFtQjtBQUNqQk0sVUFBTSxDQUFDTixLQUFQLEdBQWUsd0JBQWY7QUFDRCxHQUZELE1BRU8sSUFBSSxDQUFDbUIsdURBQVUsQ0FBQ0MsSUFBWCxDQUFnQkYsTUFBTSxDQUFDbEIsS0FBdkIsQ0FBTCxFQUFvQztBQUN6Q00sVUFBTSxDQUFDTixLQUFQLEdBQWUsdUJBQWY7QUFDRDs7QUFFRCxNQUFJLENBQUNrQixNQUFNLENBQUNHLFFBQVosRUFBc0I7QUFDcEJmLFVBQU0sQ0FBQ2UsUUFBUCxHQUFrQix3QkFBbEI7QUFDRDs7QUFFRCxTQUFPZixNQUFQO0FBQ0QsQ0FkRDs7QUFnQkEsTUFBTWdCLFNBQVMsR0FBR3BCLEtBQUssSUFBSTtBQUN6QixRQUFNO0FBQUVxQjtBQUFGLE1BQW1CckIsS0FBekI7QUFFQSxTQUNFO0FBQU0sWUFBUSxFQUFFcUI7QUFBaEIsS0FDRSwyREFBQyxnREFBRDtBQUNFLGFBQVMsRUFBRUMsdURBRGI7QUFFRSxRQUFJLEVBQUMsTUFGUDtBQUdFLFFBQUksRUFBQyxPQUhQO0FBSUUsYUFBUyxFQUFDO0FBSlosSUFERixFQU9FLDJEQUFDLGdEQUFEO0FBQ0UsYUFBUyxFQUFFQywyREFEYjtBQUVFLFFBQUksRUFBQyxVQUZQO0FBR0UsUUFBSSxFQUFDLFVBSFA7QUFJRSxhQUFTLEVBQUM7QUFKWixJQVBGLEVBYUU7QUFBSyxhQUFTLEVBQUM7QUFBZixLQUNFLDJEQUFDLHFEQUFEO0FBQU0sYUFBUyxFQUFFQywwREFBakI7QUFBNEIsTUFBRSxFQUFDO0FBQS9CLGlCQURGLEVBSUU7QUFBTSxhQUFTLEVBQUM7QUFBaEIsU0FKRixFQUtFLDJEQUFDLHFEQUFEO0FBQU0sYUFBUyxFQUFFQSwwREFBakI7QUFBNEIsTUFBRSxFQUFDO0FBQS9CLHdCQUxGLEVBUUUsMkRBQUMsd0RBQUQ7QUFBZSxhQUFTLEVBQUMsU0FBekI7QUFBbUMsUUFBSSxFQUFDO0FBQXhDLGNBUkYsQ0FiRixDQURGO0FBNEJELENBL0JEOztpQkFpQ2VDLDREQUFTLENBQUM7QUFDdkJDLE1BQUksRUFBRSxPQURpQjtBQUV2QkMsVUFBUSxFQUFFWjtBQUZhLENBQUQsQ0FBVCxDQUdaSyxTQUhZLEM7O0FBQUE7Ozs7Ozs7Ozs7MEJBakRUTCxhOzBCQWdCQUssUyIsImZpbGUiOiJqcy8zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IGVtYWlsID0gL14oKFtePD4oKVtcXF1cXFxcLiw7Olxcc0BcIl0rKFxcLltePD4oKVtcXF1cXFxcLiw7Olxcc0BcIl0rKSopfChcIi4rXCIpKUAoKFxcW1swLTldezEsM31cXC5bMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcLlswLTldezEsM31cXF0pfCgoW2EtekEtWlxcLTAtOV0rXFwuKStbYS16QS1aXXsyLH0pKSQvXHJcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcclxuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4J1xyXG5pbXBvcnQgeyBwdXNoIH0gZnJvbSAncmVhY3Qtcm91dGVyLXJlZHV4J1xyXG5pbXBvcnQgeyBTdWJtaXNzaW9uRXJyb3IgfSBmcm9tICdyZWR1eC1mb3JtJ1xyXG5cclxuaW1wb3J0IHsgbG9nSW4gfSBmcm9tICdzdG9yZS9hY3Rpb24tY3JlYXRvcnMvc2Vzc2lvbidcclxuXHJcbmltcG9ydCBMb2dJbkZvcm0gZnJvbSAnLi9Mb2dJbkZvcm0nXHJcblxyXG5leHBvcnQgY29uc3QgTG9nSW5Db21wb25lbnQgPSBwcm9wcyA9PiB7XHJcbiAgY29uc3QgeyBhdHRlbXB0TG9naW4gfSA9IHByb3BzXHJcblxyXG4gIHJldHVybiA8TG9nSW5Gb3JtIG9uU3VibWl0PXthdHRlbXB0TG9naW59IC8+XHJcbn1cclxuXHJcbmNvbnN0IHBhcnNlVmFsaWRhdGlvbkZyb21SZXNwb25zZSA9IHJlc3BvbnNlID0+IHtcclxuICBsZXQgZXJyb3JzID0ge31cclxuICBpZiAoXHJcbiAgICByZXNwb25zZS5lcnJvcnMgPT09IHRydWUgJiZcclxuICAgIHJlc3BvbnNlLm1lc3NhZ2UgPT09ICdJbmNvcnJlY3QgbG9naW4gZGV0YWlscydcclxuICApIHtcclxuICAgIGVycm9ycy5lbWFpbCA9ICdJbmNvcnJlY3QgbG9naW4gZGV0YWlscydcclxuICB9XHJcblxyXG4gIHJldHVybiBlcnJvcnNcclxufVxyXG5cclxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGlzcGF0Y2ggPT4gKHtcclxuICBhdHRlbXB0TG9naW46IGFzeW5jIGxvZ2luRGV0YWlscyA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICBhd2FpdCBkaXNwYXRjaChsb2dJbihsb2dpbkRldGFpbHMpKVxyXG4gICAgICBkaXNwYXRjaChwdXNoKCcvJykpXHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICB0aHJvdyBuZXcgU3VibWlzc2lvbkVycm9yKFxyXG4gICAgICAgIHBhcnNlVmFsaWRhdGlvbkZyb21SZXNwb25zZShlcnJvci5yZXNwb25zZS5kYXRhKVxyXG4gICAgICApXHJcbiAgICB9XHJcbiAgfVxyXG59KVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChcclxuICBudWxsLFxyXG4gIG1hcERpc3BhdGNoVG9Qcm9wc1xyXG4pKExvZ0luQ29tcG9uZW50KVxyXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXHJcbmltcG9ydCB7IExpbmsgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJ1xyXG5pbXBvcnQgeyByZWR1eEZvcm0sIEZpZWxkIH0gZnJvbSAncmVkdXgtZm9ybSdcclxuXHJcbmltcG9ydCB7IFBhc3N3b3JkRm9ybUxpbmUsIFRleHRGb3JtTGluZSwgTmV1dHJhbEJ1dHRvbiB9IGZyb20gJ2NvbXBvbmVudHMnXHJcbmltcG9ydCB7IGVtYWlsIGFzIGVtYWlsUmVnZXggfSBmcm9tICdjb25zdGFudHMvcmVnZXhlcydcclxuaW1wb3J0IHsgbGlua1N0eWxlIH0gZnJvbSAnY29uc3RhbnRzL3N0eWxlcydcclxuXHJcbmNvbnN0IHZhbGlkYXRlTG9naW4gPSB2YWx1ZXMgPT4ge1xyXG4gIGxldCBlcnJvcnMgPSB7fVxyXG5cclxuICBpZiAoIXZhbHVlcy5lbWFpbCkge1xyXG4gICAgZXJyb3JzLmVtYWlsID0gJ1RoaXMgZmllbGQgaXMgcmVxdWlyZWQnXHJcbiAgfSBlbHNlIGlmICghZW1haWxSZWdleC50ZXN0KHZhbHVlcy5lbWFpbCkpIHtcclxuICAgIGVycm9ycy5lbWFpbCA9ICdJbnZhbGlkIGVtYWlsIGFkZHJlc3MnXHJcbiAgfVxyXG5cclxuICBpZiAoIXZhbHVlcy5wYXNzd29yZCkge1xyXG4gICAgZXJyb3JzLnBhc3N3b3JkID0gJ1RoaXMgZmllbGQgaXMgcmVxdWlyZWQnXHJcbiAgfVxyXG5cclxuICByZXR1cm4gZXJyb3JzXHJcbn1cclxuXHJcbmNvbnN0IExvZ2luRm9ybSA9IHByb3BzID0+IHtcclxuICBjb25zdCB7IGhhbmRsZVN1Ym1pdCB9ID0gcHJvcHNcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxmb3JtIG9uU3VibWl0PXtoYW5kbGVTdWJtaXR9PlxyXG4gICAgICA8RmllbGRcclxuICAgICAgICBjb21wb25lbnQ9e1RleHRGb3JtTGluZX1cclxuICAgICAgICB0eXBlPVwidGV4dFwiXHJcbiAgICAgICAgbmFtZT1cImVtYWlsXCJcclxuICAgICAgICBsYWJlbFRleHQ9XCJFbWFpbFwiXHJcbiAgICAgIC8+XHJcbiAgICAgIDxGaWVsZFxyXG4gICAgICAgIGNvbXBvbmVudD17UGFzc3dvcmRGb3JtTGluZX1cclxuICAgICAgICB0eXBlPVwicGFzc3dvcmRcIlxyXG4gICAgICAgIG5hbWU9XCJwYXNzd29yZFwiXHJcbiAgICAgICAgbGFiZWxUZXh0PVwiUGFzc3dvcmRcIlxyXG4gICAgICAvPlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyXCI+XHJcbiAgICAgICAgPExpbmsgY2xhc3NOYW1lPXtsaW5rU3R5bGV9IHRvPVwiL3NpZ251cFwiPlxyXG4gICAgICAgICAgT3IgU2lnbnVwXHJcbiAgICAgICAgPC9MaW5rPlxyXG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImlubGluZS1ibG9jayBweC0yXCI+fDwvc3Bhbj5cclxuICAgICAgICA8TGluayBjbGFzc05hbWU9e2xpbmtTdHlsZX0gdG89XCIvZm9yZ290LXBhc3N3b3JkXCI+XHJcbiAgICAgICAgICBGb3Jnb3QgUGFzc3dvcmQ/XHJcbiAgICAgICAgPC9MaW5rPlxyXG4gICAgICAgIDxOZXV0cmFsQnV0dG9uIGNsYXNzTmFtZT1cIm1sLWF1dG9cIiB0eXBlPVwic3VibWl0XCI+XHJcbiAgICAgICAgICBMb2cgSW5cclxuICAgICAgICA8L05ldXRyYWxCdXR0b24+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9mb3JtPlxyXG4gIClcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgcmVkdXhGb3JtKHtcclxuICBmb3JtOiAnbG9naW4nLFxyXG4gIHZhbGlkYXRlOiB2YWxpZGF0ZUxvZ2luXHJcbn0pKExvZ2luRm9ybSlcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==