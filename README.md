# Would You Rather Project

This is my implementation of the "Would you rather ... ?" game that is part of the [Udacity Frontend Nanodegree](https://www.udacity.com/course/front-end-web-developer-nanodegree--nd0011).

In this game, a user is asked login first. Players ask/answer questions in the form: “Would you rather [option_one] or [option_two] ?”. The player must choose one of the options. In the app, users can view the questions they answered and the questions they haven't answered yet. They will be able to answer questions, view answered questions with stats on the responses of all players (i.e., see how other people have voted), create new questions, and see the ranking of users on the leaderboard.

The project focues on the use of [React](https://reactjs.org/) along with [Redux](https://redux.js.org/) to design an application.

## Authors



- [Baset Hamza](https://github.com/BasetHamza)

## Technology Used & Startup code



The project has been bootstrapped using [Create React App](https://github.com/facebook/create-react-app).

The [startup code provided by Udacity](https://github.com/udacity/reactnd-project-would-you-rather-starter) consists of a pseudo backend server to help with the development of the pplication. No HTML or CSS codes were provided. Everything has to be built from scratch.

### Backend Server

The `_DATA.js` file represents a pseudo database and methods that let us access the data. The structure and funtionality of the `_DATA.js` will be explained later in details under [Data](#Data) section.

**Note:** Since the app relies on a pseudo backend server, the data is non-persistent. This means that new questions and answers will be lost after refresh the browser or the application is restarted.

### UI

To speed up the development and since styling is not the main purpose of the project, the [React Bootstrap](https://react-bootstrap.github.io/) was used to quickly deploy component.

## Preview



![GIF Demo of the application](/\src\assets\screenshots\demo.gif))

## Installation & Launching Directions



1. To install the application clone this git repository or download as zip file
   ```
   $ git clone https://github.com/BasetHamza/MyReads_A_Book_Tracking_App.git
   ```
2. Go into the application folder

3. Install all project dependencies with `npm` or `yarn`

   `$ npm install`

   or

   `$ yarn install`

4. Start the application using `npm` or `yarn`

   `$ npm start`

   or

   `$ yarn start`

## What You're Getting



```bash
├── README.md - This file.
├── package.json # npm package manager file. It's unlikely that you'll need to modify this.
└── src
    ├── App.css # Styles for your app. Feel free to customize this as you desire.
    ├── App.js # This is the root of your app. Contains static HTML right now.
    ├── App.test.js # Used for testing. Provided with Create React App. Testing is encouraged, but not required.
    ├── utils
    │   ├── api.js # A JavaScript API for the provided Udacity backend.
    │   ├── _DATA.js # file represents a fake database and methods that let you access the data.
    ├── actions
    │   ├── authedUser.js
    │   ├── questions.js
    │   ├── shared.js
    │   ├── users.js
    ├── components # A folder that contains all the React components used in this project
    │   ├── App.js
    │   ├── LeaderBoard.js
    │   ├── LeaderBoardUserCard.js
    │   ├── Login.js
    │   ├── NavigationBar.js
    │   ├── NewQuestion.js
    │   ├── Question.js
    │   ├── QuestionAnswered.js
    │   ├── QuestionUnanswered.js
    │   ├── QuestionCard.js
    │   ├── QuestionList.js
    ├── middleware # A folder that contains all the middlewares developed for this project
    │   ├── index.js
    │   ├── logger.js
    ├── pages (i.e., views) # A folder that contains all the pages (views)
    │   ├── HomePage.js
    │   ├── LeaderBoardPage.js
    │   ├── LoginPage.js
    │   ├── NewQUestionPage.js
    │   ├── NotFound.js
    │   ├── QuestionPage.js
    ├── reducers  # A folder that contains all the middlewares developed for this project
    │   ├── authedUser.js
    │   ├── index.js
    │   ├── question.js
    │   ├── users.js
    ├── utils  # A folder that contains all helping files
    │   ├── _DATA_.js
    │   ├── api.js
    │   ├── ProtectedRoute.js
    └── index.js # You should not need to modify this file. It is used for DOM rendering only.
```

## Data

There are two types of objects stored in our database:

- Users
- Questions

### Users

Users include:

| Attribute | Type   | Description                                                                                                                                                                                                    |
| --------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id        | String | The user’s unique identifier                                                                                                                                                                                   |
| name      | String | The user’s first name and last name                                                                                                                                                                            |
| avatarURL | String | The path to the image file                                                                                                                                                                                     |
| questions | Array  | A list of ids of the polling questions this user created                                                                                                                                                       |
| answers   | Object | The object's keys are the ids of each question this user answered. The value of each key is the answer the user selected. It can be either `'optionOne'` or `'optionTwo'` since each question has two options. |

### Questions

Questions include:

| Attribute | Type   | Description                            |
| --------- | ------ | -------------------------------------- |
| id        | String | The question’s unique identifier       |
| author    | String | The author’s unique identifier         |
| timestamp | String | The time when the question was created |
| optionOne | Object | The first voting option                |
| optionTwo | Object | The second voting option               |

### Voting Options

Voting options are attached to questions. They include:

| Attribute | Type   | Description                                                        |
| --------- | ------ | ------------------------------------------------------------------ |
| votes     | Array  | A list that contains the id of each user who voted for that option |
| text      | String | The text of the option                                             |

Your code will talk to the database via 4 methods:

- `_getUsers()`
- `_getQuestions()`
- `_saveQuestion(question)`
- `_saveQuestionAnswer(object)`

1. `_getUsers()` Method

_Description_: Get all of the existing users from the database.
_Return Value_: Object where the key is the user’s id and the value is the user object.

2. `_getQuestions()` Method

_Description_: Get all of the existing questions from the database.
_Return Value_: Object where the key is the question’s id and the value is the question object.

3. `_saveQuestion(question)` Method

_Description_: Save the polling question in the database.
_Parameters_: Object that includes the following properties: `author`, `optionOneText`, and `optionTwoText`. More details about these properties:

| Attribute     | Type   | Description                                |
| ------------- | ------ | ------------------------------------------ |
| author        | String | The id of the user who posted the question |
| optionOneText | String | The text of the first option               |
| optionTwoText | String | The text of the second option              |

_Return Value_: An object that has the following properties: `id`, `author`, `optionOne`, `optionTwo`, `timestamp`. More details about these properties:

| Attribute | Type   | Description                                                                                                                  |
| --------- | ------ | ---------------------------------------------------------------------------------------------------------------------------- |
| id        | String | The id of the question that was posted                                                                                       |
| author    | String | The id of the user who posted the question                                                                                   |
| optionOne | Object | The object has a text property and a votes property, which stores an array of the ids of the users who voted for that option |
| optionTwo | Object | The object has a text property and a votes property, which stores an array of the ids of the users who voted for that option |
| timestamp | String | The time when the question was created                                                                                       |

4. `_saveQuestionAnswer(object)` Method

_Description_: Save the answer to a particular polling question in the database.
_Parameters_: Object that contains the following properties: `authedUser`, `qid`, and `answer`. More details about these properties:

| Attribute  | Type   | Description                                                                             |
| ---------- | ------ | --------------------------------------------------------------------------------------- |
| authedUser | String | The id of the user who answered the question                                            |
| qid        | String | The id of the question that was answered                                                |
| answer     | String | The option the user selected. The value should be either `"optionOne"` or `"optionTwo"` |

```

```
