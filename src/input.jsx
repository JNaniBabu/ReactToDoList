function Input({onAdd, inputvalue,onchangeInput,onchangeDate}) {

    return <div className="InputBLOCK">
        <input type="text"  onChange={(e)=>{onchangeInput(e)}} placeholder=" Enter here" required value={inputvalue}/>
        <button onClick={()=>onAdd(inputvalue)}>Add</button>
    </div>
}

export default Input