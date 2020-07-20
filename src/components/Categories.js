import React, {Component} from 'react';
import axios from "axios";
import CurrentCategory from "./CurrentCategory";

const api_url = 'http://localhost:8080'

export default class Categories extends Component {
    constructor() {
        super();
        this.state = {
            categories: ["0"],
            currentCategory: null,
            name: '',
            reqName: '',
            isCreation: false,
            alert: '',
            errors: [],
        }
        this.loadCategoriesFromServer = this.loadCategoriesFromServer.bind(this);
        this.loadCategoryById = this.loadCategoryById.bind(this);

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleReqNameChange = this.handleReqNameChange.bind(this);

        this.handleFindCategories = this.handleFindCategories.bind(this);
        this.handleNewCategoryCreation = this.handleNewCategoryCreation.bind(this);
        this.handleCreateNewCategory = this.handleCreateNewCategory.bind(this);

        this.rerender = this.rerender.bind(this);
        // this.handleCategoriesFromS = this.handleCategoriesFromS.bind(this);
    }


    rerender() {
        this.setState({
            state: this.state
        })
    }

    handleNameChange(e) {
        this.setState({name: e.target.value})
    }

    handleReqNameChange(e) {
        this.setState({reqName: e.target.value})
    }

    handleFindCategories(e) {
        if (e.target.value == '') {
            this.loadCategoriesFromServer()
        } else {
            axios.get(api_url + '/categories/search/' + e.target.value)
                .then((response) => {
                    console.log(response);

                    if (response.data.response === 'NO_CONTENT') {
                        alert('NO_CONTENT')
                        this.loadCategoriesFromServer()
                    } else {
                        this.setState({
                            categories: response.data.response
                        })
                    }
                })
        }
    }

    handleNewCategoryCreation() {
        this.setState({
            isCreation: true
        })
    }

    loadCategoriesFromServer() {
        axios.get(api_url + '/categories')
            .then((response) => {
                console.log(response);
                this.setState({
                    categories: response.data.response
                })
            })
    }

    handleCreateNewCategory() {
        const data = new FormData();
        data.append('name', this.state.name)
        data.append('reqName', this.state.reqName)
        axios.post(api_url + '/categories/addCategory', data, {
            'Content-Type': 'application/json',
        }).catch((error) => {
            const errors = error.response.data.errors.map((error) =>
                alert(error.defaultMessage)
            );
        })
            .then((response) => {
                console.log(response)
                if (response.data.response === 'Category with this name/reqname already exist, create new name/reqname') {
                    alert('Category with this name/reqname already exist, create new name/reqName')
                }

            })

        console.log(this.state.errors)
        this.rerender()
    }

    loadCategoryById(id) {
        this.setState({
            isCreation: false
        })
        axios.get(api_url + '/categories/getCategory/' + id)
            .then((response) => {
                console.log(response);
                this.setState({
                    currentCategory: response.data.response
                })
            })
    }


    componentDidMount() {
        this.loadCategoriesFromServer();
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-2">
                        <h2>Categories</h2>
                        <div className="form-group">
                            <input type="email" className="form-control" id="exampleFormControlInput1"
                                   placeholder="Enter category name..." onChange={this.handleFindCategories}/>
                        </div>
                        <CategoriesList categories={this.state.categories} getCategoryById={this.loadCategoryById}/>
                        <button type="button" className="btn btn-primary btn-lg btn-block"
                                onClick={this.handleNewCategoryCreation}>Create new category
                        </button>

                    </div>
                    <div className="col-8">
                        <div>
                            {
                                this.state.isCreation ? (
                                    <div>

                                        <form>
                                            <div className="form-group row">
                                                <label htmlFor="inputName"
                                                       className="col-sm-2 col-form-label">Name</label>
                                                <div className="col-sm-10">
                                                    <input type="text" className="form-control" id="inputName"
                                                           onChange={this.handleNameChange}/>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label htmlFor="inputName"
                                                       className="col-sm-2 col-form-label">reqName</label>
                                                <div className="col-sm-10">
                                                    <input type="longtext" className="form-control" id="inputName"
                                                           onChange={this.handleReqNameChange}/>
                                                </div>
                                            </div>
                                            <button type="button" className="btn btn-dark"
                                                    onClick={this.handleCreateNewCategory}>Save
                                            </button>
                                        </form>
                                        {this.state.errors.length === 0 ? (<div></div>) : (
                                            <div>
                                                {this.state.errors.map((error) => (
                                                    <div className="alert alert-primary" role="alert">
                                                        {error.defaultMessage}
                                                    </div>
                                                ))}
                                            </div>)}
                                    </div>
                                ) : (<div>
                                    {
                                        this.state.currentCategory == null ? (<div></div>) :
                                            (
                                                <CurrentCategory currentCategory={this.state.currentCategory}/>
                                            )
                                    }
                                </div>)

                            }

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

class CategoriesList extends Component {
    constructor() {
        super();
    }

    render() {

        const categories = this.props.categories.map((category) =>
            <Category key={category.id} category={category} getCategoryById={this.props.getCategoryById}/>
        );
        return (
            <div>
                <ul className="nav flex-column">
                    {categories}
                </ul>
            </div>
        )
    }

}

class Category extends Component {
    constructor() {
        super();
        this.getB = this.getB.bind(this);
    }

    getB() {
        this.props.getCategoryById(this.props.category.id);
        this.setState({state: this.state});
    }


    render() {
        return (
            <li className="nav-item">
                <button type="button" className="btn btn-light btn-lg btn-block"
                        onClick={this.getB}>{this.props.category.name}</button>
            </li>
        )
    }

}


/*
class Category extends Component {
    constructor() {
        super();
        this.getB = this.getB.bind(this);
    }

    getB() {
        this.props.getCategoryById(this.props.category.id);
        this.setState({state: this.state});
    }


    render() {
        return (
            <li className="nav-item">
                <button type="button" className="btn btn-light btn-lg btn-block"
                        onClick={this.getB}>{this.props.category.name}</button>
            </li>
        )
    }

}*/
