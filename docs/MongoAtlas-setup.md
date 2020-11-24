### restore remote db from a backup file

mongorestore "mongodb+srv://data-cluster.tjzlp.mongodb.net" --archive='db-backup.bak' --username addison

Next:

- create admin user on atlas cluster
- on production connect to cluster, dev connect to local mongo container
- remove mongo service from ec2 instance
