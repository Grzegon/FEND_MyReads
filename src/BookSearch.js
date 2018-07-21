import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Book from './Book/Book.js';
import './BookSearch.css';

export class BookSearch extends PureComponent {
    state = {
        books: [],
    }

    searchBooks = event => {
        const query = event.target.value;

        BooksAPI.search(query).then(res => {
            if (res instanceof Array) {
                const filtered = res.map(book => {
                    const bookOnShelf = this.props.shelfBooks.filter(shelfBook => shelfBook.id === book.id)[0];
                    book.shelf = bookOnShelf ? bookOnShelf.shelf : '';

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
                        {/*
                             NOTES: The search from BooksAPI is limited to a particular set of search terms.
                             You can find these search terms here:
                             https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
 
                             However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                             you don't find a specific author or title. Every search is limited by search terms.
                        */}
                        <input type="text" placeholder="Search by title or author" onChange={this.searchBooks} />
                    </div>
                </div>
                {books.length > 0 &&
                    <div className="search-books-results">
                        <ol className="books-grid">
                            {books.map((book) =>
                                <li key={book.id}>
                                    <Book
                                        image={book.imageLinks !== undefined ? (book.imageLinks.smallThumbnail !== undefined ? book.imageLinks.smallThumbnail : null) : null}
                                        title={book.title}
                                        authors={book.authors !== undefined ? book.authors : ['Unknown']}
                                        shelf={book.shelf}
                                        onOptionSelect={this.props.updateShelf(book)}
                                    ></Book>
                                </li>
                            )}
                        </ol>
                    </div>}
            </div>
        )
    }
}