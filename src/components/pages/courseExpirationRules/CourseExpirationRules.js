import React from 'react';
import './styles.css';
import { Form, Table, InputGroup, Alert, Tab, Tabs} from 'react-bootstrap';
import SweetAlert from 'sweetalert-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import swal from 'sweetalert';
import PropTypes from 'prop-types';
import {
  getCourseExpirationRules,
  postCourseExpirationRules
} from '../../../api/courseExpirationRules';
const moment = require('moment');

class CourseExpirarionRules extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      arraySettingProvBoard: [],
      settingHeader: {},
      newSettingHeader: {},
      AlterDone: false,
      hasError: false,
      noFound: false,
      startDate: null,
      flagAdd: false,
      key: 'update',
      validation: false,
      dates: []
    };
    this._onChange = this._onChange.bind(this);
    this.handleChangeMonthInactive = this.handleChangeMonthInactive.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this._onSelect = this._onSelect.bind(this);
  }
  componentDidMount() {
    const boardProvTypeId = parseInt(this.props.params.boardprov);

    getCourseExpirationRules(boardProvTypeId)
      .then(response => {

        const [...dateSettingProvBoar] = response.data.data;
        const dates = [];
        dateSettingProvBoar.map(date => {
            let dateFormat = new Date(date.dtSetting);
            dateFormat.setMinutes(dateFormat.getMinutes() + dateFormat.getTimezoneOffset())
            dates.push(new Date(dateFormat))
          }
        )

        if (response.data.data.length === 0) {
          this.setState({
            noFound: true
          })
        } else {
          this.setState({
            arraySettingProvBoard: response.data.data,
            dates: dates
          });
        }

      })
      .catch(error => this.setState({ hasError: true }));


  }

  _onSelect(key){
    if (key === 'update') {
      this.setState({
        flagAdd: false,
        key: key
      });
    }else {
      this.setState({
        flagAdd: true,
        key: key
      });
    }
  }

  handleChangeMonthInactive(e) {
    var monthInactive;
    const { newSettingHeader, settingHeader } = this.state;

    const newSettingHeaderClone = { ...newSettingHeader };
    const settingHeaderClone = { ...settingHeader };

    if (this.state.flagAdd === true) {
      monthInactive = newSettingHeaderClone;
    } else {
      monthInactive = settingHeaderClone;
    }
    if (e.target.value >= 0 && e.target.value <= 999) {
      if (e.target.id === 'anytime') {
        monthInactive.amAnytimeInactive = e.target.value;
      }
      if (e.target.id === 'live') {
        monthInactive.amLiveInactive = e.target.value;
      }

      if (this.state.flagAdd === true) {
        this.setState({
          newSettingHeader: monthInactive
        });
      } else {
        this.setState({
          settingHeader: monthInactive
        });
      }
    }
  }

  handleActiveMonth = idx => evt => {
    var setMonthExpire;
    if (this.state.flagAdd === true) {
      setMonthExpire = this.state.newSettingHeader;
    } else {
      setMonthExpire = this.state.settingHeader;
    }

    setMonthExpire.settingDetails.map(item => {
      if (item.idSettingRulesDetail === idx.idSettingRulesDetail) {
        if (evt.target.type === 'checkbox') {
          item.inExpire = evt.target.checked;
          return item;
        }
        if (
          evt.target.type === 'text' &&
          (evt.target.value >= 0 && evt.target.value <= 999)
        ) {
          item.amActive = evt.target.value;
          return item;
        }
      }
      if (this.state.flagAdd === true) {
        this.setState({
          newSettingHeader: setMonthExpire
        });
      } else {
        this.setState({
          settingHeader: setMonthExpire
        });
      }
    });
  };

  _onChange(value) {
    const [...itemsfilter] = this.state.arraySettingProvBoard;
    const itemFilterHeader = itemsfilter;

      const result = itemFilterHeader.filter(
      itemsfilter => itemsfilter.idSetting == value.target.value
    );

    result.map(i =>
      this.setState({
        settingHeader: i,
        flagAdd: false
      })
    );
  }

  handleSubmit(e) {
    e.preventDefault();
    var dataUpdate;
    if (this.state.flagAdd === true) {
      dataUpdate = this.state.newSettingHeader;
    } else {
      dataUpdate = this.state.settingHeader;
      dataUpdate.dtSetting = moment(dataUpdate.dtSetting).format('MM/DD/YYYY');
    }

    dataUpdate.settingDetails.map(
      item => (item.inExpire = item.inExpire ? 1 : 0)
    );

    postCourseExpirationRules(dataUpdate)
      .then(() => {
        swal({
          title: 'Done!',
          icon: 'success',
          button: true
        }).then(value => {
          if (value) {
            window.location.reload();
          }
        });
      })
      .catch(err => {
        console.error(err.errors);
        swal({
          title: 'Warning!',
          text:
            'An unexpected error has occurred please contact the system administrator.',
          icon: 'warning',
          button: true
        });
      });
  }

  handleDate(date) {
      this.setState({
        startDate: date,
        validation: false
      });

  }

  handleAdd(e) {
    const [newSettingSplice] = this.state.arraySettingProvBoard;

    const containerNewSettings = {
      ...newSettingSplice,
      dtSetting: moment(this.state.startDate).format('MM/DD/YYYY'),
      amLiveInactive: 0,
      amAnytimeInactive: 0,
      idSetting: null,
      settingDetails: newSettingSplice.settingDetails.map(
        ({ inExpire, amActive, ...settingDetail }) => {
          return {
            inExpire: 0,
            amActive: 0,
            ...settingDetail
          };
        }
      )
    };

    if (this.state.startDate) {
      this.setState({
        newSettingHeader: containerNewSettings,
        flagAdd: true,
        disableButtonRefresh: false,
        validation: false
      });
    } else {
      this.setState({
        validation: true
      });
    }
  }

  loadingData() {

    if (
      Object.keys(this.state.settingHeader).length !== 0 ||
      Object.keys(this.state.newSettingHeader).length !== 0
    ) {
      var itemParent;
      var itemSetting;
      if (this.state.flagAdd === true) {
        itemParent = this.state.newSettingHeader;

        itemSetting = this.state.newSettingHeader.settingDetails;
      } else {
        itemParent = this.state.settingHeader;

        itemSetting = this.state.settingHeader.settingDetails;
      }

      if (itemSetting) {
        const itemLive = itemSetting.filter(
          itemSetting => itemSetting.courseType === 'CD_LIVE'
        );
        const itemAnytime = itemSetting.filter(
          itemSetting => itemSetting.courseType === 'CD_ANYTIME'
        );

        return (
          <div className="animated fadeIn">
            <h5>Provider Application Settings Detail</h5>
            <p className="text-muted">
              Please Check the inactive Delivery Methods (With publishing) to be
              Expired.
            </p>
            <hr />
            <br />

            <form>
              <Table responsive="md">
                <thead className="thead-dark">
                  <tr className="">
                    <th>Course Type: Anytime</th>
                    <th className="App-align">
                      <div className="container-fluid  pt-1">
                        <div className="row App-align ">
                          <div className="col-sm-4 app-top">Expire after</div>
                          <div className="col-sm-4">
                            <input
                              id="anytime"
                              className="App-date"
                              type="text"
                              value={itemParent.amAnytimeInactive}
                              onChange={this.handleChangeMonthInactive}
                            />
                          </div>
                          <div className="col-sm-4 app-top">months inactive</div>
                        </div>
                      </div>
                    </th>
                    <th />
                    <th>Active months</th>
                  </tr>
                </thead>
                {itemAnytime &&
                  itemAnytime.map((anytime, k) => (
                    <tbody key={k} className="App-textInput">
                      <tr>
                        <td className="App-with">
                          {anytime.deliveryMethodDesc}
                        </td>
                        <td className="App-center App-padding">
                          <div>
                            <input
                              type="checkbox"
                              checked={anytime.inExpire}
                              onChange={this.handleActiveMonth(anytime)}
                            />
                          </div>
                        </td>
                        <td />
                        <td>
                          <div className="row">
                            <input
                              id="anytime"
                              className="App-active ml-3"
                              type="text"
                              value={anytime.amActive}
                              onChange={this.handleActiveMonth(anytime)}
                            />
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  ))}
              </Table>

              <br />
              <Table responsive="md">
                <thead className="thead-dark">
                  <tr className="">
                    <th>Course Type: Live</th>
                    <th className="App-align">
                      <div className="container-fluid  pt-1">
                        <div className="row App-align ">
                          <div className="col-sm-4 app-top">Expire after</div>
                          <div className="col-sm-4">
                            <input
                              id="live"
                              className="App-date"
                              type="text"
                              value={itemParent.amLiveInactive}
                              onChange={this.handleChangeMonthInactive}
                            />
                          </div>
                          <div className="col-sm-4 app-top">months inactive</div>
                        </div>
                      </div>
                    </th>
                    <th />
                    <th>Active months</th>
                  </tr>
                </thead>
                {itemLive &&
                  itemLive.map((live, k) => (
                    <tbody key={k} className="App-textInput">
                      <tr>
                        <td className="App-with">{live.deliveryMethodDesc}</td>
                        <td className="App-center App-padding">
                          <div>
                            <input
                              type="checkbox"
                              checked={live.inExpire}
                              onChange={this.handleActiveMonth(live)}
                            />
                          </div>
                        </td>
                        <td />
                        <td>
                          <div className="row">
                            <input
                              id="live"
                              className="App-active ml-3"
                              type="text"
                              value={live.amActive}
                              onChange={this.handleActiveMonth(live)}
                            />
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  ))}
              </Table>
              <button
                className="btn btn-success mb-2"
                onClick={this.handleSubmit}
              >
                Save
              </button>
              <SweetAlert
                show={this.state.AlterDone}
                title="Setting updated"
                text="Done"
                onConfirm={() => this.setState({ AlterDone: false })}
              />
            </form>
          </div>
        );
      }
    }
  }

  render() {

    if (this.state.hasError) {
      return (
        <Alert variant="danger ">
          An unexpected error has occurred please contact the system
          administrator.
        </Alert>
      );
    }
    if (this.state.noFound) {
      return (
        <Alert variant="danger ">
        There aren't delivery methods configured
        </Alert>
      );
    }
    var [...items] = this.state.arraySettingProvBoard;

    return (
      <div>
        <div className="container-fluid ">
          <div className="row">
            <div className="col-12 App-rules">
              <a
                className="btn btn-outline-success mb-2"
                href={
                  process.env.REACT_APP_URL_SETTING_PROVIDER +
                  '/sa_app_settings.asp'
                }
              >
                {' '}
                Return{' '}
              </a>
              <div className="mb-2">
                <h3>Course expiration rules</h3>

                <h6>{this.props.params.nmBoard}</h6>
                <h6 className="text-muted">
                  Apply for Board Approved provider status
                </h6>
                <br />
              </div>

              <Tabs id="controlled-tab"  activeKey={this.state.key}  onSelect={this._onSelect}>
                  <Tab eventKey="update" title="Modify settings">
                  <br />
                  <h6 className="mt-2">Course special rules by approval date</h6>
                  <div className="container-fluid App-search">

                          <div className="row">
                            <div className="col-3 App-container">
                            <Form>
                              <InputGroup>
                                <Form.Control as="select" onChange={this._onChange}>
                                  <option disabled={this.state.disableOptionDefault}>
                                     **Select a setting**
                                  </option>
                                  {items &&
                                    items.map((item, key) => (
                                      <option key={key} value={item.idSetting}>
                                        {moment(item.dtSetting, 'YYYY-MM-DD').format(
                                          'MM/DD/YYYY'
                                        )}
                                      </option>
                                    ))}
                                </Form.Control>
                              </InputGroup>
                            </Form>
                            </div>
                          </div>
                  </div>
                  </Tab>
                  <Tab eventKey="add" title="Add setting">
                  <Form>


                  </Form>
                  <div className="mt-2">
                  <br />
                  <h6>Course special rules by approval date</h6>

                    <InputGroup>
                      <DatePicker
                        className= {this.state.validation? "App-date border border-danger": "App-date"}
                        selected={this.state.startDate}
                        onChange={this.handleDate}
                        maxDate={new Date()}
                        excludeDates={this.state.dates}
                        placeholderText="MM/DD/YYYY"
                      />
                      <InputGroup.Append>
                        <button
                          className="btn btn-success"
                          onClick={this.handleAdd}
                        >
                          +
                        </button>
                      </InputGroup.Append>
                    </InputGroup>
                    <span className="text-danger"> <em> {this.state.validation? "Please enter a date": ""} </em></span>
                  </div>
                  </Tab>

                </Tabs>

            </div>
          </div>
        </div>

        <div className="container-fluid mt-3">
          <div className="row">

            <div className="col-12 App-rules">{this.loadingData()}</div>
          </div>
        </div>
      </div>
    );
  }
}
CourseExpirarionRules.propTypes = {
  boardprov: PropTypes.string,
  nmBoard: PropTypes.string
};

export default CourseExpirarionRules;
