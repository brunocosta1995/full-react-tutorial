import logoImg from '/logo.jpg';
import Button from './UI/Button';
import { CartContext } from '../store/CartContext';
import { useContext } from 'react';
import { ProgressCtx } from '../store/UserProgressContext';

export default function Header() {

    const ctxCart = useContext(CartContext);
    const ctxUserProgress = useContext(ProgressCtx);

    const totalCartItems = ctxCart.items.reduce((totalNumberOfItems, item) => {
        return totalNumberOfItems + item.quantity;
    }, 0)

    function handleOpenCart() {
        ctxUserProgress.showCart();
    }

    return (
        <header id="main-header">
            <div id="title">
                <img src={logoImg} alt="Restaurant Logo"/>
                <h1></h1>
            </div>
            <nav>
                <Button textOnly={true} onClick={handleOpenCart}>Cart ({totalCartItems})</Button>
            </nav>
        </header>
    )
}