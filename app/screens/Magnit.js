import ScrollScreen from '../classes/Scroll.js';

class MagnitScreen extends ScrollScreen {
   constructor() {
      const objects = [
         {
            x: 1040,
            y: -30,
            sprite: '/images/npc/varya_00.png',
            width: 90,
            action: () => {
               this.nextScreen();
            }
         }
      ];

      super('magnit_00', objects);
   }
}

export default MagnitScreen;
