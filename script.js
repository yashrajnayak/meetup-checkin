function checkIn() {
  var username = document.getElementById('username').value.trim();
  if (username === '') {
    alert('Please enter a GitHub username.');
    return;
  }

  // Show loading spinner
  var spinner = document.createElement('div');
  spinner.classList.add('spinner');
  document.getElementById('status').innerHTML = '';
  document.getElementById('status').appendChild(spinner);

  fetch('https://api.github.com/users/' + username)
    .then(response => response.json())
    .then(data => {
      var name = data.name || 'N/A';
      var followers = data.followers;
      var following = data.following;
      return fetch('https://api.github.com/users/' + username + '/following')
        .then(response => response.json())
        .then(followingData => {
          var followingList = followingData.map(user => user.login).join(',');
          var url = 'https://docs.google.com/forms/d/e/1FAIpQLSduOWOnzB-JlTKt9loP8RL3qCzFqbSTpV7q5eFkTgYEqSuqRA/viewform?usp=pp_url&entry.74991674=' + username + '&entry.1992563863=' + name + '&entry.1448618851=' + followers + '&entry.1722898164=' + following + '&entry.2080764552=' + followingList;
          var newTab = window.open(url, '_blank');
          newTab.onload = function() {
            // Hide loading spinner once new tab finishes loading
            
          };
        });
    })
    .catch(error => {
      console.error('Error:', error);
      document.getElementById('status').innerText = 'Error: User not found.';
    });
}
