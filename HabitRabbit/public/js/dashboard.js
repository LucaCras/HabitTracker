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

var main = function() {

    var nextId = 0;
    var habitList;

    var indexInHabitList = function(id) {
        for (var i = 0; i < habitList.length; i++) {
            if (habitList[i].id == id) {
                return i;
            }
        }
        return -1;
    }
    var insertIntoHabitList = function(habit) {
        if (indexInHabitList(habit.id) == -1) {
            habitList.push(habit);            
        } else {
            return null;  
        }
    }

    var createHTML = function(habit) {
        insertIntoHabitList(habit);
        return ('\
          <li>\
            <div class="habit" id="' + habit.id + '">\
              <a href="#" class="delete"  id="' + habit.id + '"><i class="fa fa-times" aria-hidden="true"></i></a>\
              <div class="habit-content">\
                <h2 class="habitname">' + habit.name + '</h2>\
                <p>' + habit.duration + ' days remaining</p>\
                <p>'+ habit.frequency + ' times a week</p>\
                <p>'+ habit.good + '</p>\
                <a href="#" class="edit" id="' + habit.id + '"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Edit</a>\
              </div>\
            </div>\
          </li>'
        );
    }

    var getHabits = function(){
        $.getJSON('/dashboard/habits', (rows) => {
            habitList = [];
            var html = "";
            for( var i = 0; i < rows.length; i++ ) {

                habit = new Habit(rows[i].habit_id, rows[i].name, rows[i].duration, rows[i].frequency, rows[i].good);
                html += createHTML(habit)
                nextId = rows[i].id + 1;
            }
            console.log(habitList);            
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

        $.post('/dashboard/Luca/delete', {id: id})

        getHabits();
    })

    $("#main ul").on("click", ".edit", function() {
        var habit = habitList[indexInHabitList(this.id)];

        console.log(habit);
        document.getElementById('modal').style.display = 'block';
    })

    $("input").focus(function(){
        $(this).one("click keyup", function(e){      
            $(this).select();
        });
    });
}


$(document).ready(main);
 