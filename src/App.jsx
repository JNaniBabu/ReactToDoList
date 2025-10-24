import Input from "./components/input"
import Details from "./components/details"
import AppName from "./components/AppName"
import { useState } from "react"

function App() {

  let Data;
  try {
       let stored=JSON.parse(window.localStorage.getItem('item')) 
       Data =stored ? JSON.parse(window.localStorage.getItem('item')) :[]
  } catch (error) {
       Data = [];
  }
   
  let [history,setHistory]=useState(Data)
  
  let [value,setValue]=useState("")
  let [Reset,setReset]=useState("")

  let handleInputvalue=(e)=>{
          setValue(e.target.value)
          setReset(e)
          
        }

  let handelAddButton=()=>{
        setHistory([...history,value])
        Reset.target.value=""
        window.localStorage.setItem('item',JSON.stringify([...history,value]))
                
  }

  let UpdateAfterDelete=(val)=>{
      setHistory(val)
  }

  let HandleEditValue=(val)=>{
        setHistory(val)

  }

  return <div className="parent">
    <AppName></AppName>
    <Input handleInputvalue={handleInputvalue} handelAddButton={handelAddButton}></Input>
    <Details history={history} UpdateAfterDelete={UpdateAfterDelete} HandleEditValue={HandleEditValue} ></Details>
  </div>
}

export default App
