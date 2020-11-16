"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var createImageStrategy = function createImageStrategy(_ref) {
  var entityType = _ref.entityType;

  var findImageEntities = function findImageEntities(contentBlock, callback, contentState) {
    contentBlock.findEntityRanges(function (character) {
      var entityKey = character.getEntity();
      return entityKey !== null && contentState.getEntity(entityKey).getType() === entityType;
    }, callback);
  };
  return findImageEntities;
};

exports.default = createImageStrategy;