import win1 from "../assets/images/win/1star.png";
import win2 from "../assets/images/win/2stars.png";
import win3 from "../assets/images/win/3stars.png";
import { SettingsStore } from "../stores/settings.store";
import { Popup } from "../core/popup";
import { EarnBlock } from "@/core/earnBlock.js";

export class WinPopup extends Popup {
    constructor(className) {
        super(className);

        this.video = this.$el.querySelector(".start_video");
        this.imgStars = [win1, win2, win3];
    }

    onInit() {
        this.$el.addEventListener("click", clickHandler.bind(this));

        new EarnBlock("game-win_yandex-video-pc", "R-A-1981741-2");
        new EarnBlock("game-win_yandex-video-laptop", "R-A-1981741-4");
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

    restart() {
    }

    leave() {
    }

    animateVideoCloseButton(videoLength) {
        const videoCloseButton = this.$el.querySelector(".video-close");
        const text = videoCloseButton.querySelector(".text");
        const img = videoCloseButton.querySelector(".video-close_img");

        text.innerHTML = "" + videoLength--;

        return new Promise(resolve => {
            const interval = setInterval(() => {
                if (videoLength >= 0) {
                    text.innerHTML = "" + videoLength--;
                } else {
                    text.innerHTML = "";
                    img.classList.remove("hide");
                    clearInterval(interval);
                    resolve();
                }
            }, 1000);
        });
    }

    hideVideoCloseImg() {
        const img = this.$el.querySelector(".video-close_img");
        img.classList.add("hide");
    }

    showVideo() {
        if (window.innerWidth < 768) {
            window.yaContextCb.push(() => {
                window.Ya.Context.AdvManager.render({
                    type: "fullscreen",
                    platform: "touch",
                    blockId: "R-A-1981741-5"
                });
            });
        } else {
            this.video.classList.remove("hide");
        }
    }

    hideVideo() {
        this.video.classList.add("hide");
    }

    closeVideo() {
        this.video.classList.add("hide");
    }
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
            case "closeVideo":
                this.closeVideo();
                break;
        }
    }
}
