const send = document.querySelector('#send');

send.addEventListener('click', () => {

    const name = document.getElementById('name');
    const song = document.getElementById('song');
    const band = document.getElementById('band');
    const dance = document.getElementById('dance');

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
        playedVal
    };

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    fetch('/api', options);
})

window.addEventListener('DOMContentLoaded', async () => {
    const dataPlay = await fetch('/tobi-played');
    const jsonDataPlay = await dataPlay.json();
    const dataWish = await fetch('/tobi-wishes');
    const jsonDataWish = await dataWish.json();

    let wish = document.getElementById('wishes')
    let play = document.getElementById('play')
    
    for (let i = 0; i < jsonDataWish.length; i++) {
        let container = document.createElement('div');
        let title = document.createElement('p');
        let img = document.createElement('img');
        let artist = document.createElement('p');
        
        title.textContent = jsonDataWish[i].songVal;
        img.src = 'images/dancer.webp';
        artist.textContent = jsonDataWish[i].bandVal;
        
        wish.appendChild(container);
        container.appendChild(title);
        container.appendChild(img);
        container.appendChild(artist);
    }

    for (let i = 0; i < jsonDataPlay.length; i++) {
        let container = document.createElement('div');
        let title = document.createElement('p');
        let img = document.createElement('img');
        let artist = document.createElement('p');
        
        title.textContent = jsonDataPlay[i].songVal;
        img.src = 'images/dancer.webp';
        artist.textContent = jsonDataPlay[i].bandVal;
        
        play.appendChild(container);
        container.appendChild(title);
        container.appendChild(img);
        container.appendChild(artist);
    }
})

var btn1 = document.getElementById('bt1');
var btn2 = document.getElementById('bt2');
var play = document.getElementById('play');
var wishes = document.getElementById('wishes');

btn1.addEventListener('click', () => {
    btn1.style.backgroundColor = '#d65527';
    btn2.style.backgroundColor = '#f8af33';
    play.style.display = 'none';
    wishes.style.display = 'block';
})
btn2.addEventListener('click', () => {
    btn1.style.backgroundColor = '#f8af33';
    btn2.style.backgroundColor = '#d65527';
    play.style.display = 'block';
    wishes.style.display = 'none';
})