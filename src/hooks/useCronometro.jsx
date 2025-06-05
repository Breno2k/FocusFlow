import { CronometroContext } from "../context/CronometroContext";
import { useContext } from "react";

export const useCronometro = () => useContext(CronometroContext);