import { Manipulator } from './lib/Manipulator';
const manipulator = new Manipulator() 
const $ = (elm) => manipulator.selector(elm)

