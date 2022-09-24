import { RatingCardComponent } from "./rating-card.component";
import buttonClose from "../assets/images/close.png";
import { Popup } from "../core/popup";
import imageTitle from "../assets/images/rating__title.png";

export class RatingPopup extends Popup {
  constructor(className) {
    super(className);
  }

  onInit() {
    this.ratingCards = [];
    this.getInfo();
    this.render();
    this.renderCards();
    this.isMouseDown = false;

    this.$el.addEventListener("click", clickHandler.bind(this));
    this.$el
      .querySelector(".rating__board__scores")
      .addEventListener("scroll", scrollHandler.bind(this));
    this.$el
      .querySelector(".rating__board")
      .addEventListener("mousemove", mousemoveHandler.bind(this));

    this.$el.querySelector(".rating__board__scroll__controller").onmousedown =
      () => {
        this.isMouseDown = true;
      };
    this.$el.querySelector(".rating__board").onmouseup = () => {
      this.isMouseDown = false;
    };
  }

  onShow() {
    this.ratingCards = [];
    this.getInfo();
    this.renderCards();
  }

  toMenu() {
    this.hide();
  }

  getInfo() {
    const _ratingCards = JSON.parse(localStorage.rating);
    Object.keys(_ratingCards).forEach((key) => {
      _ratingCards[key].forEach((el) =>
        this.ratingCards.push(new RatingCardComponent(el.score))
      );
    });
  }

  render() {
    this.$el.insertAdjacentHTML(
      "beforeend",
      `
            <div class="rating__board">
                <img
                        class="popup__title"
                        src="${imageTitle}"
                        alt="РЕЙТИНГ">
                <button class="popup__close">
                    <img
                            data-action="close"
                            src="${buttonClose}"
                            alt="Закрыть">
                </button>
                <div class="rating__board__scoresWrap">
                    <div class="rating__board__scores"></div>
                </div>
                <div class="rating__board__scroll">
                    <div class="rating__board__scroll__controller"></div>
                </div>
            </div>
        `
    );
  }

  renderCards() {
    this.$el.querySelector(".rating__board__scores").innerHTML = "";

    if (this.ratingCards.length) {
      for (let i = 0; i < this.ratingCards.length; i++) {
        this.$el
          .querySelector(".rating__board__scores")
          .insertAdjacentHTML("beforeend", this.ratingCards[i].render());
      }
    } else {
      this.$el
        .querySelector(".rating__board__scores")
        .insertAdjacentHTML("beforeend", `<h3>Список пуст</h3>`);
    }
  }
}

function clickHandler(e) {
  if (e.target.dataset.action) {
    switch (e.target.dataset.action) {
      case "close":
        this.toMenu();
        break;
    }
  }
}

function scrollHandler() {
  if (!this.isMouseDown) {
    this.$el.querySelector(".rating__board__scroll__controller").style.top =
      (this.$el.querySelector(".rating__board__scores").scrollTop /
        (this.$el.querySelector(".rating__board__scores").scrollHeight -
          this.$el.querySelector(".rating__board__scores").clientHeight +
          this.$el.querySelector(".rating__board__scroll__controller")
            .clientHeight)) *
        100 +
      "%";
  }
}

function mousemoveHandler(e) {
  if (
    this.$el.querySelector(".rating__board__scores").scrollHeight >
      this.$el.querySelector(".rating__board__scores").clientHeight &&
    this.isMouseDown
  ) {
    let newY =
      (e.pageY -
        (this.$el.querySelector(".rating__board").offsetTop +
          this.$el.querySelector(".rating__board__scroll").offsetTop +
          this.$el.querySelector(".rating__board__scroll__controller")
            .clientHeight /
            2)) /
      this.$el.querySelector(".rating__board__scroll").clientHeight;
    if (newY < 0) newY = 0;
    else if (newY > 0.97) newY = 0.97;
    this.$el
      .querySelector(".rating__board__scores")
      .scrollTo(
        0,
        (this.$el.querySelector(".rating__board__scores").scrollHeight -
          this.$el.querySelector(".rating__board__scores").clientHeight) *
          newY
      );
    this.$el.querySelector(".rating__board__scroll__controller").style.top =
      newY * 100 + "%";
  }
}
