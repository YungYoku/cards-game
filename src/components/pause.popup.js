import {Popup} from "../core/popup";

export class PausePopup extends Popup {
    constructor(className, options) {
        super(className);

        this.video = this.$el.querySelector(".start_video");
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

    close() {
    }

    restart() {
    }

    leave() {
    }

    animateVideoCloseButton(videoLength) {
        const videoCloseButton = this.$el.querySelector(".video-close");
        const text = videoCloseButton.querySelector(".text");
        const img = videoCloseButton.querySelector(".video-close_img");

        let i = videoLength / 1000;
        text.innerHTML = "" + i--;

        const interval = setInterval(() => {
            if (i >= 0) {
                text.innerHTML = "" + i--;
            } else {
                text.innerHTML = "";
                img.classList.remove("hide");
                clearInterval(interval);
            }
        }, 1000);
    }

    hideVideoCloseImg() {
        const img = this.$el.querySelector(".video-close_img");
        img.classList.add("hide");
    }

    showVideo() {
        this.video.classList.remove("hide");
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
            case "close":
                this.close();
                break;
            case "closeVideo":
                this.closeVideo();
                break;
        }
    }
}
