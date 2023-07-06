const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const users = require("./users");
const uuid = require("uuid");

app.use(bodyParser.json());



app.put("/update/:id", (req, res)=>{
    const id = req.params.id;
    if(!req.body.email && !req.body.firstName){
        return res.status(400).json({
            message:'Invalid JSON data',
            success:false
        });
    }
    const {email, firstName} = req.body;

    //Find the user by UserID
    const user = users.find((user)=> user.id === id);

    if(!user){
        return res.status(404).json({
            message:'User not found',
            success: false
        });
    }
    
    
    //update
    if(email){
        user.email = email;
    }

    if(firstName){
        user.firstName = firstName;
    }
    return res.json({
        message: "User updated",
        success:true
    });

});

app.get("/get/:id", (req, res)=>{
    const id = req.params.id
    const user = users.find((user)=>user.id === id);
    if(!user){
        return res.status(404).json({
            message:'User not found',
            success:false
        });
    }
    return res.json({
        success:true,
        user:{
            id: user.id,
            email:user.email,
            firstName: user.firstName
        }
    })
    
    
})

app.get("/users", (req, res)=>{

    return res.json({
        message: 'User retrieved',
        success:true,
        users: users
        
    })
    
    
})

app.post('/add',(req,res)=>{
    if(!req.body.email || !req.body.firstName){
        return res.status(400).json({
            message:'Invalid JSON data',
            success:false
        });
    }
    const {email, firstName} = req.body;
    const id = uuid.v4();
    user  = {
        id:id,
        email:email,
        firstName, firstName
    }
    users.push(user);
    return res.status(200).json({
        message:"User added",
        success: true
    });

})

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal server error', success: false });
  });
  
  // Handle invalid routes
  app.use((req, res) => {
    res.status(404).json({ message: 'Not found', success: false });
  });

app.listen(3000, ()=>{
    console.log('Server running on port 3000');
})
