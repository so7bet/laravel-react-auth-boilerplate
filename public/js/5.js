(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[5],{

/***/ "./resources/assets/js/pages/PasswordReset/PasswordReset.jsx":
/*!*******************************************************************!*\
  !*** ./resources/assets/js/pages/PasswordReset/PasswordReset.jsx ***!
  \*******************************************************************/
/*! exports provided: PasswordResetComponent, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PasswordResetComponent", function() { return PasswordResetComponent; });
/* harmony import */ var core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.promise */ "./node_modules/core-js/modules/es.promise.js");
/* harmony import */ var core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_string_includes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.string.includes */ "./node_modules/core-js/modules/es.string.includes.js");
/* harmony import */ var core_js_modules_es_string_includes__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_includes__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_string_match__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.string.match */ "./node_modules/core-js/modules/es.string.match.js");
/* harmony import */ var core_js_modules_es_string_match__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_match__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var recompose__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! recompose */ "./node_modules/recompose/dist/Recompose.esm.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-router */ "./node_modules/react-router/es/index.js");
/* harmony import */ var react_router_redux__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-router-redux */ "./node_modules/react-router-redux/es/index.js");
/* harmony import */ var redux_form__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! redux-form */ "./node_modules/redux-form/es/index.js");
/* harmony import */ var store_action_creators_flashMessages__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! store/action-creators/flashMessages */ "./resources/assets/js/store/action-creators/flashMessages/index.js");
/* harmony import */ var _PasswordResetForm__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./PasswordResetForm */ "./resources/assets/js/pages/PasswordReset/PasswordResetForm.jsx");




(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).enterModule;
  enterModule && enterModule(module);
})();

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};










const PasswordResetComponent = props => {
  const {
    submitPasswordReset
  } = props;
  return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_PasswordResetForm__WEBPACK_IMPORTED_MODULE_11__["PasswordResetForm"], {
    onSubmit: submitPasswordReset
  });
};

const parseValidationFromResponse = data => {
  const errors = {};

  if (data.errors.password && data.errors.password.includes('The password must be at least 6 characters.')) {
    errors.password = 'The password must be at least 6 characters.';
  }

  return errors;
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  submitPasswordReset: async values => {
    const {
      match
    } = ownProps;

    try {
      await axios__WEBPACK_IMPORTED_MODULE_4___default.a.post('/api/reset-password', _objectSpread({}, values, {
        token: match.params.resetToken
      }));
      dispatch(Object(react_router_redux__WEBPACK_IMPORTED_MODULE_8__["push"])('/login'));
      dispatch(Object(store_action_creators_flashMessages__WEBPACK_IMPORTED_MODULE_10__["flashMessage"])('success', 'Password successfully reset'));
    } catch (error) {
      throw new redux_form__WEBPACK_IMPORTED_MODULE_9__["SubmissionError"](parseValidationFromResponse(error.response.data));
    }
  }
});

const _default = Object(recompose__WEBPACK_IMPORTED_MODULE_5__["compose"])(react_router__WEBPACK_IMPORTED_MODULE_7__["withRouter"], Object(react_redux__WEBPACK_IMPORTED_MODULE_6__["connect"])(null, mapDispatchToProps))(PasswordResetComponent);

/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(PasswordResetComponent, "PasswordResetComponent", "C:\\xampp\\htdocs\\react-laravel-boilerplate\\resources\\assets\\js\\pages\\PasswordReset\\PasswordReset.jsx");
  reactHotLoader.register(parseValidationFromResponse, "parseValidationFromResponse", "C:\\xampp\\htdocs\\react-laravel-boilerplate\\resources\\assets\\js\\pages\\PasswordReset\\PasswordReset.jsx");
  reactHotLoader.register(mapDispatchToProps, "mapDispatchToProps", "C:\\xampp\\htdocs\\react-laravel-boilerplate\\resources\\assets\\js\\pages\\PasswordReset\\PasswordReset.jsx");
  reactHotLoader.register(_default, "default", "C:\\xampp\\htdocs\\react-laravel-boilerplate\\resources\\assets\\js\\pages\\PasswordReset\\PasswordReset.jsx");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).leaveModule;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./resources/assets/js/pages/PasswordReset/PasswordResetForm.jsx":
/*!***********************************************************************!*\
  !*** ./resources/assets/js/pages/PasswordReset/PasswordResetForm.jsx ***!
  \***********************************************************************/
/*! exports provided: PasswordResetFormComponent, PasswordResetForm */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PasswordResetFormComponent", function() { return PasswordResetFormComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PasswordResetForm", function() { return PasswordResetForm; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var redux_form__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux-form */ "./node_modules/redux-form/es/index.js");
/* harmony import */ var components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! components */ "./resources/assets/js/components/index.js");
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
  }

  if (!values.password) {
    errors.password = 'This field is required';
  }

  if (!values.password_confirmation) {
    errors.password_confirmation = 'This field is required';
  } else if (values.password !== values.password_confirmation) {
    errors.password_confirmation = "The two passwords don't match";
  }

  return errors;
};

const PasswordResetFormComponent = props => {
  const {
    handleSubmit
  } = props;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", {
    onSubmit: handleSubmit
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(redux_form__WEBPACK_IMPORTED_MODULE_1__["Field"], {
    type: "text",
    name: "email",
    labelText: "Enter your Email",
    component: components__WEBPACK_IMPORTED_MODULE_2__["TextFormLine"]
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(redux_form__WEBPACK_IMPORTED_MODULE_1__["Field"], {
    type: "password",
    name: "password",
    labelText: "Enter a New Password",
    component: components__WEBPACK_IMPORTED_MODULE_2__["PasswordFormLine"]
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(redux_form__WEBPACK_IMPORTED_MODULE_1__["Field"], {
    type: "password",
    name: "password_confirmation",
    labelText: "Confirm Your New Password",
    component: components__WEBPACK_IMPORTED_MODULE_2__["PasswordFormLine"]
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(components__WEBPACK_IMPORTED_MODULE_2__["NeutralButton"], {
    className: "float-right",
    type: "submit"
  }, "Set New Password"));
};
const PasswordResetForm = Object(redux_form__WEBPACK_IMPORTED_MODULE_1__["reduxForm"])({
  form: 'passwordReset',
  validate
})(PasswordResetFormComponent);
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(validate, "validate", "C:\\xampp\\htdocs\\react-laravel-boilerplate\\resources\\assets\\js\\pages\\PasswordReset\\PasswordResetForm.jsx");
  reactHotLoader.register(PasswordResetFormComponent, "PasswordResetFormComponent", "C:\\xampp\\htdocs\\react-laravel-boilerplate\\resources\\assets\\js\\pages\\PasswordReset\\PasswordResetForm.jsx");
  reactHotLoader.register(PasswordResetForm, "PasswordResetForm", "C:\\xampp\\htdocs\\react-laravel-boilerplate\\resources\\assets\\js\\pages\\PasswordReset\\PasswordResetForm.jsx");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).leaveModule;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3BhZ2VzL1Bhc3N3b3JkUmVzZXQvUGFzc3dvcmRSZXNldC5qc3giLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9wYWdlcy9QYXNzd29yZFJlc2V0L1Bhc3N3b3JkUmVzZXRGb3JtLmpzeCJdLCJuYW1lcyI6WyJQYXNzd29yZFJlc2V0Q29tcG9uZW50IiwicHJvcHMiLCJzdWJtaXRQYXNzd29yZFJlc2V0IiwicGFyc2VWYWxpZGF0aW9uRnJvbVJlc3BvbnNlIiwiZGF0YSIsImVycm9ycyIsInBhc3N3b3JkIiwiaW5jbHVkZXMiLCJtYXBEaXNwYXRjaFRvUHJvcHMiLCJkaXNwYXRjaCIsIm93blByb3BzIiwidmFsdWVzIiwibWF0Y2giLCJheGlvcyIsInBvc3QiLCJ0b2tlbiIsInBhcmFtcyIsInJlc2V0VG9rZW4iLCJwdXNoIiwiZmxhc2hNZXNzYWdlIiwiZXJyb3IiLCJTdWJtaXNzaW9uRXJyb3IiLCJyZXNwb25zZSIsImNvbXBvc2UiLCJ3aXRoUm91dGVyIiwiY29ubmVjdCIsInZhbGlkYXRlIiwiZW1haWwiLCJwYXNzd29yZF9jb25maXJtYXRpb24iLCJQYXNzd29yZFJlc2V0Rm9ybUNvbXBvbmVudCIsImhhbmRsZVN1Ym1pdCIsIlRleHRGb3JtTGluZSIsIlBhc3N3b3JkRm9ybUxpbmUiLCJQYXNzd29yZFJlc2V0Rm9ybSIsInJlZHV4Rm9ybSIsImZvcm0iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFTyxNQUFNQSxzQkFBc0IsR0FBR0MsS0FBSyxJQUFJO0FBQzdDLFFBQU07QUFBRUM7QUFBRixNQUEwQkQsS0FBaEM7QUFDQSxTQUFPLDJEQUFDLHFFQUFEO0FBQW1CLFlBQVEsRUFBRUM7QUFBN0IsSUFBUDtBQUNELENBSE07O0FB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Qyx3REFBRDtBQUFlLGFBQVMsRUFBQyxhQUF6QjtBQUF1QyxRQUFJLEVBQUM7QUFBNUMsd0JBdEJGLENBREY7QUE0QkQsQ0EvQk07QUFpQ0EsTUFBTUMsaUJBQWlCLEdBQUdDLDREQUFTLENBQUM7QUFDekNDLE1BQUksRUFBRSxlQURtQztBQUV6Q1Q7QUFGeUMsQ0FBRCxDQUFULENBRzlCRywwQkFIOEIsQ0FBMUI7Ozs7Ozs7Ozs7MEJBckRESCxROzBCQW9CT0csMEI7MEJBaUNBSSxpQiIsImZpbGUiOiJqcy81LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xyXG5pbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnXHJcbmltcG9ydCB7IGNvbXBvc2UgfSBmcm9tICdyZWNvbXBvc2UnXHJcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCdcclxuaW1wb3J0IHsgd2l0aFJvdXRlciB9IGZyb20gJ3JlYWN0LXJvdXRlcidcclxuaW1wb3J0IHsgcHVzaCB9IGZyb20gJ3JlYWN0LXJvdXRlci1yZWR1eCdcclxuaW1wb3J0IHsgU3VibWlzc2lvbkVycm9yIH0gZnJvbSAncmVkdXgtZm9ybSdcclxuXHJcbmltcG9ydCB7IGZsYXNoTWVzc2FnZSB9IGZyb20gJ3N0b3JlL2FjdGlvbi1jcmVhdG9ycy9mbGFzaE1lc3NhZ2VzJ1xyXG5pbXBvcnQgeyBQYXNzd29yZFJlc2V0Rm9ybSB9IGZyb20gJy4vUGFzc3dvcmRSZXNldEZvcm0nXHJcblxyXG5leHBvcnQgY29uc3QgUGFzc3dvcmRSZXNldENvbXBvbmVudCA9IHByb3BzID0+IHtcclxuICBjb25zdCB7IHN1Ym1pdFBhc3N3b3JkUmVzZXQgfSA9IHByb3BzXHJcbiAgcmV0dXJuIDxQYXNzd29yZFJlc2V0Rm9ybSBvblN1Ym1pdD17c3VibWl0UGFzc3dvcmRSZXNldH0gLz5cclxufVxyXG5cclxuY29uc3QgcGFyc2VWYWxpZGF0aW9uRnJvbVJlc3BvbnNlID0gZGF0YSA9PiB7XHJcbiAgY29uc3QgZXJyb3JzID0ge31cclxuXHJcbiAgaWYgKFxyXG4gICAgZGF0YS5lcnJvcnMucGFzc3dvcmQgJiZcclxuICAgIGRhdGEuZXJyb3JzLnBhc3N3b3JkLmluY2x1ZGVzKCdUaGUgcGFzc3dvcmQgbXVzdCBiZSBhdCBsZWFzdCA2IGNoYXJhY3RlcnMuJylcclxuICApIHtcclxuICAgIGVycm9ycy5wYXNzd29yZCA9ICdUaGUgcGFzc3dvcmQgbXVzdCBiZSBhdCBsZWFzdCA2IGNoYXJhY3RlcnMuJ1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGVycm9yc1xyXG59XHJcblxyXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSAoZGlzcGF0Y2gsIG93blByb3BzKSA9PiAoe1xyXG4gIHN1Ym1pdFBhc3N3b3JkUmVzZXQ6IGFzeW5jIHZhbHVlcyA9PiB7XHJcbiAgICBjb25zdCB7IG1hdGNoIH0gPSBvd25Qcm9wc1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIGF3YWl0IGF4aW9zLnBvc3QoJy9hcGkvcmVzZXQtcGFzc3dvcmQnLCB7XHJcbiAgICAgICAgLi4udmFsdWVzLFxyXG4gICAgICAgIHRva2VuOiBtYXRjaC5wYXJhbXMucmVzZXRUb2tlblxyXG4gICAgICB9KVxyXG5cclxuICAgICAgZGlzcGF0Y2gocHVzaCgnL2xvZ2luJykpXHJcbiAgICAgIGRpc3BhdGNoKGZsYXNoTWVzc2FnZSgnc3VjY2VzcycsICdQYXNzd29yZCBzdWNjZXNzZnVsbHkgcmVzZXQnKSlcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIHRocm93IG5ldyBTdWJtaXNzaW9uRXJyb3IoXHJcbiAgICAgICAgcGFyc2VWYWxpZGF0aW9uRnJvbVJlc3BvbnNlKGVycm9yLnJlc3BvbnNlLmRhdGEpXHJcbiAgICAgIClcclxuICAgIH1cclxuICB9XHJcbn0pXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb21wb3NlKFxyXG4gIHdpdGhSb3V0ZXIsXHJcbiAgY29ubmVjdChcclxuICAgIG51bGwsXHJcbiAgICBtYXBEaXNwYXRjaFRvUHJvcHNcclxuICApXHJcbikoUGFzc3dvcmRSZXNldENvbXBvbmVudClcclxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xyXG5pbXBvcnQgeyByZWR1eEZvcm0sIEZpZWxkIH0gZnJvbSAncmVkdXgtZm9ybSdcclxuXHJcbmltcG9ydCB7IFRleHRGb3JtTGluZSwgUGFzc3dvcmRGb3JtTGluZSwgTmV1dHJhbEJ1dHRvbiB9IGZyb20gJ2NvbXBvbmVudHMnXHJcblxyXG5jb25zdCB2YWxpZGF0ZSA9IHZhbHVlcyA9PiB7XHJcbiAgbGV0IGVycm9ycyA9IHt9XHJcblxyXG4gIGlmICghdmFsdWVzLmVtYWlsKSB7XHJcbiAgICBlcnJvcnMuZW1haWwgPSAnVGhpcyBmaWVsZCBpcyByZXF1aXJlZCdcclxuICB9XHJcblxyXG4gIGlmICghdmFsdWVzLnBhc3N3b3JkKSB7XHJcbiAgICBlcnJvcnMucGFzc3dvcmQgPSAnVGhpcyBmaWVsZCBpcyByZXF1aXJlZCdcclxuICB9XHJcblxyXG4gIGlmICghdmFsdWVzLnBhc3N3b3JkX2NvbmZpcm1hdGlvbikge1xyXG4gICAgZXJyb3JzLnBhc3N3b3JkX2NvbmZpcm1hdGlvbiA9ICdUaGlzIGZpZWxkIGlzIHJlcXVpcmVkJ1xyXG4gIH0gZWxzZSBpZiAodmFsdWVzLnBhc3N3b3JkICE9PSB2YWx1ZXMucGFzc3dvcmRfY29uZmlybWF0aW9uKSB7XHJcbiAgICBlcnJvcnMucGFzc3dvcmRfY29uZmlybWF0aW9uID0gXCJUaGUgdHdvIHBhc3N3b3JkcyBkb24ndCBtYXRjaFwiXHJcbiAgfVxyXG5cclxuICByZXR1cm4gZXJyb3JzXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBQYXNzd29yZFJlc2V0Rm9ybUNvbXBvbmVudCA9IHByb3BzID0+IHtcclxuICBjb25zdCB7IGhhbmRsZVN1Ym1pdCB9ID0gcHJvcHNcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxmb3JtIG9uU3VibWl0PXtoYW5kbGVTdWJtaXR9PlxyXG4gICAgICA8RmllbGRcclxuICAgICAgICB0eXBlPVwidGV4dFwiXHJcbiAgICAgICAgbmFtZT1cImVtYWlsXCJcclxuICAgICAgICBsYWJlbFRleHQ9XCJFbnRlciB5b3VyIEVtYWlsXCJcclxuICAgICAgICBjb21wb25lbnQ9e1RleHRGb3JtTGluZX1cclxuICAgICAgLz5cclxuXHJcbiAgICAgIDxGaWVsZFxyXG4gICAgICAgIHR5cGU9XCJwYXNzd29yZFwiXHJcbiAgICAgICAgbmFtZT1cInBhc3N3b3JkXCJcclxuICAgICAgICBsYWJlbFRleHQ9XCJFbnRlciBhIE5ldyBQYXNzd29yZFwiXHJcbiAgICAgICAgY29tcG9uZW50PXtQYXNzd29yZEZvcm1MaW5lfVxyXG4gICAgICAvPlxyXG5cclxuICAgICAgPEZpZWxkXHJcbiAgICAgICAgdHlwZT1cInBhc3N3b3JkXCJcclxuICAgICAgICBuYW1lPVwicGFzc3dvcmRfY29uZmlybWF0aW9uXCJcclxuICAgICAgICBsYWJlbFRleHQ9XCJDb25maXJtIFlvdXIgTmV3IFBhc3N3b3JkXCJcclxuICAgICAgICBjb21wb25lbnQ9e1Bhc3N3b3JkRm9ybUxpbmV9XHJcbiAgICAgIC8+XHJcblxyXG4gICAgICA8TmV1dHJhbEJ1dHRvbiBjbGFzc05hbWU9XCJmbG9hdC1yaWdodFwiIHR5cGU9XCJzdWJtaXRcIj5cclxuICAgICAgICBTZXQgTmV3IFBhc3N3b3JkXHJcbiAgICAgIDwvTmV1dHJhbEJ1dHRvbj5cclxuICAgIDwvZm9ybT5cclxuICApXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBQYXNzd29yZFJlc2V0Rm9ybSA9IHJlZHV4Rm9ybSh7XHJcbiAgZm9ybTogJ3Bhc3N3b3JkUmVzZXQnLFxyXG4gIHZhbGlkYXRlXHJcbn0pKFBhc3N3b3JkUmVzZXRGb3JtQ29tcG9uZW50KVxyXG4iXSwic291cmNlUm9vdCI6IiJ9