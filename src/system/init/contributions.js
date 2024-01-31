import { File, Directory } from '../filesystem';

export const contribDir = new Directory("contributors");

// Grab this list from the GitHub API
// Example Request

// [
//     {
//         "login": "lukeharwood11",
//         "id": 43397328,
//         "node_id": "MDQ6VXNlcjQzMzk3MzI4",
//         "avatar_url": "https://avatars.githubusercontent.com/u/43397328?v=4",
//         "gravatar_id": "",
//         "url": "https://api.github.com/users/lukeharwood11",
//         "html_url": "https://github.com/lukeharwood11",
//         "followers_url": "https://api.github.com/users/lukeharwood11/followers",
//         "following_url": "https://api.github.com/users/lukeharwood11/following{/other_user}",
//         "gists_url": "https://api.github.com/users/lukeharwood11/gists{/gist_id}",
//         "starred_url": "https://api.github.com/users/lukeharwood11/starred{/owner}{/repo}",
//         "subscriptions_url": "https://api.github.com/users/lukeharwood11/subscriptions",
//         "organizations_url": "https://api.github.com/users/lukeharwood11/orgs",
//         "repos_url": "https://api.github.com/users/lukeharwood11/repos",
//         "events_url": "https://api.github.com/users/lukeharwood11/events{/privacy}",
//         "received_events_url": "https://api.github.com/users/lukeharwood11/received_events",
//         "type": "User",
//         "site_admin": false,
//         "contributions": 26
//     }
// ]

const URL = "https://api.github.com/repos/lukeharwood11/portfolio-term/contributors";

async function addContributorFiles() {
    const res = await fetch(URL);
    const json = await res.json();

    const contributors = json.map((contributor) => {
        const { login, avatar_url, html_url, contributions } = contributor;
        const text = `![Avatar Image](${avatar_url}) [${login}](${html_url})${login === "lukeharwood11" ? " (me 😎)" : ""}\n\n\`${login}\` has made ${contributions} contributions.\n\n`
        return new File(`${login}.md`, text);
    });
    contribDir.addItems(contributors);
};

addContributorFiles();