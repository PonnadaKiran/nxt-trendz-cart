import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const filterCartList = cartList.filter(each => each.id !== id)
    this.setState({cartList: filterCartList})
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const updatedCartList = cartList.map(each =>
      each.id === id
        ? {
            ...each,
            quantity: each.quantity + 1,
          }
        : each,
    )
    this.setState({cartList: updatedCartList})
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const updatedCartList = cartList.map(each => {
      if (each.id === id) {
        if (each.quantity > 1) {
          return {
            ...each,
            quantity: each.quantity - 1,
          }
        }
        return null
      }
      return each
    })
    const filteredCartList = updatedCartList.filter(each => each !== null)
    this.setState({cartList: filteredCartList})
  }

  addCartItem = product => {
    this.setState(prevState => {
      const existingProduct = prevState.cartList.find(
        item => item.id === product.id,
      )
      if (existingProduct) {
        return {
          cartList: prevState.cartList.map(item => {
            if (item.id === product.id) {
              return {...item, quantity: item.quantity + product.quantity}
            }
            return item
          }),
        }
      }
      return {cartList: [...prevState.cartList, product]}
    })
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
