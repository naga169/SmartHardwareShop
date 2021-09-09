import { Product as ProductType } from '../types/types'
import '../css/Product.css';
import { useSelector, useDispatch } from "react-redux";

function Product({ data }: any) {
  const dispatch = useDispatch();
  const cartProducts: ProductType[] = useSelector((state: any) => {
    return state.cartProducts;
  });
  const onProductClick = () => {
    dispatch({ type: 'SHOW_HIDE_MODAL', payload: true })
    dispatch({ type: 'SELECTED_PRODUCT', payload: data })
  }

  const onAddProduct = (data: ProductType) => {
    if (cartProducts.length === 0) {
      dispatch({ type: 'SET_CART_PRODUCTS', payload: [...cartProducts, data] })
    }
    else if (!cartProducts.find(ad => ad.id == data.id)) {
      dispatch({ type: 'SET_CART_PRODUCTS', payload: [...cartProducts, data] })
    }
  }

  return (
    <div className="col">
      <div className="card">
        <img src={data.defaultImage} onClick={onProductClick} className="card-img-top" alt="..." />
        <div className="card-body">
          <h6 className="card-title">{data.name}</h6>
          <div className="row">
            <div className="col-xs-12 col-md-12">
              <p className="lead">
                <div className="a-row a-size-base a-color-base">
                  <span className="a-price" data-a-size="l" data-a-color="price">
                    <span className="a-offscreen cost">Kr {data.price}</span><span aria-hidden="true">
                    </span></span>
                  <span className="a-price a-text-price" data-a-size="b" data-a-strike="true" data-a-color="secondary">
                    <span className="a-offscreen discount" > {data.price + data.discount}</span></span>
                  <div className="save"> You Save: <span style={{ fontSize: '12px' }} className="cost">{data.discount}</span></div>
                </div>
              </p>
            </div>
          </div>
          <div className="row">
            {
              cartProducts.length ? (!cartProducts.find((ad: any) => ad.id == data.id) ?
                <button className="btn btn-success" onClick={() => onAddProduct(data)}>Add to cart</button>
                :
                <button className="btn btn-info" onClick={() => { }}>Added to cart</button>)
                : (
                  <button className="btn btn-success" onClick={() => onAddProduct(data)}>Add to cart</button>
                )
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
