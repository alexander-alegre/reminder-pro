import React from 'react';

class App extends React.Component {
    render() {
        return(
            <div className="App">
                <div className="title">
                    <h1>Hello</h1>
                </div>
                <form action="">
                    <div className="form-inline">
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="I have to ..."/>
                        </div>
                        <div className="form-group">
                            <button type="button" className="btn btn-success">Add Reminder</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default App;