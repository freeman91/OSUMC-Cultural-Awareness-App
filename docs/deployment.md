# Steps to deploy production API service to AWS

## Summary

The backend API service is deployed and running on an [AWS EC2 instance](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html).  
Steps I took to setup the AWS resources and get an EC2 instance booted up and accepting incoming traffic.  
Then steps to ssh into the instance, clone the repo, and start gunicorn service.

## Updates to repo

- The EC2 instance will need to install python dependencies make sure requirements.txt is up to date. (There is probably a way to start gunicorn using pipenv but I haven't tested that out yet)  
  `pipenv run pip freeze > requirements.txt`

## AWS Configuration

This [Medium Article](https://medium.com/@shefaliaj7/hosting-react-flask-mongodb-web-application-on-aws-part-1-introduction-f49b1be79f48) was helpful to get all of the resources stood up on AWS.

- need an AWS account (owner can generate login credentials for new users)
-

AWS Resources needed

EC2 instance
Security Group
inbound ports: 80, 443,
SSH key
VPC
Public Subnet
Route Table

## Provision EC2 instance

- ~~[install mongodb](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-amazon/)~~  
  (later I uninstalled mongodb because we are now using Mongo Atlas in production)

- install git  
  `yum -y install git-core`
- install python  
  `sudo yum install python3 python3-devel pip3`
- install python dependencies  
  `pip3 install -r /path/to/requirements.txt`
- install c compiler
  `sudo yum groupinstall "Development Tools" `
- install nginx
  `sudo amazon-linux-extras install nginx1.12`  
  had to `chmod 711 /home/ec2-user` at some point

- registered the domain name: ` osumc-cultural-awareness.com` on freenom.com
- created Route53, added a record to route traffic to the ec2 instance [article](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-to-ec2-instance.html)
- change name servers of domain on freenom

- install cert bot `sudo yum install -y certbot`
- generate cert `sudo certbot certonly`

- clone repo
- add production .env file in the root of the app directory  
  set `FLASK_ENV=production`  
  keep everything else the same as dev
- ~~restore the database
  `mongorestore --archive='db-backup.bak'`~~

- Add ssl cert to ec2 [docs](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/SSL-on-amazon-linux-2.html)

- create gunicorn service file  
  `sudo vi /etc/systemd/system/gunicorn.service`


- reload daemons  
  `sudo systemctl daemon-reload`  
- start gunicron service  
  `sudo systemctl start gunicorn`  
- check gunicron status  
  `sudo systemctl status gunicorn`  
- show gunicorn logs  
  `journalctl -u gunicron.service`

# Steps to deploy frontend to GithubPages

[Expo | Publishing websites](https://docs.expo.io/distribution/publishing-websites/)

- Repo settings > GitHub Pages set branch=gh-pages, dir=/(root)
- `yarn add -D gh-pages`
- in package.json add:

```json
{
  //...
  "homepage": "https://freeman91.github.io/OSUMC-Cultural-Awareness-App/",
  "scripts": {
    //...
    "deploy": "gh-pages -d web-build",
    "predeploy": "expo build:web"
  }
  //...
}
```

- `yarn deploy` bundles the application for production and pushes the generated dir `web-build/` to the `gh-pages` branch

## Monitoring production environments

### Mongo Atlas cluster
https://cloud.mongodb.com/v2/5fbd1d47d242c47aa1327aa3#clusters