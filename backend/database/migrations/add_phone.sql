USE salon_faby;

ALTER TABLE appointments
  ADD COLUMN phone VARCHAR(20) DEFAULT NULL AFTER name;
