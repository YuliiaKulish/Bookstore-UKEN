import { ItemCart } from '../../components/ItemCart';
import './Cart.scss';
import { NavLink } from 'react-router-dom';
import { BookStoreIcon, IconName } from '../../components/BookStoreIcon';
import { useStore } from '../../hooks/useStore';
import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';

export const Cart = () => {
  const { cart, clearCart } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    email: '',
    phone: '',
    address: '',
  });

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = () =>
    cart
      .reduce(
        (sum, item) =>
          sum +
          (item.book.priceDiscount || item.book.priceRegular) * item.quantity,
        0,
      )
      .toFixed(2);

  const handleOpenModal = () => {
    if (cart.length) {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormValues({
      email: '',
      phone: '',
      address: '',
    });
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  const handleFieldChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setFormValues(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const isFormValid = Object.values(formValues).every(value => value.trim());

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isFormValid) {
      return;
    }

    clearCart();
    handleCloseModal();
  };

  return (
    <section className="section cart">
      <div className="container cart__container">
        <NavLink className="cart__back" to="/">
          <BookStoreIcon iconName={IconName.ArrowLeft} />
          <span className="cart__back-text">Back</span>
        </NavLink>

        <h2 className="cart__title">Cart</h2>

        <div className="cart__content">
          <ul className="cart__list">
            {cart.map(item => (
              <li className="cart__item" key={item.book.id}>
                <ItemCart book={item.book} quantity={item.quantity} />
              </li>
            ))}
          </ul>

          <div className="cart__summary summary">
            <h3 className="summary__title">&#36;{totalPrice()}</h3>
            <p className="summary__subtitle">Total for {totalItems} items</p>
            <button
              className="summary__btn"
              type="button"
              onClick={handleOpenModal}
              disabled={!cart.length}
            >
              Checkout
            </button>
          </div>
        </div>
        {isModalOpen && (
          <div className="cart-modal">
            <div className="cart-modal__overlay" onClick={handleCloseModal} />
            <div
              className="cart-modal__content"
              role="dialog"
              aria-modal="true"
            >
              <button
                className="cart-modal__close"
                type="button"
                aria-label="Close checkout form"
                onClick={handleCloseModal}
              >
                ×
              </button>
              <h4 className="cart-modal__title">Checkout details</h4>
              <form className="cart-modal__form" onSubmit={handleSubmit}>
                <label className="cart-modal__field">
                  <span>Email</span>
                  <input
                    name="email"
                    type="email"
                    value={formValues.email}
                    onChange={handleFieldChange}
                    required
                    placeholder="customer@email.com"
                  />
                </label>
                <label className="cart-modal__field">
                  <span>Phone</span>
                  <input
                    name="phone"
                    type="tel"
                    value={formValues.phone}
                    onChange={handleFieldChange}
                    required
                    placeholder="+380 00 000 00 00"
                  />
                </label>
                <label className="cart-modal__field">
                  <span>Address</span>
                  <textarea
                    name="address"
                    value={formValues.address}
                    onChange={handleFieldChange}
                    required
                    placeholder="Delivery address"
                    rows={3}
                  />
                </label>
                <button
                  className="cart-modal__submit"
                  type="submit"
                  disabled={!isFormValid}
                >
                  Pay
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
