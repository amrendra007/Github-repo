import React, { Component } from 'react';
import Loading from './Loading';

// approach 1- all ajax req is getting called on component mount,

const DisplayData = (props) => {
    if (props.content) {
        return (
            <div>
                <h3 className='heading'>{props.language.toUpperCase()}</h3>
                <ul>
                    {props.content.map(item => (
                        <li className='card' key={item.name}>
                            <span className="name">{item.name}</span><br />
                            <span>@{item.git_url.split('/')[3]}</span><br />
                            <span>{item.stargazers_count} stars</span>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
    return <h1>Error fetching data from github</h1>
}

class App extends Component {
    state = {
        all: [],
        javascript: [],
        ruby: [],
        python: [],
        contentController: [],
        language:'all',
        loading:true,
    }

    //making all req concurrently on component mount  setting state of that lang, 
    //n setting state of 'all' data to contentController state which allow to render 'all'
    //lang on component mount for the first time 
    componentDidMount() {
        fetchRepo('all').then(data => {
            // console.log(data);
            this.setState({
                all:data,
                contentController:data,
                loading:false
            })
        })
        fetchRepo('javascript').then(data => {
            this.setState({
                javascript:data
            })
        })
        fetchRepo('ruby').then(data => {
            this.setState({
                ruby: data,
            })
        })
        fetchRepo('python').then(data => {
            this.setState({
                python:data
            })
        })
    }

    //taking target text of link when clk happen , and setting data of that lang to contentController
    //using contentController state is usefull for passing all dynamic data when user click on link
    handleClick = (e) => {
        const targetText = e.target.textContent.toLowerCase();
        this.setState({
            contentController: this.state[targetText],
            language: targetText
        })
    }

    render() {
        return (
            <div >
                <li onClick={this.handleClick}>All</li>
                <li onClick={this.handleClick}>JavaScript</li>
                <li onClick={this.handleClick}>Ruby</li>
                <li onClick={this.handleClick}>Python</li>
                {
                    this.state.loading ? <Loading /> : <DisplayData language={this.state.language} content={this.state.contentController} />
                }
            </div>
        )
    }
}

//function that fetch data from github and return promise
function fetchRepo(language) {
    // "language" can be "javascript", "ruby", "python", or "all"
    const encodedURI = encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`)

    return fetch(encodedURI)
        .then((data) => data.json())
        .then((repos) => repos.items)
        .catch((error) => {
            console.warn(error)
            return null
        });
}

export default App;
