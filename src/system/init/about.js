import { File, Directory } from '../filesystem';

export const aboutDir = new Directory("about");

const overviewText = `
# About Me

---
Hello! I'm Luke Harwood, a Data Scientist & Software Developer currently working at Direct Supply.

---
Outside of work, I'm a graduate student at the Milwaukee School of Engineering (MSOE) for machine learning engineering. 
For fun, I love learning new programming languages and building fun projects:)
---
Since being introduced to programming through robotics in high school, I've enjoyed pursuing problem-solving through coding. After taking a Udemy course in data science, I fell in love with the ideas encapsulated by machine learning and artificial intelligence. This is what led me to pursue studies at MSOE to study computer science.
Since then I've enjoyed learning anything and everything related to software development, and data science.

---
`;

const overview = new File("overview.md", overviewText);

const contactMeText = `## Hi! 

I'm Luke Harwood. A Machine Learning Engineer & Software Developer currently working at Direct Supply.

## Contact Me

Email: \`lukeharwood.dev@gmail.com\`

LinkedIn: [LinkedIn: Luke Harwood](https://www.linkedin.com/in/lukeharwood-dev/)

Website: [https://lukeharwood.dev](https://lukeharwood.dev)
`
const contactMe = new File("contact-me.md", contactMeText);

aboutDir.addItems([overview, contactMe]);
