//REST is the new standard/archictetcial way of developing webservices(webapplications) lightweight datatransfer
//SOAP Simple Object Access Protocol services is a xml based webservices which is more secure heavyheight datatransfer
//express - it is a node library/framework for node for building resful webservices.
//node - is the backend of javascript which is qritten in javascript. async non blocking
//async - multiple tasks at the same time
//port - listener for a server. a door for req and res
//query params - a way to provide data in a structured to provide additional data to the end point.
//get - user wants to get a specific
//post - when user wants to create something
//put - update an existing object
//delete - deleing a resource
//promise - a way to do a javascript async operartions which has 3 states pending, fullfilled, and reject
//state variable - a way to track the status of the variable
//functional componet - is used when you do a small task or light weight
//class component - is used when my component is complex or has more functionality or alot of async calls.
//props - send data to parent class to child class
//callback function - to pass an eent from child to parents
//global state managment - use redux is a store/hold of data. action, reducer, and state
//higher order component - a way of reusing component logic
//DOM - document object model representation of html elements
//shadow DOM - scoping variables and css
//scope - a frame 

const { response } = require("express");
const axios = require("axios");
const Mars = require("../models/mars.model");
//spliting the api url in to different parts
const nasa_image_url = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos";
const nasa_api_key = "xtkJvuCxbmg8shgaDNm5jryH0fChhwVqHCr8ejff";


// ?earth_date=2020-10-3&api_key=
module.exports.findAllImages = (req, res) => {
    //selecting the query/ attribute then it should have earth date attribute with it.
    console.log(req['query']);
    let earthDate = req['query']['earth_date']

    //req - is http standard way of making a call to the endpoint. it is itself an object of meta data for example queryparama, 
    //body, header and other forms of informantion
    //res - is a http standard way to respond to a request. it is also a object that returns metadata
    //webservicee - is a style to develop webapps to do certain tasks
    //if query serch is not filled in it will provide an error
    if (!earthDate) {
        return res.status(400).json({ 
            success: false,
            message: "Please provide a proper date",
        })
    }
    
    //if params are entered it will be set as a variable 
    let queryParams = `api_key=${nasa_api_key}`;
    if (earthDate) {
        //api_key=${nasa_api_key} = &earthdate + yyyy-mm-dd
        queryParams += '&earth_date=' + earthDate;
    }

    //string interpeliation
    //https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos + &earthdate + yyyy-mm-dd + api_key=${nasa_api_key}
    const url = `${nasa_image_url}?${queryParams}`;
    
    //aixos is a npm library to help make http calls
    //axios.get returnsa promise. promise is a async
    //using the new url with query params to do a promise action returning back the desired data and store that into a variable names apires
    axios.get(url).then(apires => {
        //if the http status returns back to 200 and if the data is available 
        if (apires && apires['status'] == 200 && apires['data']) {
            //we set the variable to the right objects that we want
            let photos = apires['data']['photos']
            //store the array of objects in to the variable
            //map is a es6 function that can  manupulate/transform an array
            let photoURLs = photos.map(photo => {
                return {
                    //within that array we select which object we want to return in a map bring all the data that matches the params 
                    "img_src": photo.img_src,
                    "earth_date": photo.earth_date
                }
            })
            console.log(res);
            //return the array of objects
            return res.status(200).json({ 
                sucess: true,
                message: "Successfull retrived data",
                result: photoURLs
            })
            //this else is an extra check if any reason the api does not have the structure of data we want.
        } else {
            return res.status(500).json({ 
                success: false,
                message: 'Not successful',
                result: null
            });
        }
        //catching a failure if the promise rejects the call
    }).catch(err => {
        console.log(err)
        
        res.status(500).json({
            success: false,
            message: err.message,
            result: null
        })
    })
}