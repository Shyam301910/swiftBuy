import { Button, Step, StepLabel, Stepper } from '@mui/material';
import React, { useEffect, useState } from 'react'
import AddressInfo from './AddressInfo';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAddresses } from '../../store/actions';
import toast from 'react-hot-toast';
import Skeleton from '../shared/Skeleton';
import ErrorPage from '../shared/ErrorPage';
import PaymentMethod from './PaymentMethod';
import OrderSummary from './OrderSummary';
import StripePayment from './StripePayment';
import PaypalPayment from './PaypalPayment';

const Checkout = () => {
    const [activeStep, setActiveStep] = useState(0); // step number of the stepper, starts from 0
    const dispatch = useDispatch();
    
    //ERROR variables
    const { isLoading, errorMessage } = useSelector((state) => state.errors);
    
    // cart & totalPrice variables
    const { cart, totalPrice } = useSelector((state) => state.carts);

    // address variables
    const { address, selectedUserCheckoutAddress } = useSelector(
        (state) => state.auth
    )

    // payment variables
    const { paymentMethod } = useSelector((state) => state.payment);

    // back button handler
    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    // next button handler
    const handleNext = () => {
        if(activeStep === 0 && !selectedUserCheckoutAddress) {
            toast.error("Please select checkout address before proceeding.");
            return;
        }

        if(activeStep === 1 && (!selectedUserCheckoutAddress || !paymentMethod)) {
            toast.error("Please select payment address before proceeding.");
            return;
        }
        
        setActiveStep((prevStep) => prevStep + 1);
    };

    // different steps in checkout
    const steps = [
        "Address",
        "Payment Method",
        "Order Summary",
        "Payment",
    ];
    
    // fetch all the addresses to store in address
    useEffect(() => {
        dispatch(getUserAddresses());
    }, [dispatch]);

  return (
    <div className='py-14 min-h-[calc(100vh-100px)]'>
        {/* Stepper */}
        <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label, index) => (
                <Step key={index}>
                    <StepLabel>{label}</StepLabel>
                </Step>
            ))}
        </Stepper>

        {isLoading ? (
            <div className='lg:w-[80%] mx-auto py-5'>
                <Skeleton /> {/* show skeleton when its loading */}
            </div>
        ) : (
            <div className='mt-5'>
                {/* 0: Address Info */}
                {activeStep === 0 && <AddressInfo address={address} />} 
                {/* 1: Payment Method */}
                {activeStep === 1 && <PaymentMethod />}
                {/* 2: Order Summary*/}
                {activeStep === 2 && <OrderSummary 
                                        totalPrice={totalPrice}
                                        cart={cart}
                                        address={selectedUserCheckoutAddress}
                                        paymentMethod={paymentMethod}/>}
                {/* Payment Page */}
                {activeStep === 3 && 
                    <>
                        {paymentMethod === "Stripe" ? (
                            <StripePayment />
                        ) : (
                            <PaypalPayment />
                        )}
                    </>}
            </div>
        )}
        
        {/* Back and proceed buttons */}
        <div
            className='flex justify-between items-center px-4 fixed z-50 h-24 bottom-0 bg-white left-0 w-full py-4 border-slate-200'
            style={{ boxShadow: "0 -2px 4px rgba(100, 100, 100, 0.15)" }}>
            <Button
                variant='outlined'
                disabled={activeStep === 0}
                onClick={handleBack}>
                    Back
            </Button>

            {activeStep !== steps.length - 1 && (
                <button
                    disabled={
                        errorMessage || (
                            (activeStep === 0 ? !selectedUserCheckoutAddress
                                : activeStep === 1 ? !paymentMethod
                                : false
                            )
                        )
                    }
                    className={`bg-customBlue font-semibold px-6 h-10 rounded-md text-white
                       ${
                        errorMessage ||
                        (activeStep === 0 && !selectedUserCheckoutAddress) ||
                        (activeStep === 1 && !paymentMethod)
                        ? "opacity-60"
                        : ""
                       }`}
                       onClick={handleNext}>
                    Proceed
                </button>
            )} 
        </div>
        
        {errorMessage && <ErrorPage message={errorMessage} />}
    </div>
  );
}

export default Checkout;