# Book Worms 

This app was created by The Bar Coders as our final 4-week project at the end of our School of Code Bootcamp.

## Project Description

### Our problem statement

There isn’t a modern way for teachers to engage with their students about their extra-curricular reading:
- as a teacher, I want a way to encourage my students to read outside of school;
- as a pupil, I want a fun and engaging way to record how much I’m reading.

### Our solution
 
We created an app to solve this problem. It has two sides to it:
- the student side, which is aimed at 7-11 year old children to help them record their extra-curricular reading in a fun way; and 
- the teacher side, which aims to help teachers easily access their class's reading data both at a class level and at the individual child level.

## Project Implementation

### Technology used

The front-end (in this repo) is written in Next.js and deployed to Netlify, with an Express.js server at the back-end deployed to Heroku (this is in a separate repo). Authentication is handled via Firebase, with users being assigned either a student role or a teacher role, and directed to the relevant part of the site. Tokens ensure secure access to the back-end database.

### Methodology

We worked in an agile manner with continuous deployment, 2-3 day long sprints and daily stand-ups and retros.

### Planning
 
We began our planning process by focussing on our user personas and the user journey, and we consulted with both children and teachers to gain a good understanding of the problem that we were seeking to solve. We created low- and high-fidelity designs before we started building.

### Testing 

For testing our app, we used Jest and SuperTest unit testing and Cypress end-to-end testing.

### Responsiveness

The student side is mobile responsive to reflect anticipated user interactions.

## Authors

- Dilyn Corbett @NovaGlow
- Asma Dage @asmaisalive
- Mohamed Mohamud @codewithmohamed
- Anita Percival @anitapercival
- Alex Platt @aljaplatt
- Jenny Taylor @GeckoJen
