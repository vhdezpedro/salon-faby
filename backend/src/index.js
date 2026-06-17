import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import servicesRoutes from "./routes/services.js";
import appointmentsRoutes from "./routes/appointments.js";
// import { startReminderScheduler } from "./services/reminderService.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use("/api/services", servicesRoutes);
app.use("/api/appointments", appointmentsRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  // startReminderScheduler();
});
