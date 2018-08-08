import React from "react";
import { render } from "react-dom";

import App from './component/App';
import './App.css';


const Root = () => {
    return (
        <div className="main">
            <App />
        </div>
    )
}

render(
    <Root />,
    document.querySelector("#root")
);