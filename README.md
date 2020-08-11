# City Explorer Backend APIs

## Weatherbit API

https://api.weatherbit.io/v2.0/forecast/daily?&lat=38.123&lon=-78.543&key={api-key}

## Location IQ API

https://us1.locationiq.com/v1/search.php?key={api-key}&q={city-name}&format=json

## Yelp API

https://api.yelp.com/v3/businesses/search?latitude={lat}&longitude={lng}

API key provided in header `Authorization` with value of `Bearer <api-key>`

Also see https://www.yelp.com/developers/display_requirements

## Hiking Project API

https://www.hikingproject.com/data/get-trails?lat={lat}&lon={lng}&maxDistance=200&key={api-key}

## Points Break Down

Looking For | Points (10)
:--|--:
Working location endpoint | 4
Working weather endpoint | 3
Working trails endpoint | 3
Working reviews endpoint | +1
Modularizing and testing your routes | +1 per route
