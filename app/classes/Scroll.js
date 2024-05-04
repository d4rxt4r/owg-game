import Screen from './Screen.js';
import Player from './Player.js';
import Interactable from './Interactable.js';

const { Assets, Sprite } = PIXI;

class ScrollScreen extends Screen {
   #tex = {};

   #player;

   #bg_path;
   #bg_sprite;
   #bg_end;
   #bg_locked = false;

   #objects_data = [];
   #objects;

   #destroyed = true;

   constructor(bg_path, objects_data) {
      super();

      this.#bg_path = bg_path;
      this.#objects_data = objects_data;
   }

   async init() {
      super.init();

      window._JOY_DIV.style.display = 'block';
      window._ACTION_BTN.style.display = 'block';

      this.#tex = {
         PLAYER: await Assets.load('/images/mars/player_00.png'),
         BG: await Assets.load(`/images/level/${this.#bg_path}.png`)
      };

      this.#objects = [];
      for (const obj of this.#objects_data) {
         const itr = new Interactable(obj);
         await itr.init();
         this.#objects.push(itr);
      }

      this.#player = new Player();
      await this.#player.init(this.$container);

      this.#destroyed = false;
   }

   create(app, nextScreen) {
      this.nextScreen = nextScreen;

      const bg_sprite = new Sprite(this.#tex.BG);
      bg_sprite.x = 0;
      bg_sprite.y = 0;
      bg_sprite.scale = app.canvas.height / bg_sprite.height;
      bg_sprite.zIndex = 0;

      this.#bg_end = bg_sprite.width - app.canvas.width;
      this.#bg_sprite = bg_sprite;

      this.$container.addChild(bg_sprite);
      app.stage.addChild(this.$container);

      this.#placeObjects();

      this.#handleMovement();

      window._ACTION_BTN.addEventListener('click', this.#actionHandler);
   }

   destroy() {
      window._ACTION_BTN.removeEventListener('click', this.#actionHandler);
      this.#destroyed = true;

      super.destroy();
   }

   #actionHandler = () => {
      this.#objects.forEach((obj) => {
         if (obj.is_close(this.#player.x, this.#player.y)) {
            obj.activate();
         }
      });
   }

   #placeObjects() {
      for (const obj of this.#objects) {
         obj.spawn(this.$container);
      }
   }

   #handleBackgroundMovement(x_pos) {
      if (this.#bg_locked && this.#player.face_direction === 1 && this.#player.dist_from_center > 0) {
         this.#bg_locked = false;
      } else if (this.#bg_locked && this.#player.face_direction === -1 && this.#player.dist_from_center < 0) {
         this.#bg_locked = false;
      }

      if (this.#bg_sprite.x > -32) {
         this.#bg_sprite.x = -32;
         this.#bg_locked = true;
      } else if (this.#bg_sprite.x < -this.#bg_end) {
         this.#bg_sprite.x = -this.#bg_end;
         this.#bg_locked = true;
      }

      if (!this.#bg_locked) {
         this.#bg_sprite.x -= x_pos * 0.01;

         this.#objects.forEach((obj) => {
            obj.x -= x_pos * 0.01;
            if (obj.x > obj.o_x) {
               obj.x = obj.o_x;
            }
            if (obj.x < obj.o_x - this.#bg_end + 32) {
               obj.x = obj.o_x - this.#bg_end + 32;
            }

            obj.is_close(this.#player.x, this.#player.y);
         });
      }
   }

   #handleMovement() {
      const joy_stick = window._JOY_STICK;
      const x = joy_stick.GetX();
      const y = joy_stick.GetY();

      this.#player.move(x, y, this.#bg_locked);
      this.#handleBackgroundMovement(x);

      if (!this.#destroyed) {
         requestAnimationFrame(this.#handleMovement.bind(this));
      }
   }
}

export default ScrollScreen;
