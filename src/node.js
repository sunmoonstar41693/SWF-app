const https = require('https')

const data = JSON.stringify({
  html: "<div class='box'>JavaScript ✅</div>",
  css: ".box { border: 4px solid #03B875; padding: 20px; font-family: 'Roboto'; }",
  google_fonts: "Roboto"
})

// Retrieve your api_id and api_key from the Dashboard. https://htmlcsstoimage.com/dashboard
const apiId = "your-api-id"
const apiKey = "your-api-key"

const options = {
  hostname: 'hcti.io',
  port: 443,
  path: '/v1/image',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Basic ' + new Buffer(apiId + ':' + apiKey).toString('base64')
  }
}

const req = https.request(options, (res) => {
  console.log(`statusCode: ${res.statusCode}`)

  res.on('data', (d) => {
    const image = JSON.parse(d)
    console.log(image["url"])
  })
})

req.on('error', (error) => {
  console.error(error)
})

req.write(data)
req.end()
