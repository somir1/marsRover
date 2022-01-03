import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import './search.css';
import { link } from "react-router-dom";


const Search = () => {

    let [date, setDate] = useState(null);

    let [data, setData] = useState([]);

    const onSubmit = e => {
        e.preventDefault();
        if (date == null || date == '' ){
            setDate('');
            alert('Please provide a date with format yyyy-mm-dd')
            return;
        }
        axios.get(`http://localhost:8000/api/curiosity/images?earth_date=${date}`)
        .then(res => {
            setData(res.data.result)
            console.log(res.data);
        })
        .catch(err => console.log(err))
        console.log(date);
    }
    return (
        <div className="container">
            <div>
            <form onSubmit = {onSubmit} className="form-group">
                <div className="input flex-row"> 
                    <label>Date:</label>
                    <input 
                        onChange = {e => setDate(e.target.value)} 
                        name = "date" type = "text" 
                        className = "form-control" 
                        placeholder = "yyyy-mm-dd" 
                        value={date == null ? '' : date}
                    ></input>
                    <br/>
                    <input className = "btn btn-success" type = "submit" value = "Search for images"></input>
                </div>
            </form>
            </div>
            {
                data && data.length > 0?
                <div style={{ height: "600px", overflowY: "scroll" }} >
                <div className = "main list-group">
                {data.map((info, idx) => {
                return <div className = "main" key = {idx}>  
                    <img src = {info.img_src} ></img>
                    <p className = "link">Earth date: {info.earth_date}</p>
                    <a href = {info.img_src} target="_blank">{info.img_src}</a>
                </div>
                })}
                </div>
                </div>
                : ''
            }
        </div>
    );
};
export default Search;