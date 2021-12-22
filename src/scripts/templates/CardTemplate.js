export const CardTemplate = ({ id,name, image = 'https://via.placeholder.com/150', ingredients, time, description, ustensils, appliance }) => {
    return /* html */`
      <article class="recipe col-4 my-3" data-id="${id}">
        <div class="card">
          <img class="card-img-top" src="${image}" alt="${name} - ${ustensils.join(',')} - ${appliance}" />
          <div class="card-body flex-grow-0">
            <div class="row">
              <h2 class="card-title fs-5 col text-nowrap overflow-hidden">${name}</h2>
              <span class="card-text col-3"><i class="far fa-clock"></i> <strong>${time} min</strong></span>
            </div>
          </div>
          <div class="card-body overflow-hidden flex-grow-1">
            <div class="row">
              <ul class="list-group list-group-flush col-6">${ingredients.map(({ ingredient, quantity, unit }) => /* html */`<li class="list-group-item bg-transparent border-0 py-1"><strong>${ingredient}</strong> ${quantity ? `: ${quantity}` : ''} ${unit ?? ''}</li>`).join('')}</ul>
              <p class="col">${description}</p>
            </div>
          </div>
        </div>
      </article>
    `
  }
