import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import Book from '../Book/Book.js';
import './BookShelf.css';

/**
 * @author Grzegorz Perlak
 */
class BookShelf extends PureComponent {
    /**
     * Method filters books and lefts only those belonging to shelf
     */
    filterBooks = (books, identifier) => {
        return books.filter(book => book.shelf === identifier)
    }

    render() {
        const books = this.filterBooks(this.props.books, this.props.identifier);

        return books.length > 0 ? (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.shelfTitle}</h2>
                <Link to="/search"  >
                    <div className="bookshelf-add-book" />
                </Link>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.map(book => (
                            <li key={book.id}>
                                <Book
                                    image={book.imageLinks !== undefined ? (book.imageLinks.smallThumbnail !== undefined ? book.imageLinks.smallThumbnail : null) : null}
                                    title={book.title}
                                    authors={book.authors !== undefined ? book.authors : ['Unknown']}
                                    shelf={book.shelf}
                                    onOptionSelect={this.props.updateShelf(book)}
                                ></Book>
                            </li>)
                        )}
                    </ol>
                </div>
            </div>) : (
                <div className="bookshelf">
                    <h2 className="bookshelf-title">{this.props.shelfTitle}</h2>
                    <Link to="/search"  >
                        <div className="bookshelf-add-book" />
                    </Link>
                </div>)
    }
}

export default BookShelf;
