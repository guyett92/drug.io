# Drug.io v. 1.2
* A simple space to share opinions and side effects experienced when on a prescription or over-the-counter medication.
* [Drug.io](https://drugs-review.herokuapp.com/) 
## Features
Users can login with their Google account and post reviews on current drugs on the portal. Users can also add and like reviews as well as post their own. Users can share their
experiences with others. The application pulls data from multiple APIs to make adding a new drug easier. When a new drug is added, the data is formatted and presented to the user
using ejs template tags. The image that is used is found by using a SERP to find the best result. The drug can only be added if it is in the drug ingredients API. The forms have data validation, there's regex all over the place, and there are tons and tons of buttons. There's a lot of interactivity so please explore!
## Low-Resolution Images
![Admin Panel](/resources/admin.JPG)
![Drug Card](/resources/drug.JPG)
## Getting Started
`Logon to [Drug.io](https://drugs-review.herokuapp.com/)`\
`Login with Google`\
`Enjoy!`
## Technologies Used
* Node
* Express
* MongoDB
* HTML
* CSS: Bulma
* JavaScript
* jQuery
* Node Packages: moment, CSS-tooltip, morgan, passport, serve-favicon, method-override, mongoose, dotenv, request, ejs, nodemailer, find-config, bulma-toasts, bad-words
## APIs Integrated
* Drug Images: [ZenSERP](https://zenserp.com/)
* Drug Ingredients: [MAPI](http://mapi-us.iterar.co/)
## User Stories
* Users can login with their Google accounts.
* Users can add a new drug if it isn't already added or if it isn't in the API.
* Users can view the details of a drug including ingredients and an image.
* Users can view the list of all the drugs on the website.
* Users can add a review to a drug if they already haven't.
* Users can delete their review to add another.
* Users can like another user's review.
* Users can add a drug to their favorites.
* Users can view the app on their phones with ease.
* Users can view their profile.
* Users can edit their profile.
* Users can contact the owner.
* Users can report an issue.
* Users can search for a drug.
* Users can request to delete a drug and an admin is notified to approve it.
## Planning
* [Trello Board](https://trello.com/b/MgOvnIqI/drug-review)
* [Wireframes](https://balsamiq.cloud/sah357c/peb4ecb)
![Entity Relationship Diagram](/resources/ERD.svg)
## Goals
* ~~Users can view a profile screen where all their favorites are listed.~~
* ~~Users can update their profile to add a bio or an image if one is not already added.~~
* ~~Users can search for a drug.~~
* ~~Users can order the table of drugs by different categories.~~
* Users can view the description of a drug pulled from an API.
* Users can subscribe to get updates about a drug or a review.
* Users can message others.
* Users can view a drug family information page.
* Users can upload an image to the site for their profile rather than link a URL.
* ~~Users can leave feedback.~~
* ~~Users can view the top comment.~~
* ~~Users can request to delete a drug and an admin can approve it.~~ 
* ~~Users cannot use swears in reviews.~~
* Convert all functions to async await.
* Error handling, dotenv...
