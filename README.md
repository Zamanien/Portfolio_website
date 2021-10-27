# Readme

Disclaimer: 

This guide can contain errors in the form of wrong terms or steps atm. and is not corrected for the moment. Will we updated and fixed later.

### Intro

This is my Portfolio where I showcase some of my projects. The website is made in NodeJS with the [Express web framework](https://www.npmjs.com/package/express). The frontend is a free template provided by [HTML5UP](https://html5up.net). 

The project is made with the intent of being run inside a Docker Container but can also be applied outside of a container.

### Prerequisites:

- Install Docker
- Linux OS (Ubuntu)

### Setup

By containerizing the project, we can avoid installing Node and NPM on our local machine and instead run everything inside the container. 

1. We need to create a `.env` file based on the `.env-sample` file and specify your required port.

Example: 

```markdown
PORT=80
```

The `app.js` file reads the environment file and adds the port accordingly.

2.  Create / modify the `Dockerfile` which is used to build a Docker Image from.

```docker
#Specify the Node version you need
FROM node:<version>

#Setup Working directory on server
WORKDIR <your-working-dir>

#Ensure both package.json and package-lock.json are copied into dir
COPY package*.json ./

#Run NPM install for PROD
RUN npm install --only=production

#Bundle app source
COPY . .

EXPOSE <my-port>
CMD [ "node", "<express-file>"]
```

After filling out the fields, save the file with the rest of the project directory. 

3. Now it's time to build the docker image from the dockerfile:

- `cd` into the directory with the dockerfile.

```docker
docker build -t <image-name> <path-of-dockerfile>
```

Here is a an example: 

```docker
docker build -t my_portfolio .
```

4. Docker should now have built an image based on our Dockerfile.

To see the images, type the following:

```docker
docker images -a
```

Should give an output like the following: 

```docker
REPOSITORY                      TAG       IMAGE ID       CREATED        SIZE
portfolio                       latest    79909e885f70   11 hours ago   902MB
```

Now we should be all set to run a container based on the image.

```docker
sudo docker run -d \
-p <port>:<port> \
--name=<container-name> \
--restart unless-stopped  \
<name-of-image>
```

I did not specify any port in my docker run, as I use NPM (NginxProxyManager) and therefore docker networks instead of ports.

My docker run command: 

```docker
sudo docker run -d --network=<my-network-name>  --name=portfolio   --restart unless-stopped   portfolio
```

This should now build the container based on the image we created earlier. 

To see running containers in docker: 

```docker
sudo docker ps
```

Output: 

```docker
CONTAINER ID   IMAGE                           COMMAND                  CREATED        STATUS                  PORTS               NAMES
811b9be29c98   portfolio                       "docker-entrypoint.s…"   11 hours ago   Up 11 hours                                 portfolio
```

Note that your version - if you don't use a proxy manager - have your ports under PORTS. 

Just to be sure that the container is running properly, we can inspect the logs:

```docker
sudo docker logs <container-id>
```

Output: 

```docker
Running on port: 8080
```

The output is not saying a lot but we not know that it is running. You should now be able to access your portfolio.

Good job.