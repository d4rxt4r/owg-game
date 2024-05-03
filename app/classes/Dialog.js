import Screen from './Screen.js';
import Button from './Button.js';
import FancyText from './FancyText.js';

const { Assets, Graphics, Sprite, Text } = PIXI;

class DialogScreen extends Screen {
   #tex = {};
   #dialog_id;
   #dialog_data = [];
   #dialog_box_height;

   #background_tex;

   #frame_id = 0;
   #frame_counter;
   #speaker;
   #speaker_name;
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
      this.#dialog_data = await fetch(`/dialogs/${this.#dialog_id}.json`).then((response) => response.json());

      const char_tex = new Set();
      this.#dialog_data.forEach((d) => char_tex.add(d.sprite));

      this.#tex = {
         BTN_UNPRESSED: await Assets.load('/images/but_unpressed.png'),
         BTN_PRESSED: await Assets.load('/images/but_pressed.png'),
         BG: await Assets.load(`/images/dialog/${this.#dialog_id}.png`)
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

      const speaker_sprite = this.#tex[data.sprite];
      this.#speaker.texture = speaker_sprite;
      this.#speaker.scale = this.#w / speaker_sprite.width;
      this.#speaker.y = this.#h - speaker_sprite.height - this.#dialog_box_height;

      this.#text.text = data.text;

      this.#speaker_name.text = data.name;

      this.#frame_id += 1;

      this.#frame_counter.text = `${this.#frame_id}/${this.#dialog_data.length}`;
   }

   create(app, nextScreen) {
      const dialog_box = new Graphics();

      const width = app.canvas.width;
      const height = app.canvas.height;
      this.#w = width;
      this.#h = height;
      const dialog_box_height = height / 4;

      dialog_box.rect(0, height - dialog_box_height, width, dialog_box_height);
      dialog_box.fill('#000000');
      dialog_box.x = 0;
      dialog_box.y = 0;

      this.#dialog_box_height = dialog_box_height;

      const next_frame_btn = new Button({
         width,
         x: width / 2,
         y: height - 24,
         caption: 'CONTINUE',
         clickHandler: () => {
            this.nextFrame(nextScreen);
         }
      });

      const speaker = new Sprite();
      speaker.x = 0;
      speaker.y = 0;
      this.#speaker = speaker;

      const speaker_name = new FancyText('', { fontSize: 24 });
      speaker_name.x = 26;
      speaker_name.y = height - dialog_box_height + 18;
      this.#speaker_name = speaker_name;

      const dialog_text = new FancyText('', { fontSize: 18 });
      dialog_text.x = 26;
      dialog_text.y = height - dialog_box_height + 54;
      this.#text = dialog_text;

      const frame_counter = new FancyText('', { fontSize: 32 });
      frame_counter.x = 24;
      frame_counter.y = 40;
      this.#frame_counter = frame_counter;

      const bg = new Sprite(this.#tex.BG);
      bg.x = 0;
      bg.y = 0;
      bg.width = width;
      bg.height = height;
      this.#background_tex = bg;

      this.$container.addChild(bg, speaker, dialog_box, frame_counter, speaker_name, dialog_text, next_frame_btn);
      app.stage.addChild(this.$container);

      this.nextFrame(nextScreen);
   }
}

export default DialogScreen;
