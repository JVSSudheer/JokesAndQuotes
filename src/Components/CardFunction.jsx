import { useEffect, useState } from "react"
import "../index.css"
import sound from "./Rick-Roll.mp3"
import dark from "./night-mode.png"
import light from "./light-mode.png"

function CardFunction(props) {

    var [turn, setTurn] = useState(false)
    var [liked, setLiked] = useState(false)

    useEffect(() => {
        if (turn) {
            fetch("https://official-joke-api.appspot.com/random_joke")
                .then(response => response.json())
                .then(data => {
                    props.AllJokes[props.id] = data;
                })
                .catch(error => {
                    console.log("error fetching data", error);
                });
        } else {
            fetch("https://api.quotable.io/quotes/random")
                .then(response => response.json())
                .then(data => {
                    props.AllQuotes[props.id] = data[0];
                })
                .catch(error => {
                    console.log("error fetching data", error);
                });
        }
    }, [turn, props]);

    function Clicked(event) {
        var click = event.target;
        console.log(click)
        if (event.target.className === "specific-Card-joke" || event.target.className === "specific-Card-quote") {
            var audio = new Audio(sound);
            audio.play();
            turn ? click.style.transform = "rotateY(0deg)" : click.style.transform = "rotateY(180deg)";
            setTurn(!turn)
        }
    }

    function likes() {
        setLiked(!liked)
    }


    var icon = document.getElementById("icon");

    icon.onclick = function (){
        document.body.classList.toggle("dark-theme");
        if (document.body.classList.contains("dark-theme")) {
            icon.src = light;
            icon.alt= "light mode icon"
        }
        else {
            icon.src = dark;
            icon.alt= "dark mode icon"
        }
    }

    function handleLike(data) {
        likes()
        props.CardsLiked(data);
    }

    return (!turn) ? (
        <div className="specific-Card-joke" onClick={Clicked}>
            <p className="type">{props.AllJokes[props.id].type}</p>
            <p className="setup "> {props.AllJokes[props.id].setup}</p>
            <p className="punchline"> {props.AllJokes[props.id].punchline}</p>
            {!props.likedornot? <button className="liked" onClick={()=>{
                handleLike({ data1: props.AllJokes[props.id], data2: props.AllQuotes[props.id]})
            }
            }>
                {(!liked) ? "🤍" : "❤️"}
            </button>: <div></div>}
            </div>
    ) : (
        <div className='specific-Card-quote' onClick={Clicked}>
            <p className="content">{props.AllQuotes[props.id].content}</p>
            <p className="author"> {"-" + props.AllQuotes[props.id].author}</p>
            {!props.likedornot? <button className="liked" onClick={()=>{
                handleLike({ data1: props.AllJokes[props.id], data2:props.AllQuotes[props.id]})
            }
            
            }>
                {(!liked) ? "🤍" : "❤️"}
            </button>: <div></div>}
        </div>
    )
}

export default CardFunction;