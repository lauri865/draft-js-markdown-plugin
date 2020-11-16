"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultBlockWhitelist = exports.defaultInlineWhitelist = exports.ENTITY_TYPE = exports.CODE_BLOCK_TYPE = exports.inlineMatchers = exports.CODE_BLOCK_REGEX = undefined;

var _draftJsCheckableListItem = require("draft-js-checkable-list-item");

var CODE_BLOCK_REGEX = exports.CODE_BLOCK_REGEX = /^```([\w-]+)?\s*$/;

var inlineMatchers = exports.inlineMatchers = {
  BOLD: [/(?:^|\s)\*(.+)\*$/g],
  ITALIC: [/(?:^|\s)_(.+)_$/g],
  CODE: [/(?:^|\s)`([^`]+)`$/g],
  STRIKETHROUGH: [/(?:^|\s)~(.+)~$/g]
};

var CODE_BLOCK_TYPE = exports.CODE_BLOCK_TYPE = "code-block";

var ENTITY_TYPE = exports.ENTITY_TYPE = {
  IMAGE: "IMG",
  LINK: "LINK"
};

var defaultInlineWhitelist = exports.defaultInlineWhitelist = ["BOLD", "ITALIC", "CODE", "STRIKETHROUGH", "LINK", "IMAGE"];

var defaultBlockWhitelist = exports.defaultBlockWhitelist = ["CODE", "header-one", "header-two", "header-three", "header-four", "header-five", "header-six", "ordered-list-item", "unordered-list-item", _draftJsCheckableListItem.CHECKABLE_LIST_ITEM, "blockquote"];