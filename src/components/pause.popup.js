import { Popup } from "../core/popup";

export class PausePopup extends Popup {
  constructor(className, options) {
    super(className);

    this.music = options.music;
  }

  onInit() {
    this.$el.addEventListener("click", clickHandler.bind(this));
  }

  onShow() {
    this.music.control.muted = true;
  }

  onHide() {
    this.music.control.muted = false;
  }

  close() {}

  restart() {}

  leave() {}
}

function clickHandler(e) {
  if (e.target.dataset.action) {
    switch (e.target.dataset.action) {
      case "restart":
        this.restart();
        break;
      case "leave":
        this.leave();
        break;
      case "close":
        this.close();
        break;
    }
  }
}
