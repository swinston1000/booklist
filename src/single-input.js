import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap'

const getValidationState = (props) => {
  if (props.content.length > 0) return 'success'
  else return 'error'
}

const SingleInput = (props) => (
  <FormGroup id={props.id}
             validationState={ props.validate ? getValidationState(props) : null }>
      <ControlLabel>{props.title}</ControlLabel>
      <FormControl min= { props.min }
                   max= { props.max }
                   type={ props.inputType }
                   value={ props.content }
                   name={ props.name }
                   onChange={ props.controlFunc }
                   placeholder={props.placeholder} />
      <FormControl.Feedback />
  </FormGroup>
);

SingleInput.propTypes = {
  id: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  name: PropTypes.string.isRequired,
  inputType: PropTypes.oneOf(['text', 'number', 'date']).isRequired,
  title: PropTypes.string,
  controlFunc: PropTypes.func.isRequired,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  placeholder: PropTypes.string,
};

export default SingleInput;
