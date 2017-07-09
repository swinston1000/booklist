import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, FormControl } from 'react-bootstrap'


const Select = (props) => (
  <FormGroup id={props.id}>
        <FormControl componentClass="select" name={props.name} value={props.selectedOption} onChange={props.controlFunc}>
            <option value="">{props.placeholder}</option>
            {props.options.map(opt => <option key={opt} value={opt}> {opt} </option>)}
        </FormControl>
  </FormGroup>
);

Select.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  selectedOption: PropTypes.string,
  controlFunc: PropTypes.func.isRequired,
  placeholder: PropTypes.string
};

export default Select;
