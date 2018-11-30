import React, {Component} from 'react';
import axios from 'axios';
import Joke from './Joke';

export default class Jokes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jokes: null,
            loggedIn: false,
        }
    }

    authenticate = () => {
        const token = localStorage.getItem('token');
        const options = {
          headers: {
            authorization: token,
          },
        }
        if (token) {
          axios.get(`http://localhost:9000/api/jokes`, options)
            .then(res => {
              if (res.status === 200 && res.data) {
                this.setState({loggedIn: true, jokes: res.data})
              } else {
                throw new Error();
              }
            })
            .catch(err => {
              this.props.history.push('/login')
            })
        } else {
          this.props.history.push('/login')
        }
    }

    componentDidMount = () => {
        this.authenticate();
    }

    componentDidUpdate = (prevProps) => {
        const {pathname} = this.props.history;
        if (pathname === '/' && pathname !== prevProps.history.pathname){
          this.authenticate();
        }
    }

    revealPunchline = event => {
        event.preventDefault();
        event.target.nextSibling.classList.toggle('punchline')
    }


    render() { 
        if (this.state.jokes) {
            return (
                <>
                    <h1>Enjoy some dad jokes!</h1>
                    <h5>Click on a joke to reveal the punchline.</h5>
                    <div className='jokes'>
                        {this.state.jokes.map(joke => <Joke key={joke.id} joke={joke} reveal={this.revealPunchline} />)}
                    </div>
                </>
            )
        } else {
            return (
                <h1>Access denied. Please log in.</h1>
            )
        }
    }
}