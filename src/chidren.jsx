
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCheck, faEdit } from "@fortawesome/free-solid-svg-icons";


function Child({items,handldeletion}) {
    let [doneItems,setDoneItems]=useState([])
    let handleLineStrike=(v)=>{
           setDoneItems((p)=>[...p,v])    
   }
   

   let [checked,setChecked]=useState(()=>{
     try {
      const checkedList = localStorage.getItem('checkedlist');
      const parsed = checkedList.length ? JSON.parse(checkedList) :[];
      return Array.isArray(parsed) ? parsed : []; 
    } catch {
      return [];
    }
   })
  
   
    return(
        <div className='history'>
            {
                items.map((val,i)=>{
                    return <div style={doneItems.includes(i) || checked.includes(i) ? {backgroundColor:'grey',cursor:"not-allowed"}:{

                
                    }} 
                        className='item' key={i}>
                        <h6 style={doneItems.includes(i) || checked.includes(i) ? {textDecoration:'line-through'}:{}}>{val}</h6>
                        <div className="options">
                            <button className="btn btn-info" onClick={()=>{handleLineStrike(i)
                                setChecked((p)=>{ localStorage.setItem('checkedlist',JSON.stringify([...p,i]))
                                     return [...p,i]})
                            } }>Done</button>
                        <button className='btn btn-danger'  onClick={()=>handldeletion(val,i)}> <FontAwesomeIcon icon={faTrash} /></button>
                        </div>
                       
                    </div> 
                })
            }
        </div>
    )
    

}
export default Child