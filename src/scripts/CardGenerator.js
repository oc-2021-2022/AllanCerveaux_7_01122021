export const CardGenerator = ({ name, image = 'https://via.placeholder.com/150', ingredients, time, description }) => {
    return /* html */`
      <article class="col-4 my-3">
        <div class="card card-sizing">
          <img class="card-img-top" src="${image}" alt="${name}" />
          <div class="card-body flex-grow-0">
            <div class="row">
              <h2 class="card-title fs-4 col">${name}</h2>
              <span class="card-text col-3">${time} <i class="far fa-clock"></i></span>
            </div>
          </div>
          <div class="card-body overflow-hidden flex-grow-1">
            <div class="row bg-secondary bg-opacity-25">
              <ul class="list-group list-group-flush col-6">${ingredients.map(({ingredient, quantity, unit}) => /* html */`<li class="list-group-item bg-transparent border-0 py-1">${ingredient} ${quantity ?? ''} ${unit ?? ''}</li>`).join('')}</ul>
              <p class="col ">${description}</p>
            </duv>
          </div>
        </div>
      </article>
    `
  }
