import React from 'react';
import ScheduleForm from '../components/ScheduleForm';

const SchedulesPage = ({ token }) => {
  return (
    <div>
      <h1>Schedules</h1>
      <ScheduleForm token={token} />
    </div>
  );
};

export default SchedulesPage;