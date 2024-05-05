const { Assets, Sprite } = PIXI;

class Player {
   dist_from_center = 0;
   face_direction = 1;

   #sprite_scale;
   #sprite;
   #screen_bound;

   constructor() {}

   async init(container) {
      const texture = await Assets.load('/images/mars/player_00.png');
      const sprite = new Sprite(texture);

      this.#sprite_scale = 150 / sprite.width;
      sprite.scale = this.#sprite_scale;
      sprite.anchor.set(0.5, 0.5);
      sprite.zIndex = 100;

      const { width, height } = window._APP_CANVAS;
      const ground_height = height - height / 3;
      sprite.x = sprite.width / 2;
      sprite.y = ground_height;

      this.dist_from_center = window._APP_CANVAS.width - sprite.width / 2;

      container.addChild(sprite);

      this.#sprite = sprite;
      this.#screen_bound = width - sprite.width / 2 + 32;
   }

   get x() {
      return this.#sprite.x;
   }

   get y() {
      return this.#sprite.y;
   }

   get width() {
      return this.#sprite.width;
   }

   move = (x, y, allow_x_movement) => {
      if (!x || !y) {
         return;
      }

      const ground_y_bound = window.innerHeight - window.innerHeight / 3 - this.#sprite.height / 2;
      const screen_y_bound = window.innerHeight - this.#sprite.height;

      this.#sprite.y -= y * 0.01;
      if (this.#sprite.y < ground_y_bound) {
         this.#sprite.y = ground_y_bound;
      } else if (this.#sprite.y > screen_y_bound) {
         this.#sprite.y = screen_y_bound;
      }

      this.face_direction = +x >= 0 ? 1 : -1;
      const scale = this.#sprite_scale * this.face_direction;
      this.#sprite.scale.x = scale;

      if (allow_x_movement) {
         this.#sprite.x += x * 0.01;

         if (this.#sprite.x < -32) {
            this.#sprite.x = -32;
         } else if (this.#sprite.x > this.#screen_bound) {
            this.#sprite.x = this.#screen_bound;
         }
      }

      this.dist_from_center = this.#sprite.x - window._APP_CANVAS.width / 2;
   };
}

export default Player;
