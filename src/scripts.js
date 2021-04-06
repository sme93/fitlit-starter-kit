

// VARIABLES & QUERY SELECTORS 
const allUsers = new UserRepository(userData);
const sleep = new Sleep(sleepData);
let user;
let activity;
let hydration;




const userNameGreeting = document.querySelector('#userGreeting');
const userInformationSection = 
  document.querySelector('#userInformationSection');
const friendSection = document.querySelector('#friendsSection');
const userAveragesSection = document.querySelector('#userAveragesSection');
const hydrationSection = document.querySelector('#hydrationSection');
const sleepSection = document.querySelector('#sleepSection');
const activitySection = document.querySelector('#activitySection');
const stepsSection = document.querySelector('#stepsSection');



//FUNCTIONS 
const displayAllInfo = (event) => {
  const currentUser = event.target.id // if this is true
    ? parseInt(event.target.id) - 1 // current user is this
    : 0; // otherwise

  user = new User(userData[currentUser]);
  activity = new Activity(userData[currentUser], activityData);
  hydration = new Hydration(userData[currentUser].id, hydrationData);
  greetUser();
  displayUserInformation();
  displayFriends();
  displayAllUserAvgs();
  displayHydrationInfo();
  displaySleepInfo();
  displayActivityInfo();
  displayStepInfo();
}


const greetUser = () => {
  userNameGreeting.innerHTML = `Hi, ${user.getFirstName()}!`;
}

const displayUserInformation = () => {
  const markup = `
      <p><span>Full Name: </span><span>${user.name}</span></p>
      <p><span>Stride Length: </span><span>${user.strideLength}</span></p>
      <p><span>Daily Step Goal: </span><span>${user.dailyStepGoal}</span></p>`
  userInformationSection.innerHTML = markup;
}

const displayFriends = () => {
  const icon = `<i class="fas fa-users fa-5x"></i>`;
  const heading = `<h3>Your Friends</h3>`
  const markup = user.friends.reduce((acc, friend) => {
    const currentFriend = allUsers.findUserData(friend);
    acc += `<p id=${currentFriend.id} > ${currentFriend.name}</p>`
    return acc;
  }, '');

  friendSection.innerHTML = `${icon} ${heading} ${markup}`;
}

const displayAllUserAvgs = () => {
  const icon = `<i class="fas fa-running fa-5x"></i>`;
  const heading = `<h3>All User Comparisons</h3>`;
  const markup = `
  <div>
    <p>Average Step Goal:${allUsers.calculateAvgStepGoal()}</p>
    <p>Number of Steps Today: ${activity.calculateAllUserStepAvg('2019/09/16')}</p>
    <p>Minutes Active Today: ${activity.calculateAllUserActivityAvg('2019/09/16')}</p>
    <p>Flights of Stairs Climbed Today: ${activity.calculateAllUserStairAvg('2019/09/16')}</p>
  </div>`

userAveragesSection.innerHTML = `${heading} ${markup} ${icon}`;
}

const displayHydrationInfo = () => {
  const latestWeek = hydration.findDailyFluidIntakeForWeek('2019/09/16');

  hydrationSection.innerHTML = ` 
  <div class="flip-card-inner">
  <div class="flip-card-front-hydration">
    <i class="fas fa-tint fa-5x"></i>
    <h3>${hydration.returnOuncesByDate('2019/09/22')} ounces of
    <br>water today</h3>
  </div>
  <div class="flip-card-back">
    <h4>Weekly Hydration Data</h4>
    <div>Ounces Drank: ${latestWeek.map(day => {
    return `<p>${day.date}: ${day.numOunces}</p>`;
  }).join("")}</div>
  </div>
</div>`
}

const displaySleepInfo = () => {
  const dayHoursSlept = sleep.getHoursSleptForUserByDate(user.id, '2019/09/22');
  const daySleepQuality = sleep.getSleepQualityForUserByDate(user.id, '2019/09/22');
  const weekHoursSlept = sleep.getDailyAvgSleptByWeekStarting(user.id, '2019/09/22');
  const weekSleepQuality = sleep.getDailyAvgSleepQualityByWeekStarting(user.id, '2019/09/22');
  const allSleepQuality = sleep.getAvgAllTimeSleepQualityByUserId(user.id);
  const allHoursSlept = sleep.getAvgDailySleepByUserId(user.id);

  sleepSection.innerHTML = `
  <div class="flip-card-inner"> 
  <div class="flip-card-front-sleep">
    <i class="far fa-moon fa-5x"></i>
    <h3>${dayHoursSlept.toFixed(1)} hours of 
    <br>sleep today</h3>
  </div>
  <div class="flip-card-back">
    <h4>Daily Sleep Data</h4>
    <p>Sleep Quality: ${daySleepQuality.toFixed(1)}</p>
    <h4>Weekly Sleep Data</h4>
    <p>Hours Slept: ${weekHoursSlept.toFixed(1)}</p>
    <p>Quality of Sleep: ${weekSleepQuality.toFixed(1)}</p>
    <h4>All Time Average Data</h4>
    <p>Sleep Quality: ${allSleepQuality.toFixed(1)}</p>
    <p>Hours Slept: ${allHoursSlept.toFixed(1)}</p>
  </div>
</div>`
}

const changeUser = (event) => {
  if (event.target.nodeName === "P") {
    displayAllInfo(event);
  }
}

const displayActivityInfo = () => {
  const minActiveToday = activity.calculateMinutesActive(user, '2019/09/22');
  
  activitySection.innerHTML = `
  <div class="flip-card-inner"> 
  <div class="flip-card-front-activity">
    <i class="fas fa-chart-line fa-5x"></i>
    <h3>${minActiveToday} minutes
    <br>active today</h3>
  </div>
  <div class="flip-card-back">
    <h4>Daily Activity Data</h4>
    <p></p>
    <h4>Weekly Activity Data</h4>
    <p>Hours Slept: </p>
    <p>Quality of Sleep: </p>
    <h4>All Time Average Data</h4>
    <p>Sleep Quality:</p>
    <p>Hours Slept: </p>
  </div>
</div>
`
}

const displayStepInfo = () => {
  const userActivityData = activity.__getUserDataByDate(user, '2019/09/22');
  const stepsToday = userActivityData.numSteps;
  const distanceInMiles = activity.calculateMilesWalked(user, '2019/09/22');
  //const weeklyNumberOfSteps =
  //const weeklyFlightsOfStairs = 
  
  stepsSection.innerHTML = `
  <div class="flip-card-inner"> 
  <div class="flip-card-front-steps">
    <i class="fas fa-walking fa-5x"></i>
    <h3>${stepsToday} steps
    <br>today</h3>
  </div>
  <div class="flip-card-back">
    <h4>Miles Walked Today</h4>
    <p>${distanceInMiles}</p>
    <h4>Weekly Steps Data</h4>
    <p>Number of Steps: </p>
    <p>Flights of Stairs: </p>
  </div>
</div>
  `
}


// EVENT LISTENERS 
window.addEventListener('load', displayAllInfo);
friendSection.addEventListener('click', changeUser);