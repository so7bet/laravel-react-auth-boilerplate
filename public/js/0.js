(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./node_modules/core-js/internals/advance-string-index.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/internals/advance-string-index.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var charAt = __webpack_require__(/*! ../internals/string-multibyte */ "./node_modules/core-js/internals/string-multibyte.js").charAt;

// `AdvanceStringIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? charAt(S, index).length : 1);
};


/***/ }),

/***/ "./node_modules/core-js/internals/fix-regexp-well-known-symbol-logic.js":
/*!******************************************************************************!*\
  !*** ./node_modules/core-js/internals/fix-regexp-well-known-symbol-logic.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var hide = __webpack_require__(/*! ../internals/hide */ "./node_modules/core-js/internals/hide.js");
var redefine = __webpack_require__(/*! ../internals/redefine */ "./node_modules/core-js/internals/redefine.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");
var regexpExec = __webpack_require__(/*! ../internals/regexp-exec */ "./node_modules/core-js/internals/regexp-exec.js");

var SPECIES = wellKnownSymbol('species');

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  return ''.replace(re, '$<a>') !== '7';
});

// Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
// Weex JS has frozen built-in prototypes, so use try / catch wrapper
var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
});

module.exports = function (KEY, length, exec, sham) {
  var SYMBOL = wellKnownSymbol(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;
    re.exec = function () { execCalled = true; return null; };

    if (KEY === 'split') {
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
    }

    re[SYMBOL]('');
    return !execCalled;
  });

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    (KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS) ||
    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
      if (regexp.exec === regexpExec) {
        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
          // The native String method already delegates to @@method (this
          // polyfilled function), leasing to infinite recursion.
          // We avoid it by directly calling the native @@method method.
          return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
        }
        return { done: true, value: nativeMethod.call(str, regexp, arg2) };
      }
      return { done: false };
    });
    var stringMethod = methods[0];
    var regexMethod = methods[1];

    redefine(String.prototype, KEY, stringMethod);
    redefine(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return regexMethod.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return regexMethod.call(string, this); }
    );
    if (sham) hide(RegExp.prototype[SYMBOL], 'sham', true);
  }
};


/***/ }),

/***/ "./node_modules/core-js/internals/regexp-exec-abstract.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/internals/regexp-exec-abstract.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(/*! ./classof-raw */ "./node_modules/core-js/internals/classof-raw.js");
var regexpExec = __webpack_require__(/*! ./regexp-exec */ "./node_modules/core-js/internals/regexp-exec.js");

// `RegExpExec` abstract operation
// https://tc39.github.io/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }

  if (classof(R) !== 'RegExp') {
    throw TypeError('RegExp#exec called on incompatible receiver');
  }

  return regexpExec.call(R, S);
};



/***/ }),

/***/ "./node_modules/core-js/internals/regexp-exec.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/regexp-exec.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var regexpFlags = __webpack_require__(/*! ./regexp-flags */ "./node_modules/core-js/internals/regexp-flags.js");

var nativeExec = RegExp.prototype.exec;
// This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.
var nativeReplace = String.prototype.replace;

var patchedExec = nativeExec;

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/;
  var re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
})();

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + re.source + '$(?!\\s)', regexpFlags.call(re));
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

    match = nativeExec.call(re, str);

    if (UPDATES_LAST_INDEX_WRONG && match) {
      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

module.exports = patchedExec;


/***/ }),

/***/ "./node_modules/core-js/internals/regexp-flags.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/internals/regexp-flags.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");

// `RegExp.prototype.flags` getter implementation
// https://tc39.github.io/ecma262/#sec-get-regexp.prototype.flags
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.dotAll) result += 's';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),

/***/ "./node_modules/core-js/internals/string-multibyte.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/internals/string-multibyte.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ../internals/to-integer */ "./node_modules/core-js/internals/to-integer.js");
var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "./node_modules/core-js/internals/require-object-coercible.js");

// `String.prototype.{ codePointAt, at }` methods implementation
var createMethod = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = String(requireObjectCoercible($this));
    var position = toInteger(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = S.charCodeAt(position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size
      || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
        ? CONVERT_TO_STRING ? S.charAt(position) : first
        : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

module.exports = {
  // `String.prototype.codePointAt` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod(true)
};


/***/ }),

/***/ "./node_modules/core-js/modules/es.string.match.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es.string.match.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fixRegExpWellKnownSymbolLogic = __webpack_require__(/*! ../internals/fix-regexp-well-known-symbol-logic */ "./node_modules/core-js/internals/fix-regexp-well-known-symbol-logic.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
var toLength = __webpack_require__(/*! ../internals/to-length */ "./node_modules/core-js/internals/to-length.js");
var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "./node_modules/core-js/internals/require-object-coercible.js");
var advanceStringIndex = __webpack_require__(/*! ../internals/advance-string-index */ "./node_modules/core-js/internals/advance-string-index.js");
var regExpExec = __webpack_require__(/*! ../internals/regexp-exec-abstract */ "./node_modules/core-js/internals/regexp-exec-abstract.js");

// @@match logic
fixRegExpWellKnownSymbolLogic('match', 1, function (MATCH, nativeMatch, maybeCallNative) {
  return [
    // `String.prototype.match` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.match
    function match(regexp) {
      var O = requireObjectCoercible(this);
      var matcher = regexp == undefined ? undefined : regexp[MATCH];
      return matcher !== undefined ? matcher.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
    },
    // `RegExp.prototype[@@match]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@match
    function (regexp) {
      var res = maybeCallNative(nativeMatch, regexp, this);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);

      if (!rx.global) return regExpExec(rx, S);

      var fullUnicode = rx.unicode;
      rx.lastIndex = 0;
      var A = [];
      var n = 0;
      var result;
      while ((result = regExpExec(rx, S)) !== null) {
        var matchStr = String(result[0]);
        A[n] = matchStr;
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
        n++;
      }
      return n === 0 ? null : A;
    }
  ];
});


/***/ }),

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

/***/ "./resources/assets/js/pages/Settings/Forms/AppSettingsForm.jsx":
/*!**********************************************************************!*\
  !*** ./resources/assets/js/pages/Settings/Forms/AppSettingsForm.jsx ***!
  \**********************************************************************/
/*! exports provided: AppSettingsFormComponent, AppSettingsFormForm, AppSettingsForm */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppSettingsFormComponent", function() { return AppSettingsFormComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppSettingsFormForm", function() { return AppSettingsFormForm; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppSettingsForm", function() { return AppSettingsForm; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux-form */ "./node_modules/redux-form/es/index.js");
(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).enterModule;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};




class AppSettingsFormComponent extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  render() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, "Application Settings Placeholder");
  }

  // @ts-ignore
  __reactstandin__regenerateByEval(key, code) {
    // @ts-ignore
    this[key] = eval(code);
  }

}
const AppSettingsFormForm = Object(redux_form__WEBPACK_IMPORTED_MODULE_2__["reduxForm"])({
  form: 'appSettings'
})(AppSettingsFormComponent);
const AppSettingsForm = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])()(AppSettingsFormForm);
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(AppSettingsFormComponent, "AppSettingsFormComponent", "C:\\xampp\\htdocs\\react-laravel-boilerplate\\resources\\assets\\js\\pages\\Settings\\Forms\\AppSettingsForm.jsx");
  reactHotLoader.register(AppSettingsFormForm, "AppSettingsFormForm", "C:\\xampp\\htdocs\\react-laravel-boilerplate\\resources\\assets\\js\\pages\\Settings\\Forms\\AppSettingsForm.jsx");
  reactHotLoader.register(AppSettingsForm, "AppSettingsForm", "C:\\xampp\\htdocs\\react-laravel-boilerplate\\resources\\assets\\js\\pages\\Settings\\Forms\\AppSettingsForm.jsx");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).leaveModule;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./resources/assets/js/pages/Settings/Forms/BillingSettingsForm.jsx":
/*!**************************************************************************!*\
  !*** ./resources/assets/js/pages/Settings/Forms/BillingSettingsForm.jsx ***!
  \**************************************************************************/
/*! exports provided: BillingSettingsFormComponent, BillingSettingsFormForm, BillingSettingsForm */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BillingSettingsFormComponent", function() { return BillingSettingsFormComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BillingSettingsFormForm", function() { return BillingSettingsFormForm; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BillingSettingsForm", function() { return BillingSettingsForm; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux-form */ "./node_modules/redux-form/es/index.js");
(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).enterModule;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};




class BillingSettingsFormComponent extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  render() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, "Billing Settings Placeholder");
  }

  // @ts-ignore
  __reactstandin__regenerateByEval(key, code) {
    // @ts-ignore
    this[key] = eval(code);
  }

}
const BillingSettingsFormForm = Object(redux_form__WEBPACK_IMPORTED_MODULE_2__["reduxForm"])({
  form: 'appSettings'
})(BillingSettingsFormComponent);
const BillingSettingsForm = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])()(BillingSettingsFormForm);
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(BillingSettingsFormComponent, "BillingSettingsFormComponent", "C:\\xampp\\htdocs\\react-laravel-boilerplate\\resources\\assets\\js\\pages\\Settings\\Forms\\BillingSettingsForm.jsx");
  reactHotLoader.register(BillingSettingsFormForm, "BillingSettingsFormForm", "C:\\xampp\\htdocs\\react-laravel-boilerplate\\resources\\assets\\js\\pages\\Settings\\Forms\\BillingSettingsForm.jsx");
  reactHotLoader.register(BillingSettingsForm, "BillingSettingsForm", "C:\\xampp\\htdocs\\react-laravel-boilerplate\\resources\\assets\\js\\pages\\Settings\\Forms\\BillingSettingsForm.jsx");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).leaveModule;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./resources/assets/js/pages/Settings/Forms/ChangePasswordForm.jsx":
/*!*************************************************************************!*\
  !*** ./resources/assets/js/pages/Settings/Forms/ChangePasswordForm.jsx ***!
  \*************************************************************************/
/*! exports provided: ChangePasswordForm */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChangePasswordForm", function() { return ChangePasswordForm; });
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





class ChangePasswordFormComponent extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  render() {
    const {
      handleSubmit
    } = this.props;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", {
      onSubmit: handleSubmit
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(redux_form__WEBPACK_IMPORTED_MODULE_1__["Field"], {
      name: "old_password",
      component: components__WEBPACK_IMPORTED_MODULE_2__["PasswordFormLine"],
      labelText: "Enter your old password",
      className: "mb-2"
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "flex items-start mb-4"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(redux_form__WEBPACK_IMPORTED_MODULE_1__["Field"], {
      name: "new_password",
      component: components__WEBPACK_IMPORTED_MODULE_2__["PasswordFormLine"],
      labelText: "New Password",
      className: "flex-grow"
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(redux_form__WEBPACK_IMPORTED_MODULE_1__["Field"], {
      name: "new_password_confirmation",
      component: components__WEBPACK_IMPORTED_MODULE_2__["PasswordFormLine"],
      labelText: "Repeat your new password",
      className: "flex-grow pl-4"
    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "flex border-grey-light"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(components__WEBPACK_IMPORTED_MODULE_2__["PositiveButton"], {
      type: "submit",
      className: "ml-auto"
    }, "Change Password")));
  }

  // @ts-ignore
  __reactstandin__regenerateByEval(key, code) {
    // @ts-ignore
    this[key] = eval(code);
  }

}

const validatePasswordForm = values => {
  let errors = {};
  const nonEmptyFieldNames = ['old_password', 'new_password', 'new_password_confirmation'];
  nonEmptyFieldNames.forEach(fieldName => {
    if (!values[fieldName]) {
      errors[fieldName] = 'This field is required';
    }
  });

  if (values.new_password && values.new_password_confirmation !== values.new_password) {
    errors.new_password_confirmation = 'This password does not match the new password you entered';
  }

  return errors;
};

const ChangePasswordForm = Object(redux_form__WEBPACK_IMPORTED_MODULE_1__["reduxForm"])({
  form: 'changePassword',
  validate: validatePasswordForm
})(ChangePasswordFormComponent);
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(ChangePasswordFormComponent, "ChangePasswordFormComponent", "C:\\xampp\\htdocs\\react-laravel-boilerplate\\resources\\assets\\js\\pages\\Settings\\Forms\\ChangePasswordForm.jsx");
  reactHotLoader.register(validatePasswordForm, "validatePasswordForm", "C:\\xampp\\htdocs\\react-laravel-boilerplate\\resources\\assets\\js\\pages\\Settings\\Forms\\ChangePasswordForm.jsx");
  reactHotLoader.register(ChangePasswordForm, "ChangePasswordForm", "C:\\xampp\\htdocs\\react-laravel-boilerplate\\resources\\assets\\js\\pages\\Settings\\Forms\\ChangePasswordForm.jsx");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).leaveModule;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./resources/assets/js/pages/Settings/Forms/UserSettingsForm.jsx":
/*!***********************************************************************!*\
  !*** ./resources/assets/js/pages/Settings/Forms/UserSettingsForm.jsx ***!
  \***********************************************************************/
/*! exports provided: UserSettingsFormComponent, UserSettingsForm */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserSettingsFormComponent", function() { return UserSettingsFormComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserSettingsForm", function() { return UserSettingsForm; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux-form */ "./node_modules/redux-form/es/index.js");
/* harmony import */ var components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! components */ "./resources/assets/js/components/index.js");
/* harmony import */ var constants_regexes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! constants/regexes */ "./resources/assets/js/constants/regexes.js");
(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).enterModule;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};






class UserSettingsFormComponent extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  render() {
    const {
      handleSubmit,
      avatarUploadHandler,
      className
    } = this.props;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", {
      className: className,
      onSubmit: handleSubmit
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "flex items-center my-4"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(redux_form__WEBPACK_IMPORTED_MODULE_2__["Field"], {
      name: "avatar",
      component: components__WEBPACK_IMPORTED_MODULE_3__["PictureUpload"],
      uploadHandler: avatarUploadHandler,
      className: "mr-10"
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "flex-grow"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(redux_form__WEBPACK_IMPORTED_MODULE_2__["Field"], {
      name: "first_name",
      component: components__WEBPACK_IMPORTED_MODULE_3__["TextFormLine"],
      labelText: "First Name"
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(redux_form__WEBPACK_IMPORTED_MODULE_2__["Field"], {
      name: "last_name",
      component: components__WEBPACK_IMPORTED_MODULE_3__["TextFormLine"],
      labelText: "Last Name"
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(redux_form__WEBPACK_IMPORTED_MODULE_2__["Field"], {
      name: "email",
      component: components__WEBPACK_IMPORTED_MODULE_3__["TextFormLine"],
      labelText: "Email"
    }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "flex border-grey-light"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(components__WEBPACK_IMPORTED_MODULE_3__["PositiveButton"], {
      type: "submit",
      className: "ml-auto"
    }, "Save User Details")));
  }

  // @ts-ignore
  __reactstandin__regenerateByEval(key, code) {
    // @ts-ignore
    this[key] = eval(code);
  }

}

const validateUserSettings = values => {
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

  return errors;
};

const UserSettingsFormForm = Object(redux_form__WEBPACK_IMPORTED_MODULE_2__["reduxForm"])({
  form: 'accountSettings',
  enableReinitialize: true,
  validate: validateUserSettings
})(UserSettingsFormComponent);

const mapStateToProps = state => {
  const {
    session: {
      currentUser
    }
  } = state;
  return {
    initialValues: state.entities.users[currentUser]
  };
};

const UserSettingsForm = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, null)(UserSettingsFormForm);
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(UserSettingsFormComponent, "UserSettingsFormComponent", "C:\\xampp\\htdocs\\react-laravel-boilerplate\\resources\\assets\\js\\pages\\Settings\\Forms\\UserSettingsForm.jsx");
  reactHotLoader.register(validateUserSettings, "validateUserSettings", "C:\\xampp\\htdocs\\react-laravel-boilerplate\\resources\\assets\\js\\pages\\Settings\\Forms\\UserSettingsForm.jsx");
  reactHotLoader.register(UserSettingsFormForm, "UserSettingsFormForm", "C:\\xampp\\htdocs\\react-laravel-boilerplate\\resources\\assets\\js\\pages\\Settings\\Forms\\UserSettingsForm.jsx");
  reactHotLoader.register(mapStateToProps, "mapStateToProps", "C:\\xampp\\htdocs\\react-laravel-boilerplate\\resources\\assets\\js\\pages\\Settings\\Forms\\UserSettingsForm.jsx");
  reactHotLoader.register(UserSettingsForm, "UserSettingsForm", "C:\\xampp\\htdocs\\react-laravel-boilerplate\\resources\\assets\\js\\pages\\Settings\\Forms\\UserSettingsForm.jsx");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).leaveModule;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./resources/assets/js/pages/Settings/Forms/index.js":
/*!***********************************************************!*\
  !*** ./resources/assets/js/pages/Settings/Forms/index.js ***!
  \***********************************************************/
/*! exports provided: UserSettingsForm, ChangePasswordForm */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _UserSettingsForm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UserSettingsForm */ "./resources/assets/js/pages/Settings/Forms/UserSettingsForm.jsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UserSettingsForm", function() { return _UserSettingsForm__WEBPACK_IMPORTED_MODULE_0__["UserSettingsForm"]; });

/* harmony import */ var _ChangePasswordForm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ChangePasswordForm */ "./resources/assets/js/pages/Settings/Forms/ChangePasswordForm.jsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ChangePasswordForm", function() { return _ChangePasswordForm__WEBPACK_IMPORTED_MODULE_1__["ChangePasswordForm"]; });

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};




/***/ }),

/***/ "./resources/assets/js/pages/Settings/SettingsRoutes.jsx":
/*!***************************************************************!*\
  !*** ./resources/assets/js/pages/Settings/SettingsRoutes.jsx ***!
  \***************************************************************/
/*! exports provided: SettingsRoutesComponent, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SettingsRoutesComponent", function() { return SettingsRoutesComponent; });
/* harmony import */ var core_js_modules_es_string_match__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.string.match */ "./node_modules/core-js/modules/es.string.match.js");
/* harmony import */ var core_js_modules_es_string_match__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_match__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");
/* harmony import */ var components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! components */ "./resources/assets/js/components/index.js");
/* harmony import */ var constants_styles__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! constants/styles */ "./resources/assets/js/constants/styles.js");
/* harmony import */ var _UserSettings__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./UserSettings */ "./resources/assets/js/pages/Settings/UserSettings.jsx");
/* harmony import */ var _Forms_AppSettingsForm__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Forms/AppSettingsForm */ "./resources/assets/js/pages/Settings/Forms/AppSettingsForm.jsx");
/* harmony import */ var _Forms_BillingSettingsForm__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Forms/BillingSettingsForm */ "./resources/assets/js/pages/Settings/Forms/BillingSettingsForm.jsx");


(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).enterModule;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};










const CardLink = (_ref) => {
  let {
    to,
    className = '',
    children
  } = _ref;
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["NavLink"], {
    to: to,
    activeClassName: "bg-blue-lightest",
    className: "block border-b border-grey-light p-4 ".concat(constants_styles__WEBPACK_IMPORTED_MODULE_5__["linkStyle"], " ").concat(className)
  }, children);
};

class SettingsRoutesComponent extends react__WEBPACK_IMPORTED_MODULE_1__["Component"] {
  render() {
    const {
      match: {
        url: currentUrl
      }
    } = this.props;
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h2", {
      className: "mb-4"
    }, "Settings"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "flex items-start"
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(components__WEBPACK_IMPORTED_MODULE_4__["Card"], {
      className: "w-64"
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(CardLink, {
      to: "".concat(currentUrl, "/user")
    }, "Account"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(CardLink, {
      to: "".concat(currentUrl, "/app")
    }, "Application"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(CardLink, {
      to: "".concat(currentUrl, "/billing")
    }, "Billing")), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(components__WEBPACK_IMPORTED_MODULE_4__["Card"], {
      className: "flex-grow ml-4"
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(components__WEBPACK_IMPORTED_MODULE_4__["CardContent"], null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Switch"], null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Route"], {
      exact: true,
      path: "".concat(currentUrl, "/user"),
      component: _UserSettings__WEBPACK_IMPORTED_MODULE_6__["UserSettings"]
    }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Route"], {
      exact: true,
      path: "".concat(currentUrl, "/app"),
      component: _Forms_AppSettingsForm__WEBPACK_IMPORTED_MODULE_7__["AppSettingsForm"]
    }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Route"], {
      exact: true,
      path: "".concat(currentUrl, "/billing"),
      component: _Forms_BillingSettingsForm__WEBPACK_IMPORTED_MODULE_8__["BillingSettingsForm"]
    }))))));
  }

  // @ts-ignore
  __reactstandin__regenerateByEval(key, code) {
    // @ts-ignore
    this[key] = eval(code);
  }

}

const _default = Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])()(SettingsRoutesComponent);

/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(CardLink, "CardLink", "C:\\xampp\\htdocs\\react-laravel-boilerplate\\resources\\assets\\js\\pages\\Settings\\SettingsRoutes.jsx");
  reactHotLoader.register(SettingsRoutesComponent, "SettingsRoutesComponent", "C:\\xampp\\htdocs\\react-laravel-boilerplate\\resources\\assets\\js\\pages\\Settings\\SettingsRoutes.jsx");
  reactHotLoader.register(_default, "default", "C:\\xampp\\htdocs\\react-laravel-boilerplate\\resources\\assets\\js\\pages\\Settings\\SettingsRoutes.jsx");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).leaveModule;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./resources/assets/js/pages/Settings/UserSettings.jsx":
/*!*************************************************************!*\
  !*** ./resources/assets/js/pages/Settings/UserSettings.jsx ***!
  \*************************************************************/
/*! exports provided: UserSettings */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserSettings", function() { return UserSettings; });
/* harmony import */ var core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.promise */ "./node_modules/core-js/modules/es.promise.js");
/* harmony import */ var core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux_form__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! redux-form */ "./node_modules/redux-form/es/index.js");
/* harmony import */ var store_actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! store/actions */ "./resources/assets/js/store/actions.js");
/* harmony import */ var store_action_creators_avatars__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! store/action-creators/avatars */ "./resources/assets/js/store/action-creators/avatars/index.js");
/* harmony import */ var store_action_creators_flashMessages__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! store/action-creators/flashMessages */ "./resources/assets/js/store/action-creators/flashMessages/index.js");
/* harmony import */ var store_action_creators_user__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! store/action-creators/user */ "./resources/assets/js/store/action-creators/user/index.js");
/* harmony import */ var _Forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Forms */ "./resources/assets/js/pages/Settings/Forms/index.js");


(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).enterModule;
  enterModule && enterModule(module);
})();

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};










class UserSettingsComponent extends react__WEBPACK_IMPORTED_MODULE_1___default.a.Component {
  render() {
    const {
      saveUserSettings,
      handleChangePassword,
      avatarUploadHandler
    } = this.props;
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h3", {
      className: "text-grey-darkest font-normal"
    }, "Your Details"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Forms__WEBPACK_IMPORTED_MODULE_8__["UserSettingsForm"], {
      className: "mb-4",
      onSubmit: saveUserSettings,
      avatarUploadHandler: avatarUploadHandler
    }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h3", {
      className: "text-grey-darkest font-normal"
    }, "Change Your Password"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Forms__WEBPACK_IMPORTED_MODULE_8__["ChangePasswordForm"], {
      onSubmit: handleChangePassword
    }));
  }

  // @ts-ignore
  __reactstandin__regenerateByEval(key, code) {
    // @ts-ignore
    this[key] = eval(code);
  }

}

const userValidationFromResponse = values => {
  let errors = {};
  return errors;
};

const passwordValidationFromResponse = values => {
  let errors = {};
  return errors;
};

const mapStateToProps = state => ({
  currentUser: state.entities.users[state.session.currentUser]
});

const mapDispatchToProps = dispatch => ({
  saveUserSettings: async userData => {
    const response = await dispatch(Object(store_action_creators_user__WEBPACK_IMPORTED_MODULE_7__["saveUser"])(userData));

    if (response.status === 400) {
      throw new redux_form__WEBPACK_IMPORTED_MODULE_3__["SubmissionError"]('accountSettings', userValidationFromResponse(response.data.data));
    }

    dispatch(Object(store_action_creators_flashMessages__WEBPACK_IMPORTED_MODULE_6__["flashMessage"])('success', 'Successfully saved user info', 4000));
    dispatch({
      type: store_actions__WEBPACK_IMPORTED_MODULE_4__["userActions"].SET_CURRENT_USER_INFO,
      user: response.data.data
    });
  },
  uploadUserAvatar: (fileData, userId) => dispatch(Object(store_action_creators_avatars__WEBPACK_IMPORTED_MODULE_5__["uploadUserAvatar"])(fileData, userId)),
  changePassword: async data => {
    try {
      await dispatch(Object(store_action_creators_user__WEBPACK_IMPORTED_MODULE_7__["changePassword"])(data));
      dispatch(Object(store_action_creators_flashMessages__WEBPACK_IMPORTED_MODULE_6__["flashMessage"])('success', 'Your password was successfully changed', 4000));
    } catch (error) {
      if (error.response.status === 422) {
        throw new redux_form__WEBPACK_IMPORTED_MODULE_3__["SubmissionError"](passwordValidationFromResponse(error.response.data.data));
      }

      if (error.response.status === 400) {
        throw new redux_form__WEBPACK_IMPORTED_MODULE_3__["SubmissionError"]({
          old_password: 'The current password was incorrect'
        });
      }
    }
  }
});

const mergeProps = (stateProps, dispatchProps, ownProps) => _objectSpread({}, stateProps, dispatchProps, ownProps, {
  avatarUploadHandler: fileData => {
    return dispatchProps.uploadUserAvatar(fileData, stateProps.currentUser.id);
  },
  handleChangePassword: values => {
    const data = _objectSpread({
      user_id: stateProps.currentUser.id
    }, values);

    return dispatchProps.changePassword(data);
  }
});

const UserSettings = Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps, mergeProps)(UserSettingsComponent);
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(UserSettingsComponent, "UserSettingsComponent", "C:\\xampp\\htdocs\\react-laravel-boilerplate\\resources\\assets\\js\\pages\\Settings\\UserSettings.jsx");
  reactHotLoader.register(userValidationFromResponse, "userValidationFromResponse", "C:\\xampp\\htdocs\\react-laravel-boilerplate\\resources\\assets\\js\\pages\\Settings\\UserSettings.jsx");
  reactHotLoader.register(passwordValidationFromResponse, "passwordValidationFromResponse", "C:\\xampp\\htdocs\\react-laravel-boilerplate\\resources\\assets\\js\\pages\\Settings\\UserSettings.jsx");
  reactHotLoader.register(mapStateToProps, "mapStateToProps", "C:\\xampp\\htdocs\\react-laravel-boilerplate\\resources\\assets\\js\\pages\\Settings\\UserSettings.jsx");
  reactHotLoader.register(mapDispatchToProps, "mapDispatchToProps", "C:\\xampp\\htdocs\\react-laravel-boilerplate\\resources\\assets\\js\\pages\\Settings\\UserSettings.jsx");
  reactHotLoader.register(mergeProps, "mergeProps", "C:\\xampp\\htdocs\\react-laravel-boilerplate\\resources\\assets\\js\\pages\\Settings\\UserSettings.jsx");
  reactHotLoader.register(UserSettings, "UserSettings", "C:\\xampp\\htdocs\\react-laravel-boilerplate\\resources\\assets\\js\\pages\\Settings\\UserSettings.jsx");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).leaveModule;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./resources/assets/js/store/action-creators/avatars/avatars.js":
/*!**********************************************************************!*\
  !*** ./resources/assets/js/store/action-creators/avatars/avatars.js ***!
  \**********************************************************************/
/*! exports provided: uploadUserAvatar */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "uploadUserAvatar", function() { return uploadUserAvatar; });
/* harmony import */ var core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.promise */ "./node_modules/core-js/modules/es.promise.js");
/* harmony import */ var core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var store_action_creators_requests__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! store/action-creators/requests */ "./resources/assets/js/store/action-creators/requests/index.js");
/* harmony import */ var store_actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! store/actions */ "./resources/assets/js/store/actions.js");


(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).enterModule;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};




const uploadUserAvatar = (fileData, userId) => async dispatch => {
  const response = await dispatch(Object(store_action_creators_requests__WEBPACK_IMPORTED_MODULE_2__["makeRequest"])('set-user-avatar', () => axios__WEBPACK_IMPORTED_MODULE_1___default.a.post('/api/avatars', fileData)));
  dispatch({
    type: store_actions__WEBPACK_IMPORTED_MODULE_3__["userActions"].SET_AVATAR,
    userId,
    avatar: response.data.fileUrl
  });
};
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(uploadUserAvatar, "uploadUserAvatar", "C:\\xampp\\htdocs\\react-laravel-boilerplate\\resources\\assets\\js\\store\\action-creators\\avatars\\avatars.js");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).leaveModule;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./resources/assets/js/store/action-creators/avatars/index.js":
/*!********************************************************************!*\
  !*** ./resources/assets/js/store/action-creators/avatars/index.js ***!
  \********************************************************************/
/*! exports provided: uploadUserAvatar */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _avatars__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./avatars */ "./resources/assets/js/store/action-creators/avatars/avatars.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "uploadUserAvatar", function() { return _avatars__WEBPACK_IMPORTED_MODULE_0__["uploadUserAvatar"]; });

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};



/***/ }),

/***/ "./resources/assets/js/store/action-creators/requests/index.js":
/*!*********************************************************************!*\
  !*** ./resources/assets/js/store/action-creators/requests/index.js ***!
  \*********************************************************************/
/*! exports provided: makeRequest */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _requests__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./requests */ "./resources/assets/js/store/action-creators/requests/requests.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "makeRequest", function() { return _requests__WEBPACK_IMPORTED_MODULE_0__["makeRequest"]; });

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};



/***/ }),

/***/ "./resources/assets/js/store/action-creators/requests/requests.js":
/*!************************************************************************!*\
  !*** ./resources/assets/js/store/action-creators/requests/requests.js ***!
  \************************************************************************/
/*! exports provided: makeRequest */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "makeRequest", function() { return makeRequest; });
/* harmony import */ var core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.promise */ "./node_modules/core-js/modules/es.promise.js");
/* harmony import */ var core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var store_actions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! store/actions */ "./resources/assets/js/store/actions.js");


(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).enterModule;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};


const makeRequest = (actionType, requestCall) => async dispatch => {
  dispatch({
    type: store_actions__WEBPACK_IMPORTED_MODULE_1__["requestActions"].REQUEST,
    actionType
  });

  try {
    const data = await requestCall();
    dispatch({
      type: store_actions__WEBPACK_IMPORTED_MODULE_1__["requestActions"].SUCCESS,
      actionType
    });
    return data;
  } catch (error) {
    dispatch({
      type: store_actions__WEBPACK_IMPORTED_MODULE_1__["requestActions"].FAILED,
      error
    });
    throw error;
  }
};
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(makeRequest, "makeRequest", "C:\\xampp\\htdocs\\react-laravel-boilerplate\\resources\\assets\\js\\store\\action-creators\\requests\\requests.js");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).leaveModule;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./resources/assets/js/store/action-creators/user/index.js":
/*!*****************************************************************!*\
  !*** ./resources/assets/js/store/action-creators/user/index.js ***!
  \*****************************************************************/
/*! exports provided: saveUser, changePassword */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _user__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./user */ "./resources/assets/js/store/action-creators/user/user.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "saveUser", function() { return _user__WEBPACK_IMPORTED_MODULE_0__["saveUser"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "changePassword", function() { return _user__WEBPACK_IMPORTED_MODULE_0__["changePassword"]; });

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};



/***/ }),

/***/ "./resources/assets/js/store/action-creators/user/user.js":
/*!****************************************************************!*\
  !*** ./resources/assets/js/store/action-creators/user/user.js ***!
  \****************************************************************/
/*! exports provided: saveUser, changePassword */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "saveUser", function() { return saveUser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changePassword", function() { return changePassword; });
/* harmony import */ var core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.promise */ "./node_modules/core-js/modules/es.promise.js");
/* harmony import */ var core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var store_action_creators_requests__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! store/action-creators/requests */ "./resources/assets/js/store/action-creators/requests/index.js");


(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).enterModule;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};



const saveUser = userData => async dispatch => {
  const {
    id
  } = userData;
  const response = await dispatch(Object(store_action_creators_requests__WEBPACK_IMPORTED_MODULE_2__["makeRequest"])('save-user-settings', () => axios__WEBPACK_IMPORTED_MODULE_1___default.a.put("/api/users/".concat(id), userData)));
  return response;
};
const changePassword = data => async dispatch => {
  const {
    user_id: userId
  } = data;
  const response = await dispatch(Object(store_action_creators_requests__WEBPACK_IMPORTED_MODULE_2__["makeRequest"])('change-user-password', () => axios__WEBPACK_IMPORTED_MODULE_1___default.a.put("/api/users/".concat(userId, "/update-password"), data)));
  return response;
};
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(saveUser, "saveUser", "C:\\xampp\\htdocs\\react-laravel-boilerplate\\resources\\assets\\js\\store\\action-creators\\user\\user.js");
  reactHotLoader.register(changePassword, "changePassword", "C:\\xampp\\htdocs\\react-laravel-boilerplate\\resources\\assets\\js\\store\\action-creators\\user\\user.js");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).leaveModule;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYWR2YW5jZS1zdHJpbmctaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2ZpeC1yZWdleHAtd2VsbC1rbm93bi1zeW1ib2wtbG9naWMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3JlZ2V4cC1leGVjLWFic3RyYWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9yZWdleHAtZXhlYy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvcmVnZXhwLWZsYWdzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9zdHJpbmctbXVsdGlieXRlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMuc3RyaW5nLm1hdGNoLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvY29uc3RhbnRzL3JlZ2V4ZXMuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9wYWdlcy9TZXR0aW5ncy9Gb3Jtcy9BcHBTZXR0aW5nc0Zvcm0uanN4Iiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvcGFnZXMvU2V0dGluZ3MvRm9ybXMvQmlsbGluZ1NldHRpbmdzRm9ybS5qc3giLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9wYWdlcy9TZXR0aW5ncy9Gb3Jtcy9DaGFuZ2VQYXNzd29yZEZvcm0uanN4Iiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvcGFnZXMvU2V0dGluZ3MvRm9ybXMvVXNlclNldHRpbmdzRm9ybS5qc3giLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9wYWdlcy9TZXR0aW5ncy9Gb3Jtcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3BhZ2VzL1NldHRpbmdzL1NldHRpbmdzUm91dGVzLmpzeCIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3BhZ2VzL1NldHRpbmdzL1VzZXJTZXR0aW5ncy5qc3giLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zdG9yZS9hY3Rpb24tY3JlYXRvcnMvYXZhdGFycy9hdmF0YXJzLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvc3RvcmUvYWN0aW9uLWNyZWF0b3JzL3JlcXVlc3RzL3JlcXVlc3RzLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvc3RvcmUvYWN0aW9uLWNyZWF0b3JzL3VzZXIvdXNlci5qcyJdLCJuYW1lcyI6WyJlbWFpbCIsIkFwcFNldHRpbmdzRm9ybUNvbXBvbmVudCIsIlJlYWN0IiwiQ29tcG9uZW50IiwicmVuZGVyIiwiQXBwU2V0dGluZ3NGb3JtRm9ybSIsInJlZHV4Rm9ybSIsImZvcm0iLCJBcHBTZXR0aW5nc0Zvcm0iLCJjb25uZWN0IiwiQmlsbGluZ1NldHRpbmdzRm9ybUNvbXBvbmVudCIsIkJpbGxpbmdTZXR0aW5nc0Zvcm1Gb3JtIiwiQmlsbGluZ1NldHRpbmdzRm9ybSIsIkNoYW5nZVBhc3N3b3JkRm9ybUNvbXBvbmVudCIsImhhbmRsZVN1Ym1pdCIsInByb3BzIiwiUGFzc3dvcmRGb3JtTGluZSIsInZhbGlkYXRlUGFzc3dvcmRGb3JtIiwidmFsdWVzIiwiZXJyb3JzIiwibm9uRW1wdHlGaWVsZE5hbWVzIiwiZm9yRWFjaCIsImZpZWxkTmFtZSIsIm5ld19wYXNzd29yZCIsIm5ld19wYXNzd29yZF9jb25maXJtYXRpb24iLCJDaGFuZ2VQYXNzd29yZEZvcm0iLCJ2YWxpZGF0ZSIsIlVzZXJTZXR0aW5nc0Zvcm1Db21wb25lbnQiLCJhdmF0YXJVcGxvYWRIYW5kbGVyIiwiY2xhc3NOYW1lIiwiUGljdHVyZVVwbG9hZCIsIlRleHRGb3JtTGluZSIsInZhbGlkYXRlVXNlclNldHRpbmdzIiwiZmlyc3RfbmFtZSIsImxhc3RfbmFtZSIsImVtYWlsUmVnZXgiLCJ0ZXN0IiwiVXNlclNldHRpbmdzRm9ybUZvcm0iLCJlbmFibGVSZWluaXRpYWxpemUiLCJtYXBTdGF0ZVRvUHJvcHMiLCJzdGF0ZSIsInNlc3Npb24iLCJjdXJyZW50VXNlciIsImluaXRpYWxWYWx1ZXMiLCJlbnRpdGllcyIsInVzZXJzIiwiVXNlclNldHRpbmdzRm9ybSIsIkNhcmRMaW5rIiwidG8iLCJjaGlsZHJlbiIsImxpbmtTdHlsZSIsIlNldHRpbmdzUm91dGVzQ29tcG9uZW50IiwibWF0Y2giLCJ1cmwiLCJjdXJyZW50VXJsIiwiVXNlclNldHRpbmdzIiwiVXNlclNldHRpbmdzQ29tcG9uZW50Iiwic2F2ZVVzZXJTZXR0aW5ncyIsImhhbmRsZUNoYW5nZVBhc3N3b3JkIiwidXNlclZhbGlkYXRpb25Gcm9tUmVzcG9uc2UiLCJwYXNzd29yZFZhbGlkYXRpb25Gcm9tUmVzcG9uc2UiLCJtYXBEaXNwYXRjaFRvUHJvcHMiLCJkaXNwYXRjaCIsInVzZXJEYXRhIiwicmVzcG9uc2UiLCJzYXZlVXNlciIsInN0YXR1cyIsIlN1Ym1pc3Npb25FcnJvciIsImRhdGEiLCJmbGFzaE1lc3NhZ2UiLCJ0eXBlIiwidXNlckFjdGlvbnMiLCJTRVRfQ1VSUkVOVF9VU0VSX0lORk8iLCJ1c2VyIiwidXBsb2FkVXNlckF2YXRhciIsImZpbGVEYXRhIiwidXNlcklkIiwiY2hhbmdlUGFzc3dvcmQiLCJlcnJvciIsIm9sZF9wYXNzd29yZCIsIm1lcmdlUHJvcHMiLCJzdGF0ZVByb3BzIiwiZGlzcGF0Y2hQcm9wcyIsIm93blByb3BzIiwiaWQiLCJ1c2VyX2lkIiwibWFrZVJlcXVlc3QiLCJheGlvcyIsInBvc3QiLCJhY3Rpb25zIiwiU0VUX0FWQVRBUiIsImF2YXRhciIsImZpbGVVcmwiLCJhY3Rpb25UeXBlIiwicmVxdWVzdENhbGwi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Q2xDQyw0Q0FBSyxDQUFDWSxHQUFOLHNCQUF3QnZCLE1BQXhCLHVCQUFrRFIsSUFBbEQsQ0FEUyxDQURrQixDQUEvQjtBQU1BLFNBQU9KLFFBQVA7QUFDRCxDQVZNOzs7Ozs7Ozs7OzBCQVpNQyxROzBCQVlBWSxjIiwiZmlsZSI6ImpzLzAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG52YXIgY2hhckF0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3N0cmluZy1tdWx0aWJ5dGUnKS5jaGFyQXQ7XG5cbi8vIGBBZHZhbmNlU3RyaW5nSW5kZXhgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtYWR2YW5jZXN0cmluZ2luZGV4XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChTLCBpbmRleCwgdW5pY29kZSkge1xuICByZXR1cm4gaW5kZXggKyAodW5pY29kZSA/IGNoYXJBdChTLCBpbmRleCkubGVuZ3RoIDogMSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGhpZGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGlkZScpO1xudmFyIHJlZGVmaW5lID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlZGVmaW5lJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcbnZhciByZWdleHBFeGVjID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlZ2V4cC1leGVjJyk7XG5cbnZhciBTUEVDSUVTID0gd2VsbEtub3duU3ltYm9sKCdzcGVjaWVzJyk7XG5cbnZhciBSRVBMQUNFX1NVUFBPUlRTX05BTUVEX0dST1VQUyA9ICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gIC8vICNyZXBsYWNlIG5lZWRzIGJ1aWx0LWluIHN1cHBvcnQgZm9yIG5hbWVkIGdyb3Vwcy5cbiAgLy8gI21hdGNoIHdvcmtzIGZpbmUgYmVjYXVzZSBpdCBqdXN0IHJldHVybiB0aGUgZXhlYyByZXN1bHRzLCBldmVuIGlmIGl0IGhhc1xuICAvLyBhIFwiZ3JvcHNcIiBwcm9wZXJ0eS5cbiAgdmFyIHJlID0gLy4vO1xuICByZS5leGVjID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICByZXN1bHQuZ3JvdXBzID0geyBhOiAnNycgfTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuICByZXR1cm4gJycucmVwbGFjZShyZSwgJyQ8YT4nKSAhPT0gJzcnO1xufSk7XG5cbi8vIENocm9tZSA1MSBoYXMgYSBidWdneSBcInNwbGl0XCIgaW1wbGVtZW50YXRpb24gd2hlbiBSZWdFeHAjZXhlYyAhPT0gbmF0aXZlRXhlY1xuLy8gV2VleCBKUyBoYXMgZnJvemVuIGJ1aWx0LWluIHByb3RvdHlwZXMsIHNvIHVzZSB0cnkgLyBjYXRjaCB3cmFwcGVyXG52YXIgU1BMSVRfV09SS1NfV0lUSF9PVkVSV1JJVFRFTl9FWEVDID0gIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgdmFyIHJlID0gLyg/OikvO1xuICB2YXIgb3JpZ2luYWxFeGVjID0gcmUuZXhlYztcbiAgcmUuZXhlYyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG9yaWdpbmFsRXhlYy5hcHBseSh0aGlzLCBhcmd1bWVudHMpOyB9O1xuICB2YXIgcmVzdWx0ID0gJ2FiJy5zcGxpdChyZSk7XG4gIHJldHVybiByZXN1bHQubGVuZ3RoICE9PSAyIHx8IHJlc3VsdFswXSAhPT0gJ2EnIHx8IHJlc3VsdFsxXSAhPT0gJ2InO1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKEtFWSwgbGVuZ3RoLCBleGVjLCBzaGFtKSB7XG4gIHZhciBTWU1CT0wgPSB3ZWxsS25vd25TeW1ib2woS0VZKTtcblxuICB2YXIgREVMRUdBVEVTX1RPX1NZTUJPTCA9ICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gICAgLy8gU3RyaW5nIG1ldGhvZHMgY2FsbCBzeW1ib2wtbmFtZWQgUmVnRXAgbWV0aG9kc1xuICAgIHZhciBPID0ge307XG4gICAgT1tTWU1CT0xdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gNzsgfTtcbiAgICByZXR1cm4gJydbS0VZXShPKSAhPSA3O1xuICB9KTtcblxuICB2YXIgREVMRUdBVEVTX1RPX0VYRUMgPSBERUxFR0FURVNfVE9fU1lNQk9MICYmICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gICAgLy8gU3ltYm9sLW5hbWVkIFJlZ0V4cCBtZXRob2RzIGNhbGwgLmV4ZWNcbiAgICB2YXIgZXhlY0NhbGxlZCA9IGZhbHNlO1xuICAgIHZhciByZSA9IC9hLztcbiAgICByZS5leGVjID0gZnVuY3Rpb24gKCkgeyBleGVjQ2FsbGVkID0gdHJ1ZTsgcmV0dXJuIG51bGw7IH07XG5cbiAgICBpZiAoS0VZID09PSAnc3BsaXQnKSB7XG4gICAgICAvLyBSZWdFeHBbQEBzcGxpdF0gZG9lc24ndCBjYWxsIHRoZSByZWdleCdzIGV4ZWMgbWV0aG9kLCBidXQgZmlyc3QgY3JlYXRlc1xuICAgICAgLy8gYSBuZXcgb25lLiBXZSBuZWVkIHRvIHJldHVybiB0aGUgcGF0Y2hlZCByZWdleCB3aGVuIGNyZWF0aW5nIHRoZSBuZXcgb25lLlxuICAgICAgcmUuY29uc3RydWN0b3IgPSB7fTtcbiAgICAgIHJlLmNvbnN0cnVjdG9yW1NQRUNJRVNdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gcmU7IH07XG4gICAgfVxuXG4gICAgcmVbU1lNQk9MXSgnJyk7XG4gICAgcmV0dXJuICFleGVjQ2FsbGVkO1xuICB9KTtcblxuICBpZiAoXG4gICAgIURFTEVHQVRFU19UT19TWU1CT0wgfHxcbiAgICAhREVMRUdBVEVTX1RPX0VYRUMgfHxcbiAgICAoS0VZID09PSAncmVwbGFjZScgJiYgIVJFUExBQ0VfU1VQUE9SVFNfTkFNRURfR1JPVVBTKSB8fFxuICAgIChLRVkgPT09ICdzcGxpdCcgJiYgIVNQTElUX1dPUktTX1dJVEhfT1ZFUldSSVRURU5fRVhFQylcbiAgKSB7XG4gICAgdmFyIG5hdGl2ZVJlZ0V4cE1ldGhvZCA9IC8uL1tTWU1CT0xdO1xuICAgIHZhciBtZXRob2RzID0gZXhlYyhTWU1CT0wsICcnW0tFWV0sIGZ1bmN0aW9uIChuYXRpdmVNZXRob2QsIHJlZ2V4cCwgc3RyLCBhcmcyLCBmb3JjZVN0cmluZ01ldGhvZCkge1xuICAgICAgaWYgKHJlZ2V4cC5leGVjID09PSByZWdleHBFeGVjKSB7XG4gICAgICAgIGlmIChERUxFR0FURVNfVE9fU1lNQk9MICYmICFmb3JjZVN0cmluZ01ldGhvZCkge1xuICAgICAgICAgIC8vIFRoZSBuYXRpdmUgU3RyaW5nIG1ldGhvZCBhbHJlYWR5IGRlbGVnYXRlcyB0byBAQG1ldGhvZCAodGhpc1xuICAgICAgICAgIC8vIHBvbHlmaWxsZWQgZnVuY3Rpb24pLCBsZWFzaW5nIHRvIGluZmluaXRlIHJlY3Vyc2lvbi5cbiAgICAgICAgICAvLyBXZSBhdm9pZCBpdCBieSBkaXJlY3RseSBjYWxsaW5nIHRoZSBuYXRpdmUgQEBtZXRob2QgbWV0aG9kLlxuICAgICAgICAgIHJldHVybiB7IGRvbmU6IHRydWUsIHZhbHVlOiBuYXRpdmVSZWdFeHBNZXRob2QuY2FsbChyZWdleHAsIHN0ciwgYXJnMikgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyBkb25lOiB0cnVlLCB2YWx1ZTogbmF0aXZlTWV0aG9kLmNhbGwoc3RyLCByZWdleHAsIGFyZzIpIH07XG4gICAgICB9XG4gICAgICByZXR1cm4geyBkb25lOiBmYWxzZSB9O1xuICAgIH0pO1xuICAgIHZhciBzdHJpbmdNZXRob2QgPSBtZXRob2RzWzBdO1xuICAgIHZhciByZWdleE1ldGhvZCA9IG1ldGhvZHNbMV07XG5cbiAgICByZWRlZmluZShTdHJpbmcucHJvdG90eXBlLCBLRVksIHN0cmluZ01ldGhvZCk7XG4gICAgcmVkZWZpbmUoUmVnRXhwLnByb3RvdHlwZSwgU1lNQk9MLCBsZW5ndGggPT0gMlxuICAgICAgLy8gMjEuMi41LjggUmVnRXhwLnByb3RvdHlwZVtAQHJlcGxhY2VdKHN0cmluZywgcmVwbGFjZVZhbHVlKVxuICAgICAgLy8gMjEuMi41LjExIFJlZ0V4cC5wcm90b3R5cGVbQEBzcGxpdF0oc3RyaW5nLCBsaW1pdClcbiAgICAgID8gZnVuY3Rpb24gKHN0cmluZywgYXJnKSB7IHJldHVybiByZWdleE1ldGhvZC5jYWxsKHN0cmluZywgdGhpcywgYXJnKTsgfVxuICAgICAgLy8gMjEuMi41LjYgUmVnRXhwLnByb3RvdHlwZVtAQG1hdGNoXShzdHJpbmcpXG4gICAgICAvLyAyMS4yLjUuOSBSZWdFeHAucHJvdG90eXBlW0BAc2VhcmNoXShzdHJpbmcpXG4gICAgICA6IGZ1bmN0aW9uIChzdHJpbmcpIHsgcmV0dXJuIHJlZ2V4TWV0aG9kLmNhbGwoc3RyaW5nLCB0aGlzKTsgfVxuICAgICk7XG4gICAgaWYgKHNoYW0pIGhpZGUoUmVnRXhwLnByb3RvdHlwZVtTWU1CT0xdLCAnc2hhbScsIHRydWUpO1xuICB9XG59O1xuIiwidmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuL2NsYXNzb2YtcmF3Jyk7XG52YXIgcmVnZXhwRXhlYyA9IHJlcXVpcmUoJy4vcmVnZXhwLWV4ZWMnKTtcblxuLy8gYFJlZ0V4cEV4ZWNgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtcmVnZXhwZXhlY1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoUiwgUykge1xuICB2YXIgZXhlYyA9IFIuZXhlYztcbiAgaWYgKHR5cGVvZiBleGVjID09PSAnZnVuY3Rpb24nKSB7XG4gICAgdmFyIHJlc3VsdCA9IGV4ZWMuY2FsbChSLCBTKTtcbiAgICBpZiAodHlwZW9mIHJlc3VsdCAhPT0gJ29iamVjdCcpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcignUmVnRXhwIGV4ZWMgbWV0aG9kIHJldHVybmVkIHNvbWV0aGluZyBvdGhlciB0aGFuIGFuIE9iamVjdCBvciBudWxsJyk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBpZiAoY2xhc3NvZihSKSAhPT0gJ1JlZ0V4cCcpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ1JlZ0V4cCNleGVjIGNhbGxlZCBvbiBpbmNvbXBhdGlibGUgcmVjZWl2ZXInKTtcbiAgfVxuXG4gIHJldHVybiByZWdleHBFeGVjLmNhbGwoUiwgUyk7XG59O1xuXG4iLCIndXNlIHN0cmljdCc7XG52YXIgcmVnZXhwRmxhZ3MgPSByZXF1aXJlKCcuL3JlZ2V4cC1mbGFncycpO1xuXG52YXIgbmF0aXZlRXhlYyA9IFJlZ0V4cC5wcm90b3R5cGUuZXhlYztcbi8vIFRoaXMgYWx3YXlzIHJlZmVycyB0byB0aGUgbmF0aXZlIGltcGxlbWVudGF0aW9uLCBiZWNhdXNlIHRoZVxuLy8gU3RyaW5nI3JlcGxhY2UgcG9seWZpbGwgdXNlcyAuL2ZpeC1yZWdleHAtd2VsbC1rbm93bi1zeW1ib2wtbG9naWMuanMsXG4vLyB3aGljaCBsb2FkcyB0aGlzIGZpbGUgYmVmb3JlIHBhdGNoaW5nIHRoZSBtZXRob2QuXG52YXIgbmF0aXZlUmVwbGFjZSA9IFN0cmluZy5wcm90b3R5cGUucmVwbGFjZTtcblxudmFyIHBhdGNoZWRFeGVjID0gbmF0aXZlRXhlYztcblxudmFyIFVQREFURVNfTEFTVF9JTkRFWF9XUk9ORyA9IChmdW5jdGlvbiAoKSB7XG4gIHZhciByZTEgPSAvYS87XG4gIHZhciByZTIgPSAvYiovZztcbiAgbmF0aXZlRXhlYy5jYWxsKHJlMSwgJ2EnKTtcbiAgbmF0aXZlRXhlYy5jYWxsKHJlMiwgJ2EnKTtcbiAgcmV0dXJuIHJlMS5sYXN0SW5kZXggIT09IDAgfHwgcmUyLmxhc3RJbmRleCAhPT0gMDtcbn0pKCk7XG5cbi8vIG5vbnBhcnRpY2lwYXRpbmcgY2FwdHVyaW5nIGdyb3VwLCBjb3BpZWQgZnJvbSBlczUtc2hpbSdzIFN0cmluZyNzcGxpdCBwYXRjaC5cbnZhciBOUENHX0lOQ0xVREVEID0gLygpPz8vLmV4ZWMoJycpWzFdICE9PSB1bmRlZmluZWQ7XG5cbnZhciBQQVRDSCA9IFVQREFURVNfTEFTVF9JTkRFWF9XUk9ORyB8fCBOUENHX0lOQ0xVREVEO1xuXG5pZiAoUEFUQ0gpIHtcbiAgcGF0Y2hlZEV4ZWMgPSBmdW5jdGlvbiBleGVjKHN0cikge1xuICAgIHZhciByZSA9IHRoaXM7XG4gICAgdmFyIGxhc3RJbmRleCwgcmVDb3B5LCBtYXRjaCwgaTtcblxuICAgIGlmIChOUENHX0lOQ0xVREVEKSB7XG4gICAgICByZUNvcHkgPSBuZXcgUmVnRXhwKCdeJyArIHJlLnNvdXJjZSArICckKD8hXFxcXHMpJywgcmVnZXhwRmxhZ3MuY2FsbChyZSkpO1xuICAgIH1cbiAgICBpZiAoVVBEQVRFU19MQVNUX0lOREVYX1dST05HKSBsYXN0SW5kZXggPSByZS5sYXN0SW5kZXg7XG5cbiAgICBtYXRjaCA9IG5hdGl2ZUV4ZWMuY2FsbChyZSwgc3RyKTtcblxuICAgIGlmIChVUERBVEVTX0xBU1RfSU5ERVhfV1JPTkcgJiYgbWF0Y2gpIHtcbiAgICAgIHJlLmxhc3RJbmRleCA9IHJlLmdsb2JhbCA/IG1hdGNoLmluZGV4ICsgbWF0Y2hbMF0ubGVuZ3RoIDogbGFzdEluZGV4O1xuICAgIH1cbiAgICBpZiAoTlBDR19JTkNMVURFRCAmJiBtYXRjaCAmJiBtYXRjaC5sZW5ndGggPiAxKSB7XG4gICAgICAvLyBGaXggYnJvd3NlcnMgd2hvc2UgYGV4ZWNgIG1ldGhvZHMgZG9uJ3QgY29uc2lzdGVudGx5IHJldHVybiBgdW5kZWZpbmVkYFxuICAgICAgLy8gZm9yIE5QQ0csIGxpa2UgSUU4LiBOT1RFOiBUaGlzIGRvZXNuJyB3b3JrIGZvciAvKC4/KT8vXG4gICAgICBuYXRpdmVSZXBsYWNlLmNhbGwobWF0Y2hbMF0sIHJlQ29weSwgZnVuY3Rpb24gKCkge1xuICAgICAgICBmb3IgKGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aCAtIDI7IGkrKykge1xuICAgICAgICAgIGlmIChhcmd1bWVudHNbaV0gPT09IHVuZGVmaW5lZCkgbWF0Y2hbaV0gPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBtYXRjaDtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBwYXRjaGVkRXhlYztcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcblxuLy8gYFJlZ0V4cC5wcm90b3R5cGUuZmxhZ3NgIGdldHRlciBpbXBsZW1lbnRhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtZ2V0LXJlZ2V4cC5wcm90b3R5cGUuZmxhZ3Ncbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xuICB2YXIgdGhhdCA9IGFuT2JqZWN0KHRoaXMpO1xuICB2YXIgcmVzdWx0ID0gJyc7XG4gIGlmICh0aGF0Lmdsb2JhbCkgcmVzdWx0ICs9ICdnJztcbiAgaWYgKHRoYXQuaWdub3JlQ2FzZSkgcmVzdWx0ICs9ICdpJztcbiAgaWYgKHRoYXQubXVsdGlsaW5lKSByZXN1bHQgKz0gJ20nO1xuICBpZiAodGhhdC5kb3RBbGwpIHJlc3VsdCArPSAncyc7XG4gIGlmICh0aGF0LnVuaWNvZGUpIHJlc3VsdCArPSAndSc7XG4gIGlmICh0aGF0LnN0aWNreSkgcmVzdWx0ICs9ICd5JztcbiAgcmV0dXJuIHJlc3VsdDtcbn07XG4iLCJ2YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWludGVnZXInKTtcbnZhciByZXF1aXJlT2JqZWN0Q29lcmNpYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlcXVpcmUtb2JqZWN0LWNvZXJjaWJsZScpO1xuXG4vLyBgU3RyaW5nLnByb3RvdHlwZS57IGNvZGVQb2ludEF0LCBhdCB9YCBtZXRob2RzIGltcGxlbWVudGF0aW9uXG52YXIgY3JlYXRlTWV0aG9kID0gZnVuY3Rpb24gKENPTlZFUlRfVE9fU1RSSU5HKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoJHRoaXMsIHBvcykge1xuICAgIHZhciBTID0gU3RyaW5nKHJlcXVpcmVPYmplY3RDb2VyY2libGUoJHRoaXMpKTtcbiAgICB2YXIgcG9zaXRpb24gPSB0b0ludGVnZXIocG9zKTtcbiAgICB2YXIgc2l6ZSA9IFMubGVuZ3RoO1xuICAgIHZhciBmaXJzdCwgc2Vjb25kO1xuICAgIGlmIChwb3NpdGlvbiA8IDAgfHwgcG9zaXRpb24gPj0gc2l6ZSkgcmV0dXJuIENPTlZFUlRfVE9fU1RSSU5HID8gJycgOiB1bmRlZmluZWQ7XG4gICAgZmlyc3QgPSBTLmNoYXJDb2RlQXQocG9zaXRpb24pO1xuICAgIHJldHVybiBmaXJzdCA8IDB4RDgwMCB8fCBmaXJzdCA+IDB4REJGRiB8fCBwb3NpdGlvbiArIDEgPT09IHNpemVcbiAgICAgIHx8IChzZWNvbmQgPSBTLmNoYXJDb2RlQXQocG9zaXRpb24gKyAxKSkgPCAweERDMDAgfHwgc2Vjb25kID4gMHhERkZGXG4gICAgICAgID8gQ09OVkVSVF9UT19TVFJJTkcgPyBTLmNoYXJBdChwb3NpdGlvbikgOiBmaXJzdFxuICAgICAgICA6IENPTlZFUlRfVE9fU1RSSU5HID8gUy5zbGljZShwb3NpdGlvbiwgcG9zaXRpb24gKyAyKSA6IChmaXJzdCAtIDB4RDgwMCA8PCAxMCkgKyAoc2Vjb25kIC0gMHhEQzAwKSArIDB4MTAwMDA7XG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgLy8gYFN0cmluZy5wcm90b3R5cGUuY29kZVBvaW50QXRgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1zdHJpbmcucHJvdG90eXBlLmNvZGVwb2ludGF0XG4gIGNvZGVBdDogY3JlYXRlTWV0aG9kKGZhbHNlKSxcbiAgLy8gYFN0cmluZy5wcm90b3R5cGUuYXRgIG1ldGhvZFxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vbWF0aGlhc2J5bmVucy9TdHJpbmcucHJvdG90eXBlLmF0XG4gIGNoYXJBdDogY3JlYXRlTWV0aG9kKHRydWUpXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGZpeFJlZ0V4cFdlbGxLbm93blN5bWJvbExvZ2ljID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZpeC1yZWdleHAtd2VsbC1rbm93bi1zeW1ib2wtbG9naWMnKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1sZW5ndGgnKTtcbnZhciByZXF1aXJlT2JqZWN0Q29lcmNpYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlcXVpcmUtb2JqZWN0LWNvZXJjaWJsZScpO1xudmFyIGFkdmFuY2VTdHJpbmdJbmRleCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hZHZhbmNlLXN0cmluZy1pbmRleCcpO1xudmFyIHJlZ0V4cEV4ZWMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVnZXhwLWV4ZWMtYWJzdHJhY3QnKTtcblxuLy8gQEBtYXRjaCBsb2dpY1xuZml4UmVnRXhwV2VsbEtub3duU3ltYm9sTG9naWMoJ21hdGNoJywgMSwgZnVuY3Rpb24gKE1BVENILCBuYXRpdmVNYXRjaCwgbWF5YmVDYWxsTmF0aXZlKSB7XG4gIHJldHVybiBbXG4gICAgLy8gYFN0cmluZy5wcm90b3R5cGUubWF0Y2hgIG1ldGhvZFxuICAgIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLXN0cmluZy5wcm90b3R5cGUubWF0Y2hcbiAgICBmdW5jdGlvbiBtYXRjaChyZWdleHApIHtcbiAgICAgIHZhciBPID0gcmVxdWlyZU9iamVjdENvZXJjaWJsZSh0aGlzKTtcbiAgICAgIHZhciBtYXRjaGVyID0gcmVnZXhwID09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IHJlZ2V4cFtNQVRDSF07XG4gICAgICByZXR1cm4gbWF0Y2hlciAhPT0gdW5kZWZpbmVkID8gbWF0Y2hlci5jYWxsKHJlZ2V4cCwgTykgOiBuZXcgUmVnRXhwKHJlZ2V4cClbTUFUQ0hdKFN0cmluZyhPKSk7XG4gICAgfSxcbiAgICAvLyBgUmVnRXhwLnByb3RvdHlwZVtAQG1hdGNoXWAgbWV0aG9kXG4gICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtcmVnZXhwLnByb3RvdHlwZS1AQG1hdGNoXG4gICAgZnVuY3Rpb24gKHJlZ2V4cCkge1xuICAgICAgdmFyIHJlcyA9IG1heWJlQ2FsbE5hdGl2ZShuYXRpdmVNYXRjaCwgcmVnZXhwLCB0aGlzKTtcbiAgICAgIGlmIChyZXMuZG9uZSkgcmV0dXJuIHJlcy52YWx1ZTtcblxuICAgICAgdmFyIHJ4ID0gYW5PYmplY3QocmVnZXhwKTtcbiAgICAgIHZhciBTID0gU3RyaW5nKHRoaXMpO1xuXG4gICAgICBpZiAoIXJ4Lmdsb2JhbCkgcmV0dXJuIHJlZ0V4cEV4ZWMocngsIFMpO1xuXG4gICAgICB2YXIgZnVsbFVuaWNvZGUgPSByeC51bmljb2RlO1xuICAgICAgcngubGFzdEluZGV4ID0gMDtcbiAgICAgIHZhciBBID0gW107XG4gICAgICB2YXIgbiA9IDA7XG4gICAgICB2YXIgcmVzdWx0O1xuICAgICAgd2hpbGUgKChyZXN1bHQgPSByZWdFeHBFeGVjKHJ4LCBTKSkgIT09IG51bGwpIHtcbiAgICAgICAgdmFyIG1hdGNoU3RyID0gU3RyaW5nKHJlc3VsdFswXSk7XG4gICAgICAgIEFbbl0gPSBtYXRjaFN0cjtcbiAgICAgICAgaWYgKG1hdGNoU3RyID09PSAnJykgcngubGFzdEluZGV4ID0gYWR2YW5jZVN0cmluZ0luZGV4KFMsIHRvTGVuZ3RoKHJ4Lmxhc3RJbmRleCksIGZ1bGxVbmljb2RlKTtcbiAgICAgICAgbisrO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG4gPT09IDAgPyBudWxsIDogQTtcbiAgICB9XG4gIF07XG59KTtcbiIsImV4cG9ydCBjb25zdCBlbWFpbCA9IC9eKChbXjw+KClbXFxdXFxcXC4sOzpcXHNAXCJdKyhcXC5bXjw+KClbXFxdXFxcXC4sOzpcXHNAXCJdKykqKXwoXCIuK1wiKSlAKChcXFtbMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcLlswLTldezEsM31cXC5bMC05XXsxLDN9XFxdKXwoKFthLXpBLVpcXC0wLTldK1xcLikrW2EtekEtWl17Mix9KSkkL1xyXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXHJcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCdcclxuaW1wb3J0IHsgcmVkdXhGb3JtIH0gZnJvbSAncmVkdXgtZm9ybSdcclxuXHJcbmV4cG9ydCBjbGFzcyBBcHBTZXR0aW5nc0Zvcm1Db21wb25lbnQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gIHJlbmRlcigpIHtcclxuICAgIHJldHVybiA8ZGl2PkFwcGxpY2F0aW9uIFNldHRpbmdzIFBsYWNlaG9sZGVyPC9kaXY+XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgQXBwU2V0dGluZ3NGb3JtRm9ybSA9IHJlZHV4Rm9ybSh7XHJcbiAgZm9ybTogJ2FwcFNldHRpbmdzJ1xyXG59KShBcHBTZXR0aW5nc0Zvcm1Db21wb25lbnQpXHJcblxyXG5leHBvcnQgY29uc3QgQXBwU2V0dGluZ3NGb3JtID0gY29ubmVjdCgpKEFwcFNldHRpbmdzRm9ybUZvcm0pXHJcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcclxuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4J1xyXG5pbXBvcnQgeyByZWR1eEZvcm0gfSBmcm9tICdyZWR1eC1mb3JtJ1xyXG5cclxuZXhwb3J0IGNsYXNzIEJpbGxpbmdTZXR0aW5nc0Zvcm1Db21wb25lbnQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gIHJlbmRlcigpIHtcclxuICAgIHJldHVybiA8ZGl2PkJpbGxpbmcgU2V0dGluZ3MgUGxhY2Vob2xkZXI8L2Rpdj5cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBCaWxsaW5nU2V0dGluZ3NGb3JtRm9ybSA9IHJlZHV4Rm9ybSh7XHJcbiAgZm9ybTogJ2FwcFNldHRpbmdzJ1xyXG59KShCaWxsaW5nU2V0dGluZ3NGb3JtQ29tcG9uZW50KVxyXG5cclxuZXhwb3J0IGNvbnN0IEJpbGxpbmdTZXR0aW5nc0Zvcm0gPSBjb25uZWN0KCkoQmlsbGluZ1NldHRpbmdzRm9ybUZvcm0pXHJcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcclxuaW1wb3J0IHsgcmVkdXhGb3JtLCBGaWVsZCB9IGZyb20gJ3JlZHV4LWZvcm0nXHJcblxyXG5pbXBvcnQgeyBQYXNzd29yZEZvcm1MaW5lLCBQb3NpdGl2ZUJ1dHRvbiB9IGZyb20gJ2NvbXBvbmVudHMnXHJcblxyXG5jbGFzcyBDaGFuZ2VQYXNzd29yZEZvcm1Db21wb25lbnQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gIHJlbmRlcigpIHtcclxuICAgIGNvbnN0IHsgaGFuZGxlU3VibWl0IH0gPSB0aGlzLnByb3BzXHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGZvcm0gb25TdWJtaXQ9e2hhbmRsZVN1Ym1pdH0+XHJcbiAgICAgICAgPEZpZWxkXHJcbiAgICAgICAgICBuYW1lPVwib2xkX3Bhc3N3b3JkXCJcclxuICAgICAgICAgIGNvbXBvbmVudD17UGFzc3dvcmRGb3JtTGluZX1cclxuICAgICAgICAgIGxhYmVsVGV4dD1cIkVudGVyIHlvdXIgb2xkIHBhc3N3b3JkXCJcclxuICAgICAgICAgIGNsYXNzTmFtZT1cIm1iLTJcIlxyXG4gICAgICAgIC8+XHJcblxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1zdGFydCBtYi00XCI+XHJcbiAgICAgICAgICA8RmllbGRcclxuICAgICAgICAgICAgbmFtZT1cIm5ld19wYXNzd29yZFwiXHJcbiAgICAgICAgICAgIGNvbXBvbmVudD17UGFzc3dvcmRGb3JtTGluZX1cclxuICAgICAgICAgICAgbGFiZWxUZXh0PVwiTmV3IFBhc3N3b3JkXCJcclxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleC1ncm93XCJcclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgICA8RmllbGRcclxuICAgICAgICAgICAgbmFtZT1cIm5ld19wYXNzd29yZF9jb25maXJtYXRpb25cIlxyXG4gICAgICAgICAgICBjb21wb25lbnQ9e1Bhc3N3b3JkRm9ybUxpbmV9XHJcbiAgICAgICAgICAgIGxhYmVsVGV4dD1cIlJlcGVhdCB5b3VyIG5ldyBwYXNzd29yZFwiXHJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXgtZ3JvdyBwbC00XCJcclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBib3JkZXItZ3JleS1saWdodFwiPlxyXG4gICAgICAgICAgPFBvc2l0aXZlQnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBjbGFzc05hbWU9XCJtbC1hdXRvXCI+XHJcbiAgICAgICAgICAgIENoYW5nZSBQYXNzd29yZFxyXG4gICAgICAgICAgPC9Qb3NpdGl2ZUJ1dHRvbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9mb3JtPlxyXG4gICAgKVxyXG4gIH1cclxufVxyXG5cclxuY29uc3QgdmFsaWRhdGVQYXNzd29yZEZvcm0gPSB2YWx1ZXMgPT4ge1xyXG4gIGxldCBlcnJvcnMgPSB7fVxyXG5cclxuICBjb25zdCBub25FbXB0eUZpZWxkTmFtZXMgPSBbXHJcbiAgICAnb2xkX3Bhc3N3b3JkJyxcclxuICAgICduZXdfcGFzc3dvcmQnLFxyXG4gICAgJ25ld19wYXNzd29yZF9jb25maXJtYXRpb24nXHJcbiAgXVxyXG5cclxuICBub25FbXB0eUZpZWxkTmFtZXMuZm9yRWFjaChmaWVsZE5hbWUgPT4ge1xyXG4gICAgaWYgKCF2YWx1ZXNbZmllbGROYW1lXSkge1xyXG4gICAgICBlcnJvcnNbZmllbGROYW1lXSA9ICdUaGlzIGZpZWxkIGlzIHJlcXVpcmVkJ1xyXG4gICAgfVxyXG4gIH0pXHJcblxyXG4gIGlmIChcclxuICAgIHZhbHVlcy5uZXdfcGFzc3dvcmQgJiZcclxuICAgIHZhbHVlcy5uZXdfcGFzc3dvcmRfY29uZmlybWF0aW9uICE9PSB2YWx1ZXMubmV3X3Bhc3N3b3JkXHJcbiAgKSB7XHJcbiAgICBlcnJvcnMubmV3X3Bhc3N3b3JkX2NvbmZpcm1hdGlvbiA9XHJcbiAgICAgICdUaGlzIHBhc3N3b3JkIGRvZXMgbm90IG1hdGNoIHRoZSBuZXcgcGFzc3dvcmQgeW91IGVudGVyZWQnXHJcbiAgfVxyXG5cclxuICByZXR1cm4gZXJyb3JzXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBDaGFuZ2VQYXNzd29yZEZvcm0gPSByZWR1eEZvcm0oe1xyXG4gIGZvcm06ICdjaGFuZ2VQYXNzd29yZCcsXHJcbiAgdmFsaWRhdGU6IHZhbGlkYXRlUGFzc3dvcmRGb3JtXHJcbn0pKENoYW5nZVBhc3N3b3JkRm9ybUNvbXBvbmVudClcclxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xyXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnXHJcbmltcG9ydCB7IHJlZHV4Rm9ybSwgRmllbGQgfSBmcm9tICdyZWR1eC1mb3JtJ1xyXG5cclxuaW1wb3J0IHsgUG9zaXRpdmVCdXR0b24sIFRleHRGb3JtTGluZSwgUGljdHVyZVVwbG9hZCB9IGZyb20gJ2NvbXBvbmVudHMnXHJcbmltcG9ydCB7IGVtYWlsIGFzIGVtYWlsUmVnZXggfSBmcm9tICdjb25zdGFudHMvcmVnZXhlcydcclxuXHJcbmV4cG9ydCBjbGFzcyBVc2VyU2V0dGluZ3NGb3JtQ29tcG9uZW50IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zdCB7IGhhbmRsZVN1Ym1pdCwgYXZhdGFyVXBsb2FkSGFuZGxlciwgY2xhc3NOYW1lIH0gPSB0aGlzLnByb3BzXHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGZvcm0gY2xhc3NOYW1lPXtjbGFzc05hbWV9IG9uU3VibWl0PXtoYW5kbGVTdWJtaXR9PlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgbXktNFwiPlxyXG4gICAgICAgICAgPEZpZWxkXHJcbiAgICAgICAgICAgIG5hbWU9XCJhdmF0YXJcIlxyXG4gICAgICAgICAgICBjb21wb25lbnQ9e1BpY3R1cmVVcGxvYWR9XHJcbiAgICAgICAgICAgIHVwbG9hZEhhbmRsZXI9e2F2YXRhclVwbG9hZEhhbmRsZXJ9XHJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1yLTEwXCJcclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgtZ3Jvd1wiPlxyXG4gICAgICAgICAgICA8RmllbGRcclxuICAgICAgICAgICAgICBuYW1lPVwiZmlyc3RfbmFtZVwiXHJcbiAgICAgICAgICAgICAgY29tcG9uZW50PXtUZXh0Rm9ybUxpbmV9XHJcbiAgICAgICAgICAgICAgbGFiZWxUZXh0PVwiRmlyc3QgTmFtZVwiXHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDxGaWVsZFxyXG4gICAgICAgICAgICAgIG5hbWU9XCJsYXN0X25hbWVcIlxyXG4gICAgICAgICAgICAgIGNvbXBvbmVudD17VGV4dEZvcm1MaW5lfVxyXG4gICAgICAgICAgICAgIGxhYmVsVGV4dD1cIkxhc3QgTmFtZVwiXHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDxGaWVsZCBuYW1lPVwiZW1haWxcIiBjb21wb25lbnQ9e1RleHRGb3JtTGluZX0gbGFiZWxUZXh0PVwiRW1haWxcIiAvPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBib3JkZXItZ3JleS1saWdodFwiPlxyXG4gICAgICAgICAgPFBvc2l0aXZlQnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBjbGFzc05hbWU9XCJtbC1hdXRvXCI+XHJcbiAgICAgICAgICAgIFNhdmUgVXNlciBEZXRhaWxzXHJcbiAgICAgICAgICA8L1Bvc2l0aXZlQnV0dG9uPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Zvcm0+XHJcbiAgICApXHJcbiAgfVxyXG59XHJcblxyXG5jb25zdCB2YWxpZGF0ZVVzZXJTZXR0aW5ncyA9IHZhbHVlcyA9PiB7XHJcbiAgbGV0IGVycm9ycyA9IHt9XHJcblxyXG4gIGlmICghdmFsdWVzLmZpcnN0X25hbWUpIHtcclxuICAgIGVycm9ycy5maXJzdF9uYW1lID0gJ1RoaXMgZmllbGQgaXMgcmVxdWlyZWQnXHJcbiAgfVxyXG5cclxuICBpZiAoIXZhbHVlcy5sYXN0X25hbWUpIHtcclxuICAgIGVycm9ycy5sYXN0X25hbWUgPSAnVGhpcyBmaWVsZCBpcyByZXF1aXJlZCdcclxuICB9XHJcblxyXG4gIGlmICghdmFsdWVzLmVtYWlsKSB7XHJcbiAgICBlcnJvcnMuZW1haWwgPSAnVGhpcyBmaWVsZCBpcyByZXF1aXJlZCdcclxuICB9IGVsc2UgaWYgKCFlbWFpbFJlZ2V4LnRlc3QodmFsdWVzLmVtYWlsKSkge1xyXG4gICAgZXJyb3JzLmVtYWlsID0gJ0ludmFsaWQgZW1haWwgYWRkcmVzcydcclxuICB9XHJcblxyXG4gIHJldHVybiBlcnJvcnNcclxufVxyXG5cclxuY29uc3QgVXNlclNldHRpbmdzRm9ybUZvcm0gPSByZWR1eEZvcm0oe1xyXG4gIGZvcm06ICdhY2NvdW50U2V0dGluZ3MnLFxyXG4gIGVuYWJsZVJlaW5pdGlhbGl6ZTogdHJ1ZSxcclxuICB2YWxpZGF0ZTogdmFsaWRhdGVVc2VyU2V0dGluZ3NcclxufSkoVXNlclNldHRpbmdzRm9ybUNvbXBvbmVudClcclxuXHJcbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IHN0YXRlID0+IHtcclxuICBjb25zdCB7XHJcbiAgICBzZXNzaW9uOiB7IGN1cnJlbnRVc2VyIH1cclxuICB9ID0gc3RhdGVcclxuICByZXR1cm4ge1xyXG4gICAgaW5pdGlhbFZhbHVlczogc3RhdGUuZW50aXRpZXMudXNlcnNbY3VycmVudFVzZXJdXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgVXNlclNldHRpbmdzRm9ybSA9IGNvbm5lY3QoXHJcbiAgbWFwU3RhdGVUb1Byb3BzLFxyXG4gIG51bGxcclxuKShVc2VyU2V0dGluZ3NGb3JtRm9ybSlcclxuIiwiZXhwb3J0IHsgVXNlclNldHRpbmdzRm9ybSB9IGZyb20gJy4vVXNlclNldHRpbmdzRm9ybSdcclxuZXhwb3J0IHsgQ2hhbmdlUGFzc3dvcmRGb3JtIH0gZnJvbSAnLi9DaGFuZ2VQYXNzd29yZEZvcm0nXHJcbiIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQsIEZyYWdtZW50IH0gZnJvbSAncmVhY3QnXHJcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCdcclxuaW1wb3J0IHsgTmF2TGluaywgUm91dGUsIFN3aXRjaCB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nXHJcblxyXG5pbXBvcnQgeyBDYXJkLCBDYXJkQ29udGVudCB9IGZyb20gJ2NvbXBvbmVudHMnXHJcbmltcG9ydCB7IGxpbmtTdHlsZSB9IGZyb20gJ2NvbnN0YW50cy9zdHlsZXMnXHJcblxyXG5pbXBvcnQgeyBVc2VyU2V0dGluZ3MgfSBmcm9tICcuL1VzZXJTZXR0aW5ncydcclxuaW1wb3J0IHsgQXBwU2V0dGluZ3NGb3JtIH0gZnJvbSAnLi9Gb3Jtcy9BcHBTZXR0aW5nc0Zvcm0nXHJcbmltcG9ydCB7IEJpbGxpbmdTZXR0aW5nc0Zvcm0gfSBmcm9tICcuL0Zvcm1zL0JpbGxpbmdTZXR0aW5nc0Zvcm0nXHJcblxyXG5jb25zdCBDYXJkTGluayA9ICh7IHRvLCBjbGFzc05hbWUgPSAnJywgY2hpbGRyZW4gfSkgPT4ge1xyXG4gIHJldHVybiAoXHJcbiAgICA8TmF2TGlua1xyXG4gICAgICB0bz17dG99XHJcbiAgICAgIGFjdGl2ZUNsYXNzTmFtZT1cImJnLWJsdWUtbGlnaHRlc3RcIlxyXG4gICAgICBjbGFzc05hbWU9e2BibG9jayBib3JkZXItYiBib3JkZXItZ3JleS1saWdodCBwLTQgJHtsaW5rU3R5bGV9ICR7Y2xhc3NOYW1lfWB9XHJcbiAgICA+XHJcbiAgICAgIHtjaGlsZHJlbn1cclxuICAgIDwvTmF2TGluaz5cclxuICApXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTZXR0aW5nc1JvdXRlc0NvbXBvbmVudCBleHRlbmRzIENvbXBvbmVudCB7XHJcbiAgcmVuZGVyKCkge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBtYXRjaDogeyB1cmw6IGN1cnJlbnRVcmwgfVxyXG4gICAgfSA9IHRoaXMucHJvcHNcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8RnJhZ21lbnQ+XHJcbiAgICAgICAgPGgyIGNsYXNzTmFtZT1cIm1iLTRcIj5TZXR0aW5nczwvaDI+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLXN0YXJ0XCI+XHJcbiAgICAgICAgICA8Q2FyZCBjbGFzc05hbWU9XCJ3LTY0XCI+XHJcbiAgICAgICAgICAgIDxDYXJkTGluayB0bz17YCR7Y3VycmVudFVybH0vdXNlcmB9PkFjY291bnQ8L0NhcmRMaW5rPlxyXG4gICAgICAgICAgICA8Q2FyZExpbmsgdG89e2Ake2N1cnJlbnRVcmx9L2FwcGB9PkFwcGxpY2F0aW9uPC9DYXJkTGluaz5cclxuICAgICAgICAgICAgPENhcmRMaW5rIHRvPXtgJHtjdXJyZW50VXJsfS9iaWxsaW5nYH0+QmlsbGluZzwvQ2FyZExpbms+XHJcbiAgICAgICAgICA8L0NhcmQ+XHJcbiAgICAgICAgICA8Q2FyZCBjbGFzc05hbWU9XCJmbGV4LWdyb3cgbWwtNFwiPlxyXG4gICAgICAgICAgICA8Q2FyZENvbnRlbnQ+XHJcbiAgICAgICAgICAgICAgPFN3aXRjaD5cclxuICAgICAgICAgICAgICAgIDxSb3V0ZVxyXG4gICAgICAgICAgICAgICAgICBleGFjdFxyXG4gICAgICAgICAgICAgICAgICBwYXRoPXtgJHtjdXJyZW50VXJsfS91c2VyYH1cclxuICAgICAgICAgICAgICAgICAgY29tcG9uZW50PXtVc2VyU2V0dGluZ3N9XHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgPFJvdXRlXHJcbiAgICAgICAgICAgICAgICAgIGV4YWN0XHJcbiAgICAgICAgICAgICAgICAgIHBhdGg9e2Ake2N1cnJlbnRVcmx9L2FwcGB9XHJcbiAgICAgICAgICAgICAgICAgIGNvbXBvbmVudD17QXBwU2V0dGluZ3NGb3JtfVxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgIDxSb3V0ZVxyXG4gICAgICAgICAgICAgICAgICBleGFjdFxyXG4gICAgICAgICAgICAgICAgICBwYXRoPXtgJHtjdXJyZW50VXJsfS9iaWxsaW5nYH1cclxuICAgICAgICAgICAgICAgICAgY29tcG9uZW50PXtCaWxsaW5nU2V0dGluZ3NGb3JtfVxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICA8L1N3aXRjaD5cclxuICAgICAgICAgICAgPC9DYXJkQ29udGVudD5cclxuICAgICAgICAgIDwvQ2FyZD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9GcmFnbWVudD5cclxuICAgIClcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoKShTZXR0aW5nc1JvdXRlc0NvbXBvbmVudClcclxuIiwiaW1wb3J0IFJlYWN0LCB7IEZyYWdtZW50IH0gZnJvbSAncmVhY3QnXHJcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCdcclxuaW1wb3J0IHsgU3VibWlzc2lvbkVycm9yIH0gZnJvbSAncmVkdXgtZm9ybSdcclxuXHJcbmltcG9ydCB7IHVzZXJBY3Rpb25zIH0gZnJvbSAnc3RvcmUvYWN0aW9ucydcclxuaW1wb3J0IHsgdXBsb2FkVXNlckF2YXRhciB9IGZyb20gJ3N0b3JlL2FjdGlvbi1jcmVhdG9ycy9hdmF0YXJzJ1xyXG5pbXBvcnQgeyBmbGFzaE1lc3NhZ2UgfSBmcm9tICdzdG9yZS9hY3Rpb24tY3JlYXRvcnMvZmxhc2hNZXNzYWdlcydcclxuaW1wb3J0IHsgc2F2ZVVzZXIsIGNoYW5nZVBhc3N3b3JkIH0gZnJvbSAnc3RvcmUvYWN0aW9uLWNyZWF0b3JzL3VzZXInXHJcblxyXG5pbXBvcnQgeyBVc2VyU2V0dGluZ3NGb3JtLCBDaGFuZ2VQYXNzd29yZEZvcm0gfSBmcm9tICcuL0Zvcm1zJ1xyXG5cclxuY2xhc3MgVXNlclNldHRpbmdzQ29tcG9uZW50IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIHNhdmVVc2VyU2V0dGluZ3MsXHJcbiAgICAgIGhhbmRsZUNoYW5nZVBhc3N3b3JkLFxyXG4gICAgICBhdmF0YXJVcGxvYWRIYW5kbGVyXHJcbiAgICB9ID0gdGhpcy5wcm9wc1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPEZyYWdtZW50PlxyXG4gICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LWdyZXktZGFya2VzdCBmb250LW5vcm1hbFwiPllvdXIgRGV0YWlsczwvaDM+XHJcbiAgICAgICAgPFVzZXJTZXR0aW5nc0Zvcm1cclxuICAgICAgICAgIGNsYXNzTmFtZT1cIm1iLTRcIlxyXG4gICAgICAgICAgb25TdWJtaXQ9e3NhdmVVc2VyU2V0dGluZ3N9XHJcbiAgICAgICAgICBhdmF0YXJVcGxvYWRIYW5kbGVyPXthdmF0YXJVcGxvYWRIYW5kbGVyfVxyXG4gICAgICAgIC8+XHJcblxyXG4gICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LWdyZXktZGFya2VzdCBmb250LW5vcm1hbFwiPkNoYW5nZSBZb3VyIFBhc3N3b3JkPC9oMz5cclxuICAgICAgICA8Q2hhbmdlUGFzc3dvcmRGb3JtIG9uU3VibWl0PXtoYW5kbGVDaGFuZ2VQYXNzd29yZH0gLz5cclxuICAgICAgPC9GcmFnbWVudD5cclxuICAgIClcclxuICB9XHJcbn1cclxuXHJcbmNvbnN0IHVzZXJWYWxpZGF0aW9uRnJvbVJlc3BvbnNlID0gdmFsdWVzID0+IHtcclxuICBsZXQgZXJyb3JzID0ge31cclxuXHJcbiAgcmV0dXJuIGVycm9yc1xyXG59XHJcblxyXG5jb25zdCBwYXNzd29yZFZhbGlkYXRpb25Gcm9tUmVzcG9uc2UgPSB2YWx1ZXMgPT4ge1xyXG4gIGxldCBlcnJvcnMgPSB7fVxyXG5cclxuICByZXR1cm4gZXJyb3JzXHJcbn1cclxuXHJcbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IHN0YXRlID0+ICh7XHJcbiAgY3VycmVudFVzZXI6IHN0YXRlLmVudGl0aWVzLnVzZXJzW3N0YXRlLnNlc3Npb24uY3VycmVudFVzZXJdXHJcbn0pXHJcblxyXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSBkaXNwYXRjaCA9PiAoe1xyXG4gIHNhdmVVc2VyU2V0dGluZ3M6IGFzeW5jIHVzZXJEYXRhID0+IHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZGlzcGF0Y2goc2F2ZVVzZXIodXNlckRhdGEpKVxyXG5cclxuICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDQwMCkge1xyXG4gICAgICB0aHJvdyBuZXcgU3VibWlzc2lvbkVycm9yKFxyXG4gICAgICAgICdhY2NvdW50U2V0dGluZ3MnLFxyXG4gICAgICAgIHVzZXJWYWxpZGF0aW9uRnJvbVJlc3BvbnNlKHJlc3BvbnNlLmRhdGEuZGF0YSlcclxuICAgICAgKVxyXG4gICAgfVxyXG5cclxuICAgIGRpc3BhdGNoKGZsYXNoTWVzc2FnZSgnc3VjY2VzcycsICdTdWNjZXNzZnVsbHkgc2F2ZWQgdXNlciBpbmZvJywgNDAwMCkpXHJcblxyXG4gICAgZGlzcGF0Y2goe1xyXG4gICAgICB0eXBlOiB1c2VyQWN0aW9ucy5TRVRfQ1VSUkVOVF9VU0VSX0lORk8sXHJcbiAgICAgIHVzZXI6IHJlc3BvbnNlLmRhdGEuZGF0YVxyXG4gICAgfSlcclxuICB9LFxyXG5cclxuICB1cGxvYWRVc2VyQXZhdGFyOiAoZmlsZURhdGEsIHVzZXJJZCkgPT5cclxuICAgIGRpc3BhdGNoKHVwbG9hZFVzZXJBdmF0YXIoZmlsZURhdGEsIHVzZXJJZCkpLFxyXG5cclxuICBjaGFuZ2VQYXNzd29yZDogYXN5bmMgZGF0YSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICBhd2FpdCBkaXNwYXRjaChjaGFuZ2VQYXNzd29yZChkYXRhKSlcclxuICAgICAgZGlzcGF0Y2goXHJcbiAgICAgICAgZmxhc2hNZXNzYWdlKCdzdWNjZXNzJywgJ1lvdXIgcGFzc3dvcmQgd2FzIHN1Y2Nlc3NmdWxseSBjaGFuZ2VkJywgNDAwMClcclxuICAgICAgKVxyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgaWYgKGVycm9yLnJlc3BvbnNlLnN0YXR1cyA9PT0gNDIyKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFN1Ym1pc3Npb25FcnJvcihcclxuICAgICAgICAgIHBhc3N3b3JkVmFsaWRhdGlvbkZyb21SZXNwb25zZShlcnJvci5yZXNwb25zZS5kYXRhLmRhdGEpXHJcbiAgICAgICAgKVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoZXJyb3IucmVzcG9uc2Uuc3RhdHVzID09PSA0MDApIHtcclxuICAgICAgICB0aHJvdyBuZXcgU3VibWlzc2lvbkVycm9yKHtcclxuICAgICAgICAgIG9sZF9wYXNzd29yZDogJ1RoZSBjdXJyZW50IHBhc3N3b3JkIHdhcyBpbmNvcnJlY3QnXHJcbiAgICAgICAgfSlcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufSlcclxuXHJcbmNvbnN0IG1lcmdlUHJvcHMgPSAoc3RhdGVQcm9wcywgZGlzcGF0Y2hQcm9wcywgb3duUHJvcHMpID0+ICh7XHJcbiAgLi4uc3RhdGVQcm9wcyxcclxuICAuLi5kaXNwYXRjaFByb3BzLFxyXG4gIC4uLm93blByb3BzLFxyXG4gIGF2YXRhclVwbG9hZEhhbmRsZXI6IGZpbGVEYXRhID0+IHtcclxuICAgIHJldHVybiBkaXNwYXRjaFByb3BzLnVwbG9hZFVzZXJBdmF0YXIoZmlsZURhdGEsIHN0YXRlUHJvcHMuY3VycmVudFVzZXIuaWQpXHJcbiAgfSxcclxuICBoYW5kbGVDaGFuZ2VQYXNzd29yZDogdmFsdWVzID0+IHtcclxuICAgIGNvbnN0IGRhdGEgPSB7XHJcbiAgICAgIHVzZXJfaWQ6IHN0YXRlUHJvcHMuY3VycmVudFVzZXIuaWQsXHJcbiAgICAgIC4uLnZhbHVlc1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBkaXNwYXRjaFByb3BzLmNoYW5nZVBhc3N3b3JkKGRhdGEpXHJcbiAgfVxyXG59KVxyXG5cclxuZXhwb3J0IGNvbnN0IFVzZXJTZXR0aW5ncyA9IGNvbm5lY3QoXHJcbiAgbWFwU3RhdGVUb1Byb3BzLFxyXG4gIG1hcERpc3BhdGNoVG9Qcm9wcyxcclxuICBtZXJnZVByb3BzXHJcbikoVXNlclNldHRpbmdzQ29tcG9uZW50KVxyXG4iLCJpbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnXHJcblxyXG5pbXBvcnQgeyBtYWtlUmVxdWVzdCB9IGZyb20gJ3N0b3JlL2FjdGlvbi1jcmVhdG9ycy9yZXF1ZXN0cydcclxuaW1wb3J0IHsgdXNlckFjdGlvbnMgYXMgYWN0aW9ucyB9IGZyb20gJ3N0b3JlL2FjdGlvbnMnXHJcblxyXG5leHBvcnQgY29uc3QgdXBsb2FkVXNlckF2YXRhciA9IChmaWxlRGF0YSwgdXNlcklkKSA9PiBhc3luYyBkaXNwYXRjaCA9PiB7XHJcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBkaXNwYXRjaChcclxuICAgIG1ha2VSZXF1ZXN0KCdzZXQtdXNlci1hdmF0YXInLCAoKSA9PiBheGlvcy5wb3N0KCcvYXBpL2F2YXRhcnMnLCBmaWxlRGF0YSkpXHJcbiAgKVxyXG5cclxuICBkaXNwYXRjaCh7XHJcbiAgICB0eXBlOiBhY3Rpb25zLlNFVF9BVkFUQVIsXHJcbiAgICB1c2VySWQsXHJcbiAgICBhdmF0YXI6IHJlc3BvbnNlLmRhdGEuZmlsZVVybFxyXG4gIH0pXHJcbn1cclxuIiwiaW1wb3J0IHsgcmVxdWVzdEFjdGlvbnMgfSBmcm9tICdzdG9yZS9hY3Rpb25zJ1xyXG5cclxuZXhwb3J0IGNvbnN0IG1ha2VSZXF1ZXN0ID0gKGFjdGlvblR5cGUsIHJlcXVlc3RDYWxsKSA9PiBhc3luYyBkaXNwYXRjaCA9PiB7XHJcbiAgZGlzcGF0Y2goeyB0eXBlOiByZXF1ZXN0QWN0aW9ucy5SRVFVRVNULCBhY3Rpb25UeXBlIH0pXHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXF1ZXN0Q2FsbCgpXHJcbiAgICBkaXNwYXRjaCh7IHR5cGU6IHJlcXVlc3RBY3Rpb25zLlNVQ0NFU1MsIGFjdGlvblR5cGUgfSlcclxuICAgIHJldHVybiBkYXRhXHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIGRpc3BhdGNoKHsgdHlwZTogcmVxdWVzdEFjdGlvbnMuRkFJTEVELCBlcnJvciB9KVxyXG4gICAgdGhyb3cgZXJyb3JcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJ1xyXG5cclxuaW1wb3J0IHsgbWFrZVJlcXVlc3QgfSBmcm9tICdzdG9yZS9hY3Rpb24tY3JlYXRvcnMvcmVxdWVzdHMnXHJcblxyXG5leHBvcnQgY29uc3Qgc2F2ZVVzZXIgPSB1c2VyRGF0YSA9PiBhc3luYyBkaXNwYXRjaCA9PiB7XHJcbiAgY29uc3QgeyBpZCB9ID0gdXNlckRhdGFcclxuXHJcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBkaXNwYXRjaChcclxuICAgIG1ha2VSZXF1ZXN0KCdzYXZlLXVzZXItc2V0dGluZ3MnLCAoKSA9PlxyXG4gICAgICBheGlvcy5wdXQoYC9hcGkvdXNlcnMvJHtpZH1gLCB1c2VyRGF0YSlcclxuICAgIClcclxuICApXHJcblxyXG4gIHJldHVybiByZXNwb25zZVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgY2hhbmdlUGFzc3dvcmQgPSBkYXRhID0+IGFzeW5jIGRpc3BhdGNoID0+IHtcclxuICBjb25zdCB7IHVzZXJfaWQ6IHVzZXJJZCB9ID0gZGF0YVxyXG5cclxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGRpc3BhdGNoKFxyXG4gICAgbWFrZVJlcXVlc3QoJ2NoYW5nZS11c2VyLXBhc3N3b3JkJywgKCkgPT5cclxuICAgICAgYXhpb3MucHV0KGAvYXBpL3VzZXJzLyR7dXNlcklkfS91cGRhdGUtcGFzc3dvcmRgLCBkYXRhKVxyXG4gICAgKVxyXG4gIClcclxuXHJcbiAgcmV0dXJuIHJlc3BvbnNlXHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==