import Header from '../Header'
import CartListView from '../CartListView'
import CartSummary from '../CartSummary'

import CartContext from '../../context/CartContext'
import EmptyCartView from '../EmptyCartView'

import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value
      const showEmptyView = cartList.length === 0
      let totalCartValue = 0
      if (!showEmptyView) {
        totalCartValue = cartList.reduce(
          (total, each) => total + each.price * each.quantity,
          0,
        )
      }

      return (
        <>
          <Header />
          <div className="cart-container">
            {showEmptyView ? (
              <EmptyCartView />
            ) : (
              <div className="cart-content-container">
                <h1 className="cart-heading">My Cart</h1>
                <div className="remove-all-btn-container">
                  <button
                    onClick={() => removeAllCartItems()}
                    className="remove-all-btn"
                    type="button"
                  >
                    Remove All
                  </button>
                </div>
                <CartListView />
                <CartSummary
                  totalCartValue={totalCartValue}
                  cartListLength={cartList.length}
                />
              </div>
            )}
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)
export default Cart
