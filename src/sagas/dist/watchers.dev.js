"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = watchUserAuthentication;

var _effects = require("redux-saga/effects");

var _authenticationSaga = require("./authenticationSaga");

var types = _interopRequireWildcard(require("../actions"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(watchUserAuthentication);

function watchUserAuthentication() {
  return regeneratorRuntime.wrap(function watchUserAuthentication$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _effects.takeLatest)(types.REGISTER_USER, _authenticationSaga.registerSaga);

        case 2:
          _context.next = 4;
          return (0, _effects.takeLatest)(types.LOGIN_USER, _authenticationSaga.loginSaga);

        case 4:
          _context.next = 6;
          return (0, _effects.takeLatest)(types.FORGOT_PASS, _authenticationSaga.forgotpassSaga);

        case 6:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}