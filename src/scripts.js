
// VARIABLES & QUERY SELECTORS 
const allUsers = new UserRepository(userData);
const hydration = new Hydration(1, hydrationData);
const user = new User(userData[0]);


const userNameGreeting = document.querySelector('#userGreeting');
const userInformationSection = 
            document.querySelector('#userInformationSection');
const friendSection = document.querySelector('#friendsSection');
const userAveragesSection = document.querySelector('#userAveragesSection');
const hydrationSection = document.querySelector('#hydrationSection');


//FUNCTIONS 
const displayAllInfo = () => {
  greetUser();
  displayUserInformation();
  displayFriends();
  displayAllUserAvgs();
  displayHydrationInfo();
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
    //need function to convert friends.id to actual friend info
  friendSection.innerHTML = `${user.friends}`;
}

const displayAllUserAvgs = () => {
userAveragesSection.innerText = `All User Average:${allUsers.calculateAvgStepGoal()}
Your Average: ${user.dailyStepGoal}`;
}

const displayHydrationInfo = () => {
  const latestWeek = hydration.findDailyFluidIntakeForWeek('2019/09/16');
  const latestWeekToDisplay = latestWeek.reduce((acc, {numOunces, date}) => {
    acc[date] = numOunces;
    return acc;
  }, {});
  const stringifiedWeek = JSON.stringify(latestWeekToDisplay);

  hydrationSection.innerText = `Today's Water Consumption: ${hydration.returnOuncesByDate('2019/09/22')} ounces
  Weekly Consumption: ${stringifiedWeek}`;
}


// EVENT LISTENERS 
window.addEventListener('load', displayAllInfo);