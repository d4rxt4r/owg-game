import Screen from './Screen.js';
import Button from './Button.js';
import FancyText, { print_text } from './FancyText.js';

const { Assets, Graphics, Sprite } = PIXI;
const { Tween } = createjs;

class Dialog extends Screen {
   #tex = {};
   #dialog_id;
   #dialog_data = [];
   #dialog_box_height;
   #frame_id = 0;
   #frame_counter;
   #speaker;
   #speaker_name;
   #text;

   constructor(dialog_id) {
      super();

      this.#dialog_id = dialog_id;
   }

   async load() {
      this.#frame_id = 0;
      this.#dialog_data = await fetch(`./dialogs/${this.#dialog_id}.json`).then((response) => response.json());

      const char_tex = new Set();
      this.#dialog_data.forEach((d) => char_tex.add(d.sprite));
      const bg_tex = new Set();
      this.#dialog_data.forEach((d) => bg_tex.add(d.background));

      for (const tex of char_tex) {
         this.#tex[tex] = await Assets.load(tex);
      }
      for (const tex of bg_tex) {
         this.#tex[tex] = await Assets.load(tex);
      }

      this.$options.bg_path = this.#dialog_data[0].background;

      await super.load();
   }

   async create(app) {
      super.create(app);

      const dialog_box = new Graphics();

      const width = app.canvas.width;
      const height = app.canvas.height;
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
         caption: '...',
         clickHandler: () => {
            this.nextFrame();
         }
      });

      const speaker = new Sprite();
      speaker.x = width / 2;
      speaker.y = 0;
      speaker.anchor.set(0.5, 0.5);
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

      this.$container.addChild(speaker, dialog_box, frame_counter, speaker_name, dialog_text, next_frame_btn);
      app.stage.addChild(this.$container);

      this.nextFrame();
   }

   nextFrame() {
      if (this.#frame_id === this.#dialog_data.length) {
         return window._NEXT_SCREEN();
      }

      const data = this.#dialog_data[this.#frame_id];

      if (this.$background.texture.label !== this.#tex[data.background].label) {
         this.setBackground(this.#tex[data.background]);
      }

      if (this.#speaker.texture.label !== this.#tex[data.sprite].label) {
         const speaker_sprite = this.#tex[data.sprite];
         this.#speaker.texture = speaker_sprite;
         const speaker_scale = window._APP_WIDTH / speaker_sprite.width;
         this.#speaker.scale = speaker_scale;
         const speaker_y_pos = window._APP_HEIGHT - this.#speaker.height / 2 - this.#dialog_box_height;
         this.#speaker.scale = speaker_scale;
         this.#speaker.y = speaker_y_pos + 32;

         // speaker change animation
         Tween.get(this.#speaker).to({ y: speaker_y_pos }, 600);
         Tween.get(this.#speaker.scale).to({ x: speaker_scale + 0.1, y: speaker_scale + 0.1 }, 600);
      }

      // FIXME: if animation is not done, it will bug-out
      if (this.#speaker_name.text !== data.name) {
         print_text(data.name, this.#speaker_name, 0, () => print_text(data.text, this.#text));
      } else {
         print_text(data.text, this.#text);
      }

      this.#frame_id += 1;
      this.#frame_counter.text = `${this.#frame_id}/${this.#dialog_data.length}`;
   }
}

export default Dialog;
