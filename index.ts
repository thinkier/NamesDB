import fetch from "node-fetch";

fetch("https://checkip.amazonaws.com")
    .then(res => res.text())
    .then(body => {
        console.log(`${body}`);
    });