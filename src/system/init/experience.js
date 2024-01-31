import { File, Directory } from '../filesystem';

export const experienceDir = new Directory("experience");

const neosoftText = `
# Neosoft (Software Development Intern)
## November 2021 - December 2022

At Neosoft I worked closely with other engineers to develop, test, and maintain a software application that was used to analyze medical imaging.

`;
const neosoft = new File("neosoft.md", neosoftText);

const dsText = `
# Direct Supply (Data Science Intern)
## January 2023 - Present

At Direct Supply I'm working as a part of a machine learning engineering team to build and deploy machine learning models and machine learning applications.
`;
const ds = new File("direct-supply.md", dsText);

experienceDir.addItems([neosoft, ds]);