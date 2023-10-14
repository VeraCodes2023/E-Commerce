import cartReducer, { addToCart, removeFromCart, toggleCartItem, handleDecrement,  handleIncrement } from "../../redux/reducers/cartSlice"
// import  CartItem  from "../components/types/CartItems"
import { cartData } from "../data/cartData"
import { productsData } from "../data/productsData"
// 

describe("Test cartReducer normal action", () => {
    test("Should add new product to cart", () => {
        const cart = cartReducer(cartData, addToCart(productsData[1]))
        expect(cart.length).toBe(3)
    })
    test("Should not add but increase same product in cart", () => {
        const cart = cartReducer(cartData, addToCart(productsData[1]))
        expect(cart.length).toBe(3)
        expect(cart[1].quantity).toBe(2)
    })
    test("Should increase product quantity", () => {
        const cart = cartReducer(cartData, handleIncrement(1))
        expect(cart[0].quantity).toBe(2)
    })
    test("Should decrease product quantity", () => {
        const cart = cartReducer(cartData, handleDecrement(2))
        expect(cart[1].quantity).toBe(1)
    })
    test("Should remove product from cart", () => {
        const cart = cartReducer(cartData, removeFromCart(2))
        expect(cart.length).toBe(1)
        expect(cart[0].id).toBe(1)
    })
    test("should isChcked toggled",()=>{
       cartReducer(cartData, toggleCartItem(0))
       expect(cartData[0].isChecked).toBe(false)
       expect(cartData[1].isChecked).toBe(true)
    })

})