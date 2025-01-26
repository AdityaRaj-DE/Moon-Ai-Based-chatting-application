import React from 'react'
import { useState, useEffect } from 'react';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const useDateTime = () => {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return {
    time: dateTime.toLocaleTimeString(),
    day: days[dateTime.getDay()],
    date: dateTime.getDate(),
    month: months[dateTime.getMonth()],
    year: dateTime.getFullYear()
  };
};


const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const dateTime = useDateTime();

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const handlePrevMonth = () => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() - 1);
      return newDate;
    });
  };

  const handleNextMonth = () => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + 1);
      return newDate;
    });
  };

  return (
    <div className="bg-white h-[27.5rem] p-6 rounded-xl shadow-lg w-96">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{months[currentDate.getMonth()]}</h2>
          <p className="text-gray-600">{currentDate.getFullYear()}</p>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={handlePrevMonth}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <i className="ri-arrow-left-s-line text-xl"></i>
          </button>
          <button 
            onClick={handleNextMonth}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <i className="ri-arrow-right-s-line text-xl"></i>
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-2 mb-2">
        {days.map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-600">
            {day.slice(0,3)}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {[...Array(getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth()))].map((_, i) => (
          <div
            key={i}
            className={`text-center p-2 rounded-full hover:bg-gray-100 cursor-pointer
              ${i + 1 === dateTime.date && currentDate.getMonth() === new Date().getMonth() && currentDate.getFullYear() === new Date().getFullYear() 
                ? 'bg-teal-500 text-white hover:bg-teal-600' 
                : ''}
            `}
          >
            {i + 1}
          </div>
        ))}
      </div>

      <div className="mt-4 text-center">
        <p className="text-xl font-semibold text-gray-800">{dateTime.time}</p>
        <p className="text-gray-600">{dateTime.day}</p>
      </div>
      
    </div>
  )
}

export default Calendar
