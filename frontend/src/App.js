import React from 'react'
import {useState,useEffect} from 'react';
import Axios from 'axios'
import{Form,Button} from 'react-bootstrap'
import './App.css'
import { Link,useNavigate } from 'react-router-dom'
import Loading from "./Loading";
import './bootstrap.min.css'
const App = () => {
  const [ Show, setShow ] = useState(false);
  const [question,setquestion] = useState("");
  const [options,setoptions] = useState([""]);
  const [required,setrequired] = useState("");
  const[ques,setques]=useState([])
  const[loading,setloading]=useState(false);
  const additionalform = () => {
    if (Show)
    setShow(false);
    else
    setShow(true);
};


const fetchQuestions=async()=>{
  try{
  
    const {data}= await Axios.get('/api/information');
    console.log("angry")
    setques(data);
    setloading(false)
  }
  catch(error){
    console.log("Error occured in fetching data");
  }
}
const deletePost = async(id)=>{
  try{
    setloading(true)
    await Axios.delete(`api/information/${id}`);
    setloading(false)
  }
  catch(error){
    console.log("Error in deleting message")
  }
}

const handleSubmit=async()=>{
  setloading(true)
  try{
    const config={
      headers:{
        "Content-Type":"application/json"
      }
    };

    const data={
      "question":question,
      "options":JSON.stringify(options),
      "required":required
    };


    await Axios.post('/api/information',data,config);
    console.log("go back")
    setques("");
    setoptions([""]);
    setrequired(false);
    setloading(false)
    
  }
  catch(error){
    console.log("Error occured in creating new Question");
  }
  
}

useEffect(() => {
  fetchQuestions();
}, [ques])
// useEffect(()=>{
//   
//   });
//   },[deletePost,])


  

  
  
  
  return (
   
    <div className='all'>
       {loading && <Loading />}
    <div className="displayquestions">
    <h2>Screening Questions</h2>
    <p className='head'> Narrow down your candidates</p>
    <div className='display'>
    
      {ques.map((ques,index)=>(
        
        <Form className="formq">
         
          <p>{index+1} {ques.question}</p>
          {eval(ques.options).map((option,index1)=>(
            <div>
              <Form.Check type='radio' id={index1} name={index} value={option} label={option}/>
            </div>
          )
          )}
           <Button style={{marginTop:'15px'}} class="buttons" variant="outline-danger" onClick={(() => deletePost(ques.id))}>Delete Question</Button>
        </Form>
      ))}
      </div>
      

        
    <Button class="buttons" style={{marginTop:'15px',marginBottom:'19px'}} onClick={additionalform}>Add New Question?</Button>
    </div>
    {Show && <div className="create" >
      {/* console.log("inside show") */}
    <div className="upload">
        <label style={{marginBottom:'15px',marginRight:'10px'}}> Question</label>
        <input placeholder='Question' type="text"
        value={question}
         onChange={(e)=> {
            setquestion(e.target.value)
            
        }}/>
        <Form.Check style={{marginLeft:'10px'}} className='uff' type="switch" label="Required" onChange={()=>{
          setrequired(1-required)
        }}
        />
        
        {/* <label style={{marginRight:'10px'}}>Required</label>
        <input placeholder='Required' type="binary" onChange={(e)=>{
            setrequired(e.target.value)
        }}/> */}
        <div>
        {options.map((option,index)=>(
                <div className="optiontop">
                  <Form.Check type='radio' value={option}/>
                  <Form.Control className="optionin"  type="text" placeholder={`Option ${index+1}`} name="addOption" value={option} onChange={(e)=>{
                    const newOptions=options;
                    newOptions[index]=e.target.value;
                    setoptions(newOptions);
                  }}/>
                </div>
              ))}
              <Form.Check className="buttons"class="btn btn-info" type='radio' id="addOptionButton" label="Add Option" onClick={()=>{
                const newOptions=[...options,""];
                setoptions(newOptions);
              }}/>
        
         
     
         <Button class="btn btn-info"style={{marginTop:'15px',marginRight:"10px"}} variant="outline-danger" onClick={() => {
          setShow(false);
        }}>Delete Question</Button>
     <Button class="btn btn-info" style={{marginTop:'15px'}} onClick={() => {
          handleSubmit();
          setShow(false);
        }}>Save Question?</Button>
     
     </div>
    </div>
</div>
}
</div>

  )
}

export default App;