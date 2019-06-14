import React,{ Component } from 'react';
import axios from 'axios';
export default class CreateProduct extends Component {

    constructor(props){
        super(props);

        this.onChangeProductName = this.onChangeProductName.bind(this);
        this.onChangeProductType = this.onChangeProductType.bind(this);
        this.onChangeProductPrice = this.onChangeProductPrice.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            product_name: '',
            product_type: '',
            product_price: ''
        }
    }

    onChangeProductName(e) {
        this.setState({
            product_name: e.target.value
        });
    }

    onChangeProductType(e) {
        this.setState({
            product_type: e.target.value
        });
    }

    onChangeProductPrice(e) {
        this.setState({
            product_price: e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();

        const newProduct = {
            product_name: this.state.product_name,
            product_type: this.state.product_type,
            product_price: this.state.product_price
        }

        axios.post('http://localhost:4000/products/add', newProduct)
        .then(res => {
            console.log(res.data)
        });

        this.setState({
                product_name: '',
                product_type: '',
                product_price: ''
        })
    }

    render() {
        return (
            <div style={{marginTop: 20}}>
                <h3> Create New Product</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label> Product Name: </label>
                        <input type="text" className="form-control" value={this.state.product_name} onChange={this.onChangeProductName} />
                    </div>
                    <div className="form-group">
                        <label> Product Type: </label>
                        <input type="text" className="form-control" value={this.state.product_type} onChange={this.onChangeProductType} />
                    </div>
                    <div className="form-group">
                        <label> Product Price: </label>
                        <input type="number" step="any" className="form-control" value={this.state.product_price} onChange={this.onChangeProductPrice} />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Product" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        );
    }
}