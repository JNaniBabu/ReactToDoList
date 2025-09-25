import { useState } from 'react'
import './App.css'
import Child from './chidren'
import Input from './input'
import Alert from './alert'


function App() {
    let [items,setItems]=useState(()=>{
       let  stored=localStorage.getItem('items') 
       return stored ?JSON.parse(localStorage.getItem('items')):[]})
      
    let [duplicate, setDuplicate] = useState(false);
    let [inputvalue,setInputvalue]=useState("")
    let [errorEmpty,setErrorEmpty]=useState(false)

    let onchangeInput=(e)=>{
          setInputvalue(e.target.value)
       
    }
   
    let onAdd=(v1)=>
    {
        if (!v1.trim()){
           setErrorEmpty(true)
        }
        else{
          setErrorEmpty(false)
          let data=localStorage.getItem('items').length ?JSON.parse(localStorage.getItem('items')): [];
          let check=data ? data.some(item=> item === v1):false;
          setDuplicate(check)
          if (check){
              setInputvalue('')
              return
          }
          setItems((prevItems)=>
          {
                    localStorage.setItem("items",JSON.stringify([...prevItems,v1]))
                    return [...prevItems,v1]
         })
             setInputvalue('')
             setDuplicate(false)
  
         
        }
    }
   
    let handldeletion =(itemToRemove,index)=>{
       let newitems=items.filter(item => item !== itemToRemove);

       let data=JSON.parse(localStorage.getItem('items'))
       let newdata=data.filter(item=> item !== itemToRemove)
       localStorage.setItem('items',JSON.stringify(newdata))

       let check=localStorage.getItem('checkedlist')
       if (check){
             check=JSON.parse(check)
             let newicheckedlist=check.filter(item => item !== index);
             localStorage.setItem('checkedlist',JSON.stringify(newicheckedlist))
             location.reload()

       }
       setItems(newitems)
       
    }
    
  return (
      <div className="parent">
        <div className="block">
          <div className="reset">
           <h3>TO DO LIST</h3>

          </div>
          <div className="subblock">
            <Input onAdd={onAdd} inputvalue={inputvalue} 
             onchangeInput={onchangeInput}
            ></Input>
         </div>
            {errorEmpty && <p>Please fill the fields</p>}
            {duplicate && <Alert></Alert>}
            {items.length==0 &&<h3 className='emptyMSG'>Start  your day...!</h3>}
            <Child items={items} handldeletion={handldeletion}></Child>
        </div>
         
      </div>
      
  )
}

export default App
