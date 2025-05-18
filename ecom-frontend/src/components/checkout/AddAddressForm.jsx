import React, { useEffect } from 'react'
import InputField from '../shared/InputField'
import { useForm } from 'react-hook-form';
import { FaAddressCard } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import Spinners from '../shared/Spinners';
import toast from 'react-hot-toast';
import { addUpdateUserAddress } from '../../store/actions';

const AddAddressForm = ({ address, setOpenAddressModal }) => {
    const dispatch = useDispatch();
    const { btnLoader } = useSelector((state) => state.errors);
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm({
        mode: "onTouched", // Validates fields after they are touched.
    });

    // on submit handler
    const onSaveAddressHandler = async (data) => {
        dispatch(addUpdateUserAddress(
            data,
            toast,
            address?.addressId,
            setOpenAddressModal
        ));
    };

    // when address already exists(if user selects to edit), load the existing data in the form
    useEffect(() => {
        if (address?.addressId) {
            setValue("buildingName", address?.buildingName);
            setValue("city", address?.city);
            setValue("street", address?.street);
            setValue("state", address?.state);
            setValue("pincode", address?.pincode);
            setValue("country", address?.country);
        }
    }, [address]);

    // address form      
    return (
        <div className="">
            <form
                onSubmit={handleSubmit(onSaveAddressHandler)}
                className="">
            
                {/* Title */}
                <div className="flex justify-center items-center mb-4 font-semibold text-2xl text-slate-800 py-2 px-4">
                    <FaAddressCard className="mr-2 text-2xl" />
                    {!address?.addressId ?
                        "Add Address" : // adding new address
                        "Update Address" // editing exisitng address
                    }
                </div>
                
                {/* input fields start here */}
                <div className="flex flex-col gap-4">
                    {/* Building name */}
                    <InputField
                        label="Building Name"
                        required
                        id="buildingName"
                        type="text"
                        min={5}
                        message="*Building Name is required"
                        placeholder="Enter Building Name"
                        register={register}
                        errors={errors}
                    />

                    {/* Street */}
                    <InputField
                        label="Street"
                        required
                        id="street"
                        type="text"
                        min={5}
                        message="*Street is required"
                        placeholder="Enter Street"
                        register={register}
                        errors={errors}
                    />

                    {/* city */}
                    <InputField
                        label="City"
                        required
                        id="city"
                        type="text"
                        min={4}
                        message="*City is required"
                        placeholder="Enter City"
                        register={register}
                        errors={errors}
                    />

                    {/* state */}
                    <InputField
                        label="State"
                        required
                        id="state"
                        type="text"
                        min={2}
                        message="*State is required"
                        placeholder="Enter State"
                        register={register}
                        errors={errors}
                    />

                    {/* Country */}
                    <InputField
                        label="Country"
                        required
                        id="country"
                        type="text"
                        min={2}
                        message="*Country is required"
                        placeholder="Enter Country"
                        register={register}
                        errors={errors}
                    />
                    
                    {/* Pincode */}
                    <InputField
                        label="Pincode"
                        required
                        id="pincode"
                        type="text"
                        min={6}
                        message="*Pincode is required"
                        placeholder="Enter Pincode"
                        register={register}
                        errors={errors}
                    />                  
                </div>
                
                {/* save button */}
                <button
                    disabled={btnLoader}
                    className="text-white bg-customBlue px-4 py-2 rounded-md mt-4"
                    type="submit">
                    {btnLoader ? (
                        <>
                            <Spinners /> Loading...
                        </>
                    ) : (
                        <>Save</>
                    )}
                </button>
            </form>
        </div>
    )
}

export default AddAddressForm