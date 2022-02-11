const searchButton = document.querySelector(".search-btn");
const reposButton = document.querySelector(".repos-btn");
const followersButton = document.querySelector(".followers-btn");
const userInput = document.querySelector("#username");

const repos = document.querySelector(".repos")
const followers = document.querySelector(".followers");

let userData;

const userSearch = () => {
    fetch(`https://api.github.com/users/${userInput.value}`, {
        method: "GET"
    }).then((response) => {
        return response.json();
    }).then((data) => {
        if (data.login) {
            userData = data;
            reposButton.style.display = "block";
            followersButton.style.display = "block";
        } else {
            let container = document.createElement("div");
            container.classList.add("error");
            container.insertAdjacentHTML("beforeend", `<h2>No user</h2>`);
            document.querySelector(".search").append(container);
        }
    });
}

const reposSearch = () => {
    fetch(`https://api.github.com/users/${userData.login}/repos`, {
        method: "GET"
    }).then((response) => {
        return response.json();
    }).then((data) => {
        reposButton.style.display = "none";
        repos.style.display = "flex";
        if (!!data.length) {
            data.forEach(repo => {
                let container = document.createElement("div");
                container.classList.add("repo");
                let markup = `
                    <h2>${repo.name}</h2>
                    <h4>${repo.description || "No description"}</h4>
                    <p>Is fork: ${repo.fork}</p>
                    <p>Size: ${repo.size}</p>
                    <a href="${repo.html_url}" target="_blank">Link</a>`;
                container.insertAdjacentHTML("beforeend", markup);
                repos.append(container);
            })
        } else {
            let container = document.createElement("div");
            container.classList.add("repo");
            container.insertAdjacentHTML("beforeend", `<h2>No repos</h2>`);
            repos.append(container);
        }
    });
}

const followersSearch = () => {
    fetch(`https://api.github.com/users/${userData.login}/followers`, {
        method: "GET"
    }).then((response) => {
        return response.json();
    }).then((data) => {
        followersButton.style.display = "none";
        followers.style.display = "flex";
        if (!!data.length) {
            data.forEach(follower => {
                let container = document.createElement("div");
                container.classList.add("follower");
                let markup = `
                    <h2>${follower.login}</h2>
                    <img src="${follower.avatar_url}" alt="image">
                    <a href="${follower.html_url}" target="_blank">Link</a>`;
                container.insertAdjacentHTML("beforeend", markup);
                followers.append(container);
            })
        } else {
            let container = document.createElement("div");
            container.classList.add("follower");
            container.insertAdjacentHTML("beforeend", `<h2>No followers</h2>`);
            followers.append(container);
        }
    });
}

const clearSearch = () => {
    repos.style.display = "none";
    followers.style.display = "none";
    reposButton.style.display = "none";
    followersButton.style.display = "none";

    let error = document.querySelector(".error");
    if (error) error.remove();
    document.querySelectorAll(".repo").forEach(repo => repo.remove());
    document.querySelectorAll(".follower").forEach(follower => follower.remove());
}

searchButton.addEventListener('click', userSearch);
reposButton.addEventListener('click', reposSearch);
followersButton.addEventListener('click', followersSearch);
userInput.addEventListener('input', clearSearch);
