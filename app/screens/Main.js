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
         BTN_UNPRESSED: await Assets.load('/images/but_unpressed.png'),
         BTN_PRESSED: await Assets.load('/images/but_pressed.png')
      };
   }

   create(app, nextScreen) {
      const screen_center_x = app.canvas.width / 2;
      const screen_center_y = app.canvas.height / 2;

      this.$container.addChild(
         new Button({
            width: app.canvas.width,
            x: screen_center_x,
            y: screen_center_y,
            caption: 'Start',
            clickHandler: nextScreen
         })
      );

      this.$container.addChild(
         new Button({
            width: app.canvas.width,
            x: screen_center_x,
            y: screen_center_y + 100,
            caption: 'Continue',
         })
      );

      this.$container.addChild(
         new Button({
            width: app.canvas.width,
            x: screen_center_x,
            y: screen_center_y + 200,
            caption: 'Credits',
         })
      );

      app.stage.addChild(this.$container);
   }
}

export default MainScreen;
