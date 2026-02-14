/**
 * User Story 4: Logging Middleware Using morgan
 * Provides clean, formatted logs with status code and response time.
 */
import morgan from "morgan";

// Development mode: formats include :status and :response-time ms
export const morganLogger = morgan("dev");
