/**
 * @require I18n
 */
(function () {
  var ns = $.namespace('pskl.tools.transform');

  ns.Rotate = function () {
    this.toolId = 'tool-rotate';
    this.helpText = I18n.translate('Counter-clockwise rotation');
    this.tooltipDescriptors = [
      {key : 'alt', description : I18n.translate('Clockwise rotation')},
      {key : 'ctrl', description : I18n.translate('Apply to all layers')},
      {key : 'shift', description : I18n.translate('Apply to all frames')}];
  };

  pskl.utils.inherit(ns.Rotate, ns.AbstractTransformTool);

  ns.Rotate.prototype.applyToolOnFrame_ = function (frame, altKey) {
    var direction;

    if (altKey) {
      direction = ns.TransformUtils.CLOCKWISE;
    } else {
      direction = ns.TransformUtils.COUNTERCLOCKWISE;
    }

    ns.TransformUtils.rotate(frame, direction);
  };

})();
