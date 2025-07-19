const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const userModel = require("./models/users")

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))

mongoose.connect("mongodb+srv://user:user123@cluster0.v6yc0yl.mongodb.net/blogAppDB?retryWrites=true&w=majority&appName=Cluster0")

app.get("/signup", async (req, res) => {
    let userData = req.body
    let hashedPassword = bcrypt.hashSync(req.body.password, 10)
    req.body.password = hashedPassword

    let checkEmail = userModel.find({ email: req.body.email }).then(
        (item) => {
            if (item.length > 0) {
                res.json({ "Status": "Email already exist" })
            }
            else {
                userData.save()
                res.json({ "Status": "Sucess" })
            }
        }
    ).catch()
})

app.get("/login", async (req, res) => {
    let userData = req.body
    let userValidate = userModel.find({email:req.body.email}).then(
        (item) => {
            if (item.length > 0) {
                let passwordValidate = bcrypt.compareSync(req.body.password, item[0].password)
                if (passwordValidate) {
                    jwt.sign({ email: req.body.email }, "blogApp", { expiresIn: "1d" },
                        (error, token) => {
                            if (error) {
                                res.json({ "Status": "Token error","error":error })
                            } else {
                                res.json({"Status":"Success","token":token,"userid":item[0]._id})
                            }
                        }
                    )
                } else {
                    res.json({ "Status": "Password incorrect" })
                }
            } else {
                res.json({ "Status": "Email not registerd" })
            }
        }
    ).catch()
})


app.listen(4000, (error) => { console.log("Server Running") + error })