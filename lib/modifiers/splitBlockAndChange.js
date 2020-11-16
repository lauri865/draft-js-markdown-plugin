"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _draftJs = require("draft-js");

var splitBlockAndChange = function splitBlockAndChange(editorState) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "unstyled";
  var blockMetadata = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var selectNewBlock = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

  var currentContent = editorState.getCurrentContent();
  var currentSelection = editorState.getSelection();
  currentContent = _draftJs.Modifier.splitBlock(currentContent, currentSelection);
  var selection = currentContent.getSelectionAfter();
  var key = selection.getStartKey();
  var blockMap = currentContent.getBlockMap();
  var block = blockMap.get(key);
  var data = block.getData().merge(blockMetadata);
  var newBlock = block.merge({ type: type, data: data });
  var newContentState = currentContent.merge({
    blockMap: blockMap.set(key, newBlock),
    selectionAfter: selectNewBlock ? selection : currentSelection
  });

  return _draftJs.EditorState.push(editorState, newContentState, "split-block");
};

exports.default = splitBlockAndChange;