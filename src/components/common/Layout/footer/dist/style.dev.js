"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FooterCopyRight = exports.FooterLinks = exports.FooterSocialMedias = exports.FooterInfoAbout = exports.FooterAboutUs = exports.FooterAbout = exports.FooterContainer = exports.FooterSite = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactRouterDom = require("react-router-dom");

var _fa = require("react-icons/fa");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject8() {
  var data = _taggedTemplateLiteral(["\n  background-color: #202020;\n  margin-top: 50px 0 0 0;\n  padding: 20px;\n  margin-bottom: 0;\n"]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = _taggedTemplateLiteral(["\ncolor: #ffffff;\ncursor: pointer;\ntext-decoration: none; \nfont-size: 22px;\ndisplay: block;            \ntext-align: center;\npadding: 20px;\ndisplay: inline-block;\n  @media (min-width: 768px){\n      display: inline-block;\n  }\n"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["\ncolor: #ffffff;\nfont-size: 2rem;\ntext-align: center;\ndisplay: block;\npadding: 20px 0;\n@media (min-width: 768px) {\n    float: right;\n    width: 40%;\n    text-align: right;\n    margin-right: 10%;\n  }\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n  color: white;\n  margin: 10px 15px;\n  @media (min-width: 768px) {\n    margin: 0;\n  }\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  font-size: 20px;\n  margin: 0 15px;\n  @media (min-width: 768px) {\n    margin: 0;\n  }\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  @media (min-width: 768px) {\n    float: left;\n    width: 40%;\n    text-align: left;\n    margin-left: 10%;\n  }\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  max-width: 1200px;\n  margin: 0 auto;\n  overflow: auto;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  background-color: #000;\n  padding-top: 40px;\n  color: #ffffff;\n  text-align: center;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var FooterSite = _styledComponents["default"].footer(_templateObject());

exports.FooterSite = FooterSite;

var FooterContainer = _styledComponents["default"].div(_templateObject2());

exports.FooterContainer = FooterContainer;

var FooterAbout = _styledComponents["default"].section(_templateObject3());

exports.FooterAbout = FooterAbout;

var FooterAboutUs = _styledComponents["default"].p(_templateObject4());

exports.FooterAboutUs = FooterAboutUs;

var FooterInfoAbout = _styledComponents["default"].p(_templateObject5());

exports.FooterInfoAbout = FooterInfoAbout;

var FooterSocialMedias = _styledComponents["default"].section(_templateObject6());

exports.FooterSocialMedias = FooterSocialMedias;

var FooterLinks = _styledComponents["default"].a(_templateObject7());

exports.FooterLinks = FooterLinks;

var FooterCopyRight = _styledComponents["default"].p(_templateObject8());

exports.FooterCopyRight = FooterCopyRight;