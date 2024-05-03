class Screen {
   #paused = false;
   $container;

   init() {
      this.$container = new PIXI.Container();
   }

   pause() {

   }

   destroy() {
      this.$container.destroy();
   }
}

export default Screen;