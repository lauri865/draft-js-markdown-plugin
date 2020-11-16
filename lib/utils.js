"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCurrentLine = undefined;
exports.addText = addText;
exports.replaceText = replaceText;

var _draftJs = require("draft-js");

var getCurrentLine = exports.getCurrentLine = function getCurrentLine(editorState) {
  var _editorState$getSelec = editorState.getSelection(),
      anchorOffset = _editorState$getSelec.anchorOffset;

  var selection = editorState.getSelection().merge({ anchorOffset: anchorOffset });
  var key = editorState.getSelection().getStartKey();

  return editorState.getCurrentContent().getBlockForKey(key).getText().slice(0, selection.getFocusOffset());
};

function addText(editorState, bufferText) {
  var contentState = _draftJs.Modifier.insertText(editorState.getCurrentContent(), editorState.getSelection(), bufferText);
  return _draftJs.EditorState.push(editorState, contentState, "insert-characters");
}

function replaceText(editorState, bufferText) {
  var contentState = _draftJs.Modifier.replaceText(editorState.getCurrentContent(), editorState.getSelection(), bufferText);
  return _draftJs.EditorState.push(editorState, contentState, "insert-characters");
}