## API 

```bash
 [POST] : /user/create
 [GET]  : /user/profile/{user_id}
 [POST] : /score/submit
 [GET]  : /leaderboard  
 [GET]  : /leaderboard/{country_iso_code}
```

#####   /user/create  
To create and initialize a player in the game.

| request                                                      | response                    |
| ------------------------------------------------------------ | --------------------------- |
| display_name: **String** , require: **true**,unique:**true** | ![](/doc/images/create.png) |
|                                                              |                             |