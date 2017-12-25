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

    var input = $("<input>").attr("type", "hidden").attr("name", "id");
    $('#edithabit').append($(input));

    var getHabits = function(){
        $.getJSON('/dashboard/habits', function() {
            // habitList = [];
            // var html = "";
            // for( var i = 0; i < rows.length; i++ ) {

            //     habit = new Habit(rows[i].habit_id, rows[i].name, rows[i].duration, rows[i].frequency, rows[i].good);
            //     html += createHTML(habit)
            //     nextId = rows[i].id + 1;
            // }         
            // $('#habits').html(html); 
            console.log("test");
        })
    }

    getHabits();

    setInterval(() => { getHabits() }, 10000)

    $("#add").click(function() {
        $('#create-modal').css('display', 'block');
    })

    $(".close").click(function () {
        $('.modal').css('display', 'none');
    })  

    // $("#createhabit").submit(function(e) {
    //     e.preventDefault();

    //     var data = $('#createhabit').serializeArray().reduce(function(obj, item) {
    //         obj[item.name] = item.value;
    //         return obj;
    //     }, {});

    //     console.log(data);
    //     var newHabit = new Habit(nextId, data.name, data.duration, data.frequency, data.good)
    //     $('#habits').append(createHTML(newHabit))

    //     $.post('/dashboard/Luca/add', data)

    //     getHabits();

    //     document.getElementById('create-modal').style.display = 'none';
    // })

    $("#main ul").on("click",".delete", function() {
        var id = this.id;

        $.post('/dashboard/Luca/delete', {id: id})

        getHabits();
    })

    $("#main ul").on("click", ".edit", function() {
        var index = indexInHabitList(this.id);
        var habit = habitList[index];
        
        document.getElementById('edit-modal').style.display = 'block';
        $('#edit-modal input[name="name"]').attr('value', habit.name);
        $('#edit-modal input[name="duration"]').attr('value', habit.duration);
        $('#edit-modal input[name="duration"]').attr('value', habit.duration);
        $('#edit-modal option[value="'+ habit.frequency +'"]').attr('selected','selected');
        $('#edit-modal input[name="id"]').val(habit.id);
        if(habit.good){
            $('edit-modal input[value="1"]').attr('checked', true);
        } else {
            $('edit-modal input[value="0"]').attr('checked', true);
        }
    })

    // $("#edithabit").submit(function(e) {
    //     e.preventDefault();

    //     var data = $('#edithabit').serializeArray().reduce(function(obj, item) {
    //         obj[item.name] = item.value;
    //         return obj;
    //     }, {});

    //     console.log(data);

    //     $.post("/dashboard/Luca/edit", data);

    //     getHabits();
    // })

    $("input").focus(function() {
        $(this).one("click keyup", function(e){      
            $(this).select();
        });
    });
}


$(document).ready(main);
 