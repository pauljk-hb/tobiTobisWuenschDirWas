async function tobiGetData() {
    const data = await fetch('/tobi-wishes');
    const jsonData = await data.json();
    const content = document.getElementById('content');
    console.log(jsonData);

    content.replaceChildren();

    for (let item of jsonData) {
        let container = document.createElement('div');
        let song = document.createElement('p');
        let artist = document.createElement('p');
        let dance = document.createElement('p');
        let name = document.createElement('p');
        let playTd = document.createElement('div');
        let cancelTd = document.createElement('div');
        let divPlay = document.createElement('div');
        let play = document.createElement('img');
        let divCancel = document.createElement('div');
        let cancel = document.createElement('img');

        song.innerText = item.songVal
        artist.innerText = item.bandVal
        dance.innerText = item.danceVal
        name.innerText = item.nameVal
        play.src = './images/sound.webp'
        cancel.src = './images/cancel.webp'

        playTd.classList.add('play');
        cancelTd.classList.add('cancel');
        content.appendChild(container);

        container.appendChild(song);
        container.appendChild(artist);
        container.appendChild(dance);
        container.appendChild(name);

        container.appendChild(playTd);
        playTd.appendChild(divPlay);
        divPlay.appendChild(play);

        container.appendChild(cancelTd);
        cancelTd.appendChild(divCancel);
        divCancel.appendChild(cancel);
    };

    let play = document.getElementsByClassName('play');
    for (let i = 0; i < play.length; i++) {
        play[i].addEventListener('click', () => {
            let _id = jsonData[i]._id;
            let Data = { _id };
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(Data)
            };

            fetch('/tobi-change', options);

            tobiGetData();
        })
    }

    let cancel = document.getElementsByClassName('cancel');
    for (let i = 0; i < cancel.length; i++) {
        cancel[i].addEventListener('click', () => {
            let _id = jsonData[i]._id;
            let Data = { _id };
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(Data)
            };

            fetch('/tobi-remove', options);

            tobiGetData();
        })

    }
}

tobiGetData();

setInterval(tobiGetData, 30000)