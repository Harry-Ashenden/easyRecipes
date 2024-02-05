# easyRecipes
This responsive full-stack web app is a one-stop place for users to store their recipes and access them in a no-fuss way. The site allows users to add recipes from their favourite websites using an API or manually if they haeva favourite family recipe. Users can view, update, comment, like, delete recipes anytime with ease.

**Link to project:** https://easyrecipes.cyclic.app

<!-- ![gif of the website](https://github.com/Harry-Ashenden/Nasa-Photo-of-the-Day/blob/main/assets/gif/NASA%20API.gif) -->

## How It's Made:

**Tech used:** EJS, Bootstrap, CSS, Node.js, Express, MongoDB, and API's

I intially began this project by creating a wireframe depicting everything from the layout to functionality with a priority ordered list. I then began using a barebones social media project I had created prior to this project. I was able to adapt the routes and controllers to create the basic pathways and functionality. From here I then added the extra features I needed such as the necessary modals to support a recipe from MongoDB, links to external API's to scrape recipe sites, and image uploads.

Once the functionality was in place, I began creating the front-end views with EJS and linking them to the back-end Node.js/Express contorllers. Some of this required the necessary middleware for the authentication, image handling, and image database. The front-end was then styled using Bootstrap to enable a mobile-first responsive design and some minor CSS to handle more custom aspects. 

After the project was mostly completed, it was then hosted using Cyclic which enabled easy cross browser testing. Some changes to the design were made to ensure usablity and now EasyRecipes is being used to store, view, add, and edit recipes!

## Optimizations

There are still many features which would be desirable to add to EasyRecipes over time such as multiple image uploads, profile pictures, even recipe exporting to create personal cookbooks that can be printed. All of these optimizations will hopefully added in the future and the current code be refactored down.

## Lessons Learned:

This whole project was a learning curve from understanding how a full-stack app is put together from the gorund up. One of the biggest take-aways from the projetc is the best way to construct an optimised structure so requests are handled correctly and debugging can be done quickly. Outside of that putting into practice technology such as MongoDB, Bootstrap, Multer and more has vastly improved my knowledge of choosing the right tech for the right job.