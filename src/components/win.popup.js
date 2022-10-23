import win1 from "../assets/images/win/1star.png";
import win2 from "../assets/images/win/2stars.png";
import win3 from "../assets/images/win/3stars.png";
import { SettingsStore } from "../stores/settings.store";
import { Popup } from "../core/popup";

export class WinPopup extends Popup {
  constructor(className) {
    super(className);

    this.imgStars = [win1, win2, win3];
  }

  onInit() {
    this.$el.addEventListener("click", clickHandler.bind(this));
  }

  onWin(stars) {
    this.$el
      .querySelector(".game__win__board__stars__item")
      .setAttribute("src", this.imgStars[stars - 1]);
  }

  win(seconds) {
    const resultTime = seconds / SettingsStore.getTimeAmount();
    let stars = 1;
    if (resultTime > 0.4) stars = 3;
    else if (resultTime > 0.25) stars = 2;
    else if (resultTime > 0.1) stars = 1;
    this.onWin(stars);

    let newRating = JSON.parse(localStorage.rating);
    const newRatingCard = {
      score: SettingsStore.getTimeAmount() - seconds,
    };
    if (!newRating[localStorage.difficulty].includes(newRatingCard)) {
      newRating[localStorage.difficulty].push(newRatingCard);
      localStorage.rating = JSON.stringify(newRating);
    }

    this.$el.querySelector(".game__board__score__amount").innerHTML =
      SettingsStore.getTimeAmount() - seconds;

    let min = 150;
    newRating[localStorage.difficulty].forEach((el) => {
      min = el.score < min ? el.score : min;
      return true;
    });
    this.$el.querySelector(".game__board__bestScore__amount").innerHTML = min;
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
