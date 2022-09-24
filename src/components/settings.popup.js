import { SettingsStore } from "../stores/settings.store";

import imageTitle from "../assets/images/settings__title.png";
import buttonApprove from "../assets/images/settings__approve.png";
import buttonClose from "../assets/images/close.png";
import buttonOn from "../assets/images/settings__btnOn.png";
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

  onShow() {
    this.setup = {
      difficulty: localStorage.difficulty,
      music: localStorage.music,
      sound: localStorage.sound,
    };
  }

  approveSettings() {
    this.hide();
  }

  closeSettings() {
    this.setDifficulty(Number(this.setup.difficulty));
    if (this.setup.music === "true") this.music.turnOn();
    else this.music.turnOff();
    if (this.setup.sound === "true") this.sound.turnOn();
    else this.sound.turnOff();
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
                <button class="settings__board__approve">
                    <img
                            data-action="approve"
                            src="${buttonApprove}"
                            alt="Подтвердить">
                </button>
                <img
                        class="popup__title"
                        src="${imageTitle}"
                        alt="НАСТРОЙКИ">
                <button class="popup__close">
                    <img
                            data-action="close"
                            src="${buttonClose}"
                            alt="Закрыть">
                </button>
    
                <div class="settings__board__music">
                    <span>МУЗЫКА</span>
                    <button 
                            class="settings__board__button settings__music"
                            data-action="switchMusic">
                        <span
                                class="settings__board__button__title"
                                data-action="switchMusic">ON</span>
                        <img
                                class="settings__board__button__img"
                                data-action="switchMusic"
                                src="${buttonOn}"
                                alt="Вкл">
                    </button>
                </div>
    
                <div class="settings__board__sounds">
                    <span>ЗВУК</span>
                    <button
                            class="settings__board__button settings__sound"
                            data-action="switchSound">
                        <span
                                class="settings__board__button__title"
                                data-action="switchSound">ON</span>
                        <img
                                class="settings__board__button__img"
                                data-action="switchSound"
                                src="${buttonOn}"
                                alt="Вкл">
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

function clickHandler(e) {
  if (e.target.dataset.action) {
    switch (e.target.dataset.action) {
      case "approve":
        this.approveSettings();
        break;
      case "close":
        this.closeSettings();
        break;
      case "switchMusic":
        this.switchMusic();
        break;
      case "switchSound":
        this.switchSound();
        break;
    }
  }
  if (e.target.dataset.difficulty) {
    this.setDifficulty(Number(e.target.dataset.difficulty));
  }
}
