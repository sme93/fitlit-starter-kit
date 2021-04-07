## FitLit Health Tracker

A paired project by [Sarah Fitzsimons](https://github.com/sme93) and [Michann Stoner](https://github.com/michannstoner).
Original project spec can be found [here](http://frontend.turing.io/projects/fitlit.html).

### Description 

FitLit is the beginning of a fitness/health tracking application. It is intended to help users track their:
- Activity
- Hydration 
- Sleep
- Steps

Users will see a daily overview for each category, displayed in their dashboard. Users are also able to see more detailed information and averages for a specific week, or see how their data compares to their friends and all other users (friendly competition only!). 

### Main View & Dashboard Display

![](https://media.giphy.com/media/1Yf2RdiX96ZGMzpern/giphy.gif)


#### View Friends Feature

![](https://media.giphy.com/media/esLvxnZbXKYot5MnDU/giphy.gif)


#### iPhone X View 

![](https://media.giphy.com/media/czyEsFTJBF2ygBpTEj/giphy.gif)


### Setup

1. `Fork` this repository.
2. `clone` down to your local machine.
3. `cd` into repository.
4. Run `open src/index.html` in your command line.

*For running tests in Sleep.js, please comment out these lines of code*:

`if (typeof module !== 'undefined') {
  const dayjs = require("dayjs");
  const isSameOrBefore = require('dayjs/plugin/isSameOrBefore');
  const isSameOrAfter = require('dayjs/plugin/isSameOrAfter');
  dayjs.extend(isSameOrBefore);
  dayjs.extend(isSameOrAfter);
  
}
`

**OR**

[Click here](deployed link here) to view the deployed site. 

### Technologies 
- JavaScript
- HTML
- CSS
- [Day.js](https://www.npmjs.com/package/dayjs)
- Mocha & Chai

### Project Wins & Challenges

#### Wins
For this project, something that we considered to be a win was installing and using `day.js`. This was the first time we were introduced to using packages in projects! Sarah was able to get it working in our Class files and on the DOM. Another thing we consider to be a win is having our wireframe and final product be very similar to each other. We stuck with our initial plan and were able to execute it how we had initially visualized. We also enjoyed having several opportunities to use our new array iterator methods. 

#### Challenges
Some challenges we encountered in the project also had to do with using packages. We would have liked to have had time to experiment using something like `chart.js` to display all of our user's information and comparisons, resulting in a more cohesive page design with less text. We also ran into some issues with `day.js` not working well with other libraries. 

### Future Project Iterations 
- Implement additional packages such as [Chart.js](https://www.npmjs.com/package/chart.js) to display information on the back of widget cards. 
- More consistency in our use of packages - using `Day.js` throughout all classes. 
- Display more detailed information on friends - creating (healthy) competitions or displaying other relevant information. 

 


