import ActionScreen from '../classes/ActionScreen.js';

class MagnitScreen extends ActionScreen {
   constructor() {
      const objects = [
         {
            x: 1040,
            y: -30,
            sprite: '/images/npc/varya_00.png',
            width: 90,
            action: () => {
               window._NEXT_SCREEN();
            }
         }
      ];

      super(
         {
            bg_path: '/images/level/magnit_00.png'
         },
         objects
      );
   }
}

export default MagnitScreen;
