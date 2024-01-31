import { File, Directory } from '../filesystem';

export const aboutDir = new Directory("about");

const overviewText = `
# About Me

---
Hello! I'm Luke Harwood, a Machine Learning Engineer & Software Developer currently working at Direct Supply.

---
Outside of work, I'm a Senior Computer Science student at the Milwaukee School of Engineering (MSOE). 
While there, I've been able to maintain a rigorous academic workload with exceptional performance while working up to 30 hours of work per week during the school year. 
Throughout my academic/personal career I have been able to use to demonstrate skills in Java, Kotlin, Python, Tensorflow, C++, Docker, HTML, CSS, Javascript and Typescript.

---
Since being introduced to programming through robotics in high school, I've enjoyed pursuing problem-solving through coding. After taking a Udemy course in data science, I fell in love with the ideas encapsulated by machine learning and artificial intelligence. This is what led me to pursue studies at MSOE to study computer science.
Since then I've enjoyed learning anything and everything related to software development, data science and computer networks.

---
`;

const overview = new File("overview.md", overviewText);

const contactMeText = `## Hi! 

I'm Luke Harwood. A Machine Learning Engineer & Software Developer currently working at Direct Supply.

## Contact Me

Email: \`lukeharwood11@gmail.com\`

Phone: \`+1 (414) 870-7336\`

LinkedIn: [LinkedIn: Luke Harwood](https://www.linkedin.com/in/lukeharwood-dev/)

Website: [https://lukeharwood.dev](https://lukeharwood.dev)
`
const contactMe = new File("contact-me.md", contactMeText);

aboutDir.addItems([overview, contactMe]);