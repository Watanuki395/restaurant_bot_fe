"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.editCategoryErrorAction = exports.editCategorySuccessAction = exports.editCategoryAction = void 0;

var _index = require("./index");

var editCategoryAction = function editCategoryAction(category) {
  return {
    type: _index.EDIT_CATEGORY_REQUESTED,
    payload: category
  };
};

exports.editCategoryAction = editCategoryAction;

var editCategorySuccessAction = function editCategorySuccessAction() {
  return {
    type: _index.EDIT_CATEGORY_SUCCESS
  };
};

exports.editCategorySuccessAction = editCategorySuccessAction;

var editCategoryErrorAction = function editCategoryErrorAction(error) {
  return {
    type: _index.EDIT_CATEGORY_ERROR,
    payload: error
  };
};

exports.editCategoryErrorAction = editCategoryErrorAction;