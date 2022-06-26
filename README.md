## Inspiration

It's finally summer! That means it's time for you (and us) to get back a summer body to impress people at the beach. Project Amaterasu is designed to make the summer fitness grind much easier by tracking the user's goals. Our project was named after Amaterasu, the goddess of the sun in Japanese mythology (this goddess was selected specifically because her name sounds cool).

## What it does

We begin with the register and login menu. We have our users create an account to track personal details through a simple process of name, email, password and password confirmation. Once an account is created they can simply log in through our login menu in the future by entering their email and password. Once logged in we welcome them to our home screen, where all the tracking can be done. At the top we include a welcome back message with the user's name and our fitness journey streaks system. Clicking edit profile will bring you to another page that allows the user to customize their home screen and profile. Back to our home screen we have our 4 main features, daily goals counter, hours slept, calorie intake and water intake. With the daily goals tracker a user can simply add the goal that they wish to achieve for the day with no limit to the amount of goals that can be added. For the other 3 trackers, the user simply presses either the add button or the subtract button to track their progress.

## How we built it

First, we came up with a design of the website, including its layout and color palette, on Figma through trial and error until we found a design that looked nice. Then, we established the information we wanted track (goals, caloric intake, ...). With these two steps done, we first built the rest API for the goals. Then, we built the frontend with Reactjs, using Axios to display data from the rest API.

## Challenges we ran into

Throughout the project, we ran into many challenges. The following are the most notable:

1. Using MongoDB
   I only used MongoDB once or twice prior to this project, so I was unfamiliar and followed video tutorials, documentation, and Stack Overflow discussions to build some of the rest API.
2. Custom colors
   I spent a long time trying to implement a feature where users can set their preferred background colors. There was one bug with the colors that took a long time for me to debug: I forgot that hex colors must begin with "#".

## Accomplishments that we're proud of

Our biggest accomplishment is participating and completing our first (second for Lucas) ever hackathon. As a group of high schoolers with little to no experience coding we had decided to learn as much as we could in the 2 weeks before the event in hopes of trying something new. We're also proud of the overall web application and creating something that we personally enjoy and envisioned. Finally, we are proud of being able to learn and implement what we had learned on our own into the code.

## What we learned

1. Teamwork skills
   With only 2 days to build the project as a group of 3 inexperienced high school students, we developed many teamwork skills along the way. To manage time efficiently, we use When2meet to determine appropriate times for us to meet as a group. We also developed a better understanding of how to distribute the work load amongst the group members so that everyone can work at the same time.
2. Usage of libraries
   While building the project, I was introduced to many libraries that made certain tasks a breeze. For example, I learned how to use Axios for API calls, mongoose to make clear cut schemas, and Redux for data store.
3. File structure
   While working in a team, I recognized the importance of maintaining an organized file structure. It helped group mates easily identify where each piece of code was as well as their general purpose.

## What's next for Project Amaterasu

Although Project Amaterasu is usable to a large extent, there are still many features we have not yet implemented. We plan to create features such a goal streaks, profile sharing, and animations (for example filling up water bottle).
