import Screen from './Screen.js';
import Player from './Player.js';
import Interactable from './Interactable.js';
import Enemy from './Enemy.js';

const OBJ_TYPE = [Interactable, Enemy];

class ActionsScreen extends Screen {
   #player;

   #foreground;
   #screen_end;
   #foreground_locked = false;

   #objects;
   #objects_data = [];

   #destroyed = true;

   constructor(options, objects_data) {
      super(options);

      this.#objects_data = objects_data;
   }

   async load() {
      await super.load();

      window._TOGGLE_CONTROLS();

      this.#foreground = new PIXI.Container();

      this.#objects = [];
      for (const obj of this.#objects_data) {
         const itr = new OBJ_TYPE[obj.type](obj);
         await itr.init();
         this.#objects.push(itr);
      }

      this.#player = new Player();
      await this.#player.init(this.$container);

      this.#destroyed = false;
   }

   create(app) {
      this.$background.x = 0;
      this.$background.y = 0;
      this.$background.scale = app.canvas.height / this.$background.height;
      this.$background.zIndex = 0;
      this.#screen_end = this.$background.width - app.canvas.width;

      this.#foreground.addChild(this.$background);
      this.$container.addChild(this.#foreground);
      app.stage.addChild(this.$container);

      this.#placeObjects();
      this.#handleUpdate();

      window._ACTION_BTN.addEventListener('click', this.#actionHandler);
   }

   destroy() {
      window._TOGGLE_CONTROLS();
      window._ACTION_BTN.removeEventListener('click', this.#actionHandler);

      this.#destroyed = true;

      super.destroy();
   }

   #actionHandler = () => {
      this.#objects.forEach((obj) => {
         if (obj.is_close(this.#player, this.#foreground)) {
            obj.activate(this.#player, this.#foreground);
         }
      });
   };

   #placeObjects() {
      for (const obj of this.#objects) {
         obj.spawn(this.#foreground);
      }
   }

   #handleBackgroundMovement(x_pos) {
      if (this.#foreground_locked && this.#player.face_direction === 1 && this.#player.dist_from_center > 0) {
         this.#foreground_locked = false;
      } else if (this.#foreground_locked && this.#player.face_direction === -1 && this.#player.dist_from_center < 0) {
         this.#foreground_locked = false;
      }

      if (this.#foreground.x > -32) {
         this.#foreground.x = -32;
         this.#foreground_locked = true;
      } else if (this.#foreground.x < -this.#screen_end) {
         this.#foreground.x = -this.#screen_end;
         this.#foreground_locked = true;
      }

      if (!this.#foreground_locked) {
         this.#foreground.x -= x_pos * 0.01;
      }
   }

   #handleUpdate() {
      const joy_stick = window._JOY_STICK;
      const x = joy_stick.GetX();
      const y = joy_stick.GetY();

      this.#player.move(x, y, this.#foreground_locked);

      this.#handleBackgroundMovement(x);

      this.#objects.forEach((obj) => {
         obj.update(this.#player, this.#foreground);
      });

      if (!this.#destroyed) {
         requestAnimationFrame(this.#handleUpdate.bind(this));
      }
   }
}

export default ActionsScreen;
