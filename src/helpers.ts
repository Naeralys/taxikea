/**
 * READ MY THOUGHTS FOR THIS FILE:
 * 
 * This file contains some helpers functions which I've used for the past
 * 5 years when working in any express project. I am including a lot here as
 * this demonstrates how I think about making a project as easily maintainable
 * as possible by also keeping it scalable.
 */

import { validationResult } from "express-validator";

/**
 * Helper function for applying controller endpoints from
 * different features. Makes the controller file very readable.
 * @param routes array of endpoints/routes
 * @param router express router
 */
export const applyRoutes = (routes, router) => {
  routes.forEach(route => {
    const { method, path, handler } = route;
    (router)[method](path, handler)
  })
}

/**
 * Enables async on express supported endpoints. Why this is
 * not in express by default is a mystery.
 */
export const handleAsync = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next)

/**
 * Handles api validation errors. Will first log out
 * error and then send back a formatted error to the client.
 */

export const sendValidationErrors = (req, res, next) => {
  const errors = validationResult(req)

  if(errors.isEmpty()) {
    next()
    return
  }

  res.status(400).json({ errors: errors.array() })
}

/**
 * Error handler middleware. Works well with the custom RequestError object
 */
export const handleError = (error, req, res, next) => {
  console.error("Api error: ", error)

  if (res.headersSent) return next(error)

  // Use our custom requesterror object
  if (error instanceof RequestError) {
    res.status(error.status).json({ 
      name: error.name,
      error: error.message
    })
    return
  }

  res.status(500).json({ error: 'Internal server error' })
}

/**
 * Request error object for api error. Express should really provide something similar
 * as a default in the future #prayforExpress5.
 * 
 * Creating a custom error will give us better control in the error handler function.
 */
export class RequestError extends Error {
  name: string
  message: string
  status: number

  constructor (
    { name = 'INTERNAL_SEVER_ERROR', message = 'Internal server error', status = 500 }: 
    { name: string, message: string, status: number }) {
    super()
    this.name = name
    this.message = message
    this.status = status
  }
}

/**
 * Logs a request to the console. Very useful to see which endpoints
 * has been accessed and could easily be extended with more data such
 * as requestId, userId etc.
 */
export const apiLogger = (req, res, next) => {
  const method = req.method
  const url = req.originalUrl

  const message = {
    timestamp: new Date().toISOString(),
    method,
    url
  }

  console.log(JSON.stringify(message))

  next()
}