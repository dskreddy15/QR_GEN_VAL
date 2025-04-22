import React, { useState } from 'react';

const AdminPage = () => {
  const [couponcode, setCouponcode] = useState();
  const [isValid, setIsValid] = useState();
  const [isRedeemed, setIsRedeemed] = useState();
  const [ValidFrom, setValidFrom] = useState();
  const [ValidTo, setValidTo] = useState();
  const [addDiscount, setAddDiscount] = useState();

  useEffect

  const handleDelete = async (e) => {}

  const handleUpdate = async (e) => {}
  return (
    <div style={{textAlign:"center", alignItems:"center", placeItems:"center"}}>
      {/* Add more admin-specific content here */}
      <div id='table' style = {{textAlign:"center"}}> 
        <h2>Admin Dashboard</h2>
        <p>Manage your coupons and QR codes here.</p>
        <table border={1} cellPadding={2}>
             <thead>
              <tr>
                <td>CouponCode</td>
                <td>Discount</td>
                <td>ValidFrom</td>
                <td>ValidTo</td>
                <td>Validity</td>
                <td>Redeemed</td>
              </tr>
            </thead>
            <tbody>
              {coupons.map((coupon, index) => (
                <tr>
                  <td key={index}>{coupon.couponcode}</td>
                  <td>{coupon.addDiscount}</td>
                  <td>{coupon.ValidFrom}</td>
                  <td>{coupon.ValidTo}</td>
                  <td>{coupon.isValid ? 'Valid' : (new Date() > new Date(ValidTo) ? 'Expired' : (new Date() < new Date(ValidFrom) ? 'wait a few more days' : 'Not Validated Yet'))}</td>
                  <td>{coupon.isRedeemed ? 'Redeemed' : 'Available'}</td>
                  <td>
                    <button onClick ={handleUpdate}>Update</button>
                    <button onClick = {handleDelete}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>

        </table>

      </div>
    </div>
  );
}

export default AdminPage;