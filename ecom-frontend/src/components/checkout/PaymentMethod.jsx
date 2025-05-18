import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addPaymentMethod, createUserCart } from '../../store/actions';


const PaymentMethod = () => {
    const dispatch = useDispatch();
    const { paymentMethod } = useSelector((state) => state.payment);
    const { cart, cartId } = useSelector((state) => state.carts); // cart from reducer
    const { isLoading, errorMessage } = useSelector((state) => state.errors);

    // create the cart in db
    useEffect(() => {
        if (cart.length > 0 && !cartId && !errorMessage) {
            const sendCartItems = cart.map((item) => {
                return {
                    productId: item.productId,
                    quantity: item.quantity,
                };
            });

            // sendCartItems= [
            //     { productId: "1", quantity: 2 },
            //     { productId: "2", quantity: 1 },
            // ];

            dispatch(createUserCart(sendCartItems));
        }
    }, [dispatch, cartId]);

    // handler to call the action to store the payment method in redux store
    const paymentMethodHandler = (method) => {
        dispatch(addPaymentMethod(method));
    }
    return (
        // payment form
        <div className='max-w-md mx-auto p-5 bg-white shadow-md rounded-lg mt-16 border'>
            <h1 className='text-2xl font-semibold mb-4'>Select Payment Method</h1>

            <FormControl>
                <RadioGroup
                    aria-label="payment method"
                    name="paymentMethod"
                    value={paymentMethod}
                    onChange={(e) => paymentMethodHandler(e.target.value)}
                >
                    {/* Stripe radio button */}
                    <FormControlLabel
                        value="Stripe"
                        control={<Radio color='primary' />}
                        label="Stripe"
                        className='text-gray-700' />

                    {/* Paypal radio button */}
                    <FormControlLabel
                        value="Paypal"
                        control={<Radio color='primary' />}
                        label="Paypal"
                        className='text-gray-700' />
                </RadioGroup>
            </FormControl>
        </div>
    )
}

export default PaymentMethod