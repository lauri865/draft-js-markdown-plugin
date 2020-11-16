"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _draftJsCheckableListItem = require("draft-js-checkable-list-item");

var _draftJs = require("draft-js");

var _changeCurrentBlockType = require("./changeCurrentBlockType");

var _changeCurrentBlockType2 = _interopRequireDefault(_changeCurrentBlockType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sharps = function sharps(len) {
  var ret = "";
  while (ret.length < len) {
    ret += "#";
  }
  return ret;
};

var blockTypes = {
  "#": "header-one",
  "##": "header-two",
  "###": "header-three",
  "####": "header-four",
  "#####": "header-five",
  "######": "header-six"
};

var headerReg = /^(#+)\s+/;

var handleBlockType = function handleBlockType(whiteList, editorState, character) {
  var currentSelection = editorState.getSelection();
  var key = currentSelection.getStartKey();
  var text = editorState.getCurrentContent().getBlockForKey(key).getText();
  var position = currentSelection.getAnchorOffset();
  var line = [text.slice(0, position), character, text.slice(position)].join("");
  var blockType = _draftJs.RichUtils.getCurrentBlockType(editorState);

  var headerMatch = line.match(headerReg);

  if (blockType === "unstyled" || blockType === "paragraph") {
    if (headerMatch !== null && blockTypes[headerMatch[1]] !== null && whiteList.includes(blockTypes[headerMatch[1]])) {
      return (0, _changeCurrentBlockType2.default)(editorState, blockTypes[headerMatch[1]], line.replace(/^#+\s/, ""));
    }

    var matchArr = line.match(/^[*-] (.*)$/);
    if (matchArr && whiteList.includes("unordered-list-item")) {
      return (0, _changeCurrentBlockType2.default)(editorState, "unordered-list-item", matchArr[1]);
    }

    matchArr = line.match(/^[\d]\. (.*)$/);
    if (matchArr && whiteList.includes("ordered-list-item")) {
      return (0, _changeCurrentBlockType2.default)(editorState, "ordered-list-item", matchArr[1]);
    }
    matchArr = line.match(/^> (.*)$/);
    if (matchArr) {
      return (0, _changeCurrentBlockType2.default)(editorState, "blockquote", matchArr[1]);
    }
  } else if (blockType === "unordered-list-item" && whiteList.includes(_draftJsCheckableListItem.CHECKABLE_LIST_ITEM)) {
    var _matchArr = line.match(/^\[([x ])] (.*)$/i);
    if (_matchArr) {
      return (0, _changeCurrentBlockType2.default)(editorState, _draftJsCheckableListItem.CHECKABLE_LIST_ITEM, _matchArr[2], { checked: _matchArr[1] !== " " });
    }
  }

  return editorState;
};

exports.default = handleBlockType;