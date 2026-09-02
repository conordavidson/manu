import Collection from './collection';
import Homepage from './homepage';
import Info from './info';
import Project from './project';
import Settings from './settings';
import Slide from './slide';

import * as RichText from './rich-text';

const Schemas = [
  Info,
  Project,
  Collection,
  Homepage,
  Slide,
  RichText.Base,
  RichText.Simple,
  Settings,
];

export default Schemas;
