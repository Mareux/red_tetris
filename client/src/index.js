import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import {createStore} from "redux";
import gameReducer from "./reducers/gameReducer";
import {Provider} from "react-redux";
import CssBaseline from "@material-ui/core/CssBaseline";
import 'typeface-roboto';

const store = createStore(gameReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
    <CssBaseline>
        <Provider store={store}>
            <App/>
        </Provider>
    </CssBaseline>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
