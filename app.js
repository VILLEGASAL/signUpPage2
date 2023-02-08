let express = require("express")
let bodyParser = require("body-parser")
let request = require("request")
let https = require("https")

let app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))

app.get("/", (req, res) => {

    res.sendFile(__dirname + "/signup.html")
})

app.post("/", (req, res) => {

    let firstName = req.body.firstName
    let lastName = req.body.lastName
    let email = req.body.email

    let data = {

        members: [

            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }

    let jsonData = JSON.stringify(data)

    let url = "https://us14.api.mailchimp.com/3.0/lists/3ff776bff5"
    
    let options = {

        method: "POST",
        auth: "ViLLEGAS_AR2846:4cdca95a6c8c57da0e986912e8b721e5-us14",
    }

    const request = https.request(url, options, (response) => {

        if (response.statusCode === 200) {
            
            res.sendFile(__dirname + "/success.html")
        }else{

            res.sendFile(__dirname + "/failure.html")
        }
        response.on("data", (data)=> {

            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData)
    request.end()
})

app.post("/failure", (req, res) => {

    res.redirect("/")
})

app.listen(process.env.PORT || 3000, () => {

    console.log("Server is running on port 3000...");
})


//id: 3ff776bff5.
//api key : 4cdca95a6c8c57da0e986912e8b721e5-us14