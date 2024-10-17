// config/exceptionHandlers/handler.js

// 404 Error Handler
export function LostErrorHandler(req, res, next) {
    res.status(404).json({
      error: "Resource not found",
    });
  }
  
  // Exception Handler
  export function AppErrorHandler(err, req, res, next) {
    res.status(err.status || 500);
  
    if (err.authorizationError === true) {
      res.set(err.authHeaders);
    }
  
    const error = err?.cause || err?.message;
    const providedFeedback = err?.feedback;
  
    res.json({ error, ...(providedFeedback && { feedback: providedFeedback }) });
  }
  