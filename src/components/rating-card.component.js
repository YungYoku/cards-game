import imgAvatar from "../assets/images/rating/avatar.webp";
import imgLike from "../assets/images/rating/like.webp";

export class RatingCardComponent {
    constructor(score) {
        this.score = score;
    }

    render() {
        return `
           <div class="rating__board__scores__item">
              <img src="${imgAvatar}" alt="Аватарка">
              
              <div>
                  <h2>СЧЕТ:</h2>
                  <h3>${this.score}</h3>
              </div>
              
              <button>
                  <img src="${imgLike}" alt="Нравится">
              </button>
           </div>
        `;
    }
}
