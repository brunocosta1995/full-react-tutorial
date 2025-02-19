import Card from '../UI/Card';
import classes from './ProductItem.module.css';
import {cartActions} from '../../store/cart-slice';
import {useDispatch} from 'react-redux';

const ProductItem = (props) => {
  const { title, price, description, id } = props;

  const dispatch = useDispatch();

  const handleAddCart = () => {
    dispatch(cartActions.addItem({
      id,
      title,
      price
    }))
  }

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={handleAddCart}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
