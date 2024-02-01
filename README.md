# `PortTerm`

**Live Link: [terminal.lukeharwood.dev](https://terminal.lukeharwood.dev)**

## Welcome!

This is my portfolio website, but as a ✨linux terminal✨

The files represent content to explore regarding my skills, experience, contact information, etc. Anything that you would find on a normal portfolio. In order to navigate the system, you'll need to make use of bash commands (like `cd` to navigate, `ls` to find paths, and `cat` to view files).

It contains a pseudo-filesystem with permissions, a custom simplified bash engine, and simple command interface. This means that adding new commands is as simple as extending a base class and implementing your own business logic.


## Contribution

If you see a command that hasn't been implemented yet, or you see a way this project can be improved. Please contribute!

CI/CD is configured to deploy to staging when a pull request is created, and deploy to production when PRs are approved and merged.

### Ideas to expand `PortTerm`

- [ ] Add easter eggs throughout system
- [ ] Implement commands to add files/directories, or move/copy existing ones.
- [ ] Persist a session to local storage, so that changes to the system kept
- [ ] Add complexity to the bash parser to support piping and asychronous tasks
- [ ] Add autocomplete suggestions
