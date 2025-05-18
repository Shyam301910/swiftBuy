import React from 'react'
import { FaBuilding, FaCheckCircle, FaEdit, FaStreetView, FaTrash } from 'react-icons/fa';
import { MdLocationCity, MdPinDrop, MdPublic } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux'
import { selectUserCheckoutAddress, clearCheckoutAddress } from '../../store/actions';

const AddressList = ({ addresses, setSelectedAddress, setOpenAddressModal, setOpenDeleteModal }) => {
    const dispatch = useDispatch();
    const { selectedUserCheckoutAddress } = useSelector((state) => state.auth);

    // edit address
    const onEditButtonHandler = (addresses) => {
        setSelectedAddress(addresses);
        setOpenAddressModal(true); // opens the address form modal
    };

    // delete address
    const onDeleteButtonHandler = (addresses) => {
        setSelectedAddress(addresses);
        setOpenDeleteModal(true);  // opens delete address modal
    };

    // add the selected address to the redux store and local storage
    const handleAddressSelection = (address) => {
        // if selected again, then remove the selected address from local storage and redux
        if (selectedUserCheckoutAddress?.addressId === address.addressId) {
            dispatch(clearCheckoutAddress());
            localStorage.removeItem("CHECKOUT_ADDRESS");
        } else {
            // to add selected address to the local storage and redux store
            dispatch(selectUserCheckoutAddress(address));
        }
    };

    return (
        // list of addresses
        <div className='space-y-4'>
            {addresses.map((address) => (
                <div
                    key={address.addressId}
                    onClick={() => handleAddressSelection(address)}
                    className={`p-4 border rounded-md cursor-pointer relative ${selectedUserCheckoutAddress?.addressId === address.addressId
                            ? "bg-green-100" // green if address is selected
                            : "bg-white" 
                        }`}>
                    
                    {/* 1 address info */}
                    <div className="flex items-start">
                        <div className="space-y-1">

                            {/* Building */}
                            <div className="flex items-center ">
                                <FaBuilding size={14} className='mr-2 text-gray-600' />
                                <p className='font-semibold'>{address.buildingName}</p>

                                {/* if selected then add a check circle icon */}
                                {selectedUserCheckoutAddress?.addressId === address.addressId && (
                                    <FaCheckCircle className='text-green-500 ml-2' />
                                )}
                            </div>

                            {/* Street */}
                            <div className="flex items-center ">
                                <FaStreetView size={17} className='mr-2 text-gray-600' />
                                <p>{address.street}</p>
                            </div>

                            {/* city, state */}
                            <div className="flex items-center ">
                                <MdLocationCity size={17} className='mr-2 text-gray-600' />
                                <p>{address.city}, {address.state}</p>
                            </div>

                            {/* pincode */}
                            <div className="flex items-center ">
                                <MdPinDrop size={17} className='mr-2 text-gray-600' />
                                <p>{address.pincode}</p>
                            </div>
                            
                            {/* Country */}
                            <div className="flex items-center ">
                                <MdPublic size={17} className='mr-2 text-gray-600' />
                                <p>{address.country}</p>
                            </div>
                        </div>
                    </div>

                    {/* Operations on the address */}
                    <div className="flex gap-3 absolute top-4 right-2">
                        {/* edit */}
                        <button onClick={() => onEditButtonHandler(address)}>
                            <FaEdit size={18} className="text-teal-700" />
                        </button>

                        {/* delete */}
                        <button onClick={() => onDeleteButtonHandler(address)}>
                            <FaTrash size={17} className="text-rose-600" />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default AddressList