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


function Service() {
    const token = localStorage.getItem('token')
    const [open, setopen] = useState(false)
    const [suppopen, setsuppopen] = useState(false)
    const [editopen, seteditopen] = useState(false)

    const [selectedrow, setselectedrow] = useState({id: 26, Nom_service: "hhhh", createdAt: "2021-03-09T15:20:45.000Z", updatedAt: "2021-03-09T15:20:45.000Z"})
  
    const toggle = () =>{
        setopen(!open)
    }

    const toggleSupp = () =>{
      setsuppopen(!suppopen)
    }


    const changeselected = (service) =>{
      setselectedrow(service)
      console.log(selectedrow)
    }

    const toggleEdit = () =>{
     
      seteditopen(!editopen)

     
    } 

    useEffect(() => {
   // fonction affiche table
    const getservicelist = async ()=>{
      const res = await axios({
        headers: {'Authorization': `Bearer ${token}`},
        method: 'get',
        url : `${Api_url}service/`,  
        });
        setservices(res.data)
        
    }

    getservicelist()
    }, [])
  
    const [nomservice, setnomservice] = useState("")
    const [services, setservices] = useState([]);

    const [search, setsearch] = useState("")

// fonction add row table
    const Addservice = async (e) =>{
      e.preventDefault()
      const data = {
        nomService :nomservice,
       
      }
      const res = await axios({
        headers: {'Authorization': `Bearer ${token}`},
        method: 'post',
        url : `${Api_url}service/`,
        data
        
        });
        console.log(res)
        if(res.status === 200){
          toast.success(`Le service ${res.data.service.Nom_service} a été ajoutée avec succès`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            });
              setTimeout(() => {
                setservices([res.data.service ,...services])
              }, 500);

              setnomservice("")


            
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
    const updatedservice = async (e)=>{
      e.preventDefault()
      const data = {
         nomService : selectedrow.Nom_service,
       
      }
      const res = await axios({
        headers: {'Authorization': `Bearer ${token}`},
        method: 'put',
        url : `${Api_url}service/update/service/${selectedrow.id}`,
        data
        
    });
   
        if(res.status === 200){
          toast.success(`Le service ${res.data.service.Nom_service} a été modifée avec succès`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            });
              setTimeout(() => {
                $(`#${res.data.service.id} #Nomser`).text(res.data.service.Nom_service)  
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
const Suppservice = async (e)=>{
  e.preventDefault()
  const res = await axios({
    headers: {'Authorization': `Bearer ${token}`},
    method: 'delete',
    url : `${Api_url}service/${selectedrow.id}`
   
    
});

    if(res.status === 200){
      toast.success(`Le service ${res.data.service.Nom_service} a été supprimée avec succès`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        });
          setTimeout(() => {
            setservices(
                services.filter(item =>item.id !== res.data.service.id)
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
 
    var value = $("#service-search").val().toLocaleLowerCase()
    $("#service-body tr").filter(function() {
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
      
   
        <div className="row  justify-content-center">
            <div className="col-10 text-center">
            

            <div className="row col-12 mb-2">
              <div className="col-9"> 
              <MDBCol >
                <MDBFormInline className="md-form">
                  <MDBIcon icon="search" />
                  <TextField className="ml-3 " size="small" label="Recherche" variant="outlined" id="service-search" type="text" onChange={()=>{filter()}}/>
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
                        <th>Service</th>
                        <th style={{width:150}}>Action</th>
                      </tr>
                    </thead>
                    <tbody id="service-body">


                      {
                        services.map((service , index)=>(
                            <tr key={index} id={service.id}>
                        <td> {service.id}</td>
                        <td id="Nomser" > {service.Nom_service}</td>
                        <td>
                        <IconButton className="mr-3" size="small" aria-label="delete" color="secondary" onClick={()=> {changeselected(service);toggleSupp()}}>
                        <DeleteIcon />
                        </IconButton>
                        <IconButton size="small" aria-label="delete" color="primary" onClick={()=>{changeselected(service); toggleEdit()}}>
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
              <TextField value={nomservice} onChange={(e)=>{setnomservice(e.target.value)}} id="standard-basic" label="Nom du service" required />
                      
                      </div>
                      <Button onClick={(e)=>{Addservice(e)}} variant="outlined" class="btn btn-outline-success">
                      Ajouter
                      </Button> 
                </div>
                </form>
                </MDBModalBody>
                </MDBModal>
                        {/* MODAL EDIT */}
                <MDBModal isOpen={editopen} toggle={()=>toggleEdit()} size="lg">
                <MDBModalHeader toggle={()=>toggleEdit()} className="text-center">Modifier les données du service</MDBModalHeader>
                <MDBModalBody>
                <form className="row col-12 justify-content-center align-middle" >
              <div>
              <div className="mb-5">
              <TextField value={selectedrow.Nom_service} onChange={(e)=>{setselectedrow({...selectedrow , Nom_service : e.target.value})}} id="standard-basic" label="Nom du service" />
                      
                      </div>
                      <Button onClick={(e)=>{updatedservice(e)}} variant="outlined" class="btn btn-outline-success">
                      Modifier
                      </Button> 
                </div>
                </form>
                </MDBModalBody>
                </MDBModal>


                      {/* MODAL SUPP */}
                <MDBModal isOpen={suppopen} toggle={()=>toggleSupp()} size="lg">
                <MDBModalHeader toggle={()=>toggleSupp()} className="text-center sm">Supprimer le service</MDBModalHeader>
                    <MDBModalBody>
                        <div className="row col-12 ">
                          <div >
                            <p>vous les vous vraiment supprimer ce service ?</p>
                          </div>
                        </div>
                  </MDBModalBody> 
                  <div>
                <MDBModalFooter>
                        <Button color="primary" variant="contained" color="secondary" startIcon={<DeleteIcon />} onClick={(e)=>{Suppservice(e)}}>Supprimer</Button>
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

export default Service
