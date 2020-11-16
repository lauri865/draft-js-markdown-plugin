"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _changeCurrentInlineStyle = require("./changeCurrentInlineStyle");

var _changeCurrentInlineStyle2 = _interopRequireDefault(_changeCurrentInlineStyle);

var _draftJs = require("draft-js");

var _constants = require("../constants");

var _insertText = require("./insertText");

var _insertText2 = _interopRequireDefault(_insertText);

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var handleChange = function handleChange(editorState, line, whitelist) {
  var newEditorState = editorState;
  Object.keys(_constants.inlineMatchers).filter(function (matcher) {
    return whitelist.includes(matcher);
  }).some(function (k) {
    _constants.inlineMatchers[k].some(function (re) {
      var matchArr = void 0;
      do {
        matchArr = re.exec(line);
        if (matchArr) {
          if (matchArr[0][0].match(/^\s/)) {
            matchArr[0] = matchArr[0].replace(/^\s/, "");
            matchArr.index += 1;
          }
          newEditorState = (0, _changeCurrentInlineStyle2.default)(newEditorState, matchArr, k);
        }
      } while (matchArr);
      return newEditorState !== editorState;
    });
    return newEditorState !== editorState;
  });
  return newEditorState;
};

var handleInlineStyle = function handleInlineStyle(whitelist, editorStateWithoutCharacter, character) {
  var editorState = (0, _insertText2.default)(editorStateWithoutCharacter, character);
  var selection = editorState.getSelection();
  var line = (0, _utils.getCurrentLine)(editorState);
  var newEditorState = handleChange(editorState, line, whitelist);
  var lastEditorState = editorState;

  // Recursively resolve markdown, e.g. _*text*_ should turn into both italic and bold
  while (newEditorState !== lastEditorState) {
    lastEditorState = newEditorState;
    line = (0, _utils.getCurrentLine)(newEditorState);
    newEditorState = handleChange(newEditorState, line, whitelist);
  }

  if (newEditorState !== editorState) {
    var newContentState = newEditorState.getCurrentContent();
    selection = newEditorState.getSelection();

    if (character === "\n") {
      newContentState = _draftJs.Modifier.splitBlock(newContentState, selection);
    }

    newEditorState = _draftJs.EditorState.push(newEditorState, newContentState, "md-to-inline-style");

    return newEditorState;
  }

  return editorStateWithoutCharacter;
};

exports.default = handleInlineStyle;