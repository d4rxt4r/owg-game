import MainScreen from '/app/screens/Main.js';
import HomeDialog from '/app/screens/Home.js';
import MagnitScreen from '/app/screens/Magnit.js';
import MagnitDialog from '/app/screens/MagnitDialog.js';

const { Application, Assets } = PIXI;

const APP_CONTAINER = document.getElementById('app');
const APP_SCREENS = [new MainScreen(), new HomeDialog(), new MagnitScreen(), new MagnitDialog()];

const app = new Application();
await app.init({ background: 'black', width: APP_CONTAINER.offsetWidth, height: APP_CONTAINER.offsetHeight });
APP_CONTAINER.prepend(app.canvas);
window._APP_CANVAS = app.canvas;

Assets.addBundle('fonts', [
   { alias: 'kongtext', src: '/fonts/kongtext.ttf' },
   { alias: 'ka1', src: '/fonts/ka1.ttf' }
]);
await Assets.loadBundle('fonts');

const joy_stick = new JoyStick('joy_stick', {
   width: 200,
   height: 200,
   internalFillColor: '#F9DF7E',
   // internalLineWidth,
   internalStrokeColor: '#F9DF7EAA',
   // externalLineWidth,
   externalStrokeColor: '#F9DF7E',
   autoReturnToCenter: true
});
const action_button = document.getElementById('action_button');
window._JOY_STICK = joy_stick;
window._JOY_DIV = document.getElementById('joy_stick');
window._ACTION_BTN = action_button;
window._JOY_DIV.style.display = 'none';
window._ACTION_BTN.style.display = 'none';

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
