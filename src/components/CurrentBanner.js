import React, {Component} from 'react';
import axios from "axios";

const api_url = 'http://localhost:8080'

export default class CurrentBanner extends Component {
    constructor() {
        super();
        this.state = {
            id: '',
            name: '',
            price: '',
            category: '',
            content: '',
            errors: []
        }
        this.handleEditBanner = this.handleEditBanner.bind(this);
        this.handleDeleteBanner = this.handleDeleteBanner.bind(this);

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        // this.handleCategoryChange = this.handleCategoryChange.bind(this);
    }

    handleNameChange(e) {
        this.setState({name: e.target.value})
    }

    handlePriceChange(e) {
        this.setState({price: e.target.value})
    }

    handleTextChange(e) {
        this.setState({content: e.target.value})
    }

    handleEditBanner() {
        const data = new FormData();
        if (this.state.name === '') {
            data.append('name', this.props.currentBanner.name)
        } else {
            data.append('name', this.state.name)
        }
        if (this.state.price === '') {
            data.append('price', this.props.currentBanner.price)
        } else {
            data.append('price', this.state.price)
        }
        if (this.state.content === '') {
            data.append('content', this.props.currentBanner.content)
        } else {
            data.append('content', this.state.content)
        }

        // data.append('content', this.state.content)
        axios.post(api_url + '/banners/update/' + this.props.currentBanner.id,
            data, {
                'Content-Type': 'application/json',
            }).catch((error) => {
            const errors = error.response.data.errors.map((error) =>
                alert(error.defaultMessage)
            );
        });
        window.location.replace("http://localhost:3000");
    }

    handleDeleteBanner() {
        axios.get(api_url + '/banners/delete/' + this.props.currentBanner.id);
        window.location.replace("http://localhost:3000");
    }

    render() {
        return (
            <div>
                <form>
                    <div className="form-group row">
                        <label htmlFor="inputName" className="col-sm-2 col-form-label">Name</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="inputName"
                                   placeholder={this.props.currentBanner.name}
                                // defaultValue={this.props.currentBanner.name}
                                   onChange={this.handleNameChange}/>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="inputName" className="col-sm-2 col-form-label">Price</label>
                        <div className="col-sm-10">
                            <input type="longtext" className="form-control" id="inputName"
                                   placeholder={this.props.currentBanner.price}
                                   onChange={this.handlePriceChange}/>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="inputName" className="col-sm-2 col-form-label">Text</label>
                        <div className="col-sm-10">
                            <input type="longtext" className="form-control" id="inputName"
                                   placeholder={this.props.currentBanner.content}
                                   onChange={this.handleTextChange}/>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="inputName" className="col-sm-2 col-form-label">Category</label>
                        <div className="col-sm-10">
                            {this.props.currentBanner.category.name}
                        </div>
                    </div>

                    <button type="button" className="btn btn-dark"
                            onClick={this.handleEditBanner}>Update
                    </button>
                    <button type="fixed-bottom" className="btn btn-danger"
                            onClick={this.handleDeleteBanner}>Delete
                    </button>
                </form>
            </div>
        );
    }
}