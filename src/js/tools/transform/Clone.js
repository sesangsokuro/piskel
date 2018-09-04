/**
 * @require I18n
 */
(function () {
  var ns = $.namespace('pskl.tools.transform');

  ns.Clone = function () {
    this.toolId = 'tool-clone';
    this.helpText = I18n.translate('Clone current layer to all frames');
    this.tooltipDescriptors = [];
  };

  pskl.utils.inherit(ns.Clone, ns.AbstractTransformTool);

  ns.Clone.prototype.applyTool_ = function (altKey, allFrames, allLayers) {
    var ref = pskl.app.piskelController.getCurrentFrame();
    var layer = pskl.app.piskelController.getCurrentLayer();
    layer.getFrames().forEach(function (frame) {
      if (frame !==  ref) {
        frame.setPixels(ref.getPixels());
      }
    });
  };
})();
