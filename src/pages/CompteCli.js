import React , {useState , useEffect} from 'react'
import Table from 'react-bootstrap/Table'
import './../css/Home.css'
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import Icon from '@material-ui/core/Icon';
import AddIcon from '@material-ui/icons/Add';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter , MDBCol, MDBFormInline , MDBIcon } from 'mdbreact';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { MDBDataTableV5 } from 'mdbreact';
import axios from 'axios'
import $ from 'jquery'
import Api_url from './../component/Api_url';
import { ToastContainer, toast } from 'react-toastify';
import Avatar from '@material-ui/core/Avatar';
// import { mdbTableEditor } from 'mdb-table-editor'


function CompteCli() {
    const token = localStorage.getItem('token')
    const [open, setopen] = useState(false)
    const [suppopen, setsuppopen] = useState(false)
    const [editopen, seteditopen] = useState(false)

    const [selectedrow, setselectedrow] = useState({id: 26, Nom_equipe: "hhhh", Service: "Telephonie", createdAt: "2021-03-09T15:20:45.000Z", updatedAt: "2021-03-09T15:20:45.000Z"})
  
    const toggle = () =>{
        setopen(!open)
    }

    const toggleSupp = () =>{
      setsuppopen(!suppopen)
    }


    const changeselected = (equipe) =>{
      setselectedrow(equipe)
      console.log(selectedrow)
    }

    const toggleEdit = () =>{
     
      seteditopen(!editopen)

     
    } 

    useEffect(() => {
   // fonction affiche table
    const getequipelist = async ()=>{
      const res = await axios({
        headers: {'Authorization': `Bearer ${token}`},
        method: 'get',
        url : `${Api_url}equipe/`,  
        });
        setequipes(res.data)
        
    }

    getequipelist()
    }, [])
  
    const [nomequipe, setnomequipe] = useState("")
    const [service, setservice] = useState("")
    const [equipes, setequipes] = useState([]);

    const [search, setsearch] = useState("")

// fonction add row table
    const Addequipe = async (e) =>{
      e.preventDefault()
      const data = {
        nomService :nomequipe,
        nomEquipe:service,
      }
      const res = await axios({
        headers: {'Authorization': `Bearer ${token}`},
        method: 'post',
        url : `${Api_url}equipe/`,
        data
        
        });
        console.log(res)
        if(res.status === 200){
          toast.success(`L'équipe ${res.data.equipe.Nom_equipe} a été ajoutée avec succès`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            });
              setTimeout(() => {
                setequipes([res.data.equipe ,...equipes])
              }, 500);

              setnomequipe("")
              setservice("")


            
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
  
  // fonction update table
    const updatedequipe = async (e)=>{
      e.preventDefault()
      const data = {
         nomService : selectedrow.Service,
        nomEquipe : selectedrow.Nom_equipe
      }
      const res = await axios({
        headers: {'Authorization': `Bearer ${token}`},
        method: 'put',
        url : `${Api_url}equipe/update/equipe/${selectedrow.id}`,
        data
        
    });
   
        if(res.status === 200){
          toast.success(`L'équipe ${res.data.equipe.Nom_equipe} a été modifée avec succès`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            });
              setTimeout(() => {
                $(`#${res.data.equipe.id} #Nomeq`).text(res.data.equipe.Nom_equipe)
                $(`#${res.data.equipe.id} #Ser`).text(res.data.equipe.Service)
              }, 200);   
              seteditopen(!editopen)
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

// fonction delete row table
const Suppequipe = async (e)=>{
  e.preventDefault()
  const res = await axios({
    headers: {'Authorization': `Bearer ${token}`},
    method: 'delete',
    url : `${Api_url}equipe/${selectedrow.id}`
   
    
});

    if(res.status === 200){
      toast.success(`L'équipe ${res.data.equipe.Nom_equipe} a été supprimée avec succès`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        });
          setTimeout(() => {
            $(`#${res.data.equipe.id}`).hide()
          }, 200);   
          setsuppopen(!suppopen)
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

const filter = () =>{
 
    var value = $("#equipe-search").val().toLocaleLowerCase()
    $("#equipe-body tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
     console.log( $(this).text())
    });
  
}



    return (
      <>
      <div className="comptecli">
          
      
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
      
   
 {/* <!-- Page Header--> */}
 <header  class="page-header">
            <div class="container-fluid">
              <h2 class="no-margin-bottom">Compte Client</h2>
            </div>
          </header>
          {/* <!-- Breadcrumb--> */}
          <div class="breadcrumb-holder container-fluid">
            <ul class="breadcrumb">
              <li class="breadcrumb-item"><a href="home">Home</a></li>
              <li class="breadcrumb-item active">Clients</li>
              <li class="breadcrumb-item active">Compte client</li>
            </ul>
          </div>
      


        <div className="row  justify-content-center">
            <div className="col-10 text-center">
            

{/* Profile client */}
  



    <div >
            <div className="profile-header-cover"></div>
            <div className="profile-header-content">
                <div className="profile-header-img mb-4">
                    <Avatar src="https://bootdey.com/img/Content/avatar/avatar1.png"className="mb-4 grow" style={{width:140,height:140}} alt=""/>
                </div>

                <div className="profile-header-info">
                    <h4 className="m-t-sm">Clyde Stanley</h4>
                    <p className="m-b-sm">UXUI + Frontend Developer</p>
                    <Button href="#" color="primary"><EditIcon />Edit Profile</Button>
                </div>
            </div>

        <ul className="profile-header-tab nav nav-tabs col-12 mb-4">
            <li className="nav-item"><a href="#profile-post" className="nav-link" data-toggle="tab">POSTS</a></li>
            <li className="nav-item"><a href="#profile-about" className="nav-link" data-toggle="tab">ABOUT</a></li>
            <li className="nav-item"><a href="#profile-photos" className="nav-link" data-toggle="tab">STUFF</a></li>
            <li className="nav-item"><a href="#profile-videos" className="nav-link" data-toggle="tab">CHARTS</a></li>
            <li className="nav-item"><a href="#profile-friends" className="nav-link active show" data-toggle="tab">DATA</a></li>
        </ul>
    </div>


            <div className="row col-12 mb-2">
              <div className="col-9"> 
              <MDBCol >
                <MDBFormInline className="md-form">
                  <MDBIcon icon="search" />
                  <TextField className="ml-3 " size="small" label="Recherche" variant="outlined" id="equipe-search" type="text" onChange={()=>{filter()}}/>
                </MDBFormInline>
              </MDBCol>
               </div> 
               <div className="col-3"> 
                <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={()=>toggle(!open)}> Ajouter </Button> 
               </div>
            </div> 
                <Table  striped bordered hover>
                    
                    <thead>
                    <tr>
                        <th style={{width:50}}>#</th>
                        <th>Equipe</th>
                        <th>Service</th>
                        <th style={{width:150}}>Action</th>
                      </tr>
                    </thead>
                    <tbody id="equipe-body">


                      {
                        equipes.map((equipe , index)=>(
                            <tr key={index} id={equipe.id}>
                        <td> {equipe.id}</td>
                        <td id="Nomeq" > {equipe.Nom_equipe}</td>
                        <td id="Ser"> {equipe.Service}</td>
                        <td>
                        <IconButton className="mr-3" size="small" aria-label="delete" color="secondary" onClick={()=> {changeselected(equipe);toggleSupp()}}>
                        <DeleteIcon />
                        </IconButton>
                        <IconButton size="small" aria-label="delete" color="primary" onClick={()=>{changeselected(equipe); toggleEdit()}}>
                        <EditIcon />
                        </IconButton>     
                        </td>
                      </tr>
                          ))
                      }
                      


                    </tbody>
            </Table>

                        {/* MODAL ADD */}
              <MDBModal isOpen={open} toggle={()=>toggle()} size="lg">
                <MDBModalHeader toggle={()=>toggle()} className="text-center">Ajouter une nouvelle équipe</MDBModalHeader>
                <MDBModalBody>
                <form className="row col-12 justify-content-center align-middle" >
              <div>
              <div className="mb-5">
              <TextField value={nomequipe} onChange={(e)=>{setnomequipe(e.target.value)}} id="standard-basic" label="Nom de l'equipe" required />
                      <TextField
                        className="ml-5"
                        id="standard-select-currency"
                        select
                        required
                        size="medium"
                        label="Service"
                        value={service}
                        onChange={(e)=>{setservice(e.target.value)}}
                      >

                        <MenuItem value={"Informatique"}>Informatique</MenuItem>
                        <MenuItem value={"Marketing"}>Marketing</MenuItem>
                        <MenuItem value={"Finance"}>Finance</MenuItem>
                        <MenuItem value={"Telephonie"}>Telephonie</MenuItem>
                        <MenuItem value={"RH"}>RH</MenuItem>
                      </TextField>

                      
                      </div>
                      <Button onClick={(e)=>{Addequipe(e)}} variant="outlined" class="btn btn-outline-success">
                      Ajouter
                      </Button> 
                </div>
                </form>
                </MDBModalBody>
                </MDBModal>
                        {/* MODAL EDIT */}
                <MDBModal isOpen={editopen} toggle={()=>toggleEdit()} size="lg">
                <MDBModalHeader toggle={()=>toggleEdit()} className="text-center">Modifier les données de l'équipe</MDBModalHeader>
                <MDBModalBody>
                <form className="row col-12 justify-content-center align-middle" >
              <div>
              <div className="mb-5">
              <TextField value={selectedrow.Nom_equipe} onChange={(e)=>{setselectedrow({...selectedrow , Nom_equipe : e.target.value})}} id="standard-basic" label="Nom de l'equipe" />
                      <TextField
                        className="ml-5"
                        id="standard-select-currency"
                        select
                        size="medium"
                        label="Service"
                        value={selectedrow.Service}
                        onChange={(e)=>{setselectedrow({...selectedrow , Service : e.target.value})}}
                      >

                        <MenuItem value={"Informatique"}>Informatique</MenuItem>
                        <MenuItem value={"Marketing"}>Marketing</MenuItem>
                        <MenuItem value={"Finance"}>Finance</MenuItem>
                        <MenuItem value={"Telephonie"}>Telephonie</MenuItem>
                        <MenuItem value={"RH"}>RH</MenuItem>
                      </TextField>

                      
                      </div>
                      <Button onClick={(e)=>{updatedequipe(e)}} variant="outlined" class="btn btn-outline-success">
                      Modifier
                      </Button> 
                </div>
                </form>
                </MDBModalBody>
                </MDBModal>


                      {/* MODAL SUPP */}
                <MDBModal isOpen={suppopen} toggle={()=>toggleSupp()} size="lg">
                <MDBModalHeader toggle={()=>toggleSupp()} className="text-center sm">Supprimer l'équipe</MDBModalHeader>
                    <MDBModalBody>
                        <div className="row col-12 ">
                          <div >
                            <p>vous les vous vraiment supprimer cette équipe ?</p>
                          </div>
                        </div>
                  </MDBModalBody> 
                  <div>
                <MDBModalFooter>
                        <Button color="primary" variant="contained" color="secondary" startIcon={<DeleteIcon />} onClick={(e)=>{Suppequipe(e)}}>Supprimer</Button>
                        <Button color="primary" variant="contained" color="primary"  onClick={()=>toggleSupp()}>annuler</Button>
                </MDBModalFooter>
                </div>
                </MDBModal>


      {/* <div class="container">
        <mdb-table-editor
        :data="datatable"
        striped
        bordered
       /> */}
</div>
            </div>
            
            </div></>
      
    );
}

export default CompteCli
