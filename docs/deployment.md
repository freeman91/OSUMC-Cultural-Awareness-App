# Steps to deploy production API service to AWS


## Redeploy to production

- generate requirements.txt locally if dependencies have changes before deploying to production server  
  `pipenv run pip freeze > requirements.txt`
- ssh in ec2 instance

- clone or fetch latest master



## AWS Initial Configuration steps

The backend API service is deployed and running on an [AWS EC2 instance](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html). 
This [Medium Article](https://medium.com/@shefaliaj7/hosting-react-flask-mongodb-web-application-on-aws-part-1-introduction-f49b1be79f48) was helpful to get all of the resources stood up on AWS.

- need an AWS account (owner can generate login credentials for new users)

- registered the domain name: ` osumc-cultural-awareness.com` on freenom.com
- created Route53, added a record to route traffic to the ec2 instance [article](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-to-ec2-instance.html)
- change name servers of domain on freenom

AWS Resources needed

EC2 instance
Security Group
inbound ports: 80, 443,
SSH key
VPC
Public Subnet
Route Table

## Provision EC2 instance

Starting from a fresh Amazon Linux 2 instance

- install git  
  `yum -y install git-core`
- install python  
  `sudo yum install python3 python3-devel pip3`
- install c compiler
  `sudo yum groupinstall "Development Tools" `
- install nginx
  `sudo amazon-linux-extras install nginx1.12` 
  (*I had to `chmod 711 /home/ec2-user` to get nginx working)
- install cert bot `sudo yum install -y certbot`
- generate cert `sudo certbot certonly`  
  this generates the a certificate and key  
  cert: /etc/letsencrypt/live/www.osumc-cultural-awareness.com/fullchain.pem  
  key: /etc/letsencrypt/live/www.osumc-cultural-awareness.com/privkey.pem  
  expires after 2 months
- clone repo
- install python dependencies  
  `pip3 install -r /path/to/requirements.txt`
- create production .env file  
```
FLASK_ENV=production
FLASK_APP=api/__main__.py

MONGO_URI='mongodb+srv://ec2-user:<password>@data-cluster.tjzlp.mongodb.net/database?retryWrites=true&w=majority'
MONGO_INITDB_DATABASE=database

GMAIL_ADDRESS=osumc.cultural.awareness@gmail.com
GMAIL_PASSWORD=<password>

SECRET_KEY=<secret_key>
```

- copy gunicorn service file  
  `sudo cp gunicorn.service /etc/systemd/system/gunicorn.service`
- copy nginx.conf file  
  `sudo mv nginx.conf /etc/nginx/nginx.conf`

- reload daemons  
  `sudo systemctl daemon-reload` 
- start services  
  `sudo systemctl start gunicorn`  
  `sudo systemctl start nginx`
- check status  
  `sudo systemctl status gunicorn`  
  `sudo systemctl status nginx`
- show logs  
  `journalctl -u gunicron.service`
  `journalctl -u nginx`


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
