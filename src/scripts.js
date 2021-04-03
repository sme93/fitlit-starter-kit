// VARIABLES & QUERY SELECTORS 
const allUsers = new UserRepository(userData);
const hydration = new Hydration(1, hydrationData);
const user = new User(userData[0]);
const sleep = new Sleep(sleepData);


const userNameGreeting = document.querySelector('#userGreeting');
const userInformationSection = 
            document.querySelector('#userInformationSection');
const friendSection = document.querySelector('#friendsSection');
const userAveragesSection = document.querySelector('#userAveragesSection');
const hydrationSection = document.querySelector('#hydrationSection');
const sleepSection = document.querySelector('#sleepSection');



//FUNCTIONS 
const displayAllInfo = () => {
  greetUser();
  displayUserInformation();
  displayFriends();
  displayAllUserAvgs();
  displayHydrationInfo();
  displaySleepInfo();
}

const greetUser = () => {
  userNameGreeting.innerHTML = `Hi, ${user.getFirstName()}!`;
}

const displayUserInformation = () => {
  const markup = `
      <p><span>Full Name: </span><span>${user.name}</span></p>
      <p><span>Address: </span><span>${user.address}</span></p>
      <p><span>Email: </span><span>${user.email}</span></p>
      <p><span>Stride Length: </span><span>${user.strideLength}</span></p>
      <p><span>Daily Step Goal: </span><span>${user.dailyStepGoal}</span></p>`
  userInformationSection.innerHTML = markup;
}

const displayFriends = () => {
  const icon = `<i class="fas fa-users fa-5x"></i>`;
  const heading = `<h3>Your Friends</h3>`
  const markup = user.friends.reduce((acc, friend) => {
    acc += `<p>${allUsers.findUserData(friend).name}</p>`
    return acc;
  }, '');

  friendSection.innerHTML = `${icon} ${heading} ${markup}`;
}

const displayAllUserAvgs = () => {
  userAveragesSection.innerText = `All User Average:${allUsers.calculateAvgStepGoal()}
Your Average: ${user.dailyStepGoal}`;
}


//For this function, I'm planning on just reducing it to display the info we want back in the hydration file. For that commented out code on line 67, I figured we could have that information display once we click on the hydration widget, and toggle to a different page or something! Definitely a work in progress, feel free to make changes as you see fit! 
const displayHydrationInfo = () => {
  const latestWeek = hydration.findDailyFluidIntakeForWeek('2019/09/16');
  const latestWeekToDisplay = latestWeek.reduce((acc, {numOunces, date}) => {
    acc[date] = numOunces;
    return acc;
  }, {});
  const stringifiedWeek = JSON.stringify(latestWeekToDisplay);

  hydrationSection.innerHTML = ` 
  <i class="fas fa-tint fa-5x"></i>
  <h3>${hydration.returnOuncesByDate('2019/09/22')} ounces <br> today</h3>`
  // Weekly Consumption: ${stringifiedWeek};
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
  <div class="flip-card-front">
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


// EVENT LISTENERS 
window.addEventListener('load', displayAllInfo);