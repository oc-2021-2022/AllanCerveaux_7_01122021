export class Alert {
  constructor(type, message) {
    this.type = type
    this.message = message
  }

  template() {
    return /* html */`
      <div class="alert alert-${this.type}" id="search-alert" role="alert">
        <h2>${this.message}</h2>
      </div>
    `
  }

  display(parent) {
    if(document.getElementById('search-alert') === null) parent.append(this.template())
  }

  static remove() {
    document.getElementById('search-alert').remove()
  }
}
