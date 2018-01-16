var main = () => {
    $('.sidebar-items li:nth-child(2) a').addClass('active');

    var Doughnut = $('#myChart');
    var Bar = $('#barChart');

    data = {
        datasets: [{
            data: [55, 45],
            backgroundColor: ['#FC4B6C', '#26C6DA']
        }],
    
        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
            'Bad Habits',
            'Good Habits'
        ]
    };

    barData = {
        datasets: [{
            title: 'hallo',
            data: [2, 4, 3, 6, 7, 3, 12, 15, 4, 8, 5, 1],
            backgroundColor: ['#FC4B6C', '#26C6DA', '#6DE5D0', '#AF4B97', '#9E6BD1', '#4b86eb', '#469a2a', '#ffb5c9', '#e15859', '#928da0', '#12f9af', '#FFFF00']
        }],
    
        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ]
    }

    // And for a doughnut chart
    setTimeout(function() {
        var myDoughnutChart = new Chart(Doughnut, {
            type: 'doughnut',
            data: data,
            options: {
                title: {
                    display: true,
                    text: 'Good and Bad habits',
                    fontSize: 20
                },
                layout: {
                    padding: {
                        left: 0,
                        right: 0,
                        top: 20,
                        bottom: 20
                    }
                }
            }
        });

        var myDoughnutChart = new Chart(Bar, {
            type: 'bar',
            data: barData,
            options: {
                title: {
                    display: true,
                    text: 'Completed Habits',
                    fontSize: 20
                },
                layout: {
                    padding: {
                        left: 0,
                        right: 0,
                        top: 20,
                        bottom: 20
                    }
                },
                legend: {
                    display: false
                }
            }
        });

    }, 750)
    
}

$(document).ready(main);