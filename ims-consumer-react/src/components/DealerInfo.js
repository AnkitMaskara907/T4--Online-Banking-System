import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthenticationService from '../service/AuthenticationService'
import '../styles/DealerInfo.css'

function DealerInfo(){

    const history = useNavigate();
    const [dealerInfo, setDealerInfo] = useState([]);

    //component life cycle management
    useEffect(() => {
        fetchDealerInfo();
    }, []);

    const fetchDealerInfo = async () => {
        try{
            const data = await AuthenticationService.getDealerInfo();
            setDealerInfo(data);
        }
        catch(error){
            console.error('Error fetching dealer Info: ', error);   
        }
    }
        return (
            <> <br/>
       
            <div>
              <h2 style={{color:'blue', backgroundColor:'white',width:'300px', margin:'auto'}}>Dealer Information</h2><br/>
              <table className="dealer-table" cellPadding={10} cellSpacing={20}>
                <thead>
                  <tr>
                    <th>Dealer Id</th>
                    <th>Full Name</th>
                    <th>Telephone</th>
                    <th>Email</th>
                    <th>Street</th>
                    <th>City</th>
                    <th>Pincode</th>
                    {/* Add more table headers as needed */}
                  </tr>
                </thead>
                <tbody>
                  {dealerInfo.map((dealer) => (
                    <tr key={dealer.id}>
                      <td>{dealer.id}</td>
                      <td>{dealer.fname} &nbsp; {dealer.lname}</td>
                      <td>{dealer.phoneNo}</td>
                      <td>{dealer.email}</td>
                      <td>{dealer.street}</td>
                      <td>{dealer.city}</td>
                      <td>{dealer.pincode}</td>
                      {/* Add more table cells as needed */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div></>
        )
}


export default DealerInfo