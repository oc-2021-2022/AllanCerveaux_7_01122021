export const TagTemplate = (name, type) => {
  const color = () => {
    if (type === 'ingredient') return 'primary'
    else if (type === 'appliance') return 'green'
    else if (type === 'ustensil') return 'orange'
  }
  return /* html */`
    <div class="badge bg-${color()} text-capitalize p-2">
      ${name}
      <span class="badge close"><i class="fas fa-times fa-lg"></i></span>
    </div>
  `
}
