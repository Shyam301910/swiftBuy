
import React, { useState } from 'react'
import Skeleton from '../shared/Skeleton';
import { FaAddressBook } from 'react-icons/fa';
import AddressInfoModal from './AddressInfoModal';
import AddAddressForm from './AddAddressForm';
import { useDispatch, useSelector } from 'react-redux';
import AddressList from './AddressList';
import { DeleteModal } from './DeleteModal';
import toast from 'react-hot-toast';
import { deleteUserAddress } from '../../store/actions';

const AddressInfo = ({ address }) => {

    const [openAddressModal, setOpenAddressModal] = useState(false); // address form modal
    const [openDeleteModal, setOpenDeleteModal] = useState(false); // delete address modal
    const [selectedAddress, setSelectedAddress] = useState(""); // selected address

    // add address handler
    const addNewAddressHandler = () => {
        setSelectedAddress("");
        setOpenAddressModal(true);
    };

    const dispatch = useDispatch();

    //delete address handler
    const deleteAddressHandler = () => {
        dispatch(deleteUserAddress(
            toast,
            selectedAddress?.addressId,
            setOpenDeleteModal
        ))
    };

    const noAddressExist = !address || address.length === 0; // no address
    const { isLoading, btnLoader } = useSelector((state) => state.errors);

    return (
        <div className='pt-4'>
            {/* If no addresses exist */}
            {noAddressExist ? (
                <div className='p-6 rounded-lg max-w-md mx-auto flex flex-col items-center justify-center'>
                    <FaAddressBook size={50} className='text-gray-500 mb-4' />
                    {/* Header */}
                    <h1 className='mb-2 text-slate-900 text-center font-semibold text-2xl'>
                        No Address Added Yet
                    </h1>

                    {/* Add address */}
                    <p className='mb-6 text-slate-800 text-center'>
                        Please add your address to complete purchase
                    </p>

                    {/* Button to add address */}
                    <button
                        onClick={addNewAddressHandler}
                        className='px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition-all'>
                        Add Address
                    </button>
                </div>
            ) : (
                // if address exists
                <div className='relative p-6 rounded-lg max-w-md mx-auto'>

                    {/* Select address header */}
                    <h1 className='text-slate-800 text-center font-bold text-2xl'>
                        Select Address
                    </h1>

                    {isLoading ? (
                        <div className='py-4 px-8'>
                            <Skeleton />
                        </div>
                    ) : (
                        <>
                            {/* Display list of addresses */}
                            <div className='space-y-4 pt-6'>
                                <AddressList
                                    addresses={address}
                                    setSelectedAddress={setSelectedAddress}
                                    setOpenAddressModal={setOpenAddressModal}
                                    setOpenDeleteModal={setOpenDeleteModal}
                                />
                            </div>

                            {address.length > 0 && (
                                <div className='mt-4'>
                                    <button
                                        onClick={addNewAddressHandler}
                                        className='px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition-all'>
                                        Add More
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            )}

            {/* This address form modal opens if openAddressModal=true*/}
            <AddressInfoModal
                open={openAddressModal}
                setOpen={setOpenAddressModal}>
                <AddAddressForm
                    address={selectedAddress}
                    setOpenAddressModal={setOpenAddressModal} />
            </AddressInfoModal>

            {/* This delete address modal opens if openDeleteModal= true*/}
            <DeleteModal
                open={openDeleteModal}
                loader={btnLoader}
                setOpen={setOpenDeleteModal}
                title="Delete Address"
                onDeleteHandler={deleteAddressHandler}
            />
        </div>
    )
}

export default AddressInfo