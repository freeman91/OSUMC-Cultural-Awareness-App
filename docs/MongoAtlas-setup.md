# Mongo Atlas setup

[https://cloud.mongodb.com/v2/5fbd1d47d242c47aa1327aa3#clusters](Link to our production cluster)  
[Mongo Atlas Getting Started](https://docs.atlas.mongodb.com/tutorial/deploy-free-tier-cluster/)

1. create account
2. deploy a free tier cluster
3. added my personal ip and the public ip of our prod ec2 instance in Network Access
4. created an ec2-user in Database users
5. used our db backup file to create our db in the atlas cluster

```sh
mongorestore "mongodb+srv://data-cluster.tjzlp.mongodb.net" --archive='db-backup.bak' --username ec2-user
```

6. connected our flask app to the cluster when it's running in production with this in .env

```sh
MONGO_URI='mongodb+srv://ec2-user:<password>@data-cluster.tjzlp.mongodb.net/database?retryWrites=true&w=majority'
```

it's also possible to connect your shell directly to the cluster with
contact Addison to generate new users if needed

```
mongo "mongodb+srv://data-cluster.tjzlp.mongodb.net/<dbname>" --username <username>
```
