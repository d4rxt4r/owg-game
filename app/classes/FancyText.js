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

export function print_text(text, text_el, printed_count = 0, callback = null) {
   if (!text || !text_el) {
      return;
   }

   setTimeout(() => {
      printed_count += 1;
      text_el.text = text.slice(0, printed_count);

      if (printed_count < text.length) {
         print_text(text, text_el, printed_count, callback);
      } else if (callback) {
         callback();
      }
   }, 60);
}

export default FancyText;
