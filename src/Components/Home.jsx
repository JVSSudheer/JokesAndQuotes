import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom"
import CardFunction from "./CardFunction"
import "../index.css"
import dark from "./night-mode.png"

var favcards=[]
function Cards() {

    var [jokes, setJoke] = useState([]);
    var [quotes, setQuote] = useState([]);
    var [likedcards, setLikedCards] = useState([]);

    useEffect(() => {
        fetch("https://official-joke-api.appspot.com/random_ten")
            .then(response => response.json())
            .then(data => {
                setJoke(data);
            })
            .catch(error => {
                console.log("error fetching data", error)
            })
    }, [])

    useEffect(() => {
        fetch("https://api.quotable.io/quotes/random?limit=10")
            .then(response => response.json())
            .then(data => {
                setQuote(data);
            })
            .catch(error => {
                console.log("error fetching data", error)
            })
    }, [])


    function CardsLiked(data) {
        setLikedCards((prevValue) => {
            return [...prevValue, data]
        })
    }
    console.log(likedcards)

     favcards=likedcards;
    return (
        <div>
            <div className='navbar'>
                <div className='heading'>Jokes And Quotes</div>
                <Link to='/'>
                    <button type="button" className="btn btn-primary ">Home</button>
                </Link>
                <Link to='Favourites'>
                    <button type="button" className="btn btn-primary ">Favourites</button>
                </Link>
                <img src={dark} alt="dark mode icon" id="icon"></img>
            </div>
            <div className='container'>
                {jokes.map((temp, id) => {
                    return <CardFunction key={id} id={id} AllJokes={jokes} AllQuotes={quotes} CardsLiked={CardsLiked} />
                })}
            </div>
        </div>
    )
}


export default Cards;
export { favcards }