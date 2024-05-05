import Screen from '../classes/Screen.js';
import Button from '../classes/Button.js';

const { Assets, Sprite } = PIXI;

const PADDING = 55;
const PADDING2 = PADDING * 2;

class MainMenu extends Screen {
   constructor() {
      super({
         bg_path: '/images/dialog/main_00.png'
      });
   }

   async create(app) {
      super.create(app);

      const width = app.canvas.width;
      const height = app.canvas.height;

      const logo = new Sprite(await Assets.load('/images/logo.png'));
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
            clickHandler: window._NEXT_SCREEN
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

export default MainMenu;
