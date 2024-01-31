import { File, Directory } from '../filesystem';

export const aboutDir = new Directory("about");

const contactMeText = `## Hi! 

I'm Luke Harwood. A Machine Learning Engineer & Software Developer currently working at Direct Supply.

## Contact Me

Email: \`lukeharwood11@gmail.com\`

Phone: \`+1 (414) 870-7336\`

LinkedIn: [LinkedIn: Luke Harwood](https://www.linkedin.com/in/lukeharwood-dev/)

Website: [https://lukeharwood.dev](https://lukeharwood.dev)
`
const contactMe = new File("contact-me.md", contactMeText);

aboutDir.addItems([contactMe]);