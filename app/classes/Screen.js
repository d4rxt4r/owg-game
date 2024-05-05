const { Assets, Sprite } = PIXI;
const { Tween } = createjs;

const DEFAULT_OPTIONS = {
   set_bg: true
};

class Screen {
   #paused = false;

   $options;
   $container;
   $background;

   constructor(options = {}) {
      this.$options = {
         ...DEFAULT_OPTIONS,
         ...options
      };
   }

   async load() {
      if (this.$options.bg_path) {
         this.$background = new Sprite(await Assets.load(this.$options.bg_path));
      }

      this.$container = new PIXI.Container();
   }

   create(app) {
      if (this.$options.set_bg && this.$background) {
         this.$container.addChild(this.$background);
         this.setBackground(this.$background.texture);
      }
   }

   setBackground(texture) {
      if (!this.$background) {
         this.$background = new Sprite(texture);
         this.$container.addChild(this.$background);
      } else {
         this.$background.texture = texture;
      }

      this.$background.x = 0;
      this.$background.y = 0;
      this.$background.scale = window._APP_WIDTH / this.$background.width;
      // bg change animation
      this.$background.alpha = 0;
      Tween.get(this.$background).to({ alpha: 1 }, 800);
   }

   destroy() {
      this.$container.destroy();
   }
}

export default Screen;
