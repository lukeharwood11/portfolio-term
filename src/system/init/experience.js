import { File, Directory } from '../filesystem';

export const experienceDir = new Directory("experience");

const neosoftText = ``;
const neosoft = new File("neosoft.md", neosoftText);
neosoft.setPermissions([]); // TODO: Remove after adding content

const dsText = ``;
const ds = new File("direct-supply.md", dsText);
ds.setPermissions([]); // TODO: Remove after adding content

experienceDir.addItems([neosoft, ds]);