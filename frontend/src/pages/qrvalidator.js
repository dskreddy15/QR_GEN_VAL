import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const QRValidator = () => {
  const { id } = useParams();
  const [code, setCode] = useState(id);
  const [isValid, setIsValid] = useState(false);
  const [isRedeemed, setIsRedeemed] = useState(false);
  const handleValidateQR = async () => {
    if (!code) {
      alert('Please enter a coupon code');
      return;
    }
    try{
      await axios.post(`http://192.168.86.23:4000/api/validate-qr`, { couponCode: code })
          .then(response => {
            if (response.data.status === 'Valid') {
              alert('Coupon is valid');
              setIsValid(true);
            } 
            else if (response.data.status === 'Used') {
              alert('Coupon is already redeemed');
              setIsValid(true);
              setIsRedeemed(true);
            }
            else if (response.data.status === 'Expired') {
              alert('Coupon is expired');
            }
            else{
              alert('Coupon is not valid');
            }
          });
    }
    catch (error) {
        alert('Error validating QR code. Please try again later.');
      }
    }
    
  

  const handleRedeemQR = async () => {
    try{
    await axios.post(`http://192.168.86.23:4000/api/redeem-qr`, { couponCode: code, redeemed: isRedeemed })
        .then(response => {
          if (response.data.message === 'Coupon redeemed successfully') {
            const amount = response.data.addDiscount;
            alert('Coupon redeemed successfully ' + amount); 
            setIsRedeemed(true);
          }
          else if (response.data.message === 'Coupon already redeemed') {
            const amount = response.data.addDiscount;
            alert('Coupon is already redeemed' + amount);
          }
          else if( response.data.message.includes('Redeemable from')){
            alert(response.data.message);
          }
          else{
            alert('Error redeeming coupon. Please try again later.');
          }
        });
      }
      catch(error){
        alert('Error redeeming QR code. Please try again later.');
      }
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      
      <div id="qr-reader" style={{ width: "300px", margin: "auto" }}>
        <h1>Validate Coupon</h1>
      </div>
      <div style={{ margin: "10px" }}>
        <div>
          <input type="text" placeholder="Enter Coupon Code" className="border p-2" value={code} onChange={(e) => setCode(e.target.value)} />
        </div>
        <div style={{ margin: "2px"}}>
         <button onClick={handleValidateQR} style={{ padding: "10px 20px" }}>Validate QR</button>
        </div>
        <h1>Get Ready to Redeem</h1>
      </div>
      
        <div style={ {margin: "10px"}}>
          <p>Status: {isValid? 'Valid': 'Not Valid'}</p>
          {isValid && <p>Coupon is {isRedeemed ? 'Redeemed': 'Available' }
          <button onClick={handleRedeemQR}>Redeem</button></p>}
        </div>
    </div>
  );
};

export default QRValidator;
