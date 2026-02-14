/**
 * User Story 3: Using Built-in Middleware for Body Parsing
 * Enables processing of JSON and form submissions via req.body.
 */
import express from "express";

export const jsonParser = express.json();
export const urlencodedParser = express.urlencoded({ extended: true });
