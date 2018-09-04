// TODO(grosbouddha): put under pskl namespace.
var I18n = {
  en: {},
  ko: {
    'Add new frame': '새 프레임 추가',
    'New Piskel': '새 프로젝트',
    'Piskel - preview': '미리보기',
    'Layer': '레이어',
    'Original size preview': '원본 사이즈 미리보기',
    'Best size preview': '적정 사이즈 미리보기',
    'Full size preview': '풀 사이즈 미리보기',
    'Toggle onion skin': '양파껍질 토글',
    'Create a layer': '새 레이어 생성',
    'Clone current layer': '현재 레이어 복제',
    'Move to the bottom': '맨 아래로 이동',
    'Move layer up': '레이어를 위로 이동',
    'Move to the top': '맨 위로 이동',
    'Opacity defined in PREFERENCES': '설정 메뉴 불투명도',
    'Preview all layers': '모든 레이어 미리보기',
    'Pen tool': '펜 툴',
    'Vertical Mirror pen': '종방향 거울 펜',
    'Use horizontal axis': '횡축 사용',
    'Use horizontal and vertical axis': '종횡 축 사용',
    'Paint bucket tool': '페인트 통 툴',
    'Paint all pixels of the same color': '모든 픽셀을 같은 색상으로 칠함',
    'Eraser tool': '지우개 툴',
    'Stroke tool': '선 툴',
    'Hold shift to draw straight lines': '',
    'Rectangle tool': '사각형 툴',
    'Circle tool': '원 툴',
    'Move tool': '이동 툴',
    'Wrap canvas borders': '',
    'Shape selection': '',
    'Rectangle selection': '',
    'Lasso selection': '',
    'Lighten': '밝게',
    'Darken': '어둡게',
    'Apply only once per pixel': '',
    'Dithering tool': '',
    'Color picker': '',
    'Flip vertically': '위아래 뒤집기',
    'Flip horizontally': '좌우 뒤집기',
    'Apply to all layers': '모든 레이어에 적용',
    'Apply to all frames': '모든 프레임에 적용',
    'Counter-clockwise rotation': '',
    'Clockwise rotation': '',
    'Clone current layer to all frames': '',
    'Align image to the center': '',
    'Crop the sprite': '',
    'Crop to fit the content or the selection. Applies to all frames and layers!': '',
  },

  lang: 'ko',

  list: '',
  cnt: 0,

  translate: function (KEY) {
    if (this.lang === 'en') {
      return KEY;
    } else {
      if (this[ this.lang ][ KEY ] === undefined) {
        //prompt(KEY);

        this.list += "'" + KEY + "': '',\n";
        this.cnt++;

        if(this.cnt > 20){
          prompt('', this.list);
        }


        return KEY;
      } else {
        return this[ this.lang ][ KEY ];
      }
    }
  }
};
