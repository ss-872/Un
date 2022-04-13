to run the application follow the steps

download the file and open it in the vs code

enter npm init to download all the packages

change directory to frontend with the command cd frontend

enter again npm init to download all the packages of the frontend

create a table in your mysql server using the follwing command CREATE TABLE questions ( id int NOT NULL AUTO_INCREMENT, questions varchar(255), options JSON, required binary, PRIMARY KEY (id) );

now change the user,password and database in the db.js file of the server folder

the project is ready to compile

to start the server type npm start in one terminal

to start the react in another terminal change directory to frontend with the command cd frontend and type npm start
