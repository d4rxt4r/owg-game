import Screen from './Screen.js';
import Button from './Button.js';

const { Assets, Graphics, Sprite, Text } = PIXI;

class DialogScreen extends Screen {
   #tex = {};
   #dialog_id;
   #dialog_data = [];

   #background_tex;

   #frame_id = 0;
   #frame_counter;
   #speaker;
   #text;

   #w;
   #h;

   constructor(dialog_id) {
      super();

      this.#dialog_id = dialog_id;
   }

   async init() {
      super.init();

      this.#frame_id = 0;
      this.#dialog_data = await fetch(`./dialogs/${this.#dialog_id}.json`).then((response) => response.json());

      const char_tex = new Set();
      this.#dialog_data.forEach((d) => char_tex.add(d.sprite));

      this.#tex = {
         BTN_UNPRESSED: await Assets.load('../tex/but_unpressed.png'),
         BTN_PRESSED: await Assets.load('../tex/but_pressed.png'),
         BG: await Assets.load(`../tex/dialog/${this.#dialog_id}.png`)
      };

      for (const tex of char_tex) {
         this.#tex[tex] = await Assets.load(tex);
      }
   }

   nextFrame(nextScreen) {
      if (this.#frame_id === this.#dialog_data.length) {
         return nextScreen();
      }

      const data = this.#dialog_data[this.#frame_id];

      this.#speaker.texture = this.#tex[data.sprite];
      this.#speaker.setSize(this.#w, this.#h / 3);
      this.#speaker.y = this.#h / 3;
      this.#text.text = data.text;
      this.#frame_id += 1;

      this.#frame_counter.text = `${this.#frame_id}/${this.#dialog_data.length}`;
   }

   create(app, nextScreen) {
      const dialog_box = new Graphics();

      const width = app.canvas.width;
      const height = app.canvas.height;
      this.#w = width;
      this.#h = height;
      const dialog_box_height = height / 3;

      dialog_box.rect(0, height - dialog_box_height, width, dialog_box_height);
      dialog_box.fill('#000000');
      dialog_box.x = 0;
      dialog_box.y = 0;

      const next_frame_btn = new Button({
         x: width / 2,
         y: height - dialog_box_height + 250,
         caption: 'Continue',
         tex1: this.#tex.BTN_UNPRESSED,
         tex2: this.#tex.BTN_PRESSED,
         clickHandler: () => {
            this.nextFrame(nextScreen);
         }
      });

      const speaker = new Sprite();
      speaker.anchor.set(0, 0);
      speaker.x = 0;
      speaker.y = 0;
      this.#speaker = speaker;

      const dialog_text = new Text({ style: { fill: '#ffffff', fontSize: 28 } });
      dialog_text.x = 16;
      dialog_text.y = dialog_box_height * 2 + 50;
      this.#text = dialog_text;

      const frame_counter = new Text({ style: { fill: '#ffffff', fontSize: 20 } });
      frame_counter.x = 16;
      frame_counter.y = dialog_box_height * 2 + 16;
      this.#frame_counter = frame_counter;

      const bg = new Sprite(this.#tex.BG);
      bg.x = 0;
      bg.y = 0;
      bg.width = width;
      bg.height = height;
      this.#background_tex = bg;

      this.$container.addChild(bg, speaker, dialog_box, frame_counter, dialog_text, next_frame_btn);
      app.stage.addChild(this.$container);

      this.nextFrame(nextScreen);
   }
}

export default DialogScreen;
