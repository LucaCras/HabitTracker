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

var createHTML = function(habit) {

    return ('\
      <li>\
        <div class="habit" id="habit_' + habit.id + '">\
          <a href="#" class="delete"  id="' + habit.id + '"><i class="fa fa-times" aria-hidden="true"></i></a>\
          <div class="habit-content">\
            <h2 class="habitname">' + habit.name + '</h2>\
            <p>' + habit.duration + ' days remaining</p>\
            <p>'+ habit.frequency + ' times a week</p>\
            <p>'+ habit.good + '</p>\
          </div>\
        </div>\
      </li>'
    );
}

var main = function() {

    var nextId = 0;

    var getHabits = function(){
        $.getJSON('/dashboard/habits', (rows) => {
            var html = "";
            amount = rows.length + 1;
            for( var i = 0; i < rows.length; i++ ) {
                habit = new Habit(rows[i].habit_id, rows[i].name, rows[i].duration, rows[i].frequency, rows[i].good);
                html += createHTML(habit)
            }
            $('#habits').html(html); 
        })
    }

    getHabits();

    setInterval(() => { getHabits() }, 10000)

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
      var duration = form.get("duration");
      var frequency = form.get("frequency");
      var good;
      if (form.get('type') == 'good') {
          good = 1;
      } else {
          good = 0  ;
      }


      var newHabit = new Habit(nextId, name, duration, frequency, good)
      $('#habits').append(createHTML(newHabit))

      $.post('/dashboard/Luca/add', {name: name, duration: duration, frequency: frequency, good: good, user: 1})

      document.getElementById('modal').style.display = 'none';
  })

  $("#main ul").on("click",".delete", function() {
    var id = this.id;

    $("#habit_" + id).parent().remove();

    $.post('/dashboard/Luca/delete', {id: id})
  })
}


$(document).ready(main);
 