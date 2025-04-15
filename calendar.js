$(document).ready(function() {
  // Load events from the backend (example: fetching from MongoDB)
  $.ajax({
    url: '/exercises',
    method: 'GET',
    success: function(data) {
      var events = data.map(exercise => ({
        title: exercise.title,
        start: exercise.startDate,
        end: exercise.endDate
      }));
      $('#calendar').fullCalendar('renderEvents', events);
    }
  });

  // Initialize FullCalendar
  $('#calendar').fullCalendar({
    header: {
      left: 'prev,next today',
      center: 'title',
      right: 'month,agendaWeek,agendaDay'
    },
    events: [],
    editable: true,
    droppable: true,
    eventClick: function(event) {
      // Handle the event click to edit details
      alert('Exercise: ' + event.title);
    },
    drop: function(info) {
      var exercise = prompt('Enter Exercise for this date:');
      if (exercise) {
        // Save exercise to backend
        $.ajax({
          url: '/exercises',
          method: 'POST',
          data: {
            title: exercise,
            startDate: info.event.start.toISOString(),
            endDate: info.event.end.toISOString()
          },
          success: function(data) {
            info.event.setProp('title', data.title);
          }
        });
      }
    }
  });
});
