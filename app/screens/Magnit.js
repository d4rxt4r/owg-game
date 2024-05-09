import ActionScreen from '../classes/ActionScreen.js';

class MagnitScreen extends ActionScreen {
   constructor() {
      const objects = [
         {
            type: 0,
            // x: 1040,
            x: 150,
            y: -30,
            sprite: './images/npc/varya_00.png',
            width: 90,
            action: () => {
               window._NEXT_SCREEN();
            }
         },
         {
            type: 1,
            x: 350,
            y: 50,
            sprite: './images/npc/dog_00.png',
            width: 200
         },
         // {
         //    type: 1,
         //    x: 250,
         //    y: 100,
         //    sprite: './images/npc/dog_00.png',
         //    width: 200
         // },
         // {
         //    type: 1,
         //    x: 300,
         //    y: 150,
         //    sprite: './images/npc/dog_00.png',
         //    width: 200
         // }
      ];

      super(
         {
            bg_path: './images/level/magnit_00.png'
         },
         objects
      );
   }
}

export default MagnitScreen;
