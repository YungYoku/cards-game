import { SettingsStore } from "../stores/settings.store";
import imageTitle from "../assets/images/settings/title.png";
import buttonClose from "../assets/images/close.png";
import buttonOn from "../assets/images/settings/btnOn.png";
import { Popup } from "../core/popup";
import { MusicToggle } from "./music.toggle";
import { SoundToggle } from "./sound.toggle";

export class SettingsPopup extends Popup {
    constructor(className) {
        super(className);
    }

    onInit() {
        this.difficulty = SettingsStore.getDifficulty();
        this.cardsAmount = SettingsStore.getCardsAmount();

        this.$el.addEventListener("click", clickHandler.bind(this));
        this.renderSettings();

        this.music = new MusicToggle("settings__music", "music");
        this.sound = new SoundToggle("settings__sound", "sound");
    }

    approveSettings() {
        this.hide();
    }

    switchMusic() {
        this.music.toggle();
    }

    switchSound() {
        this.sound.toggle();
    }

    setDifficulty(difficulty) {
        this.$el
            .querySelector(".settings__board__difficulty__buttons")
            .querySelectorAll("button")
            .forEach((el) => el.classList.remove("active-difficulty"));
        this.difficulty = difficulty;
        SettingsStore.setDifficulty(difficulty);
        this.setActiveButton();
    }

    renderSettings() {
        this.$el.innerHTML = "";
        this.$el.insertAdjacentHTML(
            "beforeend",
            `
            <div class="settings__board">
                <img
                    class="popup__title"
                    src="${imageTitle}"
                    alt="НАСТРОЙКИ"
                />
                
                <button 
                    data-action="close"
                    class="popup__close"
                >
                    <img
                        src="${buttonClose}"
                        alt="Закрыть"
                    />
                </button>
    
                <div class="settings__board__music">
                    <span>МУЗЫКА</span>
                    
                    <button 
                        class="settings__board__button settings__music"
                        data-action="switchMusic"
                    >
                        <span
                            class="settings__board__button__title"
                            data-action="switchMusic"
                        >
                            ON
                        </span>
                        
                        <img
                            class="settings__board__button__img"
                            data-action="switchMusic"
                            src="${buttonOn}"
                            alt="Вкл"
                        />
                    </button>
                </div>
    
                <div class="settings__board__sounds">
                    <span>ЗВУК</span>
                    
                    <button
                        class="settings__board__button settings__sound"
                        data-action="switchSound"
                    />
                        <span
                            class="settings__board__button__title"
                            data-action="switchSound">
                            ON
                        </span>
                        
                        <img
                            class="settings__board__button__img"
                            data-action="switchSound"
                            src="${buttonOn}"
                            alt="Вкл"
                        />
                    </button>
                </div>
    
                <div class="settings__board__difficulty">
                    <h3>ВЫБЕРИТЕ УРОВЕНЬ:</h3>
                    
                    <div class="settings__board__difficulty__buttons">
                        <button data-difficulty="1">ЛЕГКИЙ</button>
                        <button data-difficulty="2">СРЕДНИЙ</button>
                        <button data-difficulty="3">СЛОЖНЫЙ</button>
                        <button data-difficulty="4">ОЧЕНЬ СЛОЖНЫЙ</button>
                    </div>
                </div>
            </div>
        `
        );

        this.setActiveButton();
    }

    setActiveButton() {
        const array = [];

        this.$el
            .querySelector(".settings__board__difficulty__buttons")
            .querySelectorAll("button")
            .forEach((el) => array.push(el));

        array
            .find((el) => el.dataset.difficulty === String(this.difficulty))
            .classList.add("active-difficulty");
    }
}

function clickHandler(event) {
    const dataset = event.target.dataset;

    if (dataset.action) {
        switch (dataset.action) {
            case "approve":
                this.approveSettings();
                break;
            case "close":
                this.approveSettings();
                break;
            case "switchMusic":
                this.switchMusic();
                break;
            case "switchSound":
                this.switchSound();
                break;
        }
    }

    if (dataset.difficulty) {
        this.setDifficulty(Number(dataset.difficulty));
    }
}
