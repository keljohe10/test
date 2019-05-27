import React from 'react';
import './styles.css';
import {
  Spinner,
  Form,
  Table,
  ButtonToolbar,
  Button,
  InputGroup
} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PropTypes from 'prop-types';
import { getCourseExpirationRules } from '../../../api/courseExpirationRules';



class CourseExpirarionRules extends React.Component {
  constructor(props) {
    super(props);
     
    
    this.state = {
      test: 'value',
      loading: false,
      startDate: new Date()
    };

    this._onChange = this._onChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    const boardProvTypeId = parseInt(this.props.boardprov);
    console.log(boardProvTypeId);
    
    getCourseExpirationRules(boardProvTypeId).then(response => {
      console.log(response)

    }).catch(error => console.log(error)); 
  }
  
  handleChange(date) {
    this.setState({
      startDate: date
    });
  }
  _onChange(value) {
    this.setState({ test: value.target.value, loading: true });
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1000);
  }
  loadingData() {
    if (this.state.loading) {
      return (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      );
    }
    if (this.state.test !== 'value') {
      return (
        <div className="animated fadeIn">
          <Table responsive="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Table heading</th>
                <th>Table heading</th>
                <th>Table heading</th>
                <th>Table heading</th>
                <th>Table heading</th>
                <th>Table heading</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
              </tr>
            </tbody>
          </Table>
          <Table responsive="md">
            <thead>
              <tr>
                <th>#</th>
                <th>Table heading</th>
                <th>Table heading</th>
                <th>Table heading</th>
                <th>Table heading</th>
                <th>Table heading</th>
                <th>Table heading</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
              </tr>
            </tbody>
          </Table>
        </div>
      );
    }
  }

  render() {

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-4 App-rules">
            <h3>Course expiration rules</h3>
            <Form>
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Course special rules by approval date</Form.Label>
                <Form.Control as="select" onChange={this._onChange}>
                  <option value="value">*Select a setting*</option>
                  <option value="value1">1</option>
                  <option value="value2">2</option>
                  <option value="value3">3</option>
                  <option value="value4">4</option>
                  <option value="value5">5</option>
                </Form.Control>

                <div className="row mt-2">
                  <div className="col-12">
                    <InputGroup className="mb-3">
                      <DatePicker
                        className="App-date"
                        selected={this.state.startDate}
                        onChange={this.handleChange}
                      />
                      <InputGroup.Append>
                        <Button variant="primary"> Add </Button>
                      </InputGroup.Append>
                    </InputGroup>
                  </div>
                </div>
              </Form.Group>
            </Form>
            <ButtonToolbar>
              <Button variant="success" block>
                Save
              </Button>
            </ButtonToolbar>
          </div>
          <div className="col-8">{this.loadingData()}</div>
        </div>
      </div>
    );
  }
}
CourseExpirarionRules.propTypes = {
  boardprov: PropTypes.string.isRequired
};

export default CourseExpirarionRules;
