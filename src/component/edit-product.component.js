import React,{ Component } from 'react';
import axios from 'axios';

export default class EditProduct extends Component {

    constructor(props){
        super(props);

        this.state = {
            product_name: '',
            product_type: '',
            product_price: ''
        }

        this.onChangeProductName = this.onChangeProductName.bind(this);
        this.onChangeProductType = this.onChangeProductType.bind(this);
        this.onChangeProductPrice = this.onChangeProductPrice.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount(){
        axios.get('http://localhost:4000/products/'+this.props.match.params.id)
        .then(res => {
            this.setState({
                product_name: res.data.product_name,
                product_type: res.data.product_type,
                product_price: res.data.product_price
            })
        })
        .catch(function(error){
            console.log(error)
        })
    }

    componentDidUpdate(){
        axios.get('http://localhost:4000/products/'+this.props.match.params.id)
        .then(res => {
            this.setState({products: res.data});
        })
        .catch(function(error){
            console.log(error)
        })
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

        const obj = {
            product_name: this.state.product_name,
            product_type: this.state.product_type,
            product_price: this.state.product_price
        }

        axios.post('http://localhost:4000/products/update'+this.props.match.params.id, obj)
        .then(res => {
            console.log(res.data)
        });

        this.props.history.push('/');
    }

    render(){
        return (
            <div>
                <h3> Edit Product </h3>
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
                        <input type="text" className="form-control" value={this.state.product_price} onChange={this.onChangeProductPrice} />
                    </div>
                    <div className="form-group">
                        <input type="submit" className="btn btn-primary" value="Update Product" />
                    </div>
                </form>
            </div>
        );
    }
}