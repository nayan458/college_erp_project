# College ERP

## Project Overview
### General Description

It is a software for assignment management.
There are two users in this system viz Students and Teachers. Both the students and teachers would be registerd by the institute admin. The admin is also responsible for creation of class, and assiging teachers to each class as well as students to that particular class. Both teacher and students would be provided with a password that they need to use in combination with their e-mail id for login purpose.

### Role of teacher

- Teachers would login to the web app using the credentials.
- Once loged in the teacher would be redirected to classes page where he/she would be able to view all the classes to which he/she is assigned. 
- Teacher would be able to navigate to particular class by clicking onto the class.
- Then after it would fetch the assignment section. Here the teacher would be able to upload assignments. Once the assignment is uploaded it would be available for all the students within that class.
- The teacher would also be able to view the submitions by the students. The submitted assignment will have 4 status

    - pending - student have not yet submited the assignment
    - submited - students assignment is uploaded sccessfully
    - approved - teacher approved the assignment
    - rejected - the assignment submited is rejected

    teacher can reject or approve it accordingly and the student can view the status.

- teacher also has the right to delete an uploaded assignment. This can help teacher to maintain assignments, save storage and improve performence.
- Apart from that teacher would also be able to view students within the class

### Role of student

- Students would login to the web app using credentials.
- Once loged in the student would be redirected to classes page where he/she would be able to view all the classes to which he/she is assigned. 
- Student would be able to navigate to particular class by clicking onto the class.
- Then after it would fetch all the assignments within that class. It would also show status submited, approved, rejected.
- The student is allowed to submit all the assignments that are in pending state. Once submited it would show the assignment state.
- Students will also be able to view their classmates within a class.

## Technical Overview

## Folder structure
    backend > college_elearn 
        This is the backend folder which is in Laravel frame work.
        To make it run you need to have composer installed

        please create a .env file if it is missing and configure it according to the example.env
        start mySql server

        Run the following command

        `composer install`
        `php artisan migrate:fresh`
        `php artisan serve`

    frontend > erp-Dashbord
        This is the frontend folder which is in React.
        To make it run you need to have node installed

        Run the following command

        `npm i`
        `npm start`

