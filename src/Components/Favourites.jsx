import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom"
import { favcards } from "./Home"
import CardFunction from "./CardFunction";
import dark from "./night-mode.png"


function Favourites(props) {


    var [likedjoke, SetLikedJokes] = useState([])
    var [likedquote, SetLikedQuotes] = useState([])

    useEffect(() => {
        const storedFavJokes = JSON.parse(localStorage.getItem('favJokes')) || [];
        const storedFavQuotes = JSON.parse(localStorage.getItem('favJokes')) || [];
        SetLikedJokes(storedFavJokes)
        SetLikedQuotes(storedFavQuotes)
    }, []);

    useEffect(() => {
        for (let i = 0; i < favcards.length; i++) {
            SetLikedJokes((prevValue) => {
                return [...prevValue, favcards[i].data1]
            })
        }
        for (let j = 0; j < favcards.length; j++) {
            SetLikedQuotes((prevValue) => {
                return [...prevValue, favcards[j].data2]
            })
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('favJokes', JSON.stringify(likedjoke));
        localStorage.setItem('favQuotes', JSON.stringify(likedquote));
    })

    useEffect(() => {
        localStorage.setItem('favCardJokes', JSON.stringify(likedjoke));
        localStorage.setItem('favCardQuotes', JSON.stringify(likedquote));
    }, [likedjoke, likedquote]);

    useEffect(() => {
        const clearLocalStorageBeforeRefresh = () => {
            localStorage.clear();
        };

        window.addEventListener('beforeunload', clearLocalStorageBeforeRefresh);

        return () => {
            window.removeEventListener('beforeunload', clearLocalStorageBeforeRefresh);
        };
    }, []);



    return (
        <div>
            <div className='navbar'>
                <div className='heading'>Jokes And Quotes</div>
                <Link to='/'>
                    <button type="button" className="btn btn-primary ">Home</button>
                </Link>
                    <button type="button" className="btn btn-primary ">Favourites</button>
                <img src={dark} alt="dark mode icon" id="icon"></img>
            </div>
            <div className='container'>
                {likedjoke.map((elem, id) => {
                    return <CardFunction key={id} id={id} AllJokes={likedjoke} AllQuotes={likedquote} likedornot={true} />
                })
                }
            </div>
        </div>
    )
}
export default Favourites;