import Plugin from "osbx/lib/core/plugin";
import { Easings, Layers, Options, Origins, random, randomFieldX, randomInt } from "osbx/lib/core/utils";

class osbx_particles extends Plugin {
    
    fairies(startTime: number, endTime: number) {

    }

    fog(startTime: number, endTime: number, vertical_position: number, height: number, density: number = 15) {
        for(let i = 0; i < density; i++) {
            const base_x = randomFieldX();
            const base_y = randomInt(vertical_position - (height/2), vertical_position + (height/2))
            const estart = randomInt(0, 3000);
            const length = base_x - Options.SCREEN_LEFT;
            const eduration = randomInt(10000, 20000);
            const espeed = estart + (length*10);
            const fadeValue = random(0.1, 0.5);

            let sprite = this.CreateSprite(`sb/s/s${randomInt(0, 8)}.png`, Layers.Foreground, Origins.Centre, {x: base_x, y: base_y});
            sprite.Rotate(startTime, 0, endTime, random(-3, 3));

            // First moveset
            sprite.MoveX(startTime + estart, base_x, startTime + estart + espeed, Options.SCREEN_LEFT);
            sprite.Fade(startTime + estart, 0, startTime + estart + 1000, fadeValue);


            // Start loop
            sprite.CreateLoop(startTime + estart + espeed, (endTime - startTime) / eduration, loop => {
                loop.MoveX(0, Options.SCREEN_RIGHT, eduration, Options.SCREEN_LEFT);
                loop.Fade(0, 0, 300, fadeValue);
                loop.Fade(eduration - 300, fadeValue, eduration, 0);
                return loop;
            });
        }
    }
}

export default new osbx_particles;
export { osbx_particles }
