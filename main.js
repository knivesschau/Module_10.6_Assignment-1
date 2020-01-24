'use strict';

function submitHandle() {
    $("#user-entry").on("submit", function(event) {
        event.preventDefault();
        const githandle = $("#handle-input").val();
        getRepos(githandle);
    });
}

function getRepos(githandle) {
    const url= `https://api.github.com/users/${githandle}/repos`;
    
    const repoHeads = {
        headers: new Headers({
            Accept: "application/vnd.github.v3+json"
        })
    };

console.log(`looking up ${githandle}`);

    fetch(url,repoHeads)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
            })
        .then(responseJson => showRepos(responseJson))
        .catch(error => {
            $("#error").text(`An error occurred: ${error.message}. Please try again later.`)
        });
}

function showRepos(responseJson) {
    console.log(responseJson);
    const userHandle = $("#handle-input").val();

    $("#repos-list").empty();

    responseJson.forEach(obj => 
        $("#repos-list").append(`<li><a href="${obj.url}">${obj.name}</a></li>`)
    );

    $("#handle-text").text(`${userHandle}:`);
    $("#repo-results").removeClass("hidden");
}

$(submitHandle);