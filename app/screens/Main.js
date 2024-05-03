import Screen from '../classes/Screen.js';
import Button from '../classes/Button.js';

const { Assets, Sprite } = PIXI;

const PADDING = 55;
const PADDING2 = PADDING * 2;

class MainScreen extends Screen {
   #tex = {};

   constructor() {
      super();
   }

   async init() {
      super.init();

      this.#tex = {
         BG: await Assets.load('/images/dialog/main_00.png'),
         LOGO: await Assets.load('/images/logo.png')
      };
   }

   create(app, nextScreen) {
      const width = app.canvas.width;
      const height = app.canvas.height;

      const bg = new Sprite(this.#tex.BG);
      bg.x = 0;
      bg.y = 0;
      bg.scale = width / bg.width;
      this.$container.addChild(bg);

      const logo = new Sprite(this.#tex.LOGO);
      logo.x = PADDING;
      logo.y = height / 2 - logo.height;
      logo.scale = (width - PADDING2) / logo.width;
      this.$container.addChild(logo);

      const screen_center_x = width / 2;
      const screen_center_y = height / 2 + logo.height / 2;

      this.$container.addChild(
         new Button({
            width: width,
            height: 64,
            fontSize: 24,
            x: screen_center_x,
            y: screen_center_y,
            caption: 'POGNALY',
            clickHandler: nextScreen
         })
      );

      this.$container.addChild(
         new Button({
            width: width,
            height: 64,
            fontSize: 24,
            x: screen_center_x,
            y: screen_center_y + 100,
            caption: 'VYBOR RAYONA'
         })
      );

      this.$container.addChild(
         new Button({
            width: width,
            height: 64,
            fontSize: 24,
            x: screen_center_x,
            y: screen_center_y + 200,
            caption: 'O SOZDATELYAH'
         })
      );

      app.stage.addChild(this.$container);
   }
}

export default MainScreen;
