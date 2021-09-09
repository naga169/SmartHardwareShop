import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

function MessageLayout() {
  const dispatch = useDispatch();
  const history = useHistory();
  const continueShopping = () => {
    dispatch({ type: 'SET_CART_PRODUCTS', payload: [] })
    history.push("/");
  }
    return (
        <div className="jumbotron text-center">
        <h1 className="display-3">Thank You!</h1>
        <p className="lead"><strong>Please check your email</strong> for further communication on your product dispatch.</p>
        <button type="button" className="btn btn-primary btn-lg btn-block" onClick={() => {continueShopping()}}>Continue Shopping</button>
      </div>
    )
}

export default MessageLayout;