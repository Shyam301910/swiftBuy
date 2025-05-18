import { Avatar, Button, Menu, MenuItem } from '@mui/material';
import React from 'react'
import { BiUser } from 'react-icons/bi';
import { FaShoppingCart } from 'react-icons/fa';
import { IoExitOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import BackDrop from './BackDrop';
import { logOutUser } from '../store/actions';

const UserMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // on clicking a userMenu
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // close userMenu
  const handleClose = () => {
    setAnchorEl(null);
  };


  const logOutHandler = () => {
    dispatch(logOutUser(navigate));
  };

  return (
    <div className='relative z-30'>
      <div
        className='sm:border-[1px] sm:border-slate-400 flex flex-row items-center gap-1 rounded-full cursor-pointer hover:shadow-md transition text-slate-700'
        onClick={handleClick} // on clicking the user menu
      >
        {/* Avatar component to show the profile icon */}
        <Avatar alt='Menu' src='' /> 
      </div>

      <Menu
        sx={{ width: "400px" }}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
          sx: { width: 160 },
        }}
      >

        {/* UserName profile page */}
        <Link to="/profile">
          <MenuItem className="flex gap-2"
            onClick={handleClose}>

            <BiUser className='text-xl' />
            <span className='font-bold text-[16px] mt-1'>
              {user?.username}
            </span>

          </MenuItem>
        </Link>

        {/* orders */}
        <Link to="/profile/orders">
          <MenuItem className="flex gap-2"
            onClick={handleClose}>

            <FaShoppingCart className='text-xl' />
            <span className='font-semibold'>
              Order
            </span>

          </MenuItem>
        </Link>

        {/* logout */}
        <MenuItem className="flex gap-2"
          onClick={logOutHandler}>

          <div className='font-semibold w-full flex gap-2 items-center bg-button-gradient px-4 py-1 text-white rounded-sm'>
            <IoExitOutline className='text-xl' />
            <span className='font-bold text-[16px] mt-1'>
              LogOut
            </span>
          </div>

        </MenuItem>

      </Menu>

      {/* if userMenu opened, then the background is shown with less opacity */}
      {open && <BackDrop />}
    </div>
  );
}

export default UserMenu