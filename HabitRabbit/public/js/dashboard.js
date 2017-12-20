class Habit {
    constructor(id, name, duration, frequency, good) {
        this.id = id;
        this.name = name;
        this.duration = duration;
        this.frequency = frequency;
        this.good = good;
        this.succesful = 0;
        this.unsuccesful = 0;
    }

    incrementSuccesful(){
        this.succesful += 1;
    }
    incrementUnsuccesful(){
        this.unsuccesful += 1;
    }
    getSuccesRatio(){
        return this.succesful / this.duration;
    }
}

var containsObject = function(obj, list) {
  var i;
  for (i = 0; i < list.length; i++) {
      if (list[i] === obj) {
          return true;
      }
  }

  return false;
}

var createNewHabit = function(id, name, duration, frequency, good) {
    var habit = new Habit(id, name, duration, frequency, good);

    $("#main ul").append('\
      <li>\
        <div class="habit" id="habit_' + habit.id + '">\
          <a href="#" class="delete"  id="' + habit.id + '"><i class="fa fa-times" aria-hidden="true"></i></a>\
          <div class="habit-content">\
            <h2 class="habitname">' + habit.name + '</h2>\
            <p>' + habit.duration + ' days remaining</p>\
            <p>'+ habit.frequency + '</p>\
            <p>'+ habit.type + '</p>\
          </div>\
        </div>\
      </li>'
    );
}
habits = [];
var main = function() {


  // var getHabits = $.getJSON('/dashboard/habits', (rows) => {
  //     for( var i = 0; i < rows.length; i++ ) {
  //       var currentHabit = rows[i];
  //       createNewHabit(currentHabit.habit_id, currentHabit.name, currentHabit.duration, currentHabit.frequency, currentHabit.good)
  //     }
  //     console.log('refreshed')
  // })

  var refresh = setInterval(function() {
    $.getJSON('/dashboard/habits', (rows) => {
      // habits.push(rows[0]);
      for( var i = 0; i < rows.length; i++ ) {
        var currentHabit = rows[i];
        console.log(rows[i])
        console.log("habits: " + habits)
        console.log(habits.includes(currentHabit))
        if (!habits.includes(currentHabit)) {
          habits.push(currentHabit);
        }
        //     habits.push(currentHabit);
        //     createNewHabit(currentHabit.habit_id, currentHabit.name, currentHabit.duration, currentHabit.frequency, currentHabit.good)
        // } else {
        //     console.log('already rendered')
        // }
      }
      console.log('refreshed')
  })}, 5000);
  
  

  $("#add").click(function() {
      document.getElementById('modal').style.display = 'block';
  })

  $(".close").click(function () {
      document.getElementById('modal').style.display = 'none';
  })  

  $("#createhabit").submit(function(e) {
      e.preventDefault();

      var form = new FormData(document.getElementById("createhabit"));
      var name = form.get("name");
      var end = form.get("end");
      var days = [];
      var type = form.get("type");

      $.each($("input[name='days']:checked"), function () {
        days.push($(this).val());
      });

      var newHabit = new Habit(name, end, days, type, counter)
      createNewHabit(name, end, days, type, counter);

      $.post('/addHabit', newHabit)

      document.getElementById('modal').style.display = 'none';
  })

  $("#main ul").on("click",".delete", function() {
    var id = this.id;

    $("#habit_" + id).parent().remove();
  })
}


$(document).ready(main);
 