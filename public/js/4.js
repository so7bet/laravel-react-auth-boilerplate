(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[4],{

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

/***/ "./resources/assets/js/pages/SignUp/SignUp.jsx":
/*!*****************************************************!*\
  !*** ./resources/assets/js/pages/SignUp/SignUp.jsx ***!
  \*****************************************************/
/*! exports provided: SignUpComponent, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SignUpComponent", function() { return SignUpComponent; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_router_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-redux */ "./node_modules/react-router-redux/es/index.js");
/* harmony import */ var redux_form__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! redux-form */ "./node_modules/redux-form/es/index.js");
/* harmony import */ var _SignUpForm__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./SignUpForm */ "./resources/assets/js/pages/SignUp/SignUpForm.jsx");
(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).enterModule;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};







const SignUpComponent = props => {
  const {
    submitSignup
  } = props;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_SignUpForm__WEBPACK_IMPORTED_MODULE_5__["default"], {
    onSubmit: submitSignup
  });
};

const parseValidationErrorResponse = response => {
  let errors = {};

  if (response.email && response.email.Unique) {
    errors.email = 'This email already exists, please try a different email.';
  }

  return errors;
};

const mapDispatchToProps = dispatch => ({
  submitSignup: signUpData => {
    return axios__WEBPACK_IMPORTED_MODULE_1___default.a.post('/api/signup', signUpData).then(response => {
      if (response.status === 200) {
        // Successful signup, move on to dashboard/overview.
        dispatch(Object(react_router_redux__WEBPACK_IMPORTED_MODULE_3__["push"])('/'));
      }
    }).catch(error => {
      if (error.response.status === 422) {
        // Invalid data was supplied to the API, show validation errors
        throw new redux_form__WEBPACK_IMPORTED_MODULE_4__["SubmissionError"](parseValidationErrorResponse(error.response.data.messages));
      }
    });
  }
});

const _default = Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(null, mapDispatchToProps)(SignUpComponent);

/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(SignUpComponent, "SignUpComponent", "C:\\xampp\\htdocs\\react-laravel-boilerplate\\resources\\assets\\js\\pages\\SignUp\\SignUp.jsx");
  reactHotLoader.register(parseValidationErrorResponse, "parseValidationErrorResponse", "C:\\xampp\\htdocs\\react-laravel-boilerplate\\resources\\assets\\js\\pages\\SignUp\\SignUp.jsx");
  reactHotLoader.register(mapDispatchToProps, "mapDispatchToProps", "C:\\xampp\\htdocs\\react-laravel-boilerplate\\resources\\assets\\js\\pages\\SignUp\\SignUp.jsx");
  reactHotLoader.register(_default, "default", "C:\\xampp\\htdocs\\react-laravel-boilerplate\\resources\\assets\\js\\pages\\SignUp\\SignUp.jsx");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).leaveModule;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./resources/assets/js/pages/SignUp/SignUpForm.jsx":
/*!*********************************************************!*\
  !*** ./resources/assets/js/pages/SignUp/SignUpForm.jsx ***!
  \*********************************************************/
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








const validateSignUp = values => {
  let errors = {};

  if (!values.first_name) {
    errors.first_name = 'This field is required';
  }

  if (!values.last_name) {
    errors.last_name = 'This field is required';
  }

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

const SignUpForm = props => {
  const {
    handleSubmit
  } = props;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", {
    onSubmit: handleSubmit
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(redux_form__WEBPACK_IMPORTED_MODULE_2__["Field"], {
    component: components__WEBPACK_IMPORTED_MODULE_3__["TextFormLine"],
    type: "text",
    name: "first_name",
    labelText: "First Name"
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(redux_form__WEBPACK_IMPORTED_MODULE_2__["Field"], {
    component: components__WEBPACK_IMPORTED_MODULE_3__["TextFormLine"],
    type: "text",
    name: "last_name",
    labelText: "Last Name"
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(redux_form__WEBPACK_IMPORTED_MODULE_2__["Field"], {
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
    to: "/login"
  }, "Or Login"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(components__WEBPACK_IMPORTED_MODULE_3__["NeutralButton"], {
    className: "ml-auto",
    type: "submit"
  }, "Sign Up")));
};

const _default = Object(redux_form__WEBPACK_IMPORTED_MODULE_2__["reduxForm"])({
  form: 'signup',
  validate: validateSignUp
})(SignUpForm);

/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(validateSignUp, "validateSignUp", "C:\\xampp\\htdocs\\react-laravel-boilerplate\\resources\\assets\\js\\pages\\SignUp\\SignUpForm.jsx");
  reactHotLoader.register(SignUpForm, "SignUpForm", "C:\\xampp\\htdocs\\react-laravel-boilerplate\\resources\\assets\\js\\pages\\SignUp\\SignUpForm.jsx");
  reactHotLoader.register(_default, "default", "C:\\xampp\\htdocs\\react-laravel-boilerplate\\resources\\assets\\js\\pages\\SignUp\\SignUpForm.jsx");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).leaveModule;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbnN0YW50cy9yZWdleGVzLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvcGFnZXMvU2lnblVwL1NpZ25VcC5qc3giLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9wYWdlcy9TaWduVXAvU2lnblVwRm9ybS5qc3giXSwibmFtZXMiOlsiZW1haWwiLCJTaWduVXBDb21wb25lbnQiLCJwcm9wcyIsInN1Ym1pdFNpZ251cCIsInBhcnNlVmFsaWRhdGlvbkVycm9yUmVzcG9uc2UiLCJyZXNwb25zZSIsImVycm9ycyIsIlVuaXF1ZSIsIm1hcERpc3BhdGNoVG9Qcm9wcyIsImRpc3BhdGNoIiwic2lnblVwRGF0YSIsImF4aW9zIiwicG9zdCIsInRoZW4iLCJzdGF0dXMiLCJwdXNoIiwiY2F0Y2giLCJlcnJvciIsIlN1Ym1pc3Npb25FcnJvciIsImRhdGEiLCJtZXNzYWdlcyIsImNvbm5lY3QiLCJ2YWxpZGF0ZVNpZ25VcCIsInZhbHVlcyIsImZpcnN0X25hbWUiLCJsYXN0X25hbWUiLCJlbWFpbFJlZ2V4IiwidGVzdCIsInBhc3N3b3JkIiwiU2lnblVwRm9ybSIsImhhbmRsZVN1Ym1pdCIsIlRleHRGb3JtTGluZSIsIlBhc3N3b3JkRm9ybUxpbmUiLCJsaW5rU3R5bGUiLCJyZWR1eEZvcm0iLCJmb3JtIiwidmFsaWRhdGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFPLE1BQU1BLEtBQUssR0FBRyx1SkFBZDs7Ozs7Ozs7OzswQkFBTUEsSzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVPLE1BQU1DLGVBQWUsR0FBR0MsS0FBSyxJQUFJO0FBQ3RDLFFBQU07QUFBRUM7QUFBRixNQUFtQkQsS0FBekI7QUFFQSxTQUFPLDJEQUFDLG1EQUFEO0FBQVksWUFBUSxF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SUUsYUFBUyxFQUFDO0FBSlosSUFiRixFQW1CRSwyREFBQyxnREFBRDtBQUNFLGFBQVMsRUFBRUMsMkRBRGI7QUFFRSxRQUFJLEVBQUMsVUFGUDtBQUdFLFFBQUksRUFBQyxVQUhQO0FBSUUsYUFBUyxFQUFDO0FBSlosSUFuQkYsRUF5QkU7QUFBSyxhQUFTLEVBQUM7QUFBZixLQUNFLDJEQUFDLHFEQUFEO0FBQU0sYUFBUyxFQUFFQywwREFBakI7QUFBNEIsTUFBRSxFQUFDO0FBQS9CLGdCQURGLEVBSUUsMkRBQUMsd0RBQUQ7QUFBZSxhQUFTLEVBQUMsU0FBekI7QUFBbUMsUUFBSSxFQUFDO0FBQXhDLGVBSkYsQ0F6QkYsQ0FERjtBQW9DRCxDQXZDRDs7aUJBeUNlQyw0REFBUyxDQUFDO0FBQ3ZCQyxNQUFJLEVBQUUsUUFEaUI7QUFFdkJDLFVBQVEsRUFBRWQ7QUFGYSxDQUFELENBQVQsQ0FHWk8sVUFIWSxDOztBQUFBOzs7Ozs7Ozs7OzBCQWpFVFAsYzswQkF3QkFPLFUiLCJmaWxlIjoianMvNC5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBlbWFpbCA9IC9eKChbXjw+KClbXFxdXFxcXC4sOzpcXHNAXCJdKyhcXC5bXjw+KClbXFxdXFxcXC4sOzpcXHNAXCJdKykqKXwoXCIuK1wiKSlAKChcXFtbMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcLlswLTldezEsM31cXC5bMC05XXsxLDN9XFxdKXwoKFthLXpBLVpcXC0wLTldK1xcLikrW2EtekEtWl17Mix9KSkkL1xyXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXHJcbmltcG9ydCBheGlvcyBmcm9tICdheGlvcydcclxuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4J1xyXG5pbXBvcnQgeyBwdXNoIH0gZnJvbSAncmVhY3Qtcm91dGVyLXJlZHV4J1xyXG5pbXBvcnQgeyBTdWJtaXNzaW9uRXJyb3IgfSBmcm9tICdyZWR1eC1mb3JtJ1xyXG5cclxuaW1wb3J0IFNpZ25VcEZvcm0gZnJvbSAnLi9TaWduVXBGb3JtJ1xyXG5cclxuZXhwb3J0IGNvbnN0IFNpZ25VcENvbXBvbmVudCA9IHByb3BzID0+IHtcclxuICBjb25zdCB7IHN1Ym1pdFNpZ251cCB9ID0gcHJvcHNcclxuXHJcbiAgcmV0dXJuIDxTaWduVXBGb3JtIG9uU3VibWl0PXtzdWJtaXRTaWdudXB9IC8+XHJcbn1cclxuXHJcbmNvbnN0IHBhcnNlVmFsaWRhdGlvbkVycm9yUmVzcG9uc2UgPSByZXNwb25zZSA9PiB7XHJcbiAgbGV0IGVycm9ycyA9IHt9XHJcblxyXG4gIGlmIChyZXNwb25zZS5lbWFpbCAmJiByZXNwb25zZS5lbWFpbC5VbmlxdWUpIHtcclxuICAgIGVycm9ycy5lbWFpbCA9ICdUaGlzIGVtYWlsIGFscmVhZHkgZXhpc3RzLCBwbGVhc2UgdHJ5IGEgZGlmZmVyZW50IGVtYWlsLidcclxuICB9XHJcblxyXG4gIHJldHVybiBlcnJvcnNcclxufVxyXG5cclxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGlzcGF0Y2ggPT4gKHtcclxuICBzdWJtaXRTaWdudXA6IHNpZ25VcERhdGEgPT4ge1xyXG4gICAgcmV0dXJuIGF4aW9zXHJcbiAgICAgIC5wb3N0KCcvYXBpL3NpZ251cCcsIHNpZ25VcERhdGEpXHJcbiAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcclxuICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSAyMDApIHtcclxuICAgICAgICAgIC8vIFN1Y2Nlc3NmdWwgc2lnbnVwLCBtb3ZlIG9uIHRvIGRhc2hib2FyZC9vdmVydmlldy5cclxuICAgICAgICAgIGRpc3BhdGNoKHB1c2goJy8nKSlcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgaWYgKGVycm9yLnJlc3BvbnNlLnN0YXR1cyA9PT0gNDIyKSB7XHJcbiAgICAgICAgICAvLyBJbnZhbGlkIGRhdGEgd2FzIHN1cHBsaWVkIHRvIHRoZSBBUEksIHNob3cgdmFsaWRhdGlvbiBlcnJvcnNcclxuICAgICAgICAgIHRocm93IG5ldyBTdWJtaXNzaW9uRXJyb3IoXHJcbiAgICAgICAgICAgIHBhcnNlVmFsaWRhdGlvbkVycm9yUmVzcG9uc2UoZXJyb3IucmVzcG9uc2UuZGF0YS5tZXNzYWdlcylcclxuICAgICAgICAgIClcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgfVxyXG59KVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChcclxuICBudWxsLFxyXG4gIG1hcERpc3BhdGNoVG9Qcm9wc1xyXG4pKFNpZ25VcENvbXBvbmVudClcclxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xyXG5pbXBvcnQgeyBMaW5rIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSdcclxuaW1wb3J0IHsgcmVkdXhGb3JtLCBGaWVsZCB9IGZyb20gJ3JlZHV4LWZvcm0nXHJcblxyXG5pbXBvcnQgeyBQYXNzd29yZEZvcm1MaW5lLCBUZXh0Rm9ybUxpbmUsIE5ldXRyYWxCdXR0b24gfSBmcm9tICdjb21wb25lbnRzJ1xyXG5pbXBvcnQgeyBlbWFpbCBhcyBlbWFpbFJlZ2V4IH0gZnJvbSAnY29uc3RhbnRzL3JlZ2V4ZXMnXHJcbmltcG9ydCB7IGxpbmtTdHlsZSB9IGZyb20gJ2NvbnN0YW50cy9zdHlsZXMnXHJcblxyXG5jb25zdCB2YWxpZGF0ZVNpZ25VcCA9IHZhbHVlcyA9PiB7XHJcbiAgbGV0IGVycm9ycyA9IHt9XHJcblxyXG4gIGlmICghdmFsdWVzLmZpcnN0X25hbWUpIHtcclxuICAgIGVycm9ycy5maXJzdF9uYW1lID0gJ1RoaXMgZmllbGQgaXMgcmVxdWlyZWQnXHJcbiAgfVxyXG5cclxuICBpZiAoIXZhbHVlcy5sYXN0X25hbWUpIHtcclxuICAgIGVycm9ycy5sYXN0X25hbWUgPSAnVGhpcyBmaWVsZCBpcyByZXF1aXJlZCdcclxuICB9XHJcblxyXG4gIGlmICghdmFsdWVzLmVtYWlsKSB7XHJcbiAgICBlcnJvcnMuZW1haWwgPSAnVGhpcyBmaWVsZCBpcyByZXF1aXJlZCdcclxuICB9IGVsc2UgaWYgKCFlbWFpbFJlZ2V4LnRlc3QodmFsdWVzLmVtYWlsKSkge1xyXG4gICAgZXJyb3JzLmVtYWlsID0gJ0ludmFsaWQgZW1haWwgYWRkcmVzcydcclxuICB9XHJcblxyXG4gIGlmICghdmFsdWVzLnBhc3N3b3JkKSB7XHJcbiAgICBlcnJvcnMucGFzc3dvcmQgPSAnVGhpcyBmaWVsZCBpcyByZXF1aXJlZCdcclxuICB9XHJcblxyXG4gIHJldHVybiBlcnJvcnNcclxufVxyXG5cclxuY29uc3QgU2lnblVwRm9ybSA9IHByb3BzID0+IHtcclxuICBjb25zdCB7IGhhbmRsZVN1Ym1pdCB9ID0gcHJvcHNcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxmb3JtIG9uU3VibWl0PXtoYW5kbGVTdWJtaXR9PlxyXG4gICAgICA8RmllbGRcclxuICAgICAgICBjb21wb25lbnQ9e1RleHRGb3JtTGluZX1cclxuICAgICAgICB0eXBlPVwidGV4dFwiXHJcbiAgICAgICAgbmFtZT1cImZpcnN0X25hbWVcIlxyXG4gICAgICAgIGxhYmVsVGV4dD1cIkZpcnN0IE5hbWVcIlxyXG4gICAgICAvPlxyXG4gICAgICA8RmllbGRcclxuICAgICAgICBjb21wb25lbnQ9e1RleHRGb3JtTGluZX1cclxuICAgICAgICB0eXBlPVwidGV4dFwiXHJcbiAgICAgICAgbmFtZT1cImxhc3RfbmFtZVwiXHJcbiAgICAgICAgbGFiZWxUZXh0PVwiTGFzdCBOYW1lXCJcclxuICAgICAgLz5cclxuICAgICAgPEZpZWxkXHJcbiAgICAgICAgY29tcG9uZW50PXtUZXh0Rm9ybUxpbmV9XHJcbiAgICAgICAgdHlwZT1cInRleHRcIlxyXG4gICAgICAgIG5hbWU9XCJlbWFpbFwiXHJcbiAgICAgICAgbGFiZWxUZXh0PVwiRW1haWxcIlxyXG4gICAgICAvPlxyXG4gICAgICA8RmllbGRcclxuICAgICAgICBjb21wb25lbnQ9e1Bhc3N3b3JkRm9ybUxpbmV9XHJcbiAgICAgICAgdHlwZT1cInBhc3N3b3JkXCJcclxuICAgICAgICBuYW1lPVwicGFzc3dvcmRcIlxyXG4gICAgICAgIGxhYmVsVGV4dD1cIlBhc3N3b3JkXCJcclxuICAgICAgLz5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlclwiPlxyXG4gICAgICAgIDxMaW5rIGNsYXNzTmFtZT17bGlua1N0eWxlfSB0bz1cIi9sb2dpblwiPlxyXG4gICAgICAgICAgT3IgTG9naW5cclxuICAgICAgICA8L0xpbms+XHJcbiAgICAgICAgPE5ldXRyYWxCdXR0b24gY2xhc3NOYW1lPVwibWwtYXV0b1wiIHR5cGU9XCJzdWJtaXRcIj5cclxuICAgICAgICAgIFNpZ24gVXBcclxuICAgICAgICA8L05ldXRyYWxCdXR0b24+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9mb3JtPlxyXG4gIClcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgcmVkdXhGb3JtKHtcclxuICBmb3JtOiAnc2lnbnVwJyxcclxuICB2YWxpZGF0ZTogdmFsaWRhdGVTaWduVXBcclxufSkoU2lnblVwRm9ybSlcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==