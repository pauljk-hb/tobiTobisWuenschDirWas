const send = document.querySelector("#send");

send.addEventListener("click", (event) => {
    const name = document.getElementById("name");
    const song = document.getElementById("song");
    const band = document.getElementById("band");
    const dance = document.getElementById("dance");

    let nameVal = name.value;
    let songVal = song.value;
    let bandVal = band.value;
    let danceVal = dance.value;
    let playedVal = false;

    const data = {
        nameVal,
        songVal,
        bandVal,
        danceVal,
        playedVal,
    };

    if (songVal != "" && bandVal != "" && danceVal != "") {
        onSubmit(data, event);
    }
});

function onSubmit(data, event) {
    event.preventDefault();
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };

    fetch("/api", options)
        .then((res) => res.json())
        .then((resData) => {
            popUp(resData);
        })
        .catch((err) => {
            popUp(err)
            console.log(err)
        });
}

function popUp(resData) {
    let modal = document.querySelector('#dialog');
    modal.showModal();
    
    if(resData.status !== 'success'){
        modal.querySelector('h1').innerText = 'Leider ist ein Fehler aufgetreten';
        modal.querySelector('p').innerText = 'Überprüfe deine Internetverbindung und versuche es am besten nochmal!';
    }

    document.querySelector('#close-modal').addEventListener('click', ()=>{
        modal.close();
        location.reload();
    })
}


window.addEventListener("DOMContentLoaded", async () => {
    const dataPlay = await fetch("/tobi-played");
    const jsonDataPlay = await dataPlay.json();
    const dataWish = await fetch("/tobi-wishes");
    const jsonDataWish = await dataWish.json();

    let wish = document.getElementById("wishes");
    let play = document.getElementById("play");

    for (let i = 0; i < jsonDataWish.length; i++) {
        let container = document.createElement("div");
        let title = document.createElement("p");
        let img = document.createElement("img");
        let artist = document.createElement("p");

        title.textContent = jsonDataWish[i].songVal;
        img.src = "images/dancer.webp";
        artist.textContent = jsonDataWish[i].bandVal;

        wish.appendChild(container);
        container.appendChild(title);
        container.appendChild(img);
        container.appendChild(artist);
    }

    for (let i = 0; i < jsonDataPlay.length; i++) {
        let container = document.createElement("div");
        let title = document.createElement("p");
        let img = document.createElement("img");
        let artist = document.createElement("p");

        title.textContent = jsonDataPlay[i].songVal;
        img.src = "images/dancer.webp";
        artist.textContent = jsonDataPlay[i].bandVal;

        play.appendChild(container);
        container.appendChild(title);
        container.appendChild(img);
        container.appendChild(artist);
    }
});

var btn1 = document.getElementById("bt1");
var btn2 = document.getElementById("bt2");
var play = document.getElementById("play");
var wishes = document.getElementById("wishes");
var dance = document.getElementById("dance");

btn1.addEventListener("click", () => {
    btn1.style.backgroundColor = "#d65527";
    btn2.style.backgroundColor = "#f8af33";
    play.style.display = "none";
    wishes.style.display = "block";
});
btn2.addEventListener("click", () => {
    btn1.style.backgroundColor = "#f8af33";
    btn2.style.backgroundColor = "#d65527";
    play.style.display = "block";
    wishes.style.display = "none";
});

dance.addEventListener("change", selectOption, false);

function selectOption() {
    const selectedOption = this.options[this.selectedIndex].value;
    console.log(selectedOption);
    if (selectedOption == "") {
        this.style.color = "#f8af33";
        console.log(this.options[this.selectedIndex]);
    } else {
        this.style.color = "black";
    }
}

let headingPos = document.querySelector("h1").offsetTop;
window.onscroll = function () {
    if (window.pageYOffset > 0) {
        let opac = Math.pow(1 - window.pageYOffset / headingPos, 2.5);
        document.querySelector("#app").style.background =
            "linear-gradient(110deg, rgba(255, 255, 255," +
            opac +
            ") 10em, rgba(214, 85, 39, " +
            opac +
            ") 10em, rgba(214, 85, 39, " +
            opac +
            ") 12em, rgba(248, 175, 51, " +
            opac +
            ") 12em)no-repeat";
        document.querySelector("header").style.opacity = opac;
    }
};
