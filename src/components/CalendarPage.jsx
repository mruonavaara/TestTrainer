import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

function CalendarPage() {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = async () => {
    try {
      const response = await fetch('https://customerrestservice-personaltraining.rahtiapp.fi/gettrainings');
      if (!response.ok) {
        throw new Error('Failed to fetch trainings');
      }
      const data = await response.json();
      setTrainings(data);
    } catch (error) {
      console.error('Error fetching trainings:', error);
    }
  };
  

  const events = trainings.map(training => {
    const start = new Date(training.date);
    const end = new Date(start.getTime() + training.duration * 60000); 
    return {
      title: training.customer ? `${training.activity} - ${training.customer.firstname} ${training.customer.lastname}` : training.activity,
      start,
      end,
    };
  });

  return (
    <div style={{ width: '100vw', height: '100vw' }}>
      <style>
        {`
          .rbc-toolbar-label,
          .rbc-time-view,
          .rbc-event-content,
          .rbc-agenda-view {
            color: black !important;
          }
        `}
      </style>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultView="week"
        timeslots={2}
      />
    </div>
  );
}

export default CalendarPage;