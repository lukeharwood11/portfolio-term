import { File, Directory } from '../filesystem';

export const contribDir = new Directory("contributors");

// TODO: dynamically generate a list of files for each user
// Grab this list from the GitHub API

contribDir.addItems([]);
