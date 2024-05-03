const { Assets, Sprite } = PIXI;

class Player {
   #sprite;

   #screen_bound;

   constructor() {}

   async init(app, container) {
      const texture = await Assets.load('../tex/mars/player_00.png');
      const sprite = new Sprite(texture);

      sprite.scale = 0.5;
      // sprite.anchor.set(0.5);
      sprite.zIndex = 100;

      const ground_height = app.screen.height - app.screen.height / 3 - sprite.height;
      sprite.x = -32;
      sprite.y = ground_height;

      container.addChild(sprite);

      this.#sprite = sprite;
      this.#screen_bound = app.screen.width - sprite.width + 32;
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

   move = (x, y, bg_locked) => {
      const ground_y_bound = window.innerHeight - window.innerHeight / 3 - this.#sprite.height;
      const screen_y_bound = window.innerHeight - this.#sprite.height / 2 - ground_y_bound / 2;

      this.#sprite.y -= y * 0.01;
      if (bg_locked) {
         this.#sprite.x += x * 0.01;
      }

      if (this.#sprite.x < -32) {
         this.#sprite.x = -32;
      } else if (this.#sprite.x > this.#screen_bound) {
         this.#sprite.x = this.#screen_bound;
      }

      if (this.#sprite.y < ground_y_bound) {
         this.#sprite.y = ground_y_bound;
      } else if (this.#sprite.y > screen_y_bound) {
         this.#sprite.y = screen_y_bound;
      }
   };
}

export default Player;
