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
    <section class="user-info-card">
      <p><span>Full Name: </span><span>${user.name}</span></p>
      <p><span>Address: </span><span>${user.address}</span></p>
      <p><span>Email: </span><span>${user.email}</span></p>
      <p><span>Stride Length: </span><span>${user.strideLength}</span></p>
      <p><span>Daily Step Goal: </span><span>${user.dailyStepGoal}</span></p>
    </section>`
  userInformationSection.innerHTML = markup;
}

const displayFriends = () => {
  const markup = user.friends.reduce((acc, friend) => {
    acc += `<h3>${allUsers.findUserData(friend).name}</h3>`
    return acc;
  }, '');

  friendSection.innerHTML = markup;
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
  sleepSection.innerHTML = `
  <div class="flip-card-inner"> 
  <div class="flip-card-front">
    <i class="far fa-moon fa-5x"></i>
    <h3>${sleep.getHoursSleptForUserByDate(user.id, '2019/09/22')} hours
    <br>today</h3>
  </div>
  <div class="flip-card-back">
    <p>Sleep Quality: ${sleep.getSleepQualityForUserByDate(user.id, '2019/09/22')}</p>
    <h4>Weekly Sleep Data</h4>
    <p>Hours Slept: ${sleep.getDailyAvgSleptByWeekStarting(user.id, '2019/09/22')}</p>
    <p>Quality of Sleep: ${sleep.getDailyAvgSleepQualityByWeekStarting(user.id, '2019/09/22')}</p>
  </div>
</div>`

}


// EVENT LISTENERS 
window.addEventListener('load', displayAllInfo);