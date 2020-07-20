import React, {Component} from 'react';
import {BrowserRouter as Router, Link, Route,} from "react-router-dom";
import './App.css';
import Categories from "./components/Categories";
import Banners from "./components/Banners";

const api_url = 'http://localhost:8000/api/v1';

class App extends Component {


    render() {
        return (

            <div>
                <ul className="nav nav-pills mb-2" id="pills-tab" role="tablist">
                    <li className="nav-item">
                        <a className="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-cat"
                           role="tab" aria-controls="pills-cat" aria-selected="false">Categories</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" id="pills-contact-tab" data-toggle="pill" href="#pills-ban"
                           role="tab" aria-controls="pills-ban" aria-selected="false">Banners</a>
                    </li>
                </ul>

                <div className="tab-content" id="pills-tabContent">

                    <div className="tab-pane fade" id="pills-cat" role="tabpanel"
                         aria-labelledby="pills-profile-tab">
                        <Router>
                            <div className="row">
                                <div className="col">
                                    <Route exact activepath='/categories' component={Categories}/>
                                </div>
                            </div>
                        </Router>
                    </div>
                    <div className="tab-pane fade" id="pills-ban" role="tabpanel"
                         aria-labelledby="pills-contact-tab">
                        <Router>
                            <div className="row">
                                <div className="col">
                                    <Route exact activepath='/banners' component={Banners}/>
                                </div>
                            </div>
                        </Router>

                    </div>
                </div>

            </div>

        );
    }
}

export default App;
