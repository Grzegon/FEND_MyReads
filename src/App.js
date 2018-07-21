import React, { Component } from 'react';
import './App.css';
import * as BooksAPI from './BooksAPI';
import BookShelf from './BookShelf/BookShelf.js';
import { Route } from 'react-router-dom';
import { BookSearch } from './BookSearch';

class App extends Component {
  state = {
    books: [],
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    });
  }

  groupByShelf = (books) => {
    const read = [];
    const wantToRead = [];
    const currentlyReading = [];

    books.forEach(book => {
      return book.shelf === 'read' ? read.push(book) :
        (book.shelf === 'wantToRead' ? wantToRead.push(book) : currentlyReading.push(book))
    });

    this.setState({
      groupedBooks: {
        read,
        wantToRead,
        currentlyReading
      }
    })
  }

  updateShelf = (book) => (event) => {
    const shelf = event.target.value;

    BooksAPI.update(book, shelf).then((res) => {
      if (book !== undefined) {
        book.shelf = shelf;

        this.setState({
          books: this.state.books.filter(b => b.id !== book.id).concat([book])
        })
      }
    })
  }

  render() {
    return (
      <div className="app">
        <Route path="/search" render={() => <BookSearch updateShelf={this.updateShelf} shelfBooks={this.state.books}/>} />
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf
                  books={this.state.books}
                  identifier={'wantToRead'}
                  updateShelf={this.updateShelf}
                  shelfTitle={'Want To Read'} />
              </div>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf
                  books={this.state.books}
                  identifier={'read'}
                  updateShelf={this.updateShelf}
                  shelfTitle={'Read'} />
              </div>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf
                  books={this.state.books}
                  identifier={'currentlyReading'}
                  updateShelf={this.updateShelf}
                  shelfTitle={'Currently Reading'} />
              </div>
            </div>
          </div>
        )} />
      </div>
    );
  }
}

export default App;
