import { File, Directory } from '../filesystem';

export const experienceDir = new Directory("experience");

const neosoftText = ``;
const neosoft = new File("neosoft.md", neosoftText);

const dsText = ``;
const ds = new File("direct-supply.md", dsText);

experienceDir.addItems([neosoft, ds]);