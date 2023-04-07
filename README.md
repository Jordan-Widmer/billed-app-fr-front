# Billed-App-FR - Frontend

## Description:
This repository contains the frontend code for the Billed-App-FR project, which is connected to a backend API service that must also be launched locally. Follow the instructions in this readme to set up your workspace and run the application.    

## Workspace Setup:

To keep your workspace organized, create a 'billed-app' directory where you will clone both the backend and frontend projects. Clone the backend project into the 'billed-app' directory, and then clone this repository into the same directory.     

### Running the Application Locally:      
Step 1 - Laucn the Backend:      
Follow the instructions in the backend project's README.    

Step 2 - Launch the Frontend:    
Navigate to the cloned repository:     

```
$ cd Billed-app-FR-Front
```

Install npm packages (described in package.json):



```
$ npm install
```

Install live-server to launch a local server:
```
$ npm install -g live-server
```

Launch the application:
```
$ live-server
```

Then go to the address: #### http://127.0.0.1:8080/

Testing:    
Run all tests in Jest:     

```
$ npm run test
```

Run a single test:      
Install jest-cli:    

```
$ npm i -g jest-cli     
```

Then run:
```
$ jest src/__tests__/your_test_file.js    
```

See test coverage:      
http://127.0.0.1:8080/coverage/lcov-report/     

Accounts and Users:     
You can log in using the following accounts:    

Administrator:       
Email: admin@test.tld      
Password: admin      
Employee:      
Email: employee@test.tld      
Password: employee         
