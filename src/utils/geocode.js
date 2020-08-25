const request =require('request')

const geocode = (address,callback)=>{
    const urlgeo= 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?limit=1&access_token=pk.eyJ1IjoiYmh1cGVuZHJhbW5uaXQiLCJhIjoiY2s5NTRwNTE2MGcyeDNlcnU2dWNwcWh0ZiJ9.q9ydUl7d0bWrT_0fG4NKIA'
    request({url:urlgeo, json:true},(error,response) =>{
        
        if(error){
          //  console.log('Unable to connect Geocoding server')
            callback('Unable to connect to server',undefined)
        }
        else if(response.body.features.length){
            const latitude = response.body.features[0].center[0]
            const longitude = response.body.features[0].center[1]
            const place = response.body.features[0].place_name
            console.log(longitude,latitude,place)
    
            
            callback(undefined,{
                latitude:response.body.features[0].center[0],
                longitude:response.body.features[0].center[1],
                place:response.body.features[0].place_name
            })
        }
        else{
    
            
            callback('Unable to connect to server',undefined)
        }
      
    })
    }

    module.exports = geocode