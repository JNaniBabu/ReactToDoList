function  Input({handleInputvalue,handelAddButton}) {

    return <div className="input">
            <input type="text" id='input' placeholder="Enter here" onChange={handleInputvalue}/>
            <button type="button" className="btn btn-success" onClick={handelAddButton}>Add</button>
        
     </div>
    
}

export default Input