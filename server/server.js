  //Only seed on the server
  Meteor.startup(function() {
    //AND only seed if there are no items
    if(Tasks.find({}).count() == 0) {
      for(var i = 1; i <= 10; i++) {
        Tasks.insert({
            description: "Item " + i,
            rank: i
        })
      }
    }
  })
