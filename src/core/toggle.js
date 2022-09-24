import buttonOff from "../assets/images/settings__btnOff.png";
import buttonOn from "../assets/images/settings__btnOn.png";

export class Toggle {
    constructor(className, url, type) {
        this.$el = document.querySelector('.' + className)
        this.type = type
        this.control = document.querySelector('.' + url)
        this.control.controls = false
        this.control.volume = 0.1
        this.onInit()
    }

    onInit() {
        this.toggle()
        this.toggle()
        this.control.autoplay = true
    }

    turnOn() {
        this.control.muted = false

        this.$el
            .querySelector('span')
            .innerHTML = 'ON'

        this.$el
            .querySelector('img')
            .setAttribute('src', buttonOn)
        localStorage.setItem(this.type, 'true')
        this.$el.classList.remove('toggleOff')
    }

    turnOff() {
        this.control.muted = true

        this.$el
            .querySelector('span')
            .innerHTML = 'OFF'

        this.$el
            .querySelector('img')
            .setAttribute('src', buttonOff)
        localStorage.setItem(this.type, 'false')
        this.$el.classList.add('toggleOff')
    }

    toggle() {
        if (localStorage.getItem(this.type) === 'true') this.turnOff()
        else this.turnOn()
    }
}