var friends = require("../data/friends.js");

module.exports = function(app) {
  app.get("/api/friends", function(req, res) {
    return res.json(friends);
  });

  app.post("/api/friends", function(req, res) {
    var newFriend = req.body;
    var bestFriend;
    for (i = 0; i < friends.length; i++) {
      var user1 = newFriend.scores;
      var user2 = friends[i].scores;
      var num = 100;
      var totalDiff = [];

      for (j = 0; j < user1.length; j++) {
        if (user1[j] != user2[j]) {
          console.log(Math.abs(user1[j] - user2[j]));
          totalDiff.push(Math.abs(parseInt(user1[j]) - parseInt(user2[j])));
        } else {
            totalDiff.push(0)
        }
      }

      console.log("num: " + num);
      var total = totalDiff.reduce(function(sum, value) {
        return sum + value;
      }, totalDiff[0]);

      if (total <= num) {
        num = total;
        bestFriend = friends[i];
      }
    }
    console.log("totalDiff: " + totalDiff);
    console.log("total: " + total);
    console.log(bestFriend);
    friends.push(newFriend);
    return res.json(bestFriend);
  });
};
