import {recipes} from '../../resources/data/recipes.json'

export const search_by_name = (value) => recipes.filter(({ name }) => name.toLowerCase().includes(value))
