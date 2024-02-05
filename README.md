[easyRecipes](https://easyrecipies.cyclic.app)

# easyRecipes
This responsive full-stack web app is a one-stop place for users to store their recipes and access them in a no-fuss way. The site allows users to add recipes from their favourite websites using an API or manually if they haeva favourite family recipe. Users can view, update, comment, like, delete recipes anytime with ease.

**Link to project:** https://easyrecipies.cyclic.app

![gif of the website](https://github.com/Harry-Ashenden/Nasa-Photo-of-the-Day/blob/main/assets/gif/NASA%20API.gif)

## How It's Made:

**Tech used:** EJS, Bootstrap, CSS, Node.js, Express, and MongoDB

I began with the HTML creating 3 main sections: date input, description area, media area. Once these were created I started writing the backbone JS which included the fetch to NASA's API. From here I selected the correct data parts from the resulting JSON and placed them back into the DOM. After the site was a functioning MVP I began the styling. I used flexbox to create the page splits whcihc also ensured the page would be responsive. I chose a font and styled the button to have a hover effect. Lastly I used media queries in CSS to ensure every element would show correctly on a tablet on mobile. This involved changing the flexbox to columns and the overflow-y to scroll. 

The JS could then be refactored and added to by correctly checking for error codes and making the user aware what was wrong (such as chosing a date in the future).

## Optimizations

To further enhance this project if there was more time, I would have used a secondary API to show the curretn cycle of the moon. This would be shown as a top nav bar allowing the user to always see the information.  

## Lessons Learned:

The main lesson learned on this project was that by abstracting sections of code into their own functions when writing JS will provide much more readable code. Initially I wrote everything in the fetch to get it working but long conditionals were horrible to read. Also I learned templates can be useful for design, but there is something very satisfying about putting together a page from scratch. It also allows more flexibility as oyu don't have to deal with preset style.

