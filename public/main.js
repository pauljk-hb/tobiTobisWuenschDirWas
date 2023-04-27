const send = document.querySelector('button');

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

async function getData() {
    const data = await fetch('/tobi-played');
    const jsonData = await data.json();

    console.log(jsonData);
}
getData();

async function getData2() {
    const data = await fetch('/tobi-wishes');
    const jsonData = await data.json();

    console.log(jsonData);
}
getData2();