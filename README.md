# Project Title
LifeLine

## 1. Project Description
State your app in a nutshell, or one-sentence pitch. Give some elaboration on what the core features are.  
* A location-based information exchange web app to connect people who are experiencing extreme weather situations together.

## 2. Names of Contributors
List team members and/or short bio's here... 
* Hi, my name is Jason. I am terrified of all our courses. Somebody hold me.
* Hi, my name is Sung. I am excited about this project!
* Hi, my name is Nathan! Can't wait to start building our first web application!
* HI, my name is Reza Hedieloo, I am excited to work on the project.
	
## 3. Technologies and Resources Used
List technologies (with version numbers), API's, icons, fonts, images, media or data sources, and other resources that were used.
* HTML, CSS, JavaScript
* Bootstrap 5.0 (Frontend library)
* Firebase 8.0 (BAAS - Backend as a Service)
* JQuery
* MapBox

## 4. Complete setup/installion/usage
State what a user needs to do when they come to your project.  How do others start using your code or application?
Here are the steps ...
* 1. Click on the log in/sign up button. If it's your first time here, enter your email address, your name, and then choose a password. 
Click save, and you're ready to go! If you're a returning user, click on the log in/sign up button, enter in the email and password 
that you signed up with, and click sign in.
* 2. Once you're signed in, the app will take him to the main page. You can scroll through the app to find communties that interest you. Since we support a large number of communities, you can quickly jump to your community by filtering by postal code in the search bar. The map will display the area associated with the postal code.
* 3. To view a community, click on "ENTER THE COMMUNITY". This will take you to all postings in that community which can be viewed. 
* 4. If you find a post interesting and want to keep track of it, you can bookmark that post to quickly access it from the bookmarks tab. You can also immediately unbookmark the post by clicking the bookmark button again.
* 5. To create a new post, click on the post icon when viewing a community. You can write in a title, a description, and pick a photo to upload to share. When completed, click the "SUBMIT" button to create a new post in that community!
* 6. To edit your profile, select the profile icon from the right side of footer or "Profile" from the hamburger menu. Click “EDIt” to update your information. You can choose to upload a picture for your profile. Once completed, click "SAVE".
* 7. To find all of your bookmarked posts, click the bookmark icon on the left side of the footer or "Bookmarks" from the hamburger menu. You can view all of the posts you have saved. To delete a post that you are no longer interested in, click on the unbookmark icon. 
* 8. To subscribe to email notifications, click on "Notifications" from the hamburger menu. Enter in the email address where you wish to receive updates, and click "SUBSCRIBE".
* 9. To get help on how to use the app, click "Support" from the hamburger menu, and then click on the each section to view the information in that section.
* 10. To toggle dark mode on/off, click on the "Dark Mode" option from the hamburger menu.

## 5. Known Bugs and Limitations
Here are some known bugs:
* When editing the profile, the button still shows "CANCEL" even after clicking on "SAVE".
* ...
* ...

## 6. Features for Future
What we'd like to build in the future:
* Ability to remove posts.
* Ability to unsubscribe from email notifications.
* ...
	
## 7. Contents of Folder
Content of the project folder:

```
 Top level of project folder: 
├── .gitignore               # Git ignore file
├── index.html               # Landing HTML file, this is what users see when you come to url
├── login.html               # Login HTML file, this is where the user can sign up or log in
├── main.html                # Main HTML file, this is the main page where the user lands after signing in and can access the features of the app
├── 404.html                 # 404 HTML file, this is what the user sees if the page they are trying to load does not exist
├── .firebaserc              #
├── firebase.json            #
├── firestore.indexes.json   #
├── firestore.rules          #
├── storage.rules            #
└── README.md

It has the following subfolders and files:
├── .git                     # Folder for git repo
├── images                   # Folder for images
    /blah.jpg                # Acknowledge source
    /heavy_snow.jpg          #
    /imagy.avif              #
    /login-background.jpg    #
    /neighbourhood.jpg       #
    /notification.png        #
    /st_icon.svg             #
    /profile.png             #
    /ring_float.svg          #
    /support.jpg             #
├── scripts                  # Folder for scripts
    /authenication.js        # 
    /bookmarks.js            #
    /eachCommunity.js        #
    /firebaseAPI_DTC09       #
    /index.js                #
    /main.js                 #
    /notification.js         #
    /profile.js              #
    /redirect.js             #
    /skeleton.js             #
    /support.js              #
├── styles                   # Folder for styles
    /bookmark_style.css      # Styling for the boomarks page
    /default_style.css       # 
    /eachCommunity.css       # Styling for the community 
    /index_style.css         # Styling for the landing page
    /login.css               # Styling for the login page
    /main_style.css          # Styling for the main page
    /notifications.css       # Styling for the notifications page
    /profile.css             # Styling for the profile page
    /support.css             # Styling for the support page
├── text
    /bookmarks.html          # Saved bookmarks page
    /eachcommunity.html      # 
    /footer_after_login.html # Footer bar template after logging in
    /footer_before_login.html# Footer bar template before logging in
    /main_after_login.html   # Main page template after logging in
    /main_before_login.html  # Main page template before logging in
    /nav_after_login.html    # Navigation bar template after logging in
    /nav_before_login.html   # Navigation bar template before logging in
    /notification.html       # Email subscription page
    /profile.html            # User profile page
    /support.html            # App support page


```


