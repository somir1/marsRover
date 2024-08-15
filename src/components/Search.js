import React, { useState } from 'react';
import axios from 'axios';

const Search = () => {
    const [date, setDate] = useState('');
    const [data, setData] = useState([]);
    const [error, setError] = useState(false);

    const onSubmit = e => {
        e.preventDefault();
        if (!date) {
            alert('Please provide a date with format yyyy-mm-dd');
            return;
        }
        axios.get(`http://localhost:8000/api/curiosity/images?earth_date=${date}`)
            .then(res => {
                if (res.data.result.length > 0) {
                    setData(res.data.result);
                    setError(false);
                } else {
                    setData([]);
                    setError(true);
                }
            })
            .catch(err => {
                console.error(err);
                alert('An error occurred while fetching the data.');
            });
    };

    return (
        <div className="w-full flex sm:flex-row flex-col mx-auto justify-center p-4 font-bebas-neue">
            <form onSubmit={onSubmit} className="mb-4">
                <div className="flex flex-col">
                    <label className="mb-2 text-lg font-semibold">Date:</label>
                    <input 
                        onChange={e => setDate(e.target.value)} 
                        name="date" 
                        type="text" 
                        className="p-2 border rounded-lg sm:w-96 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        placeholder="yyyy-mm-dd" 
                        value={date}
                    />
                    <br/>
                    <input 
                        className="mt-2 items-center sm:w-96 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded cursor-pointer" 
                        type="submit" 
                        value="Search for images"
                    />
                </div>
            </form>

            {data.length > 0 ? (
            <div className='sm:ml-8'>
                <p>Total images: {data.length}</p>
                <div className="flex flex-col w-full sm:w-[50rem] max-w-full sm:max-h-96 overflow-y-scroll border border-gray-200 p-4 rounded-lg">
                {data.map((info, idx) => (
                <div className="flex flex-col justify-center items-center mb-8" key={idx}>  
                <img 
                    src={info.img_src} 
                    alt={`Mars image on ${info.earth_date}`} 
                    className="h-[200px] w-[200px] rounded-full"
                />
                <p className="text-md sm:text-4xl mt-4">Earth date: {info.earth_date}</p>
                <a 
                    href={info.img_src} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="sm:text-xl text-xs hover:underline mt-2"
                >
                    View Full Size Image
                </a>
            </div>
        ))}
    </div>
</div> ) : (
            error && <p className="text-center text-red-500 text-3xl ml-8 mt-4">No images found. Please try again.</p>
            )}
        </div>
    );
};

export default Search;
