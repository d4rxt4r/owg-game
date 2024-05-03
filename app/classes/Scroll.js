import Screen from './Screen.js';
import Player from './Player.js';

const { Assets, Sprite } = PIXI;

class ScrollScreen extends Screen {
   #tex = {};

   #player;
   #screen_w;

   #bg_path;
   #bg_sprite;
   #bg_end;
   #bg_locked = false;
   #bg_side = 0;

   #change_screen = false;

   constructor(bg_path) {
      super();

      this.#bg_path = bg_path;
   }

   async init(app) {
      super.init();

      this.#tex = {
         PLAYER: await Assets.load('/images/mars/player_00.png'),
         BG: await Assets.load(`/images/level/${this.#bg_path}.png`)
      };

      this.#screen_w = app.screen.width;

      this.#player = new Player();
      await this.#player.init(app, this.$container);
   }

   create(app, nextScreen) {
      const bg_sprite = new Sprite(this.#tex.BG);
      bg_sprite.x = 0;
      bg_sprite.y = 0;
      bg_sprite.scale = app.canvas.height / bg_sprite.height;
      bg_sprite.zIndex = 0;

      this.#bg_end = bg_sprite.width - app.canvas.width;
      this.#bg_sprite = bg_sprite;

      this.$container.addChild(bg_sprite);
      app.stage.addChild(this.$container);

      if (this.#change_screen) {
         return nextScreen();
      }

      this.#handleMovement();
   }

   #handleBackgroundMovement(x_pos) {
      if (!this.#bg_locked) {
         this.#bg_sprite.x -= x_pos * 0.01;
      }

      if (this.#bg_locked && this.#bg_side === 1 && this.#player.x + this.#player.width / 2 > this.#screen_w / 2) {
         this.#bg_locked = false;
         this.#bg_side = 0;
      } else if (
         this.#bg_locked &&
         this.#bg_side === -1 &&
         this.#player.x + this.#player.width / 2 < this.#screen_w / 2
      ) {
         this.#bg_locked = false;
         this.#bg_side = 0;
      }

      if (this.#bg_sprite.x > -32) {
         this.#bg_sprite.x = -32;
         this.#bg_locked = true;
         this.#bg_side = 1;
      } else if (this.#bg_sprite.x < -this.#bg_end) {
         this.#bg_sprite.x = -this.#bg_end;
         this.#bg_locked = true;
         this.#bg_side = -1;
      }
   }

   #handleMovement() {
      const joy_stick = window._JOY_STICK;
      const x = joy_stick.GetX();
      const y = joy_stick.GetY();

      this.#player.move(x, y, this.#bg_locked);
      this.#handleBackgroundMovement(x);

      requestAnimationFrame(this.#handleMovement.bind(this));
   }
}

export default ScrollScreen;
