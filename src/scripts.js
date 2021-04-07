

// VARIABLES & QUERY SELECTORS 
const allUsers = new UserRepository(userData);
const sleep = new Sleep(sleepData);
let user;
let activity;
let hydration;




const userNameGreeting = document.querySelector('#userGreeting');
const userInformationSection = 
  document.querySelector('#userAveragesSection');
const friendSection = document.querySelector('#friendsSection');
const userAveragesSection = document.querySelector('#userInformationSection');
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
  <i class="far fa-address-card fa-5x"></i>
  <h3 class="card-header">YOUR INFORMATION</h3>
  <i class="fas fa-circle fa-2x" id="userCircle"></i>
    <p class="card-title">NAME</p><p>${user.name}</p>
    <p class="card-title">STRIDE LENGTH</p>
    <p>${user.strideLength}</p>
    <p class="card-title">DAILY STEP GOAL</p>
    <p>${user.dailyStepGoal}</p>`
  
  userInformationSection.innerHTML = markup;
}

const displayFriends = () => {
  const icon = `<i class="fas fa-users fa-5x"></i>`;
  const heading = `<h3 class="card-header">YOUR FRIENDS</h3>
  <i class="fas fa-circle fa-2x" id="userCircle"></i>`
  const markup = user.friends.reduce((acc, friend) => {
    const currentFriend = allUsers.findUserData(friend);
    acc += `<p class="friend-names" id=${currentFriend.id} > ${currentFriend.name}</p>`
    return acc;
  }, '');

  friendSection.innerHTML = `${icon} ${heading} ${markup}`;
}

const displayAllUserAvgs = () => {
  const userActivityData = activity.__getUserDataByDate(user, '2019/09/20');
  const stepsToday = userActivityData.numSteps;
  const icon = `<i class="fas fa-running fa-5x"></i>`;
  const heading = `<h3 class="card-header">USER AVERAGES</h3>`;
  const markup = `
  <div>
    <p class="avgs"></i>Steps</p>
      <p class="card-title">OVERALL GOAL</p>
      <p class="comparisons">Yours: ${user.dailyStepGoal} 
      <br>All User: ${allUsers.calculateAvgStepGoal()}</p>
      <p class="card-title">TODAY'S</p>
      <p class="comparisons">Yours: <b>${stepsToday}</b>
      <br>All User: ${activity.calculateAllUserStepAvg('2019/09/20')}</p>
    <br>
    <i class="fas fa-circle fa-2x"></i>
    <p class="avgs">Activity</p>
    <p class="card-title">MINUTES ACTIVE</p>
      <p class="comparisons">Yours: ${activity.calculateMinutesActive(user, '2019/09/22')} minutes
      <br>All Users: ${activity.calculateAllUserActivityAvg('2019/09/20')} minutes</p>
      <br>
      <p class="card-title">STAIRS CLIMBED</p>
      <p class="comparisons">Yours: ${activity.data[user.id].flightsOfStairs}
      <br>All Users: ${activity.calculateAllUserStairAvg('2019/09/20')}</p>
  </div>`

  userAveragesSection.innerHTML = `${heading} ${markup} ${icon}`;
}

const displayHydrationInfo = () => {
  const latestWeek = hydration.findDailyFluidIntakeForWeek('2019/09/16');

  hydrationSection.innerHTML = ` 
  <div class="flip-card-inner">
  <div class="flip-card-front-hydration">
    <p class="ounces">HYDRATION</p>
    <i class="fas fa-tint fa-5x"></i>
    <h3>${hydration.returnOuncesByDate('2019/09/20')} ounces
    <br>today</h3>
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
  const dayHoursSlept = sleep.getHoursSleptForUserByDate(user.id, '2019/09/20');
  const daySleepQuality = sleep.getSleepQualityForUserByDate(user.id, '2019/09/20');
  const weekHoursSlept = sleep.getDailyAvgSleptByWeekStarting(user.id, '2019/09/16');
  const weekSleepQuality = sleep.getDailyAvgSleepQualityByWeekStarting(user.id, '2019/09/16');
  const allSleepQuality = sleep.getAvgAllTimeSleepQualityByUserId(user.id);
  const allHoursSlept = sleep.getAvgDailySleepByUserId(user.id);

  sleepSection.innerHTML = `
  <div class="flip-card-inner"> 
  <div class="flip-card-front-sleep">
    <p class="hours">SLEEP</p>
    <i class="far fa-moon fa-5x"></i>
    <h3>${dayHoursSlept.toFixed(1)} hours
    <br>today</h3>
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
  const minActiveToday = activity.calculateMinutesActive(user, '2019/09/20');
  const weeklyMinActive = activity.calculateAvgMinutesActiveForWeek(user, '2019/09/16')
  
  activitySection.innerHTML = `
  <div class="flip-card-inner"> 
  <div class="flip-card-front-activity">
    <p class="feet">STEPS</p>
    <i class="fas fa-chart-line fa-5x"></i>
    <h3>${minActiveToday} minutes
    <br>today</h3>
  </div>
  <div class="flip-card-back">
    <h4>Weekly Activity Data</h4>
    <p>Avg Minutes Active Per Day: ${weeklyMinActive}</p>
  </div>
</div>
`
}

const displayStepInfo = () => {
  const userActivityData = activity.__getUserDataByDate(user, '2019/09/20');
  const stepsToday = userActivityData.numSteps;
  const distanceInMiles = activity.calculateMilesWalked(user, '2019/09/20');
  const stepsAchieved = activity.determineStepsAchieved(user, '2019/09/20');
  const stairRecord = activity.findStairRecord(user);
  console.log(user);



  stepsSection.innerHTML = `
  <div class="flip-card-inner"> 
  <div class="flip-card-front-steps">
    <p class="minutes">ACTIVITY</p>
    <i class="fas fa-walking fa-5x"></i>
    <h3>${stepsToday} steps
    <br>today</h3>
  </div>
  <div class="flip-card-back">
    <h3>${stepsAchieved}</h3>
    <h4>Miles Walked Today: ${distanceInMiles}</h4>
    <h4>All Time Stair Climbing Record: ${stairRecord}</h4>
  </div>
</div>
  `
}


// EVENT LISTENERS 
window.addEventListener('load', displayAllInfo);
friendSection.addEventListener('click', changeUser);
