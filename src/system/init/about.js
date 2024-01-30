import { File, Directory } from '../filesystem';

export const aboutDir = new Directory("about");

const contactMeText = ``;
const contactMe = new File("contact-me.md", contactMeText);

aboutDir.addItems([contactMe]);