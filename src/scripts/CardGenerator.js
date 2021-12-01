import Manipulator from './lib/Manipulator.js';

export class CardGenerator {
  static render({ name, image = '', ingredients, time, description }) {
    return `
      <div class="column is-5">
        <div class="card">
          <div class="card-image has-background-grey-light">
            <figure class="image is-4by3">
              <img src="${image}" alt="${name}" />
            </figure>
          </div>
          <div class="card-content has-background-white-ter">
            <div class="media is-flex is-align-items-center is-justify-content-space-between">
              <div class="media-left is-flex-grow-1">
                <h3 class="title is-4">${name}</h3>
              </div>
              <div class="media-content is-flex-grow-0">
                <p class="title is-5"> 
                  <i class="far fa-clock"></i>
                  ${time} min
                </p>
              </div>
            </div>

            <div class="content columns">
              <ul class="column">
                ${ingredients.map(({ingredient, quantity, unit}) => `<li>${ingredient} ${quantity} ${unit}</li>`)}
              </div>
              <div class="column">${description}</div>
            </div>
          </div>
        </div>
      </div>
    `
  }
}
