import Interactable from './Interactable.js';
const { Tween } = createjs;

const SPEED = 1.2;
const ATTACK_VAL = 100;

class Enemy extends Interactable {
   #state = 0;
   #face_direction = -1;

   get type() {
      return 1;
   }

   spawn(container) {
      super.spawn(container);
      this.$sprite.anchor.set(0.5, -0.1);
   }

   activate(player, foreground) {
      this.#state = 2;

      Tween.get(this.$sprite)
         .to({ x: this.$sprite.x + player.face_direction * ATTACK_VAL }, 400)
         .call(() => {
            this.#state = 0;
         });
   }

   update(player, foreground) {
      const dist = Math.sqrt(
         Math.pow(player.x - (this.$sprite.x + foreground.x), 2) + Math.pow(player.y - this.$sprite.y, 2)
      );

      if (this.#state === 1 && dist > 200) {
         this.#state = 0;
      }

      if (this.#state === 0) {
         if (dist > 50) {
            this.moveTowardsPlayer(player, foreground);
         } else {
            this.#state = 1;
         }
      }
   }

   moveTowardsPlayer(player, foreground) {
      const angle = Math.atan2(player.y - this.$sprite.y, player.x - (this.$sprite.x + foreground.x));
      const x_t = Math.cos(angle) * SPEED;
      const y_t = Math.sin(angle) * SPEED;

      this.$sprite.x += x_t;
      this.$sprite.y += y_t;

      const new_face_dir = x_t > 0 ? 1 : -1;

      if (this.#face_direction !== new_face_dir) {
         this.#face_direction = new_face_dir;
         this.$sprite.scale.x *= -1;
      }
   }
}

export default Enemy;
