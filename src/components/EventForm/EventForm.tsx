import moment from 'moment/moment';
import React, { useState } from 'react';
import { Event } from '../types/eventsType';

type Props = {
  handleSetEvents: (item: Event | Event[], type?: string) => void;
  events: Event[],
  selectedEvent: Event | null,
  formType: string,
  closeEventForm: () => void;
}
export const EventForm: React.FC<Props> = ({
  handleSetEvents, events, selectedEvent, formType, closeEventForm,
}) => {
  const editForm = formType === 'editForm' && selectedEvent !== null;
  const state = editForm && selectedEvent;
  const [title, setTitle] = useState(state ? selectedEvent.title : '');
  const [description, setDescription] = useState(state ? selectedEvent.description : '');
  const [date, setDate] = useState(state ? selectedEvent.date : '');
  const [time, setTime] = useState(state ? selectedEvent.time : '');


  const closeForm = () => {
    setTime('');
    setDescription('');
    setDate('');
    setTime('');
    closeEventForm();
  };
  const handleAddEventForm = (event: React.FormEvent) => {
    event.preventDefault();
    const newId = (Math.max(...events.map(event => event.id)) + 1);

    const newEvent = {
      id: isFinite(newId) ? newId : 1,
      title,
      description,
      date,
      time,
      createdAt: moment().format('DD.MM.YYYY hh:mm'),
    };

    handleSetEvents(newEvent);
    closeForm();
  };

  const handleEditEventForm = (event: React.FormEvent, type = '') => {
    event.preventDefault();

    if (!selectedEvent) {
      throw Error('selectedEvent not found');
    }

    const newEvents = events.filter(event => event.id !== selectedEvent.id);

    if (type === 'delete') {
      handleSetEvents(newEvents, 'patch');
      closeEventForm();
      return;
    }
    const updatedEvent = {
      id: selectedEvent.id,
      title,
      description,
      date,
      time,
      createdAt: selectedEvent.createdAt,
      updatedAt: moment().format('DD.MM.YYYY hh:mm'),
    };

    newEvents.push(updatedEvent);
    handleSetEvents(newEvents, 'patch');

    closeEventForm();
  };

  return (
    <div className="add-event-form event-form">
      <form className="event-form" action="" onSubmit={(editForm) ? handleEditEventForm : handleAddEventForm}>
        <div className="event-form-container">
          <h1 className="event-form__title">{editForm ? 'Edit idea item' : 'Add new idea item'}</h1>
          <button className="event-form__cross" onClick={closeEventForm}>
            x
          </button>
        </div>
        {editForm && (
          <p className="event-form__text">{selectedEvent.updatedAt
            ? `Updated at: ${selectedEvent.updatedAt}`
            : `Created at ${selectedEvent.createdAt}`}</p>
        )}
        <p className="event-form__text-first">Title *</p>
        <input
          type="text"
          className="event-form__input"
          placeholder="Title goes here"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />
        <textarea
          className="event-form__textarea"
          cols={30}
          rows={10}
          placeholder="Description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        ></textarea>
        <div className="event-form__date date">
          <div className="date__block-first">
            <p className="event-form__text">Date</p>
            <input
              type="date"
              name="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              required
            />
          </div>
          <div className="date__block">
            <p className="event-form__text-second">Begin time</p>
            <input
              type="time"
              name="time"
              value={time}
              onChange={(event) => setTime(event.target.value)}
            />
          </div>
        </div>
        <div className="event-form__block">
          {editForm && (
            <button 
              className='event-form__delete' 
              onClick={(event) => handleEditEventForm(event, 'delete')}
            >Delete</button>
          )}
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
};