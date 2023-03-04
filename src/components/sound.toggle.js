import {Toggle} from "../core/toggle";

export class SoundToggle extends Toggle {
    constructor(className, type) {
        super(className, "sound", type);
    }

    play() {
        if (!this.control.muted) {
            this.control.pause();
            this.control.currentTime = 0;
            this.control.play().then(() => {
            });
        }
    }
}
