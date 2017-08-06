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


    render() {
        return(
            <div className="App">
                <div className="title">
                    <h1>Hello</h1>
                </div>
                <form action="">
                    <div className="form-inline">
                        <div className="form-group">
                            <input onChange={event => this.setState({text: event.target.value})} type="text" className="form-control" placeholder="I have to ..."/>
                        </div>
                        <div className="form-group">
                            <button onClick={() => this.addReminder()} type="button" className="btn btn-success">Add Reminder</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}



export default connect(null, {addReminder})(App);