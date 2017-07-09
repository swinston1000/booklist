import React, { Component } from 'react';
import BookList from './book-list';
import BookModal from './book-modal'
import BookNav from './book-nav'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      books: [],
      controls: { author: '', title: '', booksPerRow: 3 },
      booksPerRow: 3,
      showModal: false,
      bookToEdit: false
    };
    this.removeBook = this.removeBook.bind(this);
    this.updateBooks = this.updateBooks.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.updateFilter = this.updateFilter.bind(this);
  }

  openModal(bookToEdit) {
    this.setState({ showModal: true, bookToEdit: bookToEdit });
  }

  closeModal() {
    this.setState({ showModal: false, bookToEdit: false });
  }

  loadData() {
    fetch("./books.json")
      .then(response => response.json())
      .then(json => {
        this.setState({
          books: json,
        });
      });
  }

  componentWillMount() {
    this.loadData();
  }

  updateFilter(event) {

    const controls = Object.assign({}, this.state.controls);

    if (!event) {
      controls.author = "";
    } else {
      controls[event.target.name] = event.target.value;
    }

    this.setState({ controls: controls });
  }

  updateBooks(book) {
    const newBook = {
      "id": book.id ? book.id : new Date(),
      "volumeInfo": {
        "title": book.title,
        "authors": [book.author],
        "publishedDate": book.publishedDate,
        "imageLinks": {
          "thumbnail": book.image
        }
      }
    }

    let books = []
    if (this.state.bookToEdit) {
      books = this.state.books.map(b => b.id === book.id ? newBook : b)
    } else {
      if (this.state.books.filter(e => e.volumeInfo.title === newBook.volumeInfo.title).length > 0) {
        alert("Please choose a unique title")
        return false
      }
      books = this.state.books.concat(newBook)
    }
    this.setState({
      showModal: false,
      books: books
    })
    return true;
  }

  removeBook(id) {
    if (window.confirm("Are you sure you want to remove this book?")) {
      const books = this.state.books.filter(function(book) {
        return id !== book.id;
      });
      this.setState({ books: books });
    }
  }

  render() {

    return (
      <div className="container-fluid">
          <BookModal handleSubmit={this.updateBooks}
                     show={this.state.showModal} 
                     book={this.state.bookToEdit}
                     onHide={this.closeModal}/>
          <BookNav openModal={this.openModal}
                   controls={this.state.controls} 
                   updateFilter={this.updateFilter}
                   books={this.state.books} />
          <BookList openModal={this.openModal}
                    removeBook={this.removeBook}
                    booksPerRow={parseInt(this.state.controls.booksPerRow, 10)}
                    controls={this.state.controls}
                    books={this.state.books}/>
      </div>
    );
  }
}


export default App;
