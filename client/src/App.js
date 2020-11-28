import React, { useState, useEffect } from "react";
import GridCard from "./components/Card";
import { Modal,ModalBody,ModalHeader,Form,FormGroup,Label,Input} from 'reactstrap';
import axios from "axios"
function App() {

const[isModal,setMoOpen]=useState(false);
const[dataarray,setdataarray]=useState([]);
const[label,setlabel]=useState(null);
const[imageurl,seturl]=useState(null);
const[searchtext,setsearchtext]=useState("");
useEffect(()=>{
  axios.get("http://localhost:5000/info/search/"+searchtext)
  .then((respons)=>{
    setdataarray(respons.data);
  })
  .catch((err)=>{
    console.error(err);
  });

},[searchtext]);

function handledelete(path)
{
  axios.delete("http://localhost:5000/info/delete/"+path)
  .then((resp)=>{
    setdataarray(resp.data);
  })
  .catch((err)=>{
  });
}
function handlechange(e)
{
  if(e.target.name==='username')
  setlabel(e.target.value)
else if(e.target.name==='url')
seturl(e.target.value);
}
function toggleModal()
{
  setMoOpen(!isModal)
}

function handlesearchChange(e)
{
  setsearchtext(e.target.value);

}


// }

function handleupload(e){
  e.preventDefault();
axios.post("http://localhost:5000/info", {
  label:label,
  imageurl:imageurl
})
.then(function (response) {
  setdataarray(response.data);
})
.catch(function (error) {
  console.log(error);
});
 
toggleModal();

}
  return (
    <>
    <div className="App">
    <div className="navbar">
    <div className="first">
      <img class="img" src="../my_unsplash_logo.svg" alt="imagesrc"></img>
      <input type="text" className="search" onChange={handlesearchChange} placeholder="&#xF002; Search" style={{"font-family":"Arial, FontAwesome"}} />
      </div>
      <button onClick={toggleModal} className="photoup">Add a Photo</button>
    </div>
    <div className="grids">
      {
        dataarray.map((data)=>{
          return(<GridCard imgsrc={data.imageurl} label={data.label} onDelete={handledelete} id={data._id}/>)
        })
      }
 
    </div>
    </div>
    <Modal className="model" isOpen={isModal} toggle={toggleModal}>
    <ModalHeader  toggle={toggleModal}>Add new Photo</ModalHeader>
    <ModalBody>
      <Form onSubmit={handleupload}>
      <FormGroup>
                                <Label htmlFor="label">Label</Label>
                                <Input type="text" id="username" name="username" onChange={handlechange}
                                 />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="url">Photo Url</Label>
                                <Input type="text" id="url" name="url" onChange={handlechange}
                                     />
                            </FormGroup>
                            <div >
                            <button className="uplo" >  Upload <i className="fa fa-sign-in" aria-hidden="true"></i> </button>
                            </div>
      </Form>
    </ModalBody>
    </Modal>
  </>
  
  );
}

export default App;
