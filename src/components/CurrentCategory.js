import React, {Component} from 'react';
import axios from "axios";

const api_url = 'http://localhost:8080'

export default class CurrentCategory extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            reqName: '',
            errors: [],
        }
        this.handleEditCategory = this.handleEditCategory.bind(this);
        this.handleDeleteCategory = this.handleDeleteCategory.bind(this);
        this.handleGetTopBanner = this.handleGetTopBanner.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleReqNameChange = this.handleReqNameChange.bind(this);
        this.loadHideBannersFromServer = this.loadHideBannersFromServer.bind(this);
    }

    handleNameChange(e) {
        this.setState({name: e.target.value})
    }

    handleReqNameChange(e) {
        this.setState({reqName: e.target.value})
    }

    loadHideBannersFromServer(e) {
        axios.get(api_url + '/categories/getHide/' + e)
            .then((response) => {
                console.log(response);
                alert(response.data.response)
                if (response.data.response === 'This category didn\'t had any banners') {
                    alert('This category didn`t had any banners')
                } else {
                    alert('Banners will deleted: ' + response.data.response)
                }
            })
    }

    handleGetTopBanner() {
        axios.get(api_url + '/categories/' + this.props.currentCategory.reqName)
            .then((response) => {
                console.log(response);
                alert(response.data.response)
            })
        this.render()
    }

    handleEditCategory() {
        const data = new FormData();
        if (this.state.name === '') {
            data.append('name', this.props.currentCategory.name)
        } else {
            data.append('name', this.state.name)
        }
        if (this.state.reqName === '') {
            data.append('reqName', this.props.currentCategory.reqName)
        } else {
            data.append('reqName', this.state.reqName)
        }
        // data.append('name', this.state.name)
        // data.append('reqName', this.state.reqName)
        axios.post(api_url + '/categories/update/' + this.props.currentCategory.id,
            data, {
                'Content-Type': 'application/json',
            }).catch((error) => {
            const errors = error.response.data.errors.map((error) =>
                alert(error.defaultMessage)
            );
        });
        this.render()
    }

    handleDeleteCategory() {
        axios.get(api_url + '/categories/delete/' + this.props.currentCategory.id)
            .then((response) => {
                console.log(response);
                if (response.data.response === 'Category has active banners') {
                    alert('Category has active banners')
                } else if (response.data.response === 'Category is deleted') {
                    this.loadHideBannersFromServer(this.props.currentCategory.id)
                }
            })
        this.render()
    }

    render() {
        return (
            <div>
                <form>
                    <div className="form-group row">

                        <label htmlFor="inputName" className="col-sm-2 col-form-label">Name</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="inputName"
                                   placeholder={this.props.currentCategory.name}
                                // defaultValue={this.props.currentCategory.name}
                                   onChange={this.handleNameChange}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="inputName" className="col-sm-2 col-form-label">Price</label>
                        <div className="col-sm-10">
                            <input type="longtext" className="form-control" id="inputName"
                                   placeholder={this.props.currentCategory.reqName}
                                   onChange={this.handleReqNameChange}/>
                        </div>
                    </div>

                    <button type="button" className="btn btn-dark"
                            onClick={this.handleEditCategory}>Update
                    </button>
                    <button type="button" className="btn btn-danger"
                            onClick={this.handleDeleteCategory}>Delete
                    </button>
                    <button type="button" className="btn btn-danger"
                            onClick={this.handleGetTopBanner}>Top Banner
                    </button>
                </form>

            </div>

        )
    }
}