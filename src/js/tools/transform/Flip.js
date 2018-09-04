/**
 * @require I18n
 */
(function () {
  var ns = $.namespace('pskl.tools.transform');

  ns.Flip = function () {
    this.toolId = 'tool-flip';
    this.helpText = I18n.translate('Flip vertically');
    this.tooltipDescriptors = [
      {key : 'alt', description : I18n.translate('Flip horizontally')},
      {key : 'ctrl', description : I18n.translate('Apply to all layers')},
      {key : 'shift', description : I18n.translate('Apply to all frames')}
    ];
  };

  pskl.utils.inherit(ns.Flip, ns.AbstractTransformTool);

  ns.Flip.prototype.applyToolOnFrame_ = function (frame, altKey) {
    var axis;

    if (altKey) {
      axis = ns.TransformUtils.HORIZONTAL;
    } else {
      axis = ns.TransformUtils.VERTICAL;
    }

    ns.TransformUtils.flip(frame, axis);
  };

})();
