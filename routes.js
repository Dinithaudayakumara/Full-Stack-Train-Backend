const express = require("express");

//models
const userModel = require("./model/userModel");
const routeModel = require("./model/routeModel");
const stationModel = require("./model/stationModel");
const trainModel = require("./model/trainModel");
const ticketModel = require("./model/ticketModel");

const app = express();



app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//Route API
app.post("/route/create", async (request, response) => {
  const model = new routeModel(request.body);
  try {
    await model.save();
    var re = {
      "status": true,
      "message": "Successfully",
      "data": model
    };
    console.log(re);
    response.send(re);

  } catch (error) {
    response.status(500).send(error);
    console.log(error);
  }
});

app.get("/route/getAll", async (request, response) => {
  const model = await routeModel.find({});
  try {
    var re = {
      "status": true,
      "message": "Successfully",
      "data": model
    };
    console.log(re);
    response.send(re);

  } catch (error) {
    response.status(500).send(error);
    console.log(error);
  }
});

app.put("/route/update", async (request, response) => {
  const model = await routeModel.findByIdAndUpdate(request.body._id, request.body);
  try {
    await model.save();
    var re = {
      "status": true,
      "message": "Successfully",
      "data": model
    };
    console.log(re);
    response.send(re);
  } catch (error) {
    response.status(500).send(error);
    console.log(error);
  }
});


app.delete("/route/delete/:id", async (request, response) => {
  const model = await routeModel.findByIdAndDelete(request.params.id);
  try {
    var re = {
      "status": true,
      "message": "Successfully",
      "data": model
    };
    console.log(re);
    response.send(re);
  } catch (error) {
    response.status(500).send(error);
    console.log(error);
  }
});

async function TrainAvailabilityCheck(name) {
  const model = await trainModel.find({});
  const findModel = model.map(x => x.name == name);
  for (let x in findModel) {
    if (findModel[x]) {
      return true;
    }
  }
  return false;
}

async function StationAvailabilityCheck(name) {
  const model = await stationModel.find({});
  const findModel = model.map(x => x.name == name);
  for (let x in findModel) {
    if (findModel[x]) {
      return true;
    }
  }
  return false;
}

async function UserAvailabilityCheck(email) {
  const user = await userModel.find({});
  const findUser = user.map(x => x.email == email);
  for (let x in findUser) {
    if (findUser[x]) {
      return true;
    }
  }
  return false;
}

async function UserLoginCheck(email, password) {
  const user = await userModel.find({});
  const findUser = user.map(x => x.email == email && x.password == password);
  for (let x in findUser) {
    if (findUser[x]) {
      return true;
    }
  }
  return false;
}

async function GetUser(email) {
  const user = await userModel.find({});
  const findUser = user.map(x => x.email == email);
  for (let x in user) {
    if (user[x].email == email) {
      return user[x];
    }
  }
}




//User API
app.post("/user/create", async (request, response) => {
  const user = new userModel(request.body);
  try {
    if (await UserAvailabilityCheck(user.email)) {
      var re = {
        "status": false,
        "message": "Failed - This User already exists",
        "data": user
      };
      console.log(re);
      response.send(re);
    }
    else {
      await user.save();
      var re = {
        "status": true,
        "message": "Successfully",
        "data": user
      };
      console.log(re);
      response.send(re);
    }

  } catch (error) {
    response.status(500).send(error);
    console.log(error);
  }
});

app.get("/user/getAll", async (request, response) => {
  const user = await userModel.find({});
  //response.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  try {
    var re = {
      "status": true,
      "message": "Successfully",
      "data": user
    };
    console.log(re);
    response.send(re);

  } catch (error) {
    response.status(500).send(error);
    console.log(error);
  }
});

app.put("/user/update", async (request, response) => {
  const user = await userModel.findByIdAndUpdate(request.body._id, request.body);
  try {
    await user.save();
    var re = {
      "status": true,
      "message": "Successfully",
      "data": user
    };
    console.log(re);
    response.send(re);
  } catch (error) {
    response.status(500).send(error);
    console.log(error);
  }
});

app.post("/user/userLogin", async (request, response) => {
  try {
    if (await UserLoginCheck(request.body.email, request.body.password)) {
      var re = {
        "status": true,
        "message": "Successfully",
        "data": request.body.email
      };
      console.log(re);
      response.send(re);
    }
    else {
      var re = {
        "status": false,
        "message": "Falid - email or password incorrect",
        "data": request.body.email
      };
      console.log(re);
      response.send(re);
    }

  } catch (error) {
    response.status(500).send(error);
    console.log(error);
  }
});

app.post("/user/getUser", async (request, response) => {
  try {
    var user = await GetUser(request.body.email);
    if (user) {
      var re = {
        "status": true,
        "message": "Successfully",
        "data": user
      };
      console.log(re);
      response.send(re);
    }
    else {
      var re = {
        "status": false,
        "message": "Falid - email or password incorrect",
        "data": request.body.email
      };
      console.log(re);
      response.send(re);
    }

  } catch (error) {
    response.status(500).send(error);
    console.log(error);
  }
});

app.delete("/user/delete/:id", async (request, response) => {
  const post = await userModel.findByIdAndDelete(request.params.id);
  try {
    var re = {
      "status": true,
      "message": "Successfully",
      "data": post
    };
    console.log(re);
    response.send(re);
  } catch (error) {
    response.status(500).send(error);
    console.log(error);
  }
});


async function UserAvailabilityCheck(email) {
  const user = await userModel.find({});
  const findUser = user.map(x => x.email == email);
  for (let x in findUser) {
    if (findUser[x]) {
      return true;
    }
  }
  return false;
}

//Train API

app.post("/train/create", async (request, response) => {
  const model = new trainModel(request.body);
  try {
    if (await TrainAvailabilityCheck(model.name)) {
      var re = {
        "status": false,
        "message": "Failed - This Train already exists",
        "data": model
      };
      console.log(re);
      response.send(re);
    }
    else {
      await model.save();
      var re = {
        "status": true,
        "message": "Successfully",
        "data": model
      };
      console.log(re);
      response.send(re);
    }

  } catch (error) {
    response.status(500).send(error);
    console.log(error);
  }
});

app.get("/train/getAll", async (request, response) => {
  const model = await trainModel.find({});
  try {
    var re = {
      "status": true,
      "message": "Successfully",
      "data": model
    };
    console.log(re);
    response.send(re);

  } catch (error) {
    response.status(500).send(error);
    console.log(error);
  }
});

app.put("/train/update", async (request, response) => {
  const model = await trainModel.findByIdAndUpdate(request.body._id, request.body);
  try {
    await model.save();
    var re = {
      "status": true,
      "message": "Successfully",
      "data": model
    };
    console.log(re);
    response.send(re);
  } catch (error) {
    response.status(500).send(error);
    console.log(error);
  }
});


app.delete("/train/delete/:id", async (request, response) => {
  const model = await trainModel.findByIdAndDelete(request.params.id);
  try {
    var re = {
      "status": true,
      "message": "Successfully",
      "data": model
    };
    console.log(re);
    response.send(re);
  } catch (error) {
    response.status(500).send(error);
    console.log(error);
  }
});


//Station API
app.post("/station/create", async (request, response) => {
  const model = new stationModel(request.body);
  try {
    if (await StationAvailabilityCheck(model.name)) {
      var re = {
        "status": false,
        "message": "Failed - This station already exists",
        "data": model
      };
      console.log(re);
      response.send(re);
    }
    else {
      await model.save();
      var re = {
        "status": true,
        "message": "Successfully",
        "data": model
      };
      console.log(re);
      response.send(re);
    }

  } catch (error) {
    response.status(500).send(error);
    console.log(error);
  }
});

app.get("/station/getAll", async (request, response) => {
  const model = await stationModel.find({});
  try {
    var re = {
      "status": true,
      "message": "Successfully",
      "data": model
    };
    console.log(re);
    response.send(re);

  } catch (error) {
    response.status(500).send(error);
    console.log(error);
  }
});

app.put("/station/update", async (request, response) => {
  const model = await stationModel.findByIdAndUpdate(request.body._id, request.body);
  try {
    await model.save();
    var re = {
      "status": true,
      "message": "Successfully",
      "data": model
    };
    console.log(re);
    response.send(re);
  } catch (error) {
    response.status(500).send(error);
    console.log(error);
  }
});


app.delete("/station/delete/:id", async (request, response) => {
  const model = await stationModel.findByIdAndDelete(request.params.id);
  try {
    var re = {
      "status": true,
      "message": "Successfully",
      "data": model
    };
    console.log(re);
    response.send(re);
  } catch (error) {
    response.status(500).send(error);
    console.log(error);
  }
});


//Ticket API
app.post("/ticket/create", async (request, response) => {
  const model = new ticketModel(request.body);
  try {
    await model.save();
    var re = {
      "status": true,
      "message": "Successfully",
      "data": model
    };
    console.log(re);
    response.send(re);

  } catch (error) {
    response.status(500).send(error);
    console.log(error);
  }
});

app.get("/ticket/getAll", async (request, response) => {
  const model = await ticketModel.find({});
  try {
    var re = {
      "status": true,
      "message": "Successfully",
      "data": model
    };
    console.log(re);
    response.send(re);

  } catch (error) {
    response.status(500).send(error);
    console.log(error);
  }
});

app.put("/ticket/update", async (request, response) => {
  const model = await ticketModel.findByIdAndUpdate(request.body._id, request.body);
  try {
    await model.save();
    var re = {
      "status": true,
      "message": "Successfully",
      "data": model
    };
    console.log(re);
    response.send(re);
  } catch (error) {
    response.status(500).send(error);
    console.log(error);
  }
});

app.delete("/ticket/delete/:id", async (request, response) => {
  const model = await ticketModel.findByIdAndDelete(request.params.id);
  try {
    var re = {
      "status": true,
      "message": "Successfully",
      "data": model
    };
    console.log(re);
    response.send(re);
  } catch (error) {
    response.status(500).send(error);
    console.log(error);
  }
});


module.exports = app;

