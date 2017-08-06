import React from 'react';
import { connect } from 'react-redux';
import { addReminder } from '../actions/index';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        }
    }

    addReminder() {
        console.log('this.state', this);
        this.props.addReminder(this.state.text);
    }

    renderReminders() {
        const { reminders } = this.props;
        return (
            <ul className="list-group col-sm-4">
                {
                    reminders.map(reminder => {
                        return(
                            <li className="list-group-item" key={reminder.id}>
                                { reminder.text }
                                <i className="fa fa-remove pull-right block" aria-hidden="true"></i>
                            </li>
                        );
                    })
                }
            </ul>
        );
    }


    render() {
        return(
            <div className="container">
                <div className="row">
                    <h1>Reminder Pro</h1>
                </div>
                <div className="row">
                    <form className="form-inline">
                        <div className="form-group col-sm-12">
                            <input onChange={event => this.setState({text: event.target.value})} type="text" className="form-control" placeholder="I have to ..."/>
                        </div>
                        <div className="form-group col-sm-12">
                            <button onClick={() => this.addReminder()} type="button" className="btn btn-success">Add Reminder</button>
                        </div>
                    </form>
                </div>
                <div className="row">
                    { this.renderReminders() }
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        reminders: state
    }
}


export default connect(mapStateToProps, {addReminder})(App);