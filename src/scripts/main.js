import data from '../resources/data/recipes.json';
import { CardGenerator } from './CardGenerator';
import { Manipulator } from './lib/Manipulator';

const manipulator = new Manipulator() 
const $ = (elm) => manipulator.selector(elm)

const recipe_list = $('#recipe-list')

data.recipes.forEach(recipe => recipe_list.append(CardGenerator(recipe)))
