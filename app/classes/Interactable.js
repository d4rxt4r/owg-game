const { Container, Assets, Sprite } = PIXI;

const MIN_RANGE = 130;

class Interactable extends Container {
   $sprite;
   $marker;
   $options;

   constructor(options = {}) {
      super();
      this.$options = options;
   }

   get x() {
      return this.$sprite.x;
   }

   get y() {
      return this.$sprite.y;
   }

   get type() {
      return 0;
   }

   async init() {
      this.$sprite = new Sprite(await Assets.load(this.$options.sprite));
      if (this.type === 0) {
         this.$marker = new Sprite(await Assets.load('./images/action_marker.png'));
      }
   }

   is_close(player, foreground) {
      const dist = Math.sqrt(
         Math.pow(player.x - (this.$sprite.x + foreground.x), 2) + Math.pow(player.y - this.$sprite.y, 2)
      );

      return dist < (this.$options.max_range || MIN_RANGE);
   }

   update(player, foreground) {
      this.$marker.visible = this.is_close(player, foreground);
   }

   spawn(container) {
      this.$sprite.x = this.$options.x;
      this.$sprite.y = this.$options.y + window.innerHeight - window.innerHeight / 3 - this.$sprite.height / 2;
      this.$sprite.scale = this.$options.width / this.$sprite.width;

      if (this.type === 0) {
         this.$marker.anchor.set(0.5);
         this.$marker.scale = 0.5;
         this.$marker.visible = false;
         this.$marker.x = this.$options.x + this.$sprite.width / 2;
         this.$marker.y =
            this.$options.y +
            window.innerHeight -
            window.innerHeight / 3 -
            this.$sprite.height -
            this.$marker.height / 2;
         this.addChild(this.$marker);
      }

      this.addChild(this.$sprite);

      container.addChild(this);
   }

   activate() {
      this.$options.action?.();
   }
}

export default Interactable;
