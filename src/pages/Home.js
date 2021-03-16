import React, { useState, useEffect } from "react";
import './../css/sidebar.css'
import './../js/sidebar'
import './../css/Home.css'

import axios from 'axios'
import $ from 'jquery'
import User from './../component/User'
import Userview from './../component/Userview'
import AccountTabs from './../component/AccountTabs'
import avatar from './../images/avatar.svg'
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Api_url from './../component/Api_url'
import { ToastContainer, toast } from 'react-toastify';
import Avatar from '@material-ui/core/Avatar';


function Home() {
  const token = localStorage.getItem('token')
  useEffect(() => {
    const showsidebar = ()=>{
      $('#sidebar').show()
      // console.log(token)
      // console.log(Api_url)
    }

    const getuserlist = async ()=>{
      const res = await axios({
        headers: {'Authorization': `Bearer ${token}`},
        method: 'get',
        url : `${Api_url}user/`,  
        });
        setusers(res.data)
        
    }
    
    showsidebar()
    getuserlist()
    }, [])


    // $('.eye').on("hover",()=>{
    //   $('.add-password').attr("type","text")
    // })

    $('.eye').mouseenter( ()=>{
     settype("text")
    } )
    .mouseleave( ()=>{
     settype("password")
    } );

   


    const [type, settype] = useState("password")
    const [level, setlevel] = useState("")
    const [email, setemail] = useState("")
    const [pwd, setpwd] = useState("")
    const [selecteduser, setselecteduser] = useState({});
    const [users, setusers] = useState([]);



    const Adduser = async (e) =>{
      e.preventDefault()
      const data = {
        email :email,
        pwd:pwd,
        level:level,
      }

    
      const res = await axios({
        headers: {'Authorization': `Bearer ${token}`},
        method: 'post',
        url : `${Api_url}user/`,
        data
        
        });
        console.log(res)
          if(res.status === 200){
            toast.success(`${res.data.user.user_email}  added`, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              });
                setTimeout(() => {
                  setusers([res.data.user ,...users])
                }, 500);

                setemail("")
                setpwd("")


              
          }
          else {
            toast.error('error', {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              });
          }


    }

const oneuser = (user) =>{
  setselecteduser(user)
  $("#add-account").hide()
  $("#user-profile").show()
  $("#addacc").removeClass("picked")
  $("#profile").addClass("picked")
}
 
        

return (
  <>
  <ToastContainer
    position="top-right"
    autoClose={3000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    />
    <div id="account-box" className="row col-12 justify-content-center" >
          <AccountTabs />
            <div id="user-list" className="col-3">
            {users.map((user, index) => (


                 <div   className="card shadow grow mb-2 mt-2 mr-2 ml-2" key={index} onClick={()=>{oneuser(user)}} >
                 <div className="card-body d-flex flex-row">
                     <div className="avatar float-left"> <Avatar style={{width:70, height:70}} alt={user.full_name} src={user.user_img} /></div>
                     <div id="user_info" className="ml-2">
                       <h4 className="text-center" style={{fontSize:13}}>{ !user.full_name ? null :user.full_name }</h4>
                       <h4 className="text-center" style={{fontSize:11}}>{user.user_email}</h4>
                       <h6 className="text-center" style={{fontSize:13}}>{user.user_level}</h6>
                     </div>
                 </div>
                
               </div>
                // <User key={index} index={index} user={user}  />
            ))}
            </div>
            <div className="col-9 border shadow">
            <Userview selected={selecteduser} />

            <div id="add-account" className="city" style={{display:"none"}}>
            <form className="row col-12 justify-content-center align-middle" autoComplete={"off"}>
              <div className="mt-5 text-center">
              <img className="mb-5" src={avatar} style={{width:100 , height:100}} />
              <hr />
              <br />
              <TextField  value={email} onChange={(e)=>{setemail(e.target.value)}} className="mr-5" label="Email" id="standard-size-small" type="email"  size="small" required/>
              <TextField value={pwd} onChange={(e)=>{setpwd(e.target.value)}} className="ml-5 add-password" label="Password" type={type} id="standard-size-"   size="small" required /><i className="far fa-eye mt-3 eye"></i>
              <br />
               <TextField
                className="float-center mt-5"
                id="standard-select-currency"
                select
                size="medium"
                label="Role"
                helperText="select Role"
                value={level}
                onChange={(e)=>{setlevel(e.target.value)}}
              >

                <MenuItem value={"admin"}>admin</MenuItem>
                <MenuItem value={"ChefS"}>Chef Service</MenuItem>
                <MenuItem value={"ChefE"}>Chef équipe</MenuItem>
                <MenuItem value={"Collaborateur"}>Collaborateur</MenuItem>
                <MenuItem value={"RH"}>RH</MenuItem>
              </TextField>
              <br />

              <div className="row justify-content-center mt-5">
              <button type="submit" className="btn text-lowercase" style={{width:100}}  onClick={(e)=>{Adduser(e)}}>ajouter</button>
              </div>
              </div>

            </form>
            </div>



            </div>
    </div>
    </>
  );
}

export default Home;
