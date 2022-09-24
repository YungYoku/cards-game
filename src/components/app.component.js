import { Component } from "../core/component";
import { GameComponent } from "./game.component";
import { SettingsPopup } from "./settings.popup";
import { MenuComponent } from "./menu.component";
import { RatingPopup } from "./rating.popup";

export class AppComponent extends Component {
  constructor(className) {
    super(className);

    if (!localStorage.rating)
      localStorage.rating = JSON.stringify({
        summary: [],
        1: [],
        2: [],
        3: [],
        4: [],
      });
    if (!localStorage.difficulty) localStorage.difficulty = 1;
    if (!localStorage.music) localStorage.music = true;
    if (!localStorage.sound) localStorage.sounds = true;

    this.rating = new RatingPopup("rating");
    this.settings = new SettingsPopup("settings");
    this.game = new GameComponent("game", {
      sound: this.settings.sound,
      music: this.settings.music,
    });
    this.menu = new MenuComponent("menu");

    this.game.onHide = () => {};
    this.game.beforeHideGame = () => {
      this.menu.show();
      this.fromGame();
    };

    this.menu.toRating = () => {
      this.rating.show();
    };
    this.menu.toSettings = () => {
      this.settings.show();
    };
    this.menu.startGame = () => {
      this.toGame();
      this.game.show();
      setTimeout(() => {
        this.menu.hide();
      }, 1000);
    };

    this.settings.onHide = () => {
      this.menu.show();
      this.fromGame();
    };

    this.rating.onHide = () => {
      this.menu.show();
    };

    this.startApp();
  }

  startApp() {
    setTimeout(() => {
      this.$el.style.top = "0";
      this.$el.querySelector(".clouds").style.top = "-100vh";
      setTimeout(() => {
        this.$el.querySelector(".clouds").style.display = "none";
      }, 1000);
    }, 2000);
  }

  toGame() {
    this.$el.style.top = "100vh";
  }

  fromGame() {
    this.$el.style.top = "0";
  }
}
