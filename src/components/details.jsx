import { useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoCheckmarkDoneSharp } from "react-icons/io5";

function Details({ history, UpdateAfterDelete, HandleEditValue }) {
  let Data = [];
  try {
    let stored = window.localStorage.getItem("CheckedList");

    if (stored) {
      Data = JSON.parse(stored);
    } else {
      window.localStorage.setItem("CheckedList", JSON.stringify([]));
    }
  } catch (error) {
    window.localStorage.setItem("CheckedList", JSON.stringify([]));
  }

  let [DoneItemIndex, setDoneItemIndex] = useState(Data);

  let handleDone = (i) => {
   
    if (!DoneItemIndex.some((val) => val === i)) {
      setDoneItemIndex((prev) => [...prev, i]);
      window.localStorage.setItem(
        "CheckedList",
        JSON.stringify([...DoneItemIndex, i])
      );
    }
  };

  let handleDelete = (val) => {
    let NewArray = history.filter((i, index) => index !== val);
    window.localStorage.setItem("item", JSON.stringify(NewArray));

    let NewCheck = DoneItemIndex.filter((index) => index !== val);
    setDoneItemIndex(NewCheck);
    window.localStorage.setItem("CheckedList", JSON.stringify(NewCheck));

    UpdateAfterDelete(NewArray);
    setEditOption([])
  };

  let [EditOption, setEditOption] = useState([]);
  let [SaveOption, setSaveOption] = useState([]);
  let [StoringUpdate,setStoringUpdate]=useState(history)

  let handleEdit = (index) => {
    setEditOption([...EditOption, index]);
    setSaveOption([])
  };

  let handleUpdationF = (index, val) => {
            let updatedHistory = [...history];
            updatedHistory[index] = val;
            HandleEditValue(updatedHistory);
            setStoringUpdate(updatedHistory)
  };
        
let handleSave=(i)=>{
      localStorage.setItem("item", JSON.stringify(StoringUpdate));
      setSaveOption([...EditOption,i])
      setEditOption([])
      
        
  }

  return (
    <ul className="details">
      {!history.length && <h4>Start your Day..!</h4>}
      {history.map((item, i) => (
        <li
          key={i}
          style={
            DoneItemIndex.includes(i) 
              ? { backgroundColor: "rgba(52, 54, 52, 1)" }
              : {}
          }
        >
          <input
            className="item"
            value={item}
            readOnly={!EditOption.includes(i)}
            onChange={(e) => handleUpdationF(i, e.target.value)}
          />
          <div className="buttons">
            <button
              type="button"
              className="btn btn-info "
              style={DoneItemIndex.includes(i) || EditOption.includes(i)  ? { display: "none" } : {display: "block" }}
              onClick={() => handleDone(i)}
            >
             <IoCheckmarkDoneSharp />
            </button>
            <button
              type="button"
              className="btn btn-light"
              style={DoneItemIndex.includes(i) || EditOption.includes(i) ? { display: "none" } : {display: "block" }}
              onClick={() => handleEdit(i)}
            >
             <MdOutlineEdit />

            </button>
            <button
              type="button"
              className="btn btn-success"
              style={!EditOption.includes(i) || SaveOption.includes(i)  ?{display:"none"}:{display:"block"}}
              onClick={()=>handleSave(i)}
            >
              Save
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => handleDelete(i)}
              style={!EditOption.includes(i) ?{display:"block"}:{display:"none"}}
            >
              <MdDelete />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default Details;
