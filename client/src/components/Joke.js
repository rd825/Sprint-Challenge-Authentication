import React from 'react';

const Joke = props => {
    return (
        <div className='joke'>
            <h4 className='setup' onClick={props.reveal}>{props.joke.setup}</h4>
            <p className='punchline'>{props.joke.punchline}</p>
        </div>
    )
}

export default Joke;