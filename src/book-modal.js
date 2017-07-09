import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap'
import SingleInput from './single-input';


class MyModal extends Component {

  constructor(props) {
    super(props);
    this.state = { publishedDate: '', title: '', author: '', image: '', validate: false };
    this.update = this.update.bind(this);
    this.submit = this.submit.bind(this);
  }

  update(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }


  submit() {
    const { id, validate, ...fields } = this.state
    const fieldNames = Object.keys(fields);
    for (let i = 0; i < fieldNames.length; i++) {
      if (!this.state[fieldNames[i]].length) {
        return this.setState({ validate: true })
      }
    }
    const ok = this.props.handleSubmit(this.state);
    if (ok) {
      this.setState({ id: '', author: '', title: '', publishedDate: '', image: '', validate: false });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.book) {
      const book = nextProps.book.volumeInfo;
      this.setState({ id: nextProps.book.id, author: book.authors[0], title: book.title, publishedDate: book.publishedDate, image: book.imageLinks.thumbnail })
    } else {
      this.setState({ id: '', author: '', title: '', publishedDate: '', image: '', validate: false });
    }
  }

  renderInputs() {

    const { validate, id, ...fields } = this.state

    return Object.keys(fields).map((field, index) => (
      <SingleInput key={index}
                   validate={this.state.validate}
                   name={field} 
                   title={field==="publishedDate"?"Published Date":field} 
                   inputType={field==="publishedDate"?"date":"text"} 
                   content={this.state[field]} 
                   controlFunc={this.update}/>
    ))
  }

  render() {

    const buttonText = this.props.book ? "Update" : "Add";
    const modalTitle = buttonText + " Book";

    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
          <Modal.Header closeButton>
                <Modal.Title>{modalTitle}</Modal.Title>
          </Modal.Header> 
          <Modal.Body>
              {this.renderInputs()}
          </Modal.Body>
          <Modal.Footer>
              <Button bsStyle="primary"
                      onClick={this.submit}>
                      {buttonText} </Button>
              <Button onClick={this.props.onHide}>
                      Close</Button>
          </Modal.Footer> 
      </Modal>
    );
  }
}

export default MyModal;
