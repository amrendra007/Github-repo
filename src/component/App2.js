import React, { Component } from 'react';
import Loading from './Loading';

//approach2- make ajax req on clicking link

const DisplayData = (props) => {

    //getting target languge when user click any of link and rendering data aq to that
    const targetLang = props.state.language

    if (props.state[targetLang]) {
        return (
            <div>
                <h3 className='heading'>{targetLang.toUpperCase()}</h3>
                <ul>
                    {props.state[targetLang].map(item => (
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
    return <h1>Error fetching data from github plz check console</h1>
}

class App extends Component {
    state = {
        all: [],
        javascript: [],
        ruby: [],
        python: [],
        loading: true,
        language: ''
    }

    //making req to fetchrepo of 'all' (just one req) for the first time
    componentDidMount() {
        fetchRepo('all')
            .then(data => {
                this.setState({
                    all: data,
                    loading: false,
                    language: 'all'
                })
            });
    }

    //fn that make ajax req on click, taking target lang and set state of that language
    //which allow to rerender 
    handleClick = (e) => {
        const language = e.target.textContent.toLowerCase();
        
            this.setState({
                loading:true,
            })
            fetchRepo(language)
            .then(data => {
                this.setState({
                    [language]:data,
                    language: language,
                    loading:false,
                })
            });
    }

    render() {
        return (
            <div >
                <li onClick={this.handleClick}>All</li>
                <li onClick={this.handleClick}>JavaScript</li>
                <li onClick={this.handleClick}>Ruby</li>
                <li onClick={this.handleClick}>Python</li>
                {
                    this.state.loading ? <Loading /> : <DisplayData state={this.state}/>

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

