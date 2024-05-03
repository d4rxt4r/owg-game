import { ACCENT_COLOR, SHADOW_COLOR } from '../const.js';
import FancyText from './FancyText.js';

const { Container, Graphics } = PIXI;

const BTN_HEIGHT = 46;
const PADDING = 26;

class Button extends Container {
   constructor({ x, y, width, height = BTN_HEIGHT, caption, fontSize = 20, clickHandler }) {
      super();

      this.x = width / 2 - x;
      this.y = y - height;

      const btn = new Graphics();
      btn.rect(PADDING + 4, 4, width - PADDING * 2, height);
      btn.fill(SHADOW_COLOR);
      btn.rect(PADDING, 0, width - PADDING * 2, height);
      btn.fill(ACCENT_COLOR);

      btn.eventMode = 'static';
      btn.cursor = 'pointer';

      const btn_caption = new FancyText(caption, { fill: '#000', fontSize, dropShadow: null });
      btn_caption.anchor.set(0.5, 0.45);

      btn_caption.x = width / 2;
      btn_caption.y = height / 2;

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
