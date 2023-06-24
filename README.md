# Cuckoo's Nest
## A fully functional Twitter clone that gives its users what they want

Like most social media platforms, Twitter has a sophisticated recommendation system that shows its users tweets that are relevant to their search histories, who they follow, what they like and retweet, what is trending, and so much more. This app was created to simulate that behavior.

* Allows users to post their interests so the site can filter tweets based on those interests
* Allows users to keyword search any tweet in the world, even ones that are not relevant to them
* Allows users to upload images, powered by Google Cloud
* Leverages the HuggingFace API and its facebook/bart-large-cnn model

## Technologies used
* React
* NodeJS / Express
* MySQL
* Google Cloud Storage
* JWT
* MaterialUI
* HuggingFace API

## How to Use

### Registration

https://github.com/Sajid2001/cuckoos-nest/assets/60523377/4b1e9181-96a7-4221-9a67-203804efa402

### Making Posts

https://github.com/Sajid2001/cuckoos-nest/assets/60523377/c95eeca4-eb23-4bb9-a179-bf8bea5b6116

### Tweet Filtering - powered by HuggingFace

https://github.com/Sajid2001/cuckoos-nest/assets/60523377/394e9084-5a20-44e1-8c9b-51a2fa42cf2e

### Profile Page

https://github.com/Sajid2001/cuckoos-nest/assets/60523377/dfff29f7-1713-4251-81a9-368f848f2b95

### Tweet Search - powered by HuggingFace

https://github.com/Sajid2001/cuckoos-nest/assets/60523377/102a4bf3-813a-4bd7-a48d-a557ea0fdd9f

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
    image_url VARCHAR(255),
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
* ```GOOGLE_CLOUD_PROJECT_ID``` = Your Google Cloud Project ID
* ```GOOGLE_CLOUD_KEY_FILENAME``` = Your Google Cloud ```keys.json``` File
* ```GOOGLE_CLOUD_STORAGE_BUCKET``` = Your Google Cloud Storage Bucket

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
* hashtag system
* removing harmful or toxic tweets

## Quote of the Day 
### "Being popular on Twitter isn't about charm or wit. It's about being as inflammatory as possible" <br /><br /> - Shadow the Hedgehog



