# Tutorial-6: Hotel California International Waitlist System Goes Mobile

<p align="right">HU YUE(A0224726E)</p>

## Download my tutorial6

- git repository: clone from my git repository to your **docker environment** and **windows folder**, and see the instructions in *README.md*

  ```
  git clone https://github.com/irissky/tut6.git
  ```

- To run Android frontend, **recommend to use the files I uploaded on the Luminus .**

  - The difference is :
    -  For the files on GitHub, you need to create react-native project at your own side and copy the files I provided to replace your files, install the dependencies and run. 
    - For files on Luminus , you can directly run in the "frontend" folder with the "react-native run-android" command.

## Attention

- The function I realized is `Add customers to the waitlist DB through the mobile interface`.

- The server runs at `port 5000`.

- The *backend* is the same as tutorial5's *api*. [my mobile app work with absolutely no modification to the back-end (from Tutorial 5), which is based on Express, mongoDB, and GraphQL.]

- Do not forget to replace *192.168.1.4* with your own IP address in ***frontend/App.js***:  

  ```
  const client = new ApolloClient({ uri: 'http://192.168.1.4:5000/graphql' });
  ```

- your input should satisfied the following:

  - Both name and phone number should be filled in.

  - The phone number should only have numbers. 

  - Cannot add an appointment that already exists in the database.
  
  - The maxsize of addition is limited to 25. If you want to change it, you can change the `const MAXSIZE = 25;` in ***backend/server.js***.

    Otherwise, you will fail to add and get an error.

## Environment needed for backend 

`This part is the same as the preparation for tutorial5, skip this if you have met the requirements.`

### docker environment needed

- **ubuntu**: `docker pull ubuntu`:

- **run the container with port 5000 (for backend) open for use**
  
    ```
    docker run -p 5000:5000 -dit ubuntu
    ```
    
- **install nvm and npm**:
  
    ```
    apt update
    apt install curl
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash 
    ```
    - restart the container and do the following
    ```
    nvm install 10
    npm install -g npm@6
    ```
- **mongodb**: refer to the following commands to install mongodb.
    ```
    apt install gnupg
    apt install curl
    
    curl -fsSL https://www.mongodb.org/static/pgp/server-4.4.asc | apt-key add -
    
    echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.4 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-4.4.list 
    apt update
    apt install mongodb-org
    apt install screen
    screen mongod
    ```
    - If mongod screen exits instantly, then you have a problem. Do the following: `mkdir -p /data/db`, redo the `screen mongod` and **press Ctrl+a followed by d to return to terminal**. You are ready to run mongo CLI using $mongo.

- **git**: install git and clone my tutorial
    ```
    apt install git
    git clone https://github.com/irissky/tut5.git 
    ```

## Commands for running tutorial 6
### Running backend [in docker]

#### install the dependencies

```
cd backend
npm install
```
#### start the mongodb

```
screen mongod
```
- Press Ctrl+a followed by d to return to terminal
- ps: if you have already started it when installing, you do not need to start it again here. You can test with `mongo` to see whether you have started mongo already.

#### initialize the database and run the backend [in folder "backend"]

```
mongo issuetracker scripts/init.mongo.js
screen npm start
```
- Press Ctrl+a followed by d to return to terminal
### Running Android frontend [in windows folder "frontend"]

- If you use the **frontend folder** I uploaded on **Luminus**, just open the frontend folder in your windows command prompt terminal and run the following command.

  ```
  react-native run-android
  ```

- If you pull and use the **frontend folder** from my **GitHub**, run the following commands to create a react-native project first.

  ```
  npx react-native init SampleApp
  ```
  
  - Enter the "SampleApp" folder, and copy the files you download in folder "frontend"  to "SampleApp"
  - open  folder "SampleApp" in your windows command prompt terminal, and run the following to start.
  
  ```
  npm install
  react-native run-android
  ```
  
  

### Test the function from browser

- open **`localhost:5000/graphql`** in your browser and you can test the addition.

- commands to test the addition

  ```
  query{issueList{id, name, phone, time}}
  ```

ps: You'd better to follow all the steps above to make sure the app run correctly!

