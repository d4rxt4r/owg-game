import Screen from './Screen.js';
import Player from './Player.js';

const { Assets, Sprite } = PIXI;

const JOY_W = 200;
const JOY_H = 200;

class ScrollScreen extends Screen {
   #tex = {};
   #controller;

   #bg_path;
   #bg_sprite;

   constructor(bg_path) {
      super();

      this.#bg_path = bg_path;
   }

   async init() {
      super.init();

      this.#tex = {
         PLAYER: await Assets.load('../tex/mars/player_00.png'),
         BG: await Assets.load(`../tex/level/${this.#bg_path}`)
      };
   }

   create(app, nextScreen) {
      this.#controller = new JoyStick(
         'joy_stick',
         {
            width: JOY_W,
            height: JOY_H
            // internalFillColor,
            // internalLineWidth,
            // internalStrokeColor,
            // externalLineWidth,
            // externalStrokeColor,
            // autoReturnToCenter
         },
         Player.moveHandler
      );

      const bg_sprite = new Sprite(this.#tex.BG);
      bg_sprite.x = 0;
      bg_sprite.y = 0;
      this.#bg_sprite = bg_sprite;

      this.$container.addChild(bg_sprite);
      app.stage.addChild(this.$container);
   }
}

export default ScrollScreen;
