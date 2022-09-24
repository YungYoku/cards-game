import { Component } from "../core/component";

export class TimerComponent extends Component {
  constructor(className, lose) {
    super(className);

    this.time = 60;
    this.paused = false;

    this.lose = lose;
  }

  onShow() {
    clearInterval(this.timer);
    this.unpauseTimer();
    this.startTimer();
  }

  onHide() {
    this.paused = false;
  }

  startTimer() {
    clearInterval(this.timer);
    this.setTimer();
    this.$el.innerHTML =
      "0" +
      (Math.floor(this.time / 60) + ":") +
      (this.time % 60 >= 10 ? this.time % 60 : "0" + ((this.time % 60) + ""));
    this.timer = setInterval(() => {
      if (!this.paused) {
        if (this.time > 0) {
          this.time--;
          this.$el.innerHTML =
            "0" +
            (Math.floor(this.time / 60) + ":") +
            (this.time % 60 >= 10
              ? this.time % 60
              : "0" + ((this.time % 60) + ""));
        } else {
          clearInterval(this.timer);
          this.lose.lose();
        }
      }
    }, 1000);
  }

  setTimer() {
    switch (Number(localStorage.difficulty)) {
      case 1:
        this.time = 60;
        break;
      case 2:
        this.time = 90;
        break;
      case 3:
        this.time = 120;
        break;
      case 4:
        this.time = 150;
        break;
    }
  }

  reset() {
    this.time = 60;
    this.paused = false;
    clearInterval(this.timer);
  }

  pauseTimer() {
    this.paused = true;
  }

  unpauseTimer() {
    this.paused = false;
  }

  getTime() {
    return this.time;
  }
}
