import React from 'react';
import classNames from 'classnames';
import moment from 'moment';
import { Event } from '../types/eventsType';
// import moment from 'moment';

type Props = {
  currentDate: string,
  events: Event[],
  formType: string,
  isEventFormVisible: (type: string, value: Event | null) => void;
}

export const Calendar:React.FC<Props> = ({ currentDate, events, formType, isEventFormVisible }) => {
  const today = moment(currentDate);
  const startday = today.clone().startOf('month').startOf('week');
  const endDay = today.clone().endOf('month').endOf('week');
  const daysArray = [];

  while (!startday.isAfter(endDay)) {
    daysArray.push(startday.clone());
    startday.add(1, 'day').clone();
  }

  const daysAndEvents = daysArray.map(day => ({
    day,
    events: events.filter(event => event.date === day.format('YYYY-MM-DD'))
  }));

  const isCurrentDay = (day: moment.Moment) => moment().isSame(day, 'day');

  return (
    <div className={classNames('grid', {
      'grid--7-5': daysArray.length < 36,
      'grid--7-4': daysArray.length < 29,
    })}>
      {
        daysAndEvents.map(({ day, events }) => {
          const dayOfTheWeek = day.format('dddd').substring(0, 2);
          return (
            <div className={classNames('grid__cell cell', {
              'cell--current': isCurrentDay(day),
            })} key={day.unix()}>
              <div className="cell__block">
                <div className="cell__day">
                  {day.format('D')}
                </div>
                <div className="cell__week-day">
                  {dayOfTheWeek}
                </div>
              </div>
              <div className="cell__event event">
                {events.map(event => {
                  const title = event.title.length > 17 ? event.title.slice(0, 17) + '...' : event.title;
                  return (
                    <button
                      key={event.id}
                      className={classNames('event__button', {
                        'event__button--disabled': formType === 'addForm',
                      })}
                      onClick={() => isEventFormVisible('editForm', event)}
                    >
                      <div className="event__title">{title}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
    </div>
  );
};