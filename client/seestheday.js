Template.calendarview.calendar = function () {
  return Tasks.find({}, {sort: {rank: 1}})
}

Template.taskview.task = function () {
  return Tasks.find()
}


  //Add some handlebars helpers to our Template.
  //  This one handily enough returns our Items in rank order
  //  Since Meteor is reactive, whenever our Items change Meteor
  //    will re-render our Template (putting them in the correct order)
  Template.calendarview.helpers({
    items: function() {
      return Tasks.find({}, {sort: {rank: 1}})
    }
  })
 
  //Once the Template is rendered, run this function which
  //  sets up JQuery UI's sortable functionality
  Template.dayview.rendered = function() {
    this.$('#test-list').sortable({
        stop: function(e, ui) {
          // get the dragged html element and the one before
          //   and after it
          el = ui.item.get(0)
          before = ui.item.prev().get(0)
          after = ui.item.next().get(0)
 
          // Here is the part that blew my mind!
          //  Blaze.getData takes as a parameter an html element
          //    and will return the data context that was bound when
          //    that html element was rendered!
          if(!before) {
            //if it was dragged into the first position grab the
            // next element's data context and subtract one from the rank
            newRank = Blaze.getData(after).rank - 1
          } else if(!after) {
            //if it was dragged into the last position grab the
            //  previous element's data context and add one to the rank
            newRank = Blaze.getData(before).rank + 1
          }
          else
            //else take the average of the two ranks of the previous
            // and next elements
            newRank = (Blaze.getData(after).rank +
                       Blaze.getData(before).rank)/2
 
          //update the dragged Item's rank
          Tasks.update({_id: Blaze.getData(el)._id}, {$set: {rank: newRank}})
        }
    })}
