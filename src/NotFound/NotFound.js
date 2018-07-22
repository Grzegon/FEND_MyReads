import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

class NotFound extends PureComponent {
    render() {
        return (
            <div className='container'>
                <h2>It seems like you are lost..</h2>
                <Link to='/' className='link'><h4>Let's go back HOME!</h4></Link>
            </div>
        )
    }
}

export default NotFound;