import { Popup } from "../core/popup";

export class LosePopup extends Popup {
  constructor(className) {
    super(className);
  }

  onInit() {
    this.$el.addEventListener("click", clickHandler.bind(this));
  }

  lose() {
    this.show();
  }

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
    }
  }
}
