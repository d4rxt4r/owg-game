import MainScreen from './screens/Main.js';
import HomeDialog from './screens/Home.js';
import MagnitScreen from './screens/Magnit.js';

const { Application } = PIXI;

const APP_CONTAINER = document.getElementById('app');
const APP_SCREENS = [new MainScreen(), new HomeDialog(), new MagnitScreen()];

const app = new Application();
await app.init({ background: 'white', width: APP_CONTAINER.offsetWidth, height: APP_CONTAINER.offsetHeight });
APP_CONTAINER.prepend(app.canvas);

let currentScreenId = 0;
const nextScreen = async () => {
   APP_SCREENS[currentScreenId].destroy();

   currentScreenId += 1;
   if (currentScreenId === APP_SCREENS.length) {
      currentScreenId = 0;
   }

   await APP_SCREENS[currentScreenId].init();
   APP_SCREENS[currentScreenId].create(app, nextScreen);
};

await APP_SCREENS[currentScreenId].init();
APP_SCREENS[currentScreenId].create(app, nextScreen);
