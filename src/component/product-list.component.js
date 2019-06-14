import React,{ Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Product = props => (
    <tr>
        <td>{props.product.product_name}</td>
        <td>{props.product.product_type}</td>
        <td>{props.product.product_price}</td>
        <td>
            <Link to={"/edit/"+props.product._id}> Edit </Link>
        </td>
    </tr>
)

export default class ProductList extends Component {

    constructor(props){
        super(props);
        this.state = {products: []};
    }

    componentDidMount(){
        axios.get('http://localhost:4000/products/')
        .then(res => {
            this.setState({products: res.data});
        })
        .catch(function(error){
            console.log(error);
        })
    }

    productList(){
        return this.state.products.map(function(currentProduct, i){
            return <Product product={currentProduct} key={i} />;
        })
    }

    render(){
        return (
            <div>
                <h3>Product List</h3>
                <table className="table table-striped" style={{marginTop: 20}}>
                    <thead>
                        <tr>
                            <th> Product Name</th>
                            <th> Product type</th>
                            <th> Product Price</th>
                            <th> Actions </th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.productList()}
                    </tbody>
                </table>
            </div>
        );
    }
}