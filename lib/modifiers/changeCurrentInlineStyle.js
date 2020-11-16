"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require("immutable");

var _draftJs = require("draft-js");

var _removeInlineStyles = require("./removeInlineStyles");

var _removeInlineStyles2 = _interopRequireDefault(_removeInlineStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var changeCurrentInlineStyle = function changeCurrentInlineStyle(editorState, matchArr, style) {
  var currentContent = editorState.getCurrentContent();
  var selection = editorState.getSelection();
  var key = selection.getStartKey();
  var index = matchArr.index;

  var blockMap = currentContent.getBlockMap();
  var block = blockMap.get(key);
  var currentInlineStyle = block.getInlineStyleAt(index);
  // do not modify the text if it is inside code style
  var hasCodeStyle = currentInlineStyle.find(function (style) {
    return style === "CODE";
  });
  if (hasCodeStyle) {
    return editorState;
  }
  var focusOffset = index + matchArr[0].length;

  var wordSelection = _draftJs.SelectionState.createEmpty(key).merge({
    anchorOffset: index,
    focusOffset: focusOffset
  });

  var newEditorState = editorState;
  // remove all styles if applying code style
  if (style === "CODE") {
    newEditorState = (0, _removeInlineStyles2.default)(newEditorState, wordSelection);
  }

  var markdownCharacterLength = (matchArr[0].length - matchArr[1].length) / 2;

  var newContentState = newEditorState.getCurrentContent();

  // remove markdown delimiter at end
  newContentState = _draftJs.Modifier.removeRange(newContentState, wordSelection.merge({
    anchorOffset: wordSelection.getFocusOffset() - markdownCharacterLength
  }));

  var afterSelection = newContentState.getSelectionAfter();

  afterSelection = afterSelection.merge({
    anchorOffset: afterSelection.getFocusOffset() - markdownCharacterLength,
    focusOffset: afterSelection.getFocusOffset() - markdownCharacterLength
  });

  // remove markdown delimiter at start
  newContentState = _draftJs.Modifier.removeRange(newContentState, wordSelection.merge({
    focusOffset: wordSelection.getAnchorOffset() + markdownCharacterLength
  }));

  // apply style
  newContentState = _draftJs.Modifier.applyInlineStyle(newContentState, wordSelection.merge({
    anchorOffset: index,
    focusOffset: focusOffset - markdownCharacterLength * 2
  }), style);

  newEditorState = _draftJs.EditorState.push(editorState, newContentState, "change-inline-style");

  return _draftJs.EditorState.setInlineStyleOverride(_draftJs.EditorState.forceSelection(newEditorState, afterSelection), _immutable.OrderedSet.of(""));
};

exports.default = changeCurrentInlineStyle;