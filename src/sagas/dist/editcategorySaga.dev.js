"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _effects = require("redux-saga/effects");

var _index = require("../actions/index");

var _api = _interopRequireDefault(require("../api"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(editCategorySaga),
    _marked2 =
/*#__PURE__*/
regeneratorRuntime.mark(sagas);

function editCategorySaga(_ref) {
  var _ref$payload, id_cat, formValue, response;

  return regeneratorRuntime.wrap(function editCategorySaga$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _ref$payload = _ref.payload, id_cat = _ref$payload.id_cat, formValue = _ref$payload.formValue;
          _context.prev = 1;
          _context.next = 4;
          return (0, _effects.call)(_api["default"], 'PUT', "/api/product/categories/", formValue);

        case 4:
          response = _context.sent;
          _context.next = 7;
          return (0, _effects.put)({
            type: _index.EDIT_CATEGORY_SUCCESS,
            response: response
          });

        case 7:
          _context.next = 14;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](1);
          _context.next = 13;
          return (0, _effects.put)({
            type: _index.EDIT_CATEGORY_ERROR,
            error: _context.t0
          });

        case 13:
          console.log(_context.t0);

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, null, [[1, 9]]);
}

;

function sagas() {
  return regeneratorRuntime.wrap(function sagas$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return (0, _effects.takeLatest)(_index.EDIT_CATEGORY_REQUESTED, editCategorySaga);

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2);
}

var _default = sagas;
exports["default"] = _default;