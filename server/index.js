const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Employees = require('./src/models/employee');
const router = express.Router();
const app = express();
const port = 7000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

 // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/my-app', {
//   useNewUrlParser: true,
//  useUnifiedTopology: true,
//  });

 mongoose.connect('mongodb://admin:password@db:27017/my-app?authSource=admin',{useNewUrlParser:true,useUnifiedTopology:true,});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected to MongoDB');
});

app.get("/employees",function(req, res) {
   Employees.find({}).then((results) => {
    // Handle results
    res.json({message:results});
  })
  .catch((err) => {
    // Handle error
  });
  });
// Define routes
app.post('/addemployee',async (req, res) => {
  const { firstname, lastname, email } = req.body;

  const employee = new Employees({
    firstname,
    lastname,
    email,
  });

   employee.save().then(() => {
   console.log('Employee saved successfully')
  //  ((err, res) => {
  //   if (!err){
     res.json({'success': 'User added successfully!'});
    });
  //   //  res.redirect('/');
  //   }else{
  //   console.log('Error during record insertion : ' + err);
  // }
  //  });
 
});

app.put('/updateemployee/:id', async (req, res) => {
  const { firstname, lastname, email } = req.body;
  const { id } = req.params;

  try {
    const employee = await Employees.findById(id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    employee.firstname = firstname;
    employee.lastname = lastname;
    employee.email = email;

    await employee.save();

    console.log('Employee updated successfully');
    res.json({ success: 'Employee updated successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error' });
  }
});


// employee.save((err) => {
  //   if (err) {
  //     console.error(err);
  //     res.status(500).send('Error saving employee');
  //   } else {
  //     res.status(200).send('Employee saved successfully');
  //   }
  // });

app.get('/getemployee/:id', (req, res) => {
	const { id } = req.params;
  Employees.findById({_id:id}).then((results) => {
    // Handle results
    res.json({message:results});
  })
  .catch((err) => {
    // Handle error
  });
  });

  app.delete('/deleteemployee/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const result = await Employees.deleteOne({ _id: id });
      if (result.deletedCount === 0) {
        return res.status(404).json({ error: 'Employee not found' });
      }
  
      console.log('Employee deleted successfully');
      res.json({ success: 'Employee deleted successfully' });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Server error' });
    }
  });

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
