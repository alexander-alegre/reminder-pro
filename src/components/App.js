import React from 'react';
import { connect } from 'react-redux';
import { addReminder, deleteReminder, clearReminders } from '../actions/index';
import moment from 'moment';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/genie.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            dueDate: '',
        }
    }

    showAlert(msg) {
        Alert.error(msg, {
            position: 'bottom-right',
            effect: 'genie',
            beep: false,
            timeout: 2000,
            offset: 0,
            html: false
        });
    }

    addReminder() {
        if(this.state.text && this.state.dueDate) {
            if (moment(this.state.dueDate) > moment()) {
                this.props.addReminder(this.state.text, this.state.dueDate);
            } else {
                this.showAlert('That item is already past due :( choose a new date.');
            }
        } else {
            this.showAlert('All fields are required!');
        }
    }

    deleteReminder(id) {
        this.props.deleteReminder(id);
    }

    renderReminders() {
        const { reminders } = this.props;
        return (
            <ul className="list-group">
                {
                    reminders.map(reminder => {
                        return(
                            <ReactCSSTransitionGroup 
                                key={reminder.id}
                                transitionName="animate"
                                transitionAppear={true}
                                transitionAppearTimeout={500}
                                transitionEnter={true}
                                transitionEnterTimeout={500}
                                transitionLeave={true}
                                transitionLeaveTimeout={500}
                            >
                                <li className="list-group-item">
                                    <span className="col-6">{reminder.text}</span>
                                    <span className="col-4"><em>
                                        {
                                            moment(reminder.dueDate).fromNow()
                                        }
                                    </em></span>
                                    <i onClick={() => this.deleteReminder(reminder.id)} className="fa fa-remove col-1" aria-hidden="true"></i>
                                </li>
                            </ReactCSSTransitionGroup>
                        );
                    })
                }
            </ul>
        );
    }


    render() {
        let year = moment().format('YYYY');
        let month = moment().format('MM');
        let day = moment().format('DD');

        return(
            <div>
                <h1 className="text-center">Reminder Pro</h1>
                <form className="form-horizontal">
                    <div className="form-group">
                        <input onChange={event => this.setState({text: event.target.value})} type="text" className="form-control" placeholder="I have to ..."/>
                    </div>
                    <div className="form-group">
                        <input onChange={event => this.setState({dueDate: event.target.value})} type="datetime-local" className="form-control" defaultValue={`${year}-${month}-${day}T23:59:00`}/>
                    </div>
                    <button onClick={() => this.addReminder()} type="button" className="btn btn-success">Add Reminder</button>
                </form>
                <div className="rendered-list">
                    { this.renderReminders() }
                </div>
                <hr/>
                <button onClick={() => this.props.clearReminders()} className="btn btn-danger">
                    Clear All
                </button>
                <Alert stack={true} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        reminders: state
    }
}


export default connect(mapStateToProps, { addReminder, deleteReminder, clearReminders })(App);