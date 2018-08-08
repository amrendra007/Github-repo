import React, { Component } from 'react';

class Loading extends Component {
    state = {
        text: 'Loading'
    }

    componentDidMount() {
        const stopper = this.state.text + '...'
        this.timer = setInterval(() => {
            if (this.state.text === stopper) {
                this.setState({ text: 'Loading' })
            }
            else {
                this.setState((currentState) => {
                    return {
                        text: currentState.text + '.'
                    }
                })
            }
        }, 200)
    }
    componentWillUnmount() {
        clearInterval(this.timer);
    }
    render() {
        return (
            <div>
                <h1>{this.state.text}</h1>
            </div>
        )
    }
}

export default Loading;