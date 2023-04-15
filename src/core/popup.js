export class Popup {
    constructor(className) {
        this.$el = document.querySelector("." + className);

        this.onInit();
    }

    onInit() {
    }

    onShow() {
    }

    onHide() {
    }

    show() {
        this.$el.classList.remove("hide");
        setTimeout(() => {
            this.$el.classList.remove("hide-popup");
        }, 100);
        this.onShow();
    }

    hide() {
        this.$el.classList.add("hide-popup");
        setTimeout(() => {
            this.$el.classList.add("hide");
        }, 500);
        this.onHide();
    }
}
