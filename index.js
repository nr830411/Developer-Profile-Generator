function initProgram() {
    const axios = require("axios");
    const inquirer = require("inquirer");
    const fs = require('fs');
    const pdf = require('html-pdf');

    let username;
    let userCompany;
    let userRealName;
    let profileImageURL;
    let userLocation;
    let userGitHubProfile;
    let userBlog;
    let userBio;
    let numberOfPublicRepos;
    let numberOfFollowers
    let numberOfGitHubStars;
    let numberOfUsersFollowing;
    let userFavColor;

    inquirer.prompt([{
        message: "Enter your GitHub username",
        name: "usernameProvided"
    },
    {
        message: "What is your favorite color?",
        name: "favoriteColor"
    }])


    .then(function ({ usernameProvided, favoriteColor }) {
        username = usernameProvided;
        userFavColor = favoriteColor;
        const queryUrl = `https://api.github.com/users/${username}`;
        goLookOne(queryUrl);
    });

    function goLookOne(URL) {
        axios.get(URL)
            .then(function (response) {
                profileImageURL = response.data.avatar_url;
                console.log(profileImageURL)
                userRealName = response.data.name;
                console.log(userRealName)
                userLocation = response.data.location;
                console.log(userLocation)
                userCompany = response.data.company;
                console.log(userCompany)
                userGitHubProfile = response.data.html_url;
                console.log(userGitHubProfile)
                userBlog = response.data.blog;
                console.log(userBlog)
                userBio = response.data.bio;
                console.log(userBio)
                numberOfPublicRepos = response.data.public_repos;
                console.log(numberOfPublicRepos)
                numberOfFollowers = response.data.followers;
                console.log(numberOfFollowers)
                numberOfUsersFollowing = response.data.following;
                console.log(numberOfUsersFollowing)
                makeHTMLFile(URL);
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () {
            });
    }
}

initProgram()
