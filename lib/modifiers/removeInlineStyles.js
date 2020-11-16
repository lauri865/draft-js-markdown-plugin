"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _draftJs = require("draft-js");

exports.default = function (editorState) {
  var selection = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : editorState.getSelection();

  var styles = ["BOLD", "ITALIC", "STRIKETHROUGH", "CODE"];

  var newEditorState = _draftJs.EditorState.push(editorState, styles.reduce(function (newContentState, style) {
    return _draftJs.Modifier.removeInlineStyle(newContentState, selection, style);
  }, editorState.getCurrentContent()), "change-inline-style");

  return _draftJs.RichUtils.toggleLink(newEditorState, selection, null);
};