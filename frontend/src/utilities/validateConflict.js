export function hasConflict(newAppointment, existingAppointments) {
  const newStartMin = timeToMinutes(newAppointment.time);
  const newEndMin = newStartMin + newAppointment.service_duration;

  return existingAppointments.some((existing) => {
    if (existing.id === newAppointment.id) return false;

    const existStartMin = timeToMinutes(existing.time);
    const existEndMin = existStartMin + existing.service_duration;

    if (apptDate(newAppointment.date) !== apptDate(existing.date)) return false;

    return newStartMin < existEndMin && existStartMin < newEndMin;
  });
}

function timeToMinutes(time) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

function apptDate(date) {
  return date;
}
