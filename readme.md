## API 

```bash
 [POST] : /user/create
 [GET]  : /user/profile/{user_id}
 [POST] : /score/submit
 [GET]  : /leaderboard  
 [GET]  : /leaderboard/{country_iso_code}
```

####   /user/create  
To create and initialize a player in the game.

| request                                                                                                                                                                                             | response                    |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| - <span style="color:purple">display_name</span>: **String** , require: **true**,unique:**true** <br/> - <span style="color:purple">country</span>:  **String** , require: **true**,unique:**true** | ![](/doc/images/create.png) |

- Example request and response

