import { ACCENT_COLOR, SHADOW_COLOR } from '../const.js';
import FancyText from './FancyText.js';

const { Container, Text, Graphics } = PIXI;

const BTN_HEIGHT = 46;
const PADDING = 26;

class Button extends Container {
   #pressedTex;
   #unpressedTex;

   constructor({ x, y, width, caption, clickHandler }) {
      super();

      this.x = width / 2 - x;
      this.y = y - BTN_HEIGHT;

      const btn = new Graphics();
      btn.rect(PADDING + 4, 4, width - PADDING * 2, BTN_HEIGHT);
      btn.fill(SHADOW_COLOR);
      btn.rect(PADDING, 0, width - PADDING * 2, BTN_HEIGHT);
      btn.fill(ACCENT_COLOR);

      btn.eventMode = 'static';
      btn.cursor = 'pointer';

      const btn_caption = new FancyText(caption, { fill: '#000', fontSize: 20, dropShadow: null });
      btn_caption.anchor.set(0.5, 0.45);

      btn_caption.x = width / 2;
      btn_caption.y = BTN_HEIGHT / 2;

      btn.on('pointerdown', () => {
         this.y += 4;
      });

      btn.on('pointerup', () => {
         this.y -= 4;

         clickHandler?.();
      });

      this.addChild(btn, btn_caption);
   }
}

export default Button;
