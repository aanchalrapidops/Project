# How to download mongo db in windows

### Step 1 — Download the MongoDB MSI Installer Package
> Head over [here](https://www.mongodb.com/download-center/community) and download the current version of MongoDB. Make sure you select MSI as the package you want to download.

### Step 2 — Install MongoDB with the Installation Wizard
> Make sure you are logged in as a user with Admin privileges. Then navigate to your downloads folder and double click on the .msi package you just downloaded. This will launch the installation wizard.

### Step 3— Create the Data Folders to Store our Databases
> A. Navigate to the C Drive on your computer using Explorer and create a new folder called data here.
> B. Inside the data folder you just created, create another folder called db.

### Step 4 - Verify Installation using below command
`mongo --version`

<hr>

# How to install and Run MongoDB in macOS
> Open the Terminal app and type brew update.

> After updating Homebrew brew install mongodb.

> After downloading Mongo, create the “db” directory. This is where the Mongo data files will live. You can create the directory in the default location by running `mkdir -p /data/db`

> Make sure that the /data/db directory has the right permissions by running

> `sudo chown -R id -un /data/db`
`# Enter your password`

> Run the Mongo daemon, in one of your terminal windows run mongod. This should start the Mongo server.

> Run the Mongo shell, with the Mongo daemon running in one terminal, type mongo in another terminal window. This will run the Mongo shell which is an application to access data in MongoDB.

> To exit the Mongo shell run quit()

> To stop the Mongo daemon hit ctrl-c

<hr>

## Steps about how to run the project

To get started with the app, first clone the repo to your system

> $ git clone https://github.com/aanchalrapidops/Project.git

Install nodemodules

>npm install


then go to Backend Directory 

>cd Backend
 

Start the server

>node index.js

## To Start React App

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

