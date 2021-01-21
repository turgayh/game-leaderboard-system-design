## API 
**Host: http://144.126.248.117** 

```bash
 [POST] : /user/create
 [GET]  : /user/profile/{user_id}
 [POST] : /score/submit
 [GET]  : /leaderboard  
 [GET]  : /leaderboard/{country_iso_code}
```

####   /user/create  
To create and initialize a player in the game.

| request                                                                                                                         | response                    |
| ------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| - display_name: **String** , require: **true**,unique:**true** <br/> - country:  **String** , require: **true**,unique:**true** | ![](/doc/images/create.png) |

- Example request and response

![](/doc/images/create-ex.png)

#### /user/profile/{user_id}

To get user information

| request                                                      | response                         |
| ------------------------------------------------------------ | -------------------------------- |
| - user_id: **String** , require: **true**,unique:**true**  c | ![](/doc/images/get-profile.png) |

- Example request and response

![](/doc/images/get-profile-ex.png)


#### /score/submit

| request                                                                                                                                                        | response                   |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| - display_name: **String** , require: **true**,unique:**true** <br/> - points:  **Number** , require: **true** <br/> - country: **String** , require: **true** | ![](/doc/images/score.png) |

- Example request and response
![](/doc/images/score-ex.png)

#### /leaderboard

To get global leaderboard  
**Note**: default return Top 100 list


| request                                 | response                         |
| --------------------------------------- | -------------------------------- |
| - size: **Number** , require: **false** | ![](/doc/images/leaderboard.png) |


- Example request and response

![](/doc/images/leaderboard-ex.png)


#### /leaderboard/{country_iso_code}

To get specific country's leaderboard 
**Note**: default return Top 100 list

| request                                 | response                                 |
| --------------------------------------- | ---------------------------------------- |
| - size: **Number** , require: **false** | ![](/doc/images/leaderboard-country.png) |


- Example request and response
![](/doc/images/leaderboard-country-ex.png)