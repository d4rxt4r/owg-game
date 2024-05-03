import Screen from '../classes/Screen.js';
import Button from '../classes/Button.js';

const { Assets } = PIXI;

class MainScreen extends Screen {
   #tex = {};

   constructor() {
      super();
   }

   async init() {
      super.init();

      this.#tex = {
         BTN_UNPRESSED: await Assets.load('../tex/but_unpressed.png'),
         BTN_PRESSED: await Assets.load('../tex/but_pressed.png')
      };
   }

   create(app, nextScreen) {
      const screen_center_x = app.canvas.width / 2;
      const screen_center_y = app.canvas.height / 2;

      this.$container.addChild(
         new Button({
            x: screen_center_x,
            y: screen_center_y,
            caption: 'Start',
            tex1: this.#tex.BTN_UNPRESSED,
            tex2: this.#tex.BTN_PRESSED,
            clickHandler: nextScreen
         })
      );

      this.$container.addChild(
         new Button({
            x: screen_center_x,
            y: screen_center_y + 100,
            caption: 'Continue',
            tex1: this.#tex.BTN_UNPRESSED,
            tex2: this.#tex.BTN_PRESSED
         })
      );

      this.$container.addChild(
         new Button({
            x: screen_center_x,
            y: screen_center_y + 200,
            caption: 'Credits',
            tex1: this.#tex.BTN_UNPRESSED,
            tex2: this.#tex.BTN_PRESSED
         })
      );

      app.stage.addChild(this.$container);
   }
}

export default MainScreen;
