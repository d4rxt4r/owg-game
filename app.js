import MainMenu from './app/screens/Main.js';
import HomeDialog from './app/screens/Home.js';
import MagnitScreen from './app/screens/Magnit.js';
import MagnitDialog from './app/screens/MagnitDialog.js';

const { Application, Assets } = PIXI;

const APP_CONTAINER = document.getElementById('app');
const APP_SCREENS = [new MainMenu(), new HomeDialog(), new MagnitScreen(), new MagnitDialog()];

const app = new Application();
await app.init({ background: 'black', width: APP_CONTAINER.offsetWidth, height: APP_CONTAINER.offsetHeight });
APP_CONTAINER.prepend(app.canvas);

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
const joy_div = document.getElementById('joy_stick');
const action_button = document.getElementById('action_button');

const toggleControlsVisibility = () => {
   if (joy_div.style.display === 'none') {
      joy_div.style.display = 'block';
      action_button.style.display = 'block';
   } else {
      joy_div.style.display = 'none';
      action_button.style.display = 'none';
   }
};
toggleControlsVisibility();

let currentScreenId = 0;
// FIXME: store global vars in more better way
window._APP_CANVAS = app.canvas;
window._APP_WIDTH = app.canvas.width;
window._APP_HEIGHT = app.canvas.height;
window._JOY_STICK = joy_stick;
window._ACTION_BTN = action_button;
window._JOY_DIV = joy_div;
window._TOGGLE_CONTROLS = toggleControlsVisibility;
window._NEXT_SCREEN = async () => {
   APP_SCREENS[currentScreenId].destroy();

   currentScreenId += 1;
   if (currentScreenId === APP_SCREENS.length) {
      currentScreenId = 0;
   }

   await APP_SCREENS[currentScreenId].load();
   await APP_SCREENS[currentScreenId].create(app);
};

await APP_SCREENS[currentScreenId].load();
await APP_SCREENS[currentScreenId].create(app);
