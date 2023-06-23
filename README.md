# Cuckoo's Nest
## A fully functional Twitter clone that gives its users what they want

Like most social media platforms, Twitter has a sophisticated recommendation system that shows its users tweets that are relevant to their search histories, who they follow, what they like and retweet, what is trending, and so much more. This app was created to simulate that behavior.

* Allows users to post their interests so the site can filter tweets based on those interests
* Allows users to keyword search any tweet in the world, even ones that are not relevant to them
* Leverages the HuggingFace API and its facebook/bart-large-cnn model

## Technologies used
* React
* NodeJS / Express
* MySQL
* JWT
* HuggingFace API

## How to Use

### Registration

https://github.com/Sajid2001/cuckoos-nest/assets/60523377/dcd80156-e6ae-4cbe-8d4b-89d02b013963

### Making Posts

https://github.com/Sajid2001/cuckoos-nest/assets/60523377/a260fcd2-4ac0-4dfd-a7f5-7d4339ca564d

### HuggingFace Tweet Filtering

https://github.com/Sajid2001/cuckoos-nest/assets/60523377/9f33ee12-c5ad-43bd-8b3b-fccabc1c742e

### Profile Page

https://github.com/Sajid2001/cuckoos-nest/assets/60523377/a18d1780-fb5a-4ada-96d8-d9f10dd33458

### Tweet Search

https://github.com/Sajid2001/cuckoos-nest/assets/60523377/68e6472c-ab4b-4393-97ce-1cb0b5877508

## How to tweak this project for yourself
1. Download the project and add the environment variables to both the backend and frontend folders (```.env``` in the back and ```.env.local``` in the front).
2. Run ```npm install``` inside both folders to download all dependecies.
3. Run ```nodemon app.js``` on the backend and ```npm start``` on the frontend.

For database access, you can create a MySQL Schema or manipulate the code to use whatever database you prefer

### MySQL tables
```
CREATE TABLE Users (
  user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE Interests (
  interest_name VARCHAR(255) NOT NULL PRIMARY KEY
);

CREATE TABLE UserInterests (
  user_id INT NOT NULL,
  interest_name VARCHAR(255) NOT NULL,
  PRIMARY KEY (user_id, interest_name),
  FOREIGN KEY (user_id) REFERENCES Users (user_id),
  FOREIGN KEY (interest_name) REFERENCES Interests (interest_name)
);

CREATE TABLE Tweets (
	message VARCHAR(255) NOT NULL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE UserTweets(
	user_id INT NOT NULL,
	message VARCHAR(255) NOT NULL,
    PRIMARY KEY (user_id, message),
	FOREIGN KEY (user_id) REFERENCES Users(user_id),
	FOREIGN KEY (message) REFERENCES Tweets (message)
);
```

### Environment Variables Needed

Backend
* ```MYSQL_USERNAME``` = MySQL username
* ```MYSQL_HOST``` = MySQL Host
* ```MYSQL_PASSWORD``` = MySQL Password
* ```MYSQL_DATABASE``` = MySQL Schema
* ```JWT_SECRET_KEY``` = Go to an online password generator and slot your string into this variable
* ```HUGGING_FACE_TOKEN``` = Go to HuggingFace's website, sign up for an account, and get your API key there.
* ```PORT``` = Your port number of choice (Make sure it is not 3000 since React runs on that port)

Frontend
* ```REACT_APP_API_URL``` = Your Server URL, whether deployed or on localhost

## Find Any Bugs?

If you found an issue or would like to submit an improvement to this project, please submit an issue using the issues tab above. If you would like to submit a Pull Request with a fix, reference the issue that you created.

## Q and A

### What challenges were faced during this project?

One major hurdle to overcome was the transition from MongoDB, which was used in previous projects, to MySQL. My screen was littered with error messages and mySQL had a different database paradigm to get used to. I had to transition from the document-based storage of MongoDB to the table-and-relationships-based storage of MySQL.

Although MySQL gave me problems, I find the way it stores data fascinating and I plan to explore its ability to handle relationships in the future.

### Why did you name it Cuckoo's Nest?

The inspiration for the name came from when I was discussing this project with a high school friend. I told him I had to make a Twitter clone and he told me that the site is a "mental asylum". That comment made me think of the book "One Flew Over the Cuckoo's Nest", which led to the thought that the words Cuckoo's Nest sounded like the name of a Twitter knock off. From there, I decided to stick with that name.

### What do you have planned for this project in the future?

Here's a checklist of things I plan to add in the future: 
* replies to tweets
* a profile page
* image uploading
* removing harmful or toxic tweets

## Quote of the Day 
## "Being popular on Twitter isn't about charm or wit. It's about being as inflammatory as possible" <br /><br /> - Shadow the Hedgehog



