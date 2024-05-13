/**
 * desc: logger for every request
 * @param { * } req
 * @param { * } res
 * @param { * } next
 */
export const incomingRequestLog = (req, res, next) => {
    console.log(
        `request url: ${req.url}`,
        `request method: ${req.method}`,
        `request timestamp: ${Date.now()}`
    )
    next();
  }