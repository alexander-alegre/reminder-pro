import React from 'react';
import { connect } from 'react-redux';
import { addReminder, deleteReminder, clearReminders } from '../actions/index';
import moment from 'moment';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            dueDate: '',
        }
    }

    addReminder() {
        this.props.addReminder(this.state.text, this.state.dueDate);
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
                            <li className="list-group-item" key={reminder.id}>
                                <span className="col-6">{reminder.text}</span>
                                <span className="col-4"><em>
                                    {
                                        moment(reminder.dueDate).fromNow()
                                    }
                                </em></span>
                                <i onClick={() => this.deleteReminder(reminder.id)} className="fa fa-remove col-1" aria-hidden="true"></i>
                            </li>
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
                <button onClick={() => this.props.clearReminders()} className="btn btn-danger">
                    Clear All
                </button>
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