class Screen {
   #paused = false;
   $container;

   init() {
      this.$container = new PIXI.Container();
      window._JOY_DIV.style.display = 'none';
      window._ACTION_BTN.style.display = 'none';
   }

   pause() {}

   destroy() {
      this.$container.destroy();
   }
}

export default Screen;
