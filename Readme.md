# How to run
Install the server by downloading the files and running `$ npm install` in the directory.
In the root directory run `$ npm start`. This will create a web server running on localhost:3000.

To connect to the public facing instance of this server, go to "tesla-web-app.herokuapp.com".

# What this is
This application runs a website that lets you login to a Tesla account and control 
a car attached to that account. Currently it will only control the first car on the 
account with no way to switch.

# Known Bugs
- Spamming API requests makes it stop after 9 occurences.
- Setting charge limit doesn't succeed.
- Potential timing issues with seat heating.
