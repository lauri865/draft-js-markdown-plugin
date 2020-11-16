"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _changeCurrentBlockType = require("./changeCurrentBlockType");

var _changeCurrentBlockType2 = _interopRequireDefault(_changeCurrentBlockType);

var _insertEmptyBlock = require("./insertEmptyBlock");

var _insertEmptyBlock2 = _interopRequireDefault(_insertEmptyBlock);

var _splitBlockAndChange = require("./splitBlockAndChange");

var _splitBlockAndChange2 = _interopRequireDefault(_splitBlockAndChange);

var _constants = require("../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var handleNewCodeBlock = function handleNewCodeBlock(editorState) {
  var contentState = editorState.getCurrentContent();
  var selection = editorState.getSelection();
  var key = selection.getStartKey();
  var currentBlock = contentState.getBlockForKey(key);
  var matchData = _constants.CODE_BLOCK_REGEX.exec(currentBlock.getText());
  var currentText = currentBlock.getText();
  var endOffset = selection.getEndOffset();
  // We .trim the text here to make sure pressing enter after "``` " works even if the cursor is before the space
  var isLast = endOffset === currentText.length || endOffset === currentText.trim().length;
  if (matchData && isLast) {
    var data = {};
    var language = matchData[1];
    if (language) {
      data.language = language;
    }
    var editorStateWithCodeBlock = (0, _changeCurrentBlockType2.default)(editorState, "code-block", "", data);
    return (0, _splitBlockAndChange2.default)(editorStateWithCodeBlock, undefined, undefined, false);
  }
  var type = currentBlock.getType();
  if (type === "code-block" && isLast) {
    return (0, _insertEmptyBlock2.default)(editorState, "code-block", currentBlock.getData());
  }
  return editorState;
};

exports.default = handleNewCodeBlock;