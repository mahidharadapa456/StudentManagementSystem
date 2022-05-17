#Project description
Student management system is a platform that helps students apply their course also user can create course for students 

As far as functionalities go, sign up, sign in, register for student, edit and delete student info. Also, register course, edit and delete course 
is possible

In Student Management System you are able to do below functionalities:
- First sign up to application
- Second sign in into their existing account
- Registered user can create, edit and delete student
- one can create, edit and delete course

The app successfully works but minor changes may be made in the future:
- Teachers also register for app and create lesson uploads;
- Students can see uploaded materials as well;


#Problems in the Student management app
It is being hard to sending http api requests and get data back properly so that it should be optimized properly.

#Technologies used in the project

Backend
- Express
- Mongo db
- Nodemon
- Jsonwebtoken 
- Bcrypt 

Front End
- HTML - for skeleton of website
- CSS - for styling HTML elements
- JavaScript
- Fetch - to get api data from backend 
- Bootstrap - ready to use css components and classes
- Bootstrap icons

#ERD diagram
[![er-sms.png](https://i.postimg.cc/XYPNY8R1/er-sms.png)](https://postimg.cc/SnWbZWNc)
- User table saves data of user registered into app. It asks username, email and password
- Student table save name, surname, gender, studentId, courseId
- Course table saves coursetype, courseName, courseDesctription

#How to start project locally

- To start project locally run following command: `npm run devStart`

- For deployment purpose you want to do following:   `npm start`

- Or we can simply run following: `node app.js`

#Website look

[![sms-signup.png](https://i.postimg.cc/HLtStZTB/sms-signup.png)](https://postimg.cc/94rtmBR7)
- User can register with following form

[![signin.png](https://i.postimg.cc/66bmSmnP/signin.png)](https://postimg.cc/7b79JXB1)
- Once user registered it is redirected to login and they are required enter credentials while entered signup

[![dashboard.png](https://i.postimg.cc/R0PYBs2q/dashboard.png)](https://postimg.cc/QBTmgb8r)


[![dahsboard2.png](https://i.postimg.cc/4dqFKKfg/dahsboard2.png)](https://postimg.cc/r0G93wRn)

[![dashboard3.png](https://i.postimg.cc/hPF5c7Z8/dashboard3.png)](https://postimg.cc/jCXXhCbC)