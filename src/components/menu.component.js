import {Component} from "../core/component";
import imgRating from "../assets/images/menu/rating.png";
import imgSettings from "../assets/images/menu/settings.png";
import imgTitle from "../assets/images/menu/title.png";
import imgPlay from "../assets/images/menu/play.png";
import imgIsland from "../assets/images/menu/island.png";
import imgBigClouds from "../assets/images/menu/bigClouds.png";
import imgSmallClouds from "../assets/images/menu/smallClouds.png";

export class MenuComponent extends Component {
    constructor(className) {
        super(className);
    }

    onInit() {
        this.show();

        this.renderMenu();
        this.$el.addEventListener("click", clickHandler.bind(this));

        setTimeout(() => {
            this.$el
                .querySelectorAll(".menu__startAnimation")
                .forEach((el) => el.classList.remove("menu__startAnimation"));
        }, 4000);
    }

    renderMenu() {
        const html = `
             <header class="menu__startAnimation">
                <button 
                    data-action="rating"
                    class="menu__button"
                >
                    <img
                        src="${imgRating}" 
                        alt="Рейтинг">
                </button>
                
                <button 
                    data-action="settings"
                    class="menu__button"
                >
                    <img
                        src="${imgSettings}" 
                        alt="Настройки">
                </button>
            </header>
            
            <div class="menu__startAnimation">
                <img
                    class="menu__title"
                    src="${imgTitle}" 
                    alt="Найди пару">
            </div>
            
            <div class="menu__startAnimation">
                <button 
                    data-action="startGame"
                    class="menu__startButton"
                >
                    <img
                        src="${imgPlay}" 
                        alt="Играть"/>
                </button>
            </div>
            
            <img
                class="menu__bigClouds menu__bigClouds1"
                src="${imgBigClouds}" 
                alt="Большие облака">
            <img
                class="menu__bigClouds menu__bigClouds2"
                src="${imgBigClouds}" 
                alt="Большие облака">
                
            <img
                class="menu__smallClouds menu__smallClouds1"
                src="${imgSmallClouds}" 
                alt="Маленькие облака">
            <img
                class="menu__smallClouds menu__smallClouds2"
                src="${imgSmallClouds}" 
                alt="Маленькие облака">
            
            <img
                class="menu__island"
                src="${imgIsland}" 
                alt="Острова">
        `;

        this.$el.innerHTML = "";
        this.$el.insertAdjacentHTML("beforeend", html);
    }

    toRating() {
    }

    toSettings() {
    }

    startGame() {
    }
}

function clickHandler(e) {
    if (e.target.dataset.action) {
        switch (e.target.dataset.action) {
            case "rating":
                this.toRating();
                break;
            case "settings":
                this.toSettings();
                break;
            case "startGame":
                this.startGame();
                break;
            default:
                break;
        }
    }
}
