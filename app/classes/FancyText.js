import { ACCENT_COLOR, SHADOW_COLOR } from '../const.js';

class FancyText extends PIXI.Text {
   constructor(text, style = {}) {
      const options = {
         text,
         style: {
            fill: ACCENT_COLOR,
            fontFamily: 'kongtext',
            dropShadow: {
               color: SHADOW_COLOR,
               blur: 0,
               angle: Math.PI / 6,
               distance: 3
            },
            ...style
         }
      };
      super(options);
   }
}

export default FancyText;