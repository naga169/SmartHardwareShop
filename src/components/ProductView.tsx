import '../css/ProductView.css'
import { Product as ProductType } from '../types/types'
import { useSelector, useDispatch } from "react-redux";
import { Modal } from 'react-bootstrap'

function ProductModal({ page }: any) {
    const dispatch = useDispatch();
    const selectedProduct: ProductType = useSelector((state: any) => {
        return state.selectedProduct;
    });

    const cartProducts: ProductType[] = useSelector((state: any) => {
        return state.cartProducts;
    });

    const onAddProduct = (data: ProductType) => {
        dispatch({ type: 'SET_CART_PRODUCTS', payload: [...cartProducts, data] })
    }

    const addedToCart = () => {
        return cartProducts.length && cartProducts.find(e => e.id === (selectedProduct && selectedProduct.id)) ?
            <button className="btn btn-info" onClick={() => { }}> Added to cart</button>
            : (
                <button className="btn btn-success" onClick={() => onAddProduct(selectedProduct)}>Add to cart</button>
            )
    }
    return (
        <div className="container mt-5 mb-5 modalContainer">
            <div className="">
                <div className="row g-0">
                    <div className="col-md-8 border-end">
                        <div className="d-flex flex-column justify-content-center">
                            <div className="main_image"> <img src={selectedProduct.defaultImage} id="main_product_image" width="350" /> </div>
                            <div className="thumbnail_images">
                                <ul id="thumbnail">
                                    {selectedProduct && selectedProduct.images && selectedProduct.images.map(sp => (
                                        <li><img src={sp} width="50" height="50" /></li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="p-3 right-side">
                            <div className="d-flex justify-content-between align-items-center">
                                <h3>{selectedProduct.name}</h3>
                            </div>
                            <div className="mt-2 pr-3 content">
                                <p>{selectedProduct.description}</p>
                            </div>
                            <p className="lead">
                                <div className="a-row a-size-base a-color-base">
                                    <span className="a-price" data-a-size="l" data-a-color="price">
                                        <span className="a-offscreen cost">Kr {selectedProduct.price}</span><span aria-hidden="true">
                                        </span></span>
                                    <span className="a-price a-text-price" data-a-size="b" data-a-strike="true" data-a-color="secondary">
                                        <span className="a-offscreen discount" > {selectedProduct.price + selectedProduct.discount}</span></span>
                                    <div className="save"> You Save: <span style={{ fontSize: '12px' }} className="cost">{selectedProduct.discount}</span></div>
                                </div>
                            </p>
                            <div className="buttons d-flex flex-row mt-5 gap-3">
                                {page !== "cart" && addedToCart()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function ProductView({ page }: any) {
    const dispatch = useDispatch();
    const onClose = () => dispatch({ type: 'SHOW_HIDE_MODAL', payload: false })

    const toggleModal: boolean = useSelector((state: any) => {
        return state.toggleModal;
    });

    return (
        <div>
            <Modal show={toggleModal} size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton onClick={() => onClose()}>
                    <Modal.Title>Product Detail</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {ProductModal(page)}
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default ProductView;