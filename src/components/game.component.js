import { Component } from "@/core/component";
import { SettingsStore } from "@/stores/settings.store";
import { CardComponent } from "./card.component";
import card1 from "@/assets/images/game/cards/1.webp";
import card2 from "@/assets/images/game/cards/2.webp";
import card3 from "@/assets/images/game/cards/3.webp";
import card4 from "@/assets/images/game/cards/4.webp";
import card5 from "@/assets/images/game/cards/5.webp";
import card6 from "@/assets/images/game/cards/6.webp";
import card7 from "@/assets/images/game/cards/7.webp";
import card8 from "@/assets/images/game/cards/8.webp";
import card9 from "@/assets/images/game/cards/9.webp";
import card10 from "@/assets/images/game/cards/10.webp";
import card11 from "@/assets/images/game/cards/11.webp";
import card12 from "@/assets/images/game/cards/12.webp";
import card13 from "@/assets/images/game/cards/13.webp";
import card14 from "@/assets/images/game/cards/14.webp";
import card15 from "@/assets/images/game/cards/15.webp";
import card16 from "@/assets/images/game/cards/16.webp";
import card17 from "@/assets/images/game/cards/17.webp";
import card18 from "@/assets/images/game/cards/18.webp";
import { TimerComponent } from "./timer.component";
import { PausePopup } from "./pause.popup";
import { WinPopup } from "./win.popup";
import { LosePopup } from "./lose.popup";

export class GameComponent extends Component {
    constructor(className, options) {
        super(className);

        this.sound = options.sound;

        this.cards = [];
        this.cardImages = [
            card1,
            card2,
            card3,
            card4,
            card5,
            card6,
            card7,
            card8,
            card9,
            card10,
            card11,
            card12,
            card13,
            card14,
            card15,
            card16,
            card17,
            card18,
        ];
        this.destroyedCards = 0;
        this.firstCardId = this.secondCardId = 0;
        this.isAnimationGoing = false;
        this.animationTime = 500;

        this.pause = new PausePopup("game__pause", { music: options.music });
        this.win = new WinPopup("game__win");
        this.lose = new LosePopup("game__lose");
        this.timer = new TimerComponent("game__info__timer__time", this.lose);

        this.pauseVideoTimerShowing = false;
        this.pause.close = () => {
            this.pause.hide();
            this.timer.unpauseTimer();
        };
        this.pause.restart = () => {
            this.pause.showVideo();


            if (window.innerWidth < 768) {
                const closeVideoCallBack = () => {
                    this.pause.closeVideo();

                    document.removeEventListener("click", closeVideoCallBack);
                };

                setTimeout(() => {
                    document.addEventListener("click", closeVideoCallBack);
                }, 0);
            } else {
                this.pause.animateVideoCloseButton(9)
                    .then(() => {
                        this.pauseVideoTimerShowing = true;
                    });
            }
        };
        this.pause.closeVideo = () => {
            if (this.pauseVideoTimerShowing || window.innerWidth < 768) {
                this.pauseVideoTimerShowing = false;

                this.pause.hideVideo();
                this.pause.hideVideoCloseImg();
                this.startGame();
                this.unpauseGame();
            }
        };

        this.pause.leave = () => {
            this.beforeHideGame();
            this.pause.hide();
            setTimeout(() => {
                this.timer.reset();
                this.hide();
            }, 1000);
        };

        this.winVideoTimerShowing = false;
        this.win.onHide = () => {
            this.$el.querySelector(".game__board").innerHTML = "";
            this.cards = [];
        };
        this.win.leave = () => {
            this.win.hide();
            this.leave();
        };
        this.win.restart = () => {
            this.win.showVideo();

            if (window.innerWidth < 768) {
                const closeVideoCallBack = () => {
                    this.win.closeVideo();
                    document.removeEventListener("click", closeVideoCallBack);
                };

                setTimeout(() => {
                    document.addEventListener("click", closeVideoCallBack);
                }, 0);
            } else {
                this.win.animateVideoCloseButton(9)
                    .then(() => {
                        this.winVideoTimerShowing = true;
                    });
            }
        };
        this.win.closeVideo = () => {
            if (this.winVideoTimerShowing || window.innerWidth < 768) {
                this.winVideoTimerShowing = false;

                this.win.hide();
                this.win.hideVideoCloseImg();
                this.restart();
            }
        };

        this.lose.leave = () => {
            this.lose.hide();
            this.leave();
        };
        this.lose.restart = () => {
            this.lose.hide();
            this.restart();
        };
    }

    onInit() {
        this.$el.querySelector(".game__board").innerHTML = "";
        this.$el
            .querySelector(".game__board")
            .addEventListener("click", cardClickHandler.bind(this));
        this.$el
            .querySelector(".game__info")
            .addEventListener("click", topBarClickHandler.bind(this));
    }

    onShow() {
        this.startGame();
    }

    beforeHideGame() {
    }

    startGame() {
        this.cards = [];
        this.destroyedCards = 0;
        this.firstCardId = this.secondCardId = 0;
        this.isAnimationGoing = false;
        this.animationTime = 500;
        this.$el.querySelector(".game__board").innerHTML = "";
        this.shuffleCards();
        this.renderCards();
        this.timer.show();
    }

    startAnimation() {
        this.isAnimationGoing = true;
    }

    endAnimation() {
        setTimeout(() => {
            this.isAnimationGoing = false;
        }, this.animationTime);
    }

    renderCards() {
        this.$el.querySelector(".game__board").innerHTML = "";

        let gameSize = "game-3x3";
        switch (Number(SettingsStore.getCardsAmount())) {
            case 8:
                gameSize = "game-3x3";
                break;
            case 16:
                gameSize = "game-4x4";
                break;
            case 24:
                gameSize = "game-5x5";
                break;
            case 36:
                gameSize = "game-6x6";
                break;
        }
        this.$el
            .querySelector(".game__board")
            .classList.remove("game-3x3", "game-4x4", "game-5x5", "game-6x6");
        this.$el.querySelector(".game__board").classList.add(gameSize);

        this.cards.forEach((card) => {
            this.$el
                .querySelector(".game__board")
                .insertAdjacentHTML("beforeend", card.renderCard());
        });
    }

    shuffleCards() {
        const ids = [];
        for (let i = 1; i <= SettingsStore.getCardsAmount(); i++) {
            ids.push(i);
        }
        for (let i = 1; i <= SettingsStore.getCardsAmount(); i++) {
            let randId = Math.floor(Math.random() * ids.length);
            const newCard = new CardComponent({
                number: (i % (SettingsStore.getCardsAmount() / 2)) + 1,
                image: this.cardImages[i % (SettingsStore.getCardsAmount() / 2)],
                id: ids[randId],
            });
            ids.splice(randId, 1);
            this.cards.push(newCard);
        }
    }

    pauseGame() {
        this.timer.pauseTimer();
        this.pause.show();
    }

    unpauseGame() {
        this.timer.unpauseTimer();
        this.pause.hide();
    }

    restart() {
        this.timer.startTimer();
        this.timer.unpauseTimer();
        this.startGame();
    }

    leave() {
        this.lose.hide();
        this.pause.leave();
    }

    endGame() {
        this.timer.pauseTimer();
        this.win.show();
        this.win.win(this.timer.getTime());
    }
}

async function cardClickHandler(e) {
    if (
        e.target.dataset.id &&
        !this.isAnimationGoing &&
        e.target.dataset.usefull === "true"
    ) {
        this.sound.play();

        if (this.firstCardId && this.firstCardId === Number(e.target.dataset.id)) {
            this.cards.find((el) => el.id === this.firstCardId).rotateCard();
            this.firstCardId = 0;
            return;
        } else if (!this.firstCardId) {
            this.firstCardId = Number(e.target.dataset.id);
        } else {
            this.secondCardId = Number(e.target.dataset.id);
            this.startAnimation();
            if (
                this.cards.find((el) => el.id === this.firstCardId).number ===
                this.cards.find((el) => el.id === this.secondCardId).number
            ) {
                this.cards.find((el) => el.id === this.secondCardId).rotateCard();
                await new Promise((resolve) => {
                    setTimeout(() => {
                        this.cards.find((el) => el.id === this.firstCardId).destroyCard();
                        this.cards.find((el) => el.id === this.secondCardId).destroyCard();
                        this.destroyedCards += 2;
                        this.endAnimation();
                        setTimeout(() => {
                            this.firstCardId = this.secondCardId = 0;
                            if (this.destroyedCards === this.cards.length) this.endGame();
                            resolve();
                        }, this.animationTime);
                    }, this.animationTime);
                });
            } else {
                this.cards.find((el) => el.id === this.secondCardId).rotateCard();
                await new Promise((resolve) => {
                    setTimeout(() => {
                        this.endAnimation();
                        setTimeout(() => {
                            this.cards.find((el) => el.id === this.firstCardId).rotateCard();
                            this.cards.find((el) => el.id === this.secondCardId).rotateCard();
                            this.firstCardId = this.secondCardId = 0;
                            resolve();
                        }, this.animationTime);
                    }, this.animationTime);
                });
            }
            return;
        }
        this.cards.find((el) => el.id === this.firstCardId).rotateCard();
    }
}

function topBarClickHandler(e) {
    if (e.target.dataset.action === "pause") this.pauseGame();
}
