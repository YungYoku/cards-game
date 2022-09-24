import { Toggle } from "../core/toggle";

export class SoundToggle extends Toggle {
  constructor(className, type) {
    super(className, "sound", type);
  }

  play() {
    this.control.play().then(() => {});
  }
}
