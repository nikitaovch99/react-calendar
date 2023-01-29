import React from 'react';
import moment from 'moment';
import classNames from 'classnames';
import { Event } from '../types/eventsType';

type Props = {
  currentDate: string,
  nextHandler: () => void;
  prevHandler: () => void;
  isDatePickerVisible: () => void;
  isEventFormVisible: (type: string, value?: Event) => void,
  formType: string,
}

export const Header: React.FC<Props> = ({
  currentDate,
  nextHandler,
  prevHandler,
  isDatePickerVisible,
  isEventFormVisible,
  formType,
}) => {
  const today = moment(currentDate);

  return (
    <div className="header">
      <button onClick={() => isEventFormVisible('addForm')}
        className={classNames('header__add-event add-event', {
          'add-event--disabled': formType === 'editForm',
        })}>
        <div className="add-event__image"></div>
      </button>
      <div className="header__right-side">
        <div className="header__month-switch month-switch">
          <button onClick={prevHandler} className="month-switch__button">
            <div className="button__image"></div>
          </button>
          <div className="month-switch__date">{today.format('MMMM YYYY')}</div>
          <button onClick={nextHandler} className="month-switch__button">
            <div className="button__image-second"></div>
          </button>
        </div>
        <button onClick={isDatePickerVisible} className="header__date-picker date-picker">
          <div className="date-picker__image"></div>
        </button>
      </div>
    </div>
  );
};