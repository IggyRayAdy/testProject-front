import React, {Component} from 'react';
import axios from 'axios';
import CurrentBanner from "./CurrentBanner";

const api_url = 'http://localhost:8080'

export default class Banners extends Component {
    constructor() {
        super();
        this.state = {
            banners: ["0"],
            currentBanner: null,
            name: '',
            price: '',
            category: '',
            content: '',
            isCreation: false,
            allert: '',
            errors: [],
            categories: []
        }
        this.loadBannersFromServer = this.loadBannersFromServer.bind(this);
        this.loadBannerById = this.loadBannerById.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleNewBannerCreation = this.handleNewBannerCreation.bind(this);
        this.handleCreateNewBanner = this.handleCreateNewBanner.bind(this);
        this.rerender = this.rerender.bind(this);
        this.handleCategoriesFromS = this.handleCategoriesFromS.bind(this);
        this.handleFindBanners = this.handleFindBanners.bind(this);
    }


    rerender() {
        this.setState({
            state: this.state
        })
    }


    handleNameChange(e) {
        this.setState({name: e.target.value})
    }

    handlePriceChange(e) {
        this.setState({price: e.target.value})
    }

    handleCategoryChange = selectedOption => {
        this.setState({
            category: selectedOption.target.value
        })
    }

    handleTextChange(e) {
        this.setState({content: e.target.value})
    }

    handleFindBanners(e) {
        if (e.target.value == '') {
            this.loadBannersFromServer()
        } else {
            axios.get(api_url + '/banners/search/' + e.target.value)
                .then((response) => {
                    console.log(response);
                    this.setState({
                        banners: response.data.response
                    })
                })
        }
    }

    handleNewBannerCreation() {
        this.setState({
            isCreation: true
        })
    }

    loadBannersFromServer() {
        axios.get(api_url + '/banners')
            .then((response) => {
                console.log(response);
                this.setState({
                    banners: response.data.response
                })
            })
    }

    handleCreateNewBanner() {
        const data = new FormData();
        data.append('name', this.state.name)
        data.append('price', this.state.price)
        data.append('catName', this.state.category)
        data.append('content', this.state.content)
        axios.post(api_url + '/banners/addBanner', data, {
            'Content-Type': 'application/json',
        }).catch((error) => {
            // console.log('apiResponse', error.respoasnse.data.errors)
            const errors = error.response.data.errors.map((error) =>
                alert(error.defaultMessage)
            );
        })
            .then((response) => {
                console.log(response)
                if(response.data.response === 'Banner is not created, check uniq banner name and chose category'){
                    alert('Banner is not created, check uniq banner name and chose category')
                }

            })
        console.log(this.state.errors)
        this.rerender()
    }

    loadBannerById(id) {
        this.setState({
            isCreation: false
        })
        axios.get(api_url + '/banners/getBanner/' + id)
            .then((response) => {
                console.log(response);
                this.setState({
                    currentBanner: response.data.response
                })
            })
    }

    handleCategoriesFromS() {
        axios.get(api_url + '/categories')
            .then((resp) => {
                this.setState({
                    categories: resp.data.response
                })
            })
    }

    componentDidMount() {
        this.loadBannersFromServer();
        this.handleCategoriesFromS();
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-2">
                        <h2>Banners</h2>
                        <div className="form-group">
                            <input type="email" className="form-control" id="exampleFormControlInput1"
                                   placeholder="Enter banner name..." onChange={this.handleFindBanners}/>
                        </div>
                        <BannersList banners={this.state.banners} getBannerById={this.loadBannerById}/>
                        <button type="button" className="btn btn-primary btn-lg btn-block"
                                onClick={this.handleNewBannerCreation}>Create new banner
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
                                                       className="col-sm-2 col-form-label">Price</label>
                                                <div className="col-sm-10">
                                                    <input type="longtext" className="form-control" id="inputName"
                                                           onChange={this.handlePriceChange}/>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label htmlFor="inputName"
                                                       className="col-sm-2 col-form-label">Category</label>
                                                <div className="col-sm-10">
                                                    <select className="custom-select mr-sm-2"
                                                            id="inlineFormCustomSelect"
                                                            onChange={this.handleCategoryChange}>
                                                        <option selected>Choose category</option>
                                                        {this.state.categories.map((cat) => (
                                                            <option value={cat.name}>{cat.name}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label htmlFor="inputName"
                                                       className="col-sm-2 col-form-label">Text</label>
                                                <div className="col-sm-10">
                                                    <input type="longtext" className="form-control" id="inputName"
                                                           onChange={this.handleTextChange}/>
                                                </div>
                                            </div>
                                            <button type="button" className="btn btn-dark"
                                                    onClick={this.handleCreateNewBanner}>Save
                                            </button>
                                            {/*<button type="button" className="btn btn-danger"
                                                    onClick={this.handleDeleteBanner}>Delete
                                            </button>*/}
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
                                        this.state.currentBanner == null ? (<div></div>) :
                                            (
                                                <CurrentBanner currentBanner={this.state.currentBanner}/>
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

class BannersList extends Component {
    constructor() {
        super();
    }

    render() {

        const banners = this.props.banners.map((banner) =>
            <Banner key={banner.id} banner={banner} getBannerById={this.props.getBannerById}/>
        );
        return (
            <div>
                <ul className="nav flex-column">
                    {banners}
                </ul>
            </div>
        )
    }

}

class Banner extends Component {
    constructor() {
        super();
        this.getB = this.getB.bind(this);
    }

    getB() {
        this.props.getBannerById(this.props.banner.id);
        this.setState({state: this.state});
    }


    render() {
        return (
            <li className="nav-item">
                <button type="button" className="btn btn-light btn-lg btn-block"
                        onClick={this.getB}>{this.props.banner.name}</button>
            </li>
        )
    }

}