console.log('hello');
let currensong = new Audio();
let songname, cuurentfolder;

function convertSecondsToMinuteSeconds(seconds) {
    var minutes = Math.floor(seconds / 60);
    var remainingSeconds = seconds % 60;

    // Adding leading zeros
    var formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    var formattedSeconds = remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds;
    formattedSeconds = parseInt(formattedSeconds)
    return formattedMinutes + ":" + formattedSeconds;
}
async function getsongs(folder) {
    
    songtitle=[]
    cuurentfolder = folder;
    let s = await fetch(`http://127.0.0.1:5500/${cuurentfolder}/`);
    let response = await s.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
    console.log(as)
    let sk = [];
    songtitle=[]
    song=[]
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.pathname.endsWith(".mp3")) {
            sk.push(element.pathname);
            songtitle.push(element.title);
        }
    }
    console.log(sk)
    console.log("get song ho gya")
    return sk;
}

 const playmusic = (title,song) => {
    console.log("song"+songtitle)
    for (let index = 0; index < song.length ; index++) {
        if (title == songtitle[index]) {
            currensong.src = song[index];
            // let au = new Audio(song[index])
            currensong.play();
            songname = document.querySelector(".sinfo")
            songname.innerHTML = `<h4 class="allnames">${songtitle[index]}</h4>`;
            document.querySelector(".duration").innerHTML = `<h4 class="time">00:00/00:00</h4>`
        }
    }
}

async function main(folder) {
    songtitle=[]
    song=[]
    song = await getsongs(`allsong/${folder}`)
    console.log("1234")
    console.log(song)
    console.log(songtitle)


    
    let songs = document.querySelector(".song");
    console.log(songs)
document.querySelector(".song").innerHTML = "";
    for (const s of songtitle) {
        songs.innerHTML = songs.innerHTML + `<li>
                            <img class=" icon filter" src="icons8-musical-note-50.png" alt="" srcset="">
                            <div class="songinfo">
                                <div class="songname">${s}</div>
                                <div class="songartist">aditya</div>
                            </div>
                            <div>play now</div>
                            <div><i class="fa fa-play-circle"></i></div>
                        </li>`;
                        
    }
    console.log(songs)
    console.log("heloo")
    /*playlist song tab settings*/
    Array.from(document.querySelector(".song").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            console.log(e.querySelector(".songinfo").firstElementChild.innerHTML)
            play.innerHTML = `<i class="fa fa-pause" style="font-size:38px;"></i>`;
            console.log("gdgdg:"+e.querySelector(".songinfo").firstElementChild.innerHTML);
            console.log("1"+song)
            playmusic(e.querySelector(".songinfo").firstElementChild.innerHTML,song);
        })

    })
    /*play button settings*/
    play.addEventListener("click", () => {
        if (currensong.paused) {
            currensong.play()
            play.innerHTML = `<i class="fa fa-pause" style="font-size:38px;"></i>`

        }
        else {
            play.innerHTML = `<i class="fa fa-play-circle"></i>`
            currensong.pause()
        }
    })

    /*song time settings*/
    currensong.addEventListener("timeupdate", () => {
        console.log(currensong.currentTime, currensong.duration)
        document.querySelector(".duration").innerHTML = `<h4 class="time">${convertSecondsToMinuteSeconds(currensong.currentTime)} / ${convertSecondsToMinuteSeconds(currensong.duration)}</h4>`
        document.querySelector(".circle").style.left = (currensong.currentTime / currensong.duration) * 100 + "%";
    })

    /*seek bar settings*/
    document.querySelector(".seekbar").addEventListener("click", (el) => {
        let percent = (el.offsetX / el.target.getBoundingClientRect().width)
        document.querySelector(".circle").style.left = percent * 100 + "%";
        currensong.currentTime = ((currensong.currentTime) * percent) / 100;
    })
    //previous song
    previous.addEventListener("click", async () => {
        let index = song.indexOf(currensong.src.slice(21))

        play.innerHTML = `<i class="fa fa-pause" style="font-size:38px;"></i>`;
        if (index - 1 >= 0) {
            console.log("new"+songtitle[index - 1])
            await playmusic(songtitle[index - 1],song)
            
        }
        else {
            playmusic(songtitle[song.length - 1],song)
        }

    })
    //next song
    next.addEventListener("click", () => {
        let index = song.indexOf(currensong.src.slice(21))
        //if(song[index-1]<length)
        play.innerHTML = `<i class="fa fa-pause" style="font-size:38px;"></i>`
        if (index + 1 <= song.length - 1) {
            playmusic(songtitle[index + 1],song)
        }
        else {
            playmusic(songtitle[0],song)
        }
    })
    /*hambargue settings*/
    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = 0;
        document.querySelector(".left").style.height = 100 + "%";
        document.querySelector(".close").style.display = "block";
    })

    /* close hamburger settins*/
    document.querySelector(".close").addEventListener("click", () => {
        console.log("hello")
        document.querySelector(".left").style.left = "-100%"

    })

    /*volume settings*/
    document.querySelector(".volumebar").getElementsByTagName("input")[0].addEventListener("change", (er) => {
        console.log(er.target.value);
        currensong.volume = parseInt(er.target.value) / 100
    })

    currensong.addEventListener("ended", () => {
        let index = song.indexOf(currensong.src.slice(21))
        //if(song[index-1]<length)
        play.innerHTML = `<i class="fa fa-pause" style="font-size:38px;"></i>`
        if (index + 1 <= song.length - 1) {
            playmusic(songtitle[index + 1],song)
        }
        else {
            playmusic(songtitle[0],song)
        }
    });

    /*card playlist settings*/
    Array.from(document.getElementsByClassName("card")).forEach(es => {
        es.addEventListener("click", async item => {
            console.log(item.currentTarget.dataset.folder)
            await main(`${item.currentTarget.dataset.folder}`)
        })

    })


    
    //audio.play();

    /* audio.addEventListener("loadeddata", () => {
         let duration = audio.duration;
         console.log(duration)
     })*/
}
var songtitle = []// title of the song
var song //path of the song

main("ncs")

