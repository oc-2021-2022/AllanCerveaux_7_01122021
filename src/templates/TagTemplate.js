export const TagTemplate = (name, color) => /* html */`
  <div class="badge bg-${color} p-2">
    ${name}
    <span class="badge close"><i class="fas fa-times fa-lg"></i></span>
  </div>
`
