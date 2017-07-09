import React, { Component } from 'react';
import SingleInput from './single-input';
import Select from './select';

class ControlForm extends Component {

  componentWillUpdate(nextProps, nextState) {
    for (let i = 0; i < nextProps.books.length; i++) {
      if (nextProps.controls.author === "" || nextProps.books[i].volumeInfo.authors[0] === nextProps.controls.author) {
        return
      }
    }
    this.props.updateFilter()
  }

  render() {

    const _unique = (list) => {
      return [...new Set(list)];
    };

    const authors = _unique(this.props.books.map(function(e) {
      return e.volumeInfo.authors[0];
    }));

    return (
      <span>
        <SingleInput id="titleSearch"
                     name = "title"
                     placeholder = "Search Title"
                     inputType = "text"
                     content = { this.props.controls.title }
                     controlFunc = { this.props.updateFilter }/> 

        <Select id="authorSelect"
                name = "author"
                placeholder = "Pick an Author"
                selectedOption = { this.props.controls.author }
                controlFunc = { this.props.updateFilter }
                options = { authors }/>
               
        <SingleInput id="booksPerRow"
                     min={1}
                     max={4}
                     name="booksPerRow"
                     title="Books Per Row" 
                     inputType="number" 
                     content={this.props.controls.booksPerRow}
                     controlFunc={this.props.updateFilter}/>
        
      </span>
    )
  }
}

export default ControlForm;
