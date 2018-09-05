/**
 * @require I18n
 */
(function () {
  var ns = $.namespace('pskl.service.keyboard');

  var createShortcut = function (id, description, defaultKey, displayKey) {
    return new ns.Shortcut(id, description, defaultKey, displayKey);
  };

  ns.Shortcuts = {
    /**
     * List of keys that cannot be remapped. Either alternate keys, which are not displayed.
     * Or really custom shortcuts such as the 1-9 for color palette shorctus
     */
    FORBIDDEN_KEYS: [ '1', '2', '3', '4', '5', '6', '7', '8', '9', '?', 'shift+?',
      'DEL', 'BACK', 'ENTER', 'ctrl+Y', 'ctrl+shift+Z' ],

    /**
     * Syntax : createShortcut(id, description, default key(s))
     */
    TOOL: {
      PEN: createShortcut('tool-pen', I18n.translate('Pen tool'), 'P'),
      MIRROR_PEN: createShortcut('tool-vertical-mirror-pen', I18n.translate('Vertical mirror pen tool'), 'V'),
      PAINT_BUCKET: createShortcut('tool-paint-bucket', I18n.translate('Paint bucket tool'), 'B'),
      COLORSWAP: createShortcut('tool-colorswap', I18n.translate('Magic bucket tool'), 'A'),
      ERASER: createShortcut('tool-eraser', I18n.translate('Eraser pen tool'), 'E'),
      STROKE: createShortcut('tool-stroke', I18n.translate('Stroke tool'), 'L'),
      RECTANGLE: createShortcut('tool-rectangle', I18n.translate('Rectangle tool'), 'R'),
      CIRCLE: createShortcut('tool-circle', I18n.translate('Circle tool'), 'C'),
      MOVE: createShortcut('tool-move', I18n.translate('Move tool'), 'M'),
      SHAPE_SELECT: createShortcut('tool-shape-select', I18n.translate('Shape selection'), 'Z'),
      RECTANGLE_SELECT: createShortcut('tool-rectangle-select', I18n.translate('Rectangle selection'), 'S'),
      LASSO_SELECT: createShortcut('tool-lasso-select', I18n.translate('Lasso selection'), 'H'),
      LIGHTEN: createShortcut('tool-lighten', I18n.translate('Lighten tool'), 'U'),
      DITHERING: createShortcut('tool-dithering', I18n.translate('Dithering tool'), 'T'),
      COLORPICKER: createShortcut('tool-colorpicker', I18n.translate('Color picker'), 'O')
    },

    SELECTION: {
      CUT: createShortcut('selection-cut', I18n.translate('Cut selection'), 'ctrl+X'),
      COPY: createShortcut('selection-copy', I18n.translate('Copy selection'), 'ctrl+C'),
      PASTE: createShortcut('selection-paste', I18n.translate('Paste selection'), 'ctrl+V'),
      DELETE: createShortcut('selection-delete', I18n.translate('Delete selection'), [ 'DEL', 'BACK' ]),
      COMMIT: createShortcut('selection-commit', I18n.translate('Commit selection'), [ 'ENTER' ])
    },

    MISC: {
      RESET_ZOOM: createShortcut('reset-zoom', I18n.translate('Reset zoom level'), '0'),
      INCREASE_ZOOM: createShortcut('increase-zoom', I18n.translate('Increase zoom level'), '+'),
      DECREASE_ZOOM: createShortcut('decrease-zoom', I18n.translate('Decrease zoom level'), '-'),
      INCREASE_PENSIZE: createShortcut('increase-pensize', I18n.translate('Increase pen size'), ']'),
      DECREASE_PENSIZE: createShortcut('decrease-pensize', I18n.translate('Decrease pen size'), '['),
      UNDO: createShortcut('undo', I18n.translate('Undo'), 'ctrl+Z'),
      REDO: createShortcut('redo', I18n.translate('Redo'), [ 'ctrl+Y', 'ctrl+shift+Z' ]),
      PREVIOUS_FRAME: createShortcut('previous-frame', I18n.translate('Select previous frame'), 'up'),
      NEXT_FRAME: createShortcut('next-frame', I18n.translate('Select next frame'), 'down'),
      NEW_FRAME: createShortcut('new-frame', I18n.translate('Create new empty frame'), 'N'),
      DUPLICATE_FRAME: createShortcut('duplicate-frame', I18n.translate('Duplicate selected frame'), 'shift+N'),
      CHEATSHEET: createShortcut('cheatsheet', I18n.translate('Open the keyboard shortcut cheatsheet'), [ '?', 'shift+?' ]),
      X1_PREVIEW: createShortcut('x1-preview', I18n.translate('Select original size preview'), 'alt+1'),
      BEST_PREVIEW: createShortcut('best-preview', I18n.translate('Select best size preview'), 'alt+2'),
      FULL_PREVIEW: createShortcut('full-preview', I18n.translate('Select full size preview'), 'alt+3'),
      ONION_SKIN: createShortcut('onion-skin', I18n.translate('Toggle onion skin'), 'alt+O'),
      LAYER_PREVIEW: createShortcut('layer-preview', I18n.translate('Toggle layer preview'), 'alt+L'),
      MERGE_ANIMATION: createShortcut('import-animation', I18n.translate('Open merge animation popup'), 'ctrl+shift+M'),
      CLOSE_POPUP: createShortcut('close-popup', I18n.translate('Close an opened popup'), 'ESC'),
      OFFSET_UP: createShortcut('move-up', I18n.translate('Move viewport up'), 'shift+up'),
      OFFSET_RIGHT: createShortcut('move-right', I18n.translate('Move viewport right'), 'shift+right'),
      OFFSET_DOWN: createShortcut('move-down', I18n.translate('Move viewport down'), 'shift+down'),
      OFFSET_LEFT: createShortcut('move-left', I18n.translate('Move viewport left'), 'shift+left'),
    },

    STORAGE: {
      SAVE: createShortcut('save', I18n.translate('Save the current sprite'), 'ctrl+S'),
      OPEN: createShortcut('open', I18n.translate('(desktop) Open a .piskel file'), 'ctrl+O'),
      SAVE_AS: createShortcut('save-as', I18n.translate('(desktop) Save as new'), 'ctrl+shift+S')
    },

    COLOR: {
      SWAP: createShortcut('swap-colors', I18n.translate('Swap primary/secondary colors'), 'X'),
      RESET: createShortcut('reset-colors', I18n.translate('Reset default colors'), 'D'),
      CREATE_PALETTE: createShortcut('create-palette', I18n.translate('Open the palette creation popup'), 'alt+P'),
      PREVIOUS_COLOR: createShortcut('previous-color', I18n.translate('Select the previous color in the current palette'), '<'),
      NEXT_COLOR: createShortcut('next-color', I18n.translate('Select the next color in the current palette'), '>'),
      SELECT_COLOR: createShortcut('select-color', I18n.translate('Select a palette color in the current palette'),
        '123456789'.split(''), '1 to 9')
    },

    DEBUG: {
      RELOAD_STYLES: createShortcut('move-left', I18n.translate('Move viewport left'), 'ctrl+alt+R'),
    },

    CATEGORIES: [ 'TOOL', 'SELECTION', 'MISC', 'STORAGE', 'COLOR' ]
  };
})();
