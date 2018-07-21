import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../BooksAPI';
import Book from '../Book/Book.js';
import './BookSearch.css';

/**
 * Class BookSearch search books on API and shows them on the page
 * 
 * @author Grzegorz Perlak
 */
class BookSearch extends PureComponent {
    state = {
        books: [],
    }

    /**
     * Method makes call to API with provided query
     */
    searchBooks = event => {
        const query = event.target.value;

        BooksAPI.search(query).then(res => {
            if (res instanceof Array) {
                // Checks if in found books are books already existing on bookshelfs
                const filtered = res.map(book => {
                    const bookOnShelf = this.props.shelfBooks.filter(shelfBook => shelfBook.id === book.id)[0];

                    book.shelf = bookOnShelf ? bookOnShelf.shelf : 'none';

                    return book;
                });

                this.setState({
                    books: filtered
                })
            } else {
                this.setState({
                    books: []
                })
            }
        })
    }

    render() {
        const books = this.state.books;

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" onChange={this.searchBooks} />
                    </div>
                </div>
                {books.length > 0 &&
                    <div className="search-books-results">
                        <ol className="books-grid">
                            {books.map(book =>
                                <li key={book.id}>
                                    <Book
                                        image={book.imageLinks !== undefined ? (book.imageLinks.smallThumbnail !== undefined ? book.imageLinks.smallThumbnail : null) : null}
                                        title={book.title}
                                        authors={book.authors !== undefined ? book.authors : ['Unknown']}
                                        shelf={book.shelf}
                                        onOptionSelect={this.props.updateShelf(book)}
                                    ></Book>
                                </li>)}
                        </ol>
                    </div>}
            </div>
        )
    }
}

export default BookSearch;
