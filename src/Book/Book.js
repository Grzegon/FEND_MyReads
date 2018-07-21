import React, { PureComponent } from 'react';
import './Book.css';

/**
 * Class book allows to render book object
 * 
 * @author Grzegorz Perlak
 */
class Book extends PureComponent {
    state = {
        shelf: ''
    }

    componentDidMount() {
        this.setState({
            shelf: this.props.shelf !== null ? this.props.shelf : 'none'
        })
    }

    render() {
        const { image, title, authors } = this.props;

        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url(' + image + ')' }}></div>
                    <div className="book-shelf-changer">
                        <select onChange={this.props.onOptionSelect} value={this.state.shelf}>
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                    <div className="book-title">{title}</div>
                    <div className="book-authors">{authors.join(' ')}</div>
                </div>
            </div>
        );
    }
}

export default Book;