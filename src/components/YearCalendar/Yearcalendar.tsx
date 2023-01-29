import moment from 'moment';
import React, { useState } from 'react';
import { months } from './months';

type Props = {
  handleSetCurrentDate: (value: string) => void;
  isDatePickerVisible: () => void;
}

export const YearCalendar: React.FC<Props> = ({ handleSetCurrentDate, isDatePickerVisible }) => {
  const [pickedMonth, setPickedMonth] = useState('01');
  const [pickedYear, setPickedYear] = useState('2023');
  const handleSubmitForm = (event: React.FormEvent) => {
    event.preventDefault();

    handleSetCurrentDate(moment(`${pickedYear}-${pickedMonth}`).format('YYYY-MM'));
    isDatePickerVisible();
  };

  return (
    <div className="year-calendar">
      <div className="year-calendar__modal modal">
        <form action="" className="modal__form" onSubmit={handleSubmitForm}>
          <div className="year-form">
            <input
              type="number"
              value={pickedYear}
              onChange={(event) => setPickedYear(event.target.value)}
              className="modal__input"
            />
            <select
              value={pickedMonth} onChange={(event) => setPickedMonth(event.target.value)}
              className="modal__select"
            >
              {months.map(month => (
                <option key={month.number} value={month.number}>{month.name}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="modal__button">Pick</button>
        </form>
      </div>
    </div>
  );
};