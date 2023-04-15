import buttonOff from "../assets/images/settings/btnOff.png";
import buttonOn from "../assets/images/settings/btnOn.png";

export class Toggle {
    constructor(className, url, type) {
        this.$el = document.querySelector("." + className);
        this.control = null;
        this.type = type;
        this.url = url;
        this.onInit();
    }

    onInit() {
        document.addEventListener("click", this.firstTurnOn.bind(this), { once: true });
    }

    firstTurnOn() {
        this.control = document.querySelector("." + this.url);
        if (this.control) {
            this.control.controls = false;
            this.control.volume = 0.1;

            if (localStorage[this.type] === "true") {
                this.turnOn();
            } else {
                this.turnOff();
            }
        } else {
            throw new Error("Аудио не инициализированно");
        }
    }

    turnOn() {
        if (this.control) {
            this.control.autoplay = true;
            this.control.muted = false;

            this.$el.querySelector("span").innerHTML = "ON";

            this.$el.querySelector("img").setAttribute("src", buttonOn);
            localStorage[this.type] = "true";
            this.$el.classList.remove("toggleOff");
        }
    }

    turnOff() {
        if (this.control) {
            this.control.autoplay = false;
            this.control.muted = true;

            this.$el.querySelector("span").innerHTML = "OFF";

            this.$el.querySelector("img").setAttribute("src", buttonOff);
            localStorage[this.type] = "false";
            this.$el.classList.add("toggleOff");
        }
    }

    toggle() {
        if (this.control.muted) {
            this.turnOn();
        } else {
            this.turnOff();
        }
    }
}
