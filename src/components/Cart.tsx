
import { useState } from 'react';
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import '../css/cart.css';
import ProductView from './ProductView';
import deleteProduct from '../icons/delete.svg';
import { Product as ProductType } from '../types/types';
import Header from './Header';
import MessageLayout from './MessageLayout';
function Cart() {
    const history = useHistory();
    const dispatch = useDispatch();
    const [showToaster, setShowToaster] = useState(false);
    const cartProducts: ProductType[] = useSelector((state: any) => {
        return state.cartProducts;
    });
    const [subTotal, setSubTotal] = useState(cartProducts.reduce((prev: any, next: { price: any; }) => prev + next.price, 0))
    const [discount, setDiscount] = useState(cartProducts.reduce((prev: any, next: { discount: any; }) => prev + next.discount, 0))
    const shipping = cartProducts.length ? 50 : 0;

    const onQuantityChange = (item: any, value: any) => {
        const itemQuantity = item.quantity ? item.quantity : 1;
        value = parseInt(value) ? value : 1;
        const newProducts = cartProducts.map((pro: any) => {
            if (pro.id == item.id) {
                pro.quantity = parseInt(value);
            }
            return pro;
        });
        dispatch({ type: 'SET_CART_PRODUCTS', payload: [...newProducts] })

        const updatedTotal = parseInt(subTotal) - (item.price * itemQuantity) + (item.price * parseInt(value))
        const updatedDiscount = parseInt(discount) - (item.discount * itemQuantity) + (item.discount * parseInt(value))
        setSubTotal(updatedTotal);
        setDiscount(updatedDiscount);
    }

    const onDeleteProduct = (item: any) => {
        const unDeletedProducts = cartProducts.filter(pro => pro.id !== item.id);
        dispatch({ type: 'SET_CART_PRODUCTS', payload: [...unDeletedProducts] })

        const itemQuantity = item.quantity ? item.quantity : 1;
        const updatedTotal = unDeletedProducts.length ? parseInt(subTotal) - (item.price * itemQuantity) : 0;
        const updatedDiscount = unDeletedProducts.length ? parseInt(discount) - (item.discount * itemQuantity) : 0;
        setSubTotal(updatedTotal);
        setDiscount(updatedDiscount);
    }

    const onProductClick = () => {
        dispatch({ type: 'SHOW_HIDE_MODAL', payload: true })
    }

    const continueShopping = () => {
        dispatch({ type: 'SET_CART_PRODUCTS', payload: [] })
        history.push("/");
    }

    return (
        <div>
            <Header onSearchChange={() => { }}></Header>
            {!showToaster ? cartProducts.length ? (
                <section className="shopping-cart dark">
                    <div className="container">
                        <div className="content">
                            <div className="row">
                                <div className="col-md-12 col-lg-8">
                                    <div className="items">
                                        {cartProducts && cartProducts.map((product: any) => (
                                            <div className="product">
                                                <div className="row">
                                                    <div className="col-md-3">
                                                        <img onClick={onProductClick} data-bs-toggle="modal" data-bs-target="#myModal" className="img-fluid mx-auto d-block image" src={product.defaultImage} />
                                                    </div>
                                                    <div className="col-md-8">
                                                        <div className="info">
                                                            <div className="row">
                                                                <div className="col-md-5 product-name">
                                                                    <div className="product-name">
                                                                        <a onClick={onProductClick} >{product.name}</a>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-3 quantity">
                                                                    <label htmlFor="quantity">Quantity:</label>
                                                                    <input id="quantity" type="number"
                                                                        value={product.quantity ? product.quantity : 1}
                                                                        onChange={(e) => onQuantityChange(product, e.target.value)}
                                                                        className="form-control quantity-input" />
                                                                </div>
                                                                <div className="col-md-2">
                                                                    <label className="priceText" htmlFor="price">Price</label>
                                                                    <span className="price">{product.price}</span>
                                                                </div>
                                                                <div className="col-md-2 deleteIcon">
                                                                    <img src={deleteProduct} onClick={() => onDeleteProduct(product)} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="col-md-12 col-lg-4">
                                    <div className="summary">
                                        <h3>Summary</h3>
                                        <div className="summary-item"><span className="text">Subtotal</span><span className="price">kr {subTotal.toFixed(2)}</span></div>
                                        <div className="summary-item"><span className="text">Discount</span><span className="price">kr {discount}</span></div>
                                        <div className="summary-item"><span className="text">Shipping</span><span className="price">kr {shipping}</span></div>
                                        <div className="summary-item"><span className="text">Total</span><span className="price">kr {(subTotal - discount + shipping).toFixed(2)} </span></div>
                                        <button type="button" className="btn btn-primary btn-lg btn-block" onClick={() => { setShowToaster(true) }}>Checkout</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ProductView page="cart"></ProductView>

                </section>
            ) :
                <div className="emptyCart">
                    <h2>No Products in cart</h2>
                    <button type="button" className="btn btn-primary btn-lg btn-block" onClick={() => { continueShopping() }}>Continue Shopping</button>
                </div>

                :
                <MessageLayout />}
        </div>

    )
}

export default Cart;