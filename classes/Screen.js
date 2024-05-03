class Screen {
   #paused = false;
   $objects = [];

   pause() {

   }

   destroy() {
      this.$objects.forEach((obj) => obj.destroy());
      this.$objects.length = 0;
   }
}

export default Screen;