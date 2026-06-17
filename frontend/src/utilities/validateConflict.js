export function hasConflict(newAppointment, existingAppointments) {
  const newStart = parseDateTime(newAppointment.date, newAppointment.time);
  const newEnd = new Date(newStart.getTime() + newAppointment.service.duration * 60000);

  return existingAppointments.some((existing) => {
    if (existing.id === newAppointment.id) return false;

    const existStart = parseDateTime(existing.date, existing.time);
    const existEnd = new Date(existStart.getTime() + existing.service.duration * 60000);

    const sameDay =
      newStart.getFullYear() === existStart.getFullYear() &&
      newStart.getMonth() === existStart.getMonth() &&
      newStart.getDate() === existStart.getDate();

    if (!sameDay) return false;

    return newStart < existEnd && existStart < newEnd;
  });
}

function parseDateTime(date, time) {
  return new Date(`${date}T${time}`);
}
