var db = require("../models");

module.exports = function (app) {
  //For user login
  app.get('/login', function (req, res) {
    res.render('login', {
      title: 'Express Login'
    });
  });

  //base code needed for user routes later
  app.get("/api/users", function (req, res) {
    // 1. Add a join to include all of each users's cards
    db.users.findAll({}).then(function (dbusers) {
      res.json(dbusers);
    });
  });

  app.get("/api/users/:id", function (req, res) {
    // 2; Add a join to include all of the users's cards here
    db.users.findOne({
      where: {
        id: req.params.id
      }
    }).then(function (dbusers) {
      res.json(dbusers);
    });
  });

  app.post("/api/users", function (req, res) {
    db.users.create(req.body).then(function (dbusers) {
      res.json(dbusers);
    });
  });

  app.get("/api/playerbase", function (req, res) {
    db.Playerbase.findAll().then(function (results) {
      res.json(results);
    })
  });

  app.get("/api/playerstats", function (req, res) {
    db.Playerstats.findAll().then(function (results) {
      res.json(results);
    })
  });

  // work inprogress, route to get individual card data from deckcard/deckview click event => need to have route identify by id
  app.get("/api/playerbase/:id", function (req, res) {
    var id = req.params.id
    // console.log("this id " + id)
    db.Playerbase.findOne({
      where: {
        player_id: id
      }
    }).then(function (results) {
      res.json(results);
    })
  });

    app.get("/api/playerstats/:id", function (req, res) {
      var id = req.params.id
      db.Playerstats.findOne({
        where: {
          player_id: id
        }
      }).then(function (results) {
        res.json(results);
      })
    });

  // Get all the card data (name only, really, to present in deckview)
  app.get("/api/all", function (req, res) {
    db.Playerbase.findAll().then(function (results) {
      res.json(results);
    })
  })

  //add a new card
  app.post("/api/new", function (req, res) {
    console.log("body from front end")
    console.log(req.body)

    // Insert into table
    db.Playerbase.create({
      player_id: req.body.playerID,
      player_name: req.body.playerName,
      player_pos: req.body.playerPos,
      player_height: req.body.playerHeight,
      player_weight: req.body.playerWeight,
      player_team: req.body.playerTeam,
      player_city: req.body.playerCity,
      img_src: req.body.playerGIF,
    }),
    db.Playerstats.create({
      player_id: req.body.playerID,
      season: req.body.playerStatsSeason,
      player_team: req.body.playerStatsTeam,
      player_gp: req.body.playerGP,
      player_fg: req.body.playerFGPer,
      player_ft: req.body.playerFTPer,
      player_reb: req.body.playerReb,
      player_ast: req.body.playerAst,
      player_stl: req.body.playerStl,
      player_blk: req.body.playerBlk,
      player_pts: req.body.playerPts,
      player_avg: req.body.playerAvg,
    })
      // .then(function (PlayerBase) {
      //   res.json(PlayerBase);
      // });
      .then(function (results) {
        res.end();
      })

  });
  //other routes..
}


