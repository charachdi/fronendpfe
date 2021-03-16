import React , {useState , useEffect} from 'react'
import Table from 'react-bootstrap/Table'
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
// import { mdbTableEditor } from 'mdb-table-editor'


function Clients() {
    const token = localStorage.getItem('token')
    const [open, setopen] = useState(false)
    const [suppopen, setsuppopen] = useState(false)
    const [editopen, seteditopen] = useState(false)

    const [selectedrow, setselectedrow] = useState({id: 26, Nom_client: "hhhh", createdAt: "2021-03-09T15:20:45.000Z", updatedAt: "2021-03-09T15:20:45.000Z"})
  
    const toggle = () =>{
        setopen(!open)
    }

    const toggleSupp = () =>{
      setsuppopen(!suppopen)
    }


    const changeselected = (client) =>{
      setselectedrow(client)
      console.log(selectedrow)
    }

    const toggleEdit = () =>{
     
      seteditopen(!editopen)

     
    } 

    useEffect(() => {
   // fonction affiche table
    const getclientlist = async ()=>{
      const res = await axios({
        headers: {'Authorization': `Bearer ${token}`},
        method: 'get',
        url : `${Api_url}clients/`,  
        });
        setclients(res.data)
        
    }

    getclientlist()
    }, [])
  
    const [nomclient, setnomclient] = useState("")
    const [clients, setclients] = useState([]);

    const [search, setsearch] = useState("")

// fonction add row table
    const Addclient = async (e) =>{
      e.preventDefault()
      const data = {
        nomClient :nomclient,
       
      }
      const res = await axios({
        headers: {'Authorization': `Bearer ${token}`},
        method: 'post',
        url : `${Api_url}clients/`,
        data
        
        });
        console.log(res)
        if(res.status === 200){
          toast.success(`Le client ${res.data.client.Nom_client} a été ajoutée avec succès`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            });
              setTimeout(() => {
                setclients([res.data.client ,...clients])
              }, 500);

              setnomclient("")


            
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
    const updatedclient = async (e)=>{
      e.preventDefault()
      const data = {
         nomClient : selectedrow.Nom_client,
       
      }
      const res = await axios({
        headers: {'Authorization': `Bearer ${token}`},
        method: 'put',
        url : `${Api_url}clients/update/clients/${selectedrow.id}`,
        data
        
    });
   
        if(res.status === 200){
          toast.success(`Le client ${res.data.client.Nom_client} a été modifée avec succès`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            });
              setTimeout(() => {
                $(`#${res.data.client.id} #Nomcli`).text(res.data.client.Nom_client)  
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
const Suppclient = async (e)=>{
  e.preventDefault()
  const res = await axios({
    headers: {'Authorization': `Bearer ${token}`},
    method: 'delete',
    url : `${Api_url}clients/${selectedrow.id}`
   
    
});

    if(res.status === 200){
      toast.success(`Le client ${res.data.client.Nom_client} a été supprimée avec succès`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        });
          setTimeout(() => {
            setclients(
                clients.filter(item =>item.id !== res.data.client.id)
            )
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
 
    var value = $("#client-search").val().toLocaleLowerCase()
    $("#client-body tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
     console.log( $(this).text())
    });
  
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
      

      {/* <!-- Page Header--> */}
          <header class="page-header">
            <div class="container-fluid">
              <h2 class="no-margin-bottom">Liste des clients</h2>
            </div>
          </header>
          {/* <!-- Breadcrumb--> */}
          <div class="breadcrumb-holder container-fluid">
            <ul class="breadcrumb">
              <li class="breadcrumb-item"><a href="home">Home</a></li>
              <li class="breadcrumb-item active">Client</li>
            </ul>
          </div>


        <div className="row  justify-content-center">
            <div className="col-10 text-center">
            

            <div className="row col-12 mb-2">
              <div className="col-9"> 
              <MDBCol >
                <MDBFormInline className="md-form">
                  <MDBIcon icon="search" />
                  <TextField className="ml-3 " size="small" label="Recherche" variant="outlined" id="client-search" type="text" onChange={()=>{filter()}}/>
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
                        <th>Nom du client</th>
                        <th style={{width:150}}>Action</th>
                      </tr>
                    </thead>
                    <tbody id="service-body">


                      {
                        clients.map((client , index)=>(
                            <tr key={index} id={client.id}>
                        <td> {client.id}</td>
                        <td id="Nomcli" > {client.Nom_client}</td>
                        <td>
                        <IconButton className="mr-3" size="small" aria-label="delete" color="secondary" onClick={()=> {changeselected(client);toggleSupp()}}>
                        <DeleteIcon />
                        </IconButton>
                        <IconButton size="small" aria-label="delete" color="primary" onClick={()=>{changeselected(client); toggleEdit()}}>
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
                <MDBModalHeader toggle={()=>toggle()} className="text-center">Ajouter un nouveau client</MDBModalHeader>
                <MDBModalBody>
                <form className="row col-12 justify-content-center align-middle" >
              <div>
              <div className="mb-5">
              <TextField value={nomclient} onChange={(e)=>{setnomclient(e.target.value)}} id="standard-basic" label="Nom du client" required />
                      
                      </div>
                      <Button onClick={(e)=>{Addclient(e)}} variant="outlined" class="btn btn-outline-success">
                      Ajouter
                      </Button> 
                </div>
                </form>
                </MDBModalBody>
                </MDBModal>
                        {/* MODAL EDIT */}
                <MDBModal isOpen={editopen} toggle={()=>toggleEdit()} size="lg">
                <MDBModalHeader toggle={()=>toggleEdit()} className="text-center">Modifier les données du client</MDBModalHeader>
                <MDBModalBody>
                <form className="row col-12 justify-content-center align-middle" >
              <div>
              <div className="mb-5">
              <TextField value={selectedrow.Nom_client} onChange={(e)=>{setselectedrow({...selectedrow , Nom_client : e.target.value})}} id="standard-basic" label="Nom du client" />
                      
                      </div>
                      <Button onClick={(e)=>{updatedclient(e)}} variant="outlined" class="btn btn-outline-success">
                      Modifier
                      </Button> 
                </div>
                </form>
                </MDBModalBody>
                </MDBModal>


                      {/* MODAL SUPP */}
                <MDBModal isOpen={suppopen} toggle={()=>toggleSupp()} size="lg">
                <MDBModalHeader toggle={()=>toggleSupp()} className="text-center sm">Supprimer le client</MDBModalHeader>
                    <MDBModalBody>
                        <div className="row col-12 ">
                          <div >
                            <p>vous les vous vraiment supprimer ce client ?</p>
                          </div>
                        </div>
                  </MDBModalBody> 
                  <div>
                <MDBModalFooter>
                        <Button color="primary" variant="contained" color="secondary" startIcon={<DeleteIcon />} onClick={(e)=>{Suppclient(e)}}>Supprimer</Button>
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
            </div></>
      
    );
}

export default Clients
