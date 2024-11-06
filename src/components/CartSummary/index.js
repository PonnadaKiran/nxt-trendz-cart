import './index.css'

const CartSummary = ({cartListLength, totalCartValue}) => (
  <div className="cart-summary-container">
    <div>
      <h1 className="total-order-para">
        Order Total:{' '}
        <span className="total-order-span-ele">Rs {totalCartValue}/-</span>
      </h1>
      <p className="number-of-cart-items-para">
        {cartListLength} Items in cart
      </p>
      <div className="check-out-btn-container">
        <button className="check-out-btn" type="button">
          Checkout
        </button>
      </div>
    </div>
  </div>
)

export default CartSummary
