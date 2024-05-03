const { Container, Sprite, Text } = PIXI;

class Button extends Container {
   #pressedTex;
   #unpressedTex;

   constructor({ x, y, caption, tex1, tex2, clickHandler }) {
      super();

      this.#unpressedTex = tex1;
      this.#pressedTex = tex2;

      const btn = new Sprite(tex1);

      btn.x = x;
      btn.y = y;

      btn.anchor.set(0.5);
      btn.eventMode = 'static';
      btn.cursor = 'pointer';

      const btn_caption = new Text({ text: caption });
      btn_caption.anchor.set(0.5);

      btn_caption.x = x;
      btn_caption.y = y - 6;

      btn.on('pointerdown', () => {
         btn.texture = this.#pressedTex;
         btn_caption.y += 9;
      });

      btn.on('pointerup', () => {
         btn.texture = this.#unpressedTex;
         btn_caption.y -= 9;

         clickHandler?.();
      });

      this.addChild(btn, btn_caption);
   }
}

export default Button;
