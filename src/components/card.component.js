export class CardComponent {
  constructor(options) {
    this.cardShowing = false;
    this.onInit(options);
  }

  onInit(options) {
    this.number = options.number;
    this.image = options.image;
    this.id = options.id;
  }

  renderCard() {
    return `
            <div 
                class="card"
                style="grid-area: card${this.id}"
                id="card${this.id}">
                <div
                    class="card__front card-show" 
                    data-id="${this.id}"
                    data-usefull="true">
                </div>
                
                <div
                    class="card__back card-hide"
                    style="background: url('${this.image}') center / 100% 100% no-repeat">
                </div>
            </div>
        `;
  }

  showCard() {
    this.cardShowing = true;

    this.$el.querySelector(".card__front").classList.remove("card-show");
    this.$el.querySelector(".card__front").classList.add("card-hide");

    this.$el.querySelector(".card__back").classList.add("card-show");
    this.$el.querySelector(".card__back").classList.remove("card-hide");
  }

  hideCard() {
    this.cardShowing = false;

    this.$el.querySelector(".card__front").classList.add("card-show");
    this.$el.querySelector(".card__front").classList.remove("card-hide");

    this.$el.querySelector(".card__back").classList.remove("card-show");
    this.$el.querySelector(".card__back").classList.add("card-hide");
  }

  rotateCard() {
    this.$el = document.querySelector("#card" + this.id);

    if (this.cardShowing) this.hideCard();
    else this.showCard();
  }

  destroyCard() {
    this.$el.dataset.usefull = "false";
    this.$el.classList.add("card-destroy");
  }
}
