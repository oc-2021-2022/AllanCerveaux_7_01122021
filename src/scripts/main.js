import data from '../resources/data/recipes.json';
import { CardTemplate } from './CardTemplate';
import { Manipulator } from './lib/Manipulator';

const manipulator = new Manipulator() 
const $ = (elm) => manipulator.selector(elm)

const recipe_list = $('#recipe-list')

data.recipes.forEach(recipe => recipe_list.append(CardTemplate(recipe)))
