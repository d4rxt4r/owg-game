import MainScreen from './screens/Main.js';
import HomeDialog from './screens/Home.js';
import MagnitScreen from './screens/Magnit.js';

const { Application } = PIXI;

const APP_CONTAINER = document.getElementById('app');
const APP_SCREENS = [new MainScreen(), new HomeDialog(), new MagnitScreen()];

const app = new Application();
await app.init({ background: 'white', width: APP_CONTAINER.offsetWidth, height: APP_CONTAINER.offsetHeight });
APP_CONTAINER.prepend(app.canvas);

const JOY_W = 200;
const JOY_H = 200;
const joy_stick = new JoyStick('joy_stick', {
   width: JOY_W,
   height: JOY_H,
   internalFillColor: '#F9DF7E',
   // internalLineWidth,
   internalStrokeColor: '#F9DF7EAA',
   // externalLineWidth,
   externalStrokeColor: '#F9DF7E',
   autoReturnToCenter: true
});
const action_button = document.getElementById('action_button');
window._JOY_STICK = joy_stick;
window._ACTION_BTN = action_button;

let currentScreenId = 2;
const nextScreen = async () => {
   APP_SCREENS[currentScreenId].destroy();

   currentScreenId += 1;
   if (currentScreenId === APP_SCREENS.length) {
      currentScreenId = 0;
   }

   await APP_SCREENS[currentScreenId].init(app);
   APP_SCREENS[currentScreenId].create(app, nextScreen);
};

await APP_SCREENS[currentScreenId].init(app);
APP_SCREENS[currentScreenId].create(app, nextScreen);
