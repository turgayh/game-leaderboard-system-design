## API 
**Host: http://144.126.248.117** 

```bash
 [POST] : /user/create
 [GET]  : /user/profile/{user_id}
 [POST] : /score/submit
 [GET]  : /leaderboard  
 [GET]  : /leaderboard/{country_iso_code}
```

### System Design 

![](/doc/images/design.png)

<br/>

### Tech Stack

<br/>

#### Development
```bash
nodejs
docker
dynamodb
redis
jmeter
jest
```

#### Deploy
```bash
DigitalOcean Redis
DigitalOcean NodeJS Cluster
DigitalOcean Droplet (Ubuntu server)

```
<br/>
<br/>
<br/>


### API Guide 

<br/>
<br/>

####   /user/create  
<br/>
To create and initialize a player in the game.

| request                                                                                                                         | response                    |
| ------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| - display_name: **String** , require: **true**,unique:**true** <br/> - country:  **String** , require: **true**,unique:**true** | ![](/doc/images/create.png) |

- Example request and response

![](/doc/images/create-ex.png)
<br/>
<br/>

#### /user/profile/{user_id}

<br/>
<br/>

To get user information

| request                                                      | response                         |
| ------------------------------------------------------------ | -------------------------------- |
| - user_id: **String** , require: **true**,unique:**true**  c | ![](/doc/images/get-profile.png) |

- Example request and response

![](/doc/images/get-profile-ex.png)


#### /score/submit

<br/>
<br/>

| request                                                                                                                                                        | response                   |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| - display_name: **String** , require: **true**,unique:**true** <br/> - points:  **Number** , require: **true** <br/> - country: **String** , require: **true** | ![](/doc/images/score.png) |

- Example request and response
![](/doc/images/score-ex.png)
<br/>
<br/>


#### /leaderboard

<br/>
<br/>

To get global leaderboard  
**Note**: default return Top 100 list


| request                                 | response                         |
| --------------------------------------- | -------------------------------- |
| - size: **Number** , require: **false** | ![](/doc/images/leaderboard.png) |


- Example request and response

![](/doc/images/leaderboard-ex.png)


#### /leaderboard/{country_iso_code}

<br/>
<br/>

To get specific country's leaderboard 
**Note**: default return Top 100 list

| request                                 | response                                 |
| --------------------------------------- | ---------------------------------------- |
| - size: **Number** , require: **false** | ![](/doc/images/leaderboard-country.png) |

<br/>
<br/>

- Example request and response
![](/doc/images/leaderboard-country-ex.png)