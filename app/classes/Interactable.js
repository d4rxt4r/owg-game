const { Container, Assets, Sprite } = PIXI;

const MIN_RANGE = 130;

class Interactable extends Container {
   #options;
   #sprite;
   #sprite_tex;

   constructor(options = {}) {
      super();
      this.#options = options;
   }

   get o_x() {
      return this.#options.x;
   }

   get x() {
      return this.#sprite.x;
   }

   get y() {
      return this.#sprite.y;
   }

   set x(x) {
      this.#sprite.x = x;
   }

   async init() {
      this.#sprite_tex = await Assets.load(this.#options.sprite);
   }

   is_close(x, y) {
      const dist = Math.sqrt(Math.pow(x - this.#sprite.x, 2) + Math.pow(y - this.#sprite.y, 2));
      return dist < MIN_RANGE;
   }

   spawn(container) {
      this.#sprite = new Sprite(this.#sprite_tex);
      this.#sprite.x = this.#options.x;
      this.#sprite.y = this.#options.y + window.innerHeight - window.innerHeight / 3 - this.#sprite.height / 2;
      this.#sprite.scale = this.#options.width / this.#sprite.width;

      container.addChild(this.#sprite);
   }

   activate() {
      this.#options.action();
   }
}

export default Interactable;
