# Football-Centre

## Description
This is an app that lets you look up soccer players from various different leagues across Europe.I used a free third party API in order to use accurate and up to date information on selected players

## Technologies Used
Javascript
HTML
CSS
ChatGPT
footballdata.org

## Routes 
| Route            | Purpose                                   |
|---------------------|--------------------------------------------------|
|router.get('/extract-players/:id')| This route is solely for backend purposes, it extracts a requested player by their playerId and saves the infomation related to that player in the database |
| router.get(/players/:id?/:name?)    | grabs player from local database named Players and sends it to the user on the frontend |
| router.post(/players/:id?/:name?/favorite)  | the player that is sent sent to the front-end can be sent to the 'Favorite Players" collection based on user choice|
| router.get(/favorite-list) | Grabs a list of favorite players that are saved in the Favorite Players database and sends it to the front end  |
| router.put('/favorite-list/:id') | Allows the user to edit player information if not accurate|


## WireFrames

![image](https://i.imgur.com/YY0XWsu.png)
![image](https://i.imgur.com/cd1lZAw.png)
![image](https://i.imgur.com/ANG6Vtb.png)
![image](https://i.imgur.com/C2tsBmW.png)

### Links 
https://trello.com/b/KKpIUUEC/football-centre
https://football-centre.netlify.app/


# User Stories


### MVP 
- AAU, I want to be able to search for players by number
- AAU, I want to see the selected players nationality and recent team
- AAU, I want to have a saved set of my favorite players
- AAU, I want to know if a player I am searching for is not available.

### Current



### Completed

- AAU, I want to be able to search for players by number and/or name
- AAU, I want to see the selected players nationality and recent team
- AAU, I want to have a saved set of my favorite players
- AAU, I want to know if a player I am searching for is not available.


### Ice Box
- AAU, I want user Authentication, so I have a secure experience
- AAu, I want to be able to look search through various matches across multiple different european leagues
- AAU, I want to be able to look at recent match highlights from my favorite players