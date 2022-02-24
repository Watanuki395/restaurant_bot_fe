"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FooterCopyRight = exports.FooterLinks = exports.FooterSocialMedias = exports.FooterInfoAbout = exports.FooterAboutUs = exports.FooterAbout = exports.FooterContainer = exports.FooterSite = exports.NavBtnLink = exports.NavBtn = exports.NavMenu = exports.Bars = exports.NavLink = exports.Nav = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactRouterDom = require("react-router-dom");

var _fa = require("react-icons/fa");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject14() {
  var data = _taggedTemplateLiteral(["\n  background-color: #202020;\n  margin-top: 50px 0 0 0;\n  padding: 20px;\n  margin-bottom: 0;\n"]);

  _templateObject14 = function _templateObject14() {
    return data;
  };

  return data;
}

function _templateObject13() {
  var data = _taggedTemplateLiteral(["\ncolor: #ffffff;\ncursor: pointer;\ntext-decoration: none; \nfont-size: 22px;\ndisplay: block;            \ntext-align: center;\npadding: 20px;\ndisplay: inline-block;\n  @media (min-width: 768px){\n      display: inline-block;\n  }\n"]);

  _templateObject13 = function _templateObject13() {
    return data;
  };

  return data;
}

function _templateObject12() {
  var data = _taggedTemplateLiteral(["\ncolor: #ffffff;\nfont-size: 2rem;\ntext-align: center;\ndisplay: block;\npadding: 20px 0;\n@media (min-width: 768px) {\n    float: right;\n    width: 40%;\n    text-align: right;\n    margin-right: 10%;\n  }\n"]);

  _templateObject12 = function _templateObject12() {
    return data;
  };

  return data;
}

function _templateObject11() {
  var data = _taggedTemplateLiteral(["\n  color: white;\n"]);

  _templateObject11 = function _templateObject11() {
    return data;
  };

  return data;
}

function _templateObject10() {
  var data = _taggedTemplateLiteral(["\n  font-size: 20px;\n"]);

  _templateObject10 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9() {
  var data = _taggedTemplateLiteral(["\n  @media (min-width: 768px) {\n    float: left;\n    width: 40%;\n    text-align: left;\n    margin-left: 10%;\n  }\n"]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = _taggedTemplateLiteral(["\n  max-width: 1200px;\n  margin: 0 auto;\n  overflow: auto;\n"]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = _taggedTemplateLiteral(["\n  background-color: #000;\n  padding-top: 40px;\n  color: #ffffff;\n  text-align: center;\n"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n    border-radius: 4px;\n    background: #256ce1;\n    padding: 10px 22px;\n    color: #fff;\n    border:none;\n    outline: none;\n    cursor: pointer;\n    transition: all 0.2s ease-in-out;\n    text-decoration: none;\n\n    margin-left: 24px;\n\n    &:hover {\n        transition: all 0.2s ease-in-out;\n        background: #fff;\n        color: #010606;\n    }\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n    display: flex;\n    align-items: center;\n    margin-right: 24px;\n\n    @media screen and (max-width: 768px){\n        display: none;\n    }\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n    display: flex;\n    align-items: center;\n    //margin-right: -24px;\n\n    margin-right: 24px;\n\n    @media screen and (max-width: 768px){\n        display: none;\n    }\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n    display:none;\n    color: #fff;\n\n    @media screen and (max-width: 780px){\n        display: block;\n        position: absolute;\n        top: 0;\n        right: 0;\n        transform: translate(-100%, 75%);\n        font-size: 1.8rem;\n        cursor: pointer;\n    }\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n    color: #fff;\n    display: flex;\n    align-items: center;\n    text-decoration: none;\n    padding: 0 1rem;\n    height: 100%;\n    cursor: pointer;\n\n    &.active{\n        color: #15cdfc;\n    }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    background:#000;\n    height:80px;\n    display:flex;\n    justify-content:space-between;\n    padding: 0.5rem calc((100vw - 1000px) / 2);\n    z-index:10;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Nav = _styledComponents["default"].nav(_templateObject());

exports.Nav = Nav;
var NavLink = (0, _styledComponents["default"])(_reactRouterDom.NavLink)(_templateObject2());
exports.NavLink = NavLink;
var Bars = (0, _styledComponents["default"])(_fa.FaBars)(_templateObject3());
exports.Bars = Bars;

var NavMenu = _styledComponents["default"].div(_templateObject4());

exports.NavMenu = NavMenu;

var NavBtn = _styledComponents["default"].nav(_templateObject5());

exports.NavBtn = NavBtn;
var NavBtnLink = (0, _styledComponents["default"])(_reactRouterDom.NavLink)(_templateObject6()); //FOOTER

exports.NavBtnLink = NavBtnLink;

var FooterSite = _styledComponents["default"].footer(_templateObject7());

exports.FooterSite = FooterSite;

var FooterContainer = _styledComponents["default"].div(_templateObject8());

exports.FooterContainer = FooterContainer;

var FooterAbout = _styledComponents["default"].section(_templateObject9());

exports.FooterAbout = FooterAbout;

var FooterAboutUs = _styledComponents["default"].p(_templateObject10());

exports.FooterAboutUs = FooterAboutUs;

var FooterInfoAbout = _styledComponents["default"].p(_templateObject11());

exports.FooterInfoAbout = FooterInfoAbout;

var FooterSocialMedias = _styledComponents["default"].section(_templateObject12());

exports.FooterSocialMedias = FooterSocialMedias;

var FooterLinks = _styledComponents["default"].a(_templateObject13());

exports.FooterLinks = FooterLinks;

var FooterCopyRight = _styledComponents["default"].p(_templateObject14());

exports.FooterCopyRight = FooterCopyRight;