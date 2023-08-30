import React from 'react';
import axios from 'axios';
import {useState, useEffect} from 'react';
import { Button } from 'react-bootstrap';

function Form() {
    const [Text, setText] = useState([])
    const [TitleID, setTitleID] = useState(0)
    const [Summary, setSummary] = useState("")
    const fetchText = async () => {
        const result = await axios.get('http://localhost:8000/api/text');

        console.log(result.data)
        setText(result.data)
    }

    useEffect(() => {
        fetchText();
    }, [])

    const goToDetail = () => {
        alert("detail page")
    }

    const handleSelectChange = (event) => {
      const selectedValue = event.target.value;
      const selectedTitle = Text.find((text) => text.title === selectedValue);
      setTitleID(selectedTitle?.id);
      console.log(TitleID);
    };
  
    const addNewSummary = async () => {
      
      try {
        const response = await axios.post('http://localhost:8000/api/summaries/', {
          text: TitleID,
          summary: Summary,
        });
  
        console.log('New summary created:', response.data);
      } catch (error) {
        console.error('Error creating summary:', error);
      }
    }
  return (
    <div className='main'>
      <form>
  <div className="form-group">
    <label for="exampleFormControlInput1">ID</label>
    <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="type your ID here"/>
  </div>
  <div className="form-group">
    <label for="exampleFormControlSelect1">Select Question</label>
    <select className="form-control" id="exampleFormControlSelect1">
    {
      Text.map((text, index)=>
      (
           <option>{text.question}</option>
      ))
    }
    </select>
  </div>
  <div className="form-group">
    <label for="exampleFormControlSelect1">Select Title</label>
    <select className="form-control" id="exampleFormControlSelect1" onChange={handleSelectChange}>
    {
      Text.map((text, index)=>
      (
           <option>
              {text.title}
              </option>
      ))
    }
    </select>
  </div>

  <div className="form-group">
    <label for="exampleFormControlTextarea1">Your Summary</label>
    <textarea className="form-control" id="exampleFormControlTextarea1" rows="15" name='summary' value={Summary} 
    onChange={(e) => {
      setSummary(e.target.value)
      // console.log(Summary)
    }}></textarea>
  </div>
</form>

<Button onClick={addNewSummary}>Evaluate</Button>
    </div>
  )
}

export default Form;
