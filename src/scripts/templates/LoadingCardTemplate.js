export const LoadingCardTemplate = () => {
    return /* html */`
      <article class="recipe col-4 my-3">
        <div class="card">
          <img class="card-img-top" src="" alt="..." />
          <div class="card-body flex-grow-0">
            <div class="row placeholder-glow">
              <h2 class="card-title fs-5 col text-nowrap overflow-hidden placeholder"></h2>
              <span class="card-text col-3"><i class="far fa-clock"></i> <strong class="placeholder"></strong></span>
            </div>
          </div>
          <div class="card-body overflow-hidden flex-grow-1">
            <div class="row placeholder-glow">
              <ul class="list-group list-group-flush col-6 placeholder-glow">
                <li class="placeholder"></li>
                <li class="placeholder"></li>
              </ul>
              <p class="col placeholder">${description}</p>
            </div>
          </div>
        </div>
      </article>
    `
  }
