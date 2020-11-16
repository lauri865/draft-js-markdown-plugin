"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require("immutable");

var _draftJs = require("draft-js");

exports.default = function (editorState) {
  return editorState.getCurrentInlineStyle().size === 0 ? editorState : _draftJs.EditorState.setInlineStyleOverride(editorState, (0, _immutable.OrderedSet)());
};