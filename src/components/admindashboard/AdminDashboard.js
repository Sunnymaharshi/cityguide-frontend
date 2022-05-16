import React, {useContext,useEffect} from 'react'
import UserContext from '../../context/user/user.context';
import City from '../CRUDcity/City';

function AdminDashboard() {
  useEffect(() => {
    checkUserLogin();
  }, []);
  const { user, checkUserLogin } = useContext(UserContext); 
  return (
    <div>
      {user.role==="Admin" && <div className='admin-content'><City/></div>}
      {user.role!=="Admin" && <div className='unauthorised'>Only admin can access this content!</div>}
    </div>
  )
}

export default AdminDashboard