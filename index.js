const express = require("express");

const app = express();

const data = [
  {
    id: "1",
    numberOfSeats: 100,
    amenities: ["Ac", "chairs", "discolights"],
    pricePerHour: 5000,
    bookedStatus: "true",
    customerName: "Sanjay",
    date: "05-feb-2022",
    startTime: "8AM",
    endTime: "12PM",
    RoomId: 201,
    RoomName: "Ganga",
  },
  {
    id: "2",
    numberOfSeats: 100,
    amenities: ["Ac", "chairs", "discolights"],
    pricePerHour: 5000,
    bookedStatus: "false",
    customerName: "",
    date: "",
    startTime: "",
    endTime: "",
    RoomId: 202,
    RoomName: "Yamuna",
  },
  {
    id: "3",
    numberOfSeats: 100,
    amenities: ["Ac", "chairs"],
    pricePerHour: 4000,
    bookedStatus: "false",
    customerName: "",
    date: "",
    startTime: "",
    endTime: "",
    RoomId: 203,
    RoomName: "Kaveri",
  },
  {
    id: "4",
    numberOfSeats: 100,
    amenities: ["Ac", "chairs", "discolights"],
    pricePerHour: 5000,
    bookedStatus: "",
    customerName: "",
    date: "",
    startTime: "",
    endTime: "",
    RoomId: 202,
    RoomName: "Yamuna",
  },
];

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send(data);
});

// create room

// req body must be in json format 
// // {
//   "numberOfSeats": 100,
//   "amenities": ["Ac", "chairs"],
//   "pricePerHour": 4000,
//   "RoomId": 204,
//   "RoomName": "GP"
// }
app.post("/createhall", async (req, res) => {
  var duplicatehall = await data.find((hall) => hall.RoomId == req.body.RoomId);
  if (!duplicatehall) {
    const newhall = {
      id: data.length + 1,
      numberOfSeats: req.body.numberOfSeats,
      amenities: req.body.amenities,
      pricePerHour: req.body.pricePerHour,
      bookedStatus: "false",
      customerName: "",
      date: "",
      startTime: "",
      endTime: "",
      RoomId: req.body.RoomId,
      RoomName: req.body.RoomName,
    };
    data.push(newhall);
    res.status(400).send({ message: "Hall created Successfully", data: data });
  } else {
    res.status(400).send("Hall already Exists");
  }
});


//Book Room

// the req body must contain below details
// {
//   "customerName": "vivek",
//       "date": "24-12-2023",
//       "startTime": "8.00",
//       "endTime": "15.00",                                                                
//       "RoomId": "202"
// }
app.put("/bookhall", async (req, res) => {
  var selectedhall = await data.find(
    (hall) =>
      hall.RoomId == req.body.RoomId &&
      hall.date == req.body.date &&
      hall.bookedStatus == "true"
  );
  console.log(selectedhall);
  if (selectedhall) {
    res.status(400).send("Hall already booked, Kindly choose alternate date or some other hall");
  } else {
    var selectedhall = await data.find(
      (hall) => hall.RoomId == req.body.RoomId
    );
    const bookinghall = {
      id: data.length + 1,
      numberOfSeats: selectedhall.numberOfSeats,
      amenities: selectedhall.amenities,
      pricePerHour: selectedhall.pricePerHour,
      bookedStatus: "true",
      customerName: req.body.customerName,
      date: req.body.date,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      RoomId: req.body.RoomId,
      RoomName: selectedhall.RoomName,
    };
    data.push(bookinghall);
    res.send(data);
  }
});


// to get all booked rooms
app.get("/allbookedrooms",async(req,res)=>{
  try {
    var bookedrooms=await data.filter((hall)=>hall.bookedStatus==="true")
    res.send(bookedrooms)
  } catch (error) {
    res.status(400).send(error);
  } 
})

// to get all booked names who gave the customer name
app.get("/customers",async(req,res)=>{
  try {
    var bookedrooms=await data.filter((hall)=>hall.customerName!="")
    res.send(bookedrooms)
  } catch (error) {
    res.status(400).send(error);
  }
 
})


app.get("/customerbookingcount",async(req,res)=>{
  try {
    var customercount={}
    data.map(a=>{if(a.customerName !=""){
      if(customercount[a.customerName]){
        customercount[a.customerName]++
      }else{
        customercount[a.customerName]=1
      }
    }})
    console.log(customercount)
    res.send(customercount)
  } catch (error) {
    res.status(400).send(error);
  }
})


app.listen("9000");
