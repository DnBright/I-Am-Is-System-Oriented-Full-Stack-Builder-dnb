const fs = require('fs');
fetch('http://localhost:3000/api/analytics')
  .then(res => res.json())
  .then(data => console.log("Longest Streak:", data.longestStreak, "Current Streak:", data.currentStreak))
  .catch(err => console.error(err));
