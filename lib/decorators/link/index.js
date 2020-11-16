"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _linkStrategy = require("./linkStrategy");

var _linkStrategy2 = _interopRequireDefault(_linkStrategy);

var _Link = require("../../components/Link");

var _Link2 = _interopRequireDefault(_Link);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createLinkDecorator = function createLinkDecorator(_ref) {
  var entityType = _ref.entityType;
  return {
    strategy: (0, _linkStrategy2.default)({ entityType: entityType }),
    component: _Link2.default
  };
};

exports.default = createLinkDecorator;