export class Component {
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
        this.onShow();
    }

    hide() {
        this.$el.classList.add("hide");
        this.onHide();
    }
}
