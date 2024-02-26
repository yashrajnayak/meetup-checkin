async function fetchFollowings() {
  const username = document.getElementById('usernameInput').value.trim();
  if (!username) {
    alert('Please enter a valid GitHub username.');
    return;
  }

  try {
    const response = await fetch(`https://api.github.com/users/${username}/following`);
    const data = await response.json();
    const followingsList = document.getElementById('followingsList');
    followingsList.innerHTML = '';
    data.forEach(following => {
      const listItem = document.createElement('li');
      listItem.textContent = following.login;
      followingsList.appendChild(listItem);
    });
  } catch (error) {
    alert('Error fetching data from GitHub API. Please try again later.');
    console.error(error);
  }
}
