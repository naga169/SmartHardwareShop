import '../css/Header.css'
import cart from '../icons/cart.svg'
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { Product as ProductType } from '../types/types'
import { Link } from 'react-router-dom';

function Header(props: (any)) {
    const history = useHistory();
    const { onSearchChange } = props;

    const cartProducts: ProductType[] = useSelector((state: any) => {
        return state.cartProducts;
    });

    const onCartClick = () => history.push("/cart");;
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <Link to="/" className="navbar-brand heading" aria-current="page">Smart Hardware Shop</Link>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                        <Link to="/" className="nav-link active headerProducts" aria-current="page">Products</Link>
                        </li>
                    </ul>
                    <form className="d-flex">
                        <input className="form-control me-2" onChange={(e) => onSearchChange(e.target.value)} type="search" placeholder="Search" aria-label="Search" />
                        <img src={cart} onClick={onCartClick} />
                        {cartProducts.length > 0 && <span className="cartNumber"> {cartProducts.length} </span>}
                    </form>
                </div>
            </div>
        </nav>
    )
}

export default Header;