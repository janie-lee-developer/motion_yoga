import React, { Component } from 'react';
import axios from 'axios';
import Users from './Components/Users';

class App extends Component {
    constructor() {
        super();
        this.state = {
            users: [],
            loading: true
        }
    }

    async componentDidMount() {
        console.log('do you likes me?')
        this.setState({
            users: (await axios.get('/api/users')).data,
            loading: false
        });
    }

    render() {
        const { users, loading } = this.state;
        if (loading) {
            return '....loading';
        }
        return (
            <div>
                <Users users={ users }/>
            </div>
        )
    }
}

export default App;