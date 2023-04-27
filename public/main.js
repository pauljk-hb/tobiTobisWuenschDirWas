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

var btn1 = document.getElementById('bt1');
var btn2 = document.getElementById('bt2');

btn1.addEventListener('click', () =>{
    btn1.style.backgroundColor = '#d65527';
    btn2.style.backgroundColor = '#f8af33';
    console.log(btn1)
})
btn2.addEventListener('click', () =>{
    btn1.style.backgroundColor = '#f8af33';
    btn2.style.backgroundColor = '#d65527';
    console.log(btn2)
})