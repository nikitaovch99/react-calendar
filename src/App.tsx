import React, { useState } from 'react';
import moment from 'moment';
import './App.scss';
import { Calendar } from './components/Calendar';
import { Header } from './components/Header';
import { useLocalStorage } from './hooks/useLocalStorage';
import { YearCalendar } from './components/YearCalendar';
import { EventForm } from './components/EventForm/EventForm';
import { Event } from './components/types/eventsType';


function App() {
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const isDatePickerVisible = () => {
    setDatePickerVisible(!datePickerVisible);
  };
  const [eventFormVisible, setEventFormVisible] = useState(false);

  const [formType, setFormType] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const isEventFormVisible = (type: string, value: Event | null = null) => {
    if (value) {
      setSelectedEvent(value);
    }
    setEventFormVisible(true);
    setFormType(type);

  };

  const closeEventForm = () => {
    setEventFormVisible(false);
    setFormType('');
  };

  moment.updateLocale('en', { week: { dow: 1 } });
  const [currentDate, setCurrentDate] = useLocalStorage('today', moment().format('YYYY-MM-DD'));
  const [events, setEvents] = useLocalStorage<Event[]>('events', []);

  const handleSetEvents = (item: Event[] | Event, type = '') => {
    if (type === 'patch' && Array.isArray(item)) {
      setEvents(item);
    } else if (typeof item === 'object' && item !== null && !Array.isArray(item)) {
      setEvents(curr => [...curr, item]);
    }
  };


  const handleSetCurrentDate = (value: string) => {
    setCurrentDate(value);
  };

  const prevHandler = () => {
    setCurrentDate((curr) => moment(curr).subtract(1, 'month').format('YYYY-MM-DD'));

  };
  const nextHandler = () => {
    setCurrentDate((curr) => moment(curr).add(1, 'month').format('YYYY-MM-DD'));
  };

  return (
    <div className="App">
      <Header
        currentDate={currentDate}
        prevHandler={prevHandler}
        nextHandler={nextHandler}
        isDatePickerVisible={isDatePickerVisible}
        isEventFormVisible={isEventFormVisible}
        formType={formType}
      />
      <Calendar
        currentDate={currentDate}
        events={events}
        isEventFormVisible={isEventFormVisible}
        formType={formType}
      />
      {datePickerVisible && (
        <YearCalendar handleSetCurrentDate={handleSetCurrentDate} isDatePickerVisible={isDatePickerVisible}/>
      )}
      {(eventFormVisible) && (
        <EventForm
          handleSetEvents={handleSetEvents}
          selectedEvent={selectedEvent}
          events={events}
          formType={formType}
          closeEventForm={closeEventForm}
        />
      )}
    </div>
  );
}

export default App;
