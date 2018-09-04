/**
 * @require I18n
 */
(function () {
  var ns = $.namespace('pskl.tools.transform');

  ns.Center = function () {
    this.toolId = 'tool-center';
    this.helpText = I18n.translate('Align image to the center');
    this.tooltipDescriptors = [
      {key : 'ctrl', description : I18n.translate('Apply to all layers')},
      {key : 'shift', description : I18n.translate('Apply to all frames')}
    ];
  };

  pskl.utils.inherit(ns.Center, ns.AbstractTransformTool);

  ns.Center.prototype.applyToolOnFrame_ = function (frame) {
    ns.TransformUtils.center(frame);
  };

})();
