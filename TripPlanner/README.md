# TripPlanner

:construction: **WORK IN PROGRESS** :construction:

A project I'm currently working on, is a web application where users can sign up and make travel plans, itineraries with a help of a map, custom markers, and additional information given to each point.

### Planned features:
- **Registration / login system -** Sign up with email and password
- **User profile -** Display name, profile picture - that will show up on the printable itinerary
- **User settings -** Eg. the preferred date format
- **My Trips page-** Where all the previously saved trips of a user are shown
- **Trip Planner (Editor) page-** Itinerary and editor on the left, map is on the right side of the screen, where users can:
    - Select a destination country
    - Set the travel date
    - Add one or more of the following "items" to each day of the trip:
        - City
        - Transportation (to/from, means)
        - POIs
        - Accomodation
    - Add comments and/or links to all the above items
    - Each item has different custom marker on the map
    - Toggle full screen map view 
- **Print view -** Itinerary view customized for printing or exporting to PDF
- **Mobile view -** The editor will be available on larger screens only, but there will be an option to get a direct link to an itinerary with a mobile friendly view
- **Help page -** A user manual, explaining how to use the application

### Technologies used:
- Angular
- TypeScript
- Angular Material
- SCSS
- Leaflet Map
- NestJS backend ([repository](https://github.com/KinPeter/TripPlanner-Backend))
