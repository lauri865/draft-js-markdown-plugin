"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _immutable = require("immutable");

var _draftJs = require("draft-js");

var _reactClickOutside = require("react-click-outside");

var _reactClickOutside2 = _interopRequireDefault(_reactClickOutside);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var alias = {
  javascript: "js",
  jsx: "js"
};

var CodeSwitchContainer = (0, _reactClickOutside2.default)(function (_PureComponent) {
  _inherits(SwitchContainer, _PureComponent);

  function SwitchContainer() {
    _classCallCheck(this, SwitchContainer);

    return _possibleConstructorReturn(this, (SwitchContainer.__proto__ || Object.getPrototypeOf(SwitchContainer)).apply(this, arguments));
  }

  _createClass(SwitchContainer, [{
    key: "handleClickOutside",
    value: function handleClickOutside() {
      this.props.onClickOutside();
    }
  }, {
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        { contentEditable: false, onClick: this.props.onClick },
        this.props.children
      );
    }
  }]);

  return SwitchContainer;
}(_react.PureComponent));

var CodeBlock = function (_PureComponent2) {
  _inherits(CodeBlock, _PureComponent2);

  function CodeBlock() {
    var _ref;

    var _temp, _this2, _ret;

    _classCallCheck(this, CodeBlock);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_ref = CodeBlock.__proto__ || Object.getPrototypeOf(CodeBlock)).call.apply(_ref, [this].concat(args))), _this2), _this2.state = {
      isOpen: false
    }, _this2.onChange = function (ev) {
      ev.preventDefault();
      ev.stopPropagation();
      var blockKey = _this2.props.block.getKey();
      var _this2$props$blockPro = _this2.props.blockProps,
          getEditorState = _this2$props$blockPro.getEditorState,
          setReadOnly = _this2$props$blockPro.setReadOnly,
          setEditorState = _this2$props$blockPro.setEditorState;


      var editorState = getEditorState();
      var selection = editorState.getSelection();
      var language = ev.currentTarget.value;
      var blockSelection = selection.merge({
        anchorKey: blockKey,
        focusKey: blockKey
      });

      _this2.setState({ isOpen: false });

      var content = editorState.getCurrentContent();
      content = _draftJs.Modifier.mergeBlockData(content, blockSelection, (0, _immutable.Map)({ language: language }));
      setReadOnly(false);

      var newEditorState = _draftJs.EditorState.push(editorState, content, "change-block-data");

      setEditorState(_draftJs.EditorState.forceSelection(newEditorState, selection));
    }, _this2.cancelClicks = function (event) {
      return event.preventDefault();
    }, _this2.onSelectClick = function (event) {
      _this2.setState({ isOpen: true });
      var setReadOnly = _this2.props.blockProps.setReadOnly;

      event.stopPropagation();
      setReadOnly(true);
      _this2.setState({
        isOpen: true
      });
    }, _this2.onClickOutside = function () {
      if (_this2.state.isOpen === false) return;
      _this2.setState({
        isOpen: false
      });
      var _this2$props$blockPro2 = _this2.props.blockProps,
          getEditorState = _this2$props$blockPro2.getEditorState,
          setReadOnly = _this2$props$blockPro2.setReadOnly,
          setEditorState = _this2$props$blockPro2.setEditorState;


      setReadOnly(false);

      _this2.setState({ isOpen: false });

      var editorState = getEditorState();
      var selection = editorState.getSelection();

      setEditorState(_draftJs.EditorState.forceSelection(editorState, selection));
    }, _temp), _possibleConstructorReturn(_this2, _ret);
  }

  _createClass(CodeBlock, [{
    key: "render",
    value: function render() {
      var _props$blockProps = this.props.blockProps,
          languages = _props$blockProps.languages,
          renderLanguageSelect = _props$blockProps.renderLanguageSelect,
          getReadOnly = _props$blockProps.getReadOnly,
          _language = _props$blockProps.language;


      var language = alias[_language] || _language;
      var selectedLabel = languages[language];
      var selectedValue = language;

      var options = Object.keys(languages).reduce(function (acc, val) {
        return [].concat(_toConsumableArray(acc), [{
          label: languages[val],
          value: val
        }]);
      }, []);

      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(_draftJs.EditorBlock, this.props),
        _react2.default.createElement(
          CodeSwitchContainer,
          {
            onClickOutside: this.onClickOutside,
            onClick: this.onSelectClick
          },
          !getReadOnly() && renderLanguageSelect({
            selectedLabel: selectedLabel,
            selectedValue: selectedValue,
            onChange: this.onChange,
            options: options
          })
        )
      );
    }
  }]);

  return CodeBlock;
}(_react.PureComponent);

exports.default = CodeBlock;