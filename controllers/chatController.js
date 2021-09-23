const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));
const mongoose = require('mongoose');
const messageSchema = require('../models/messageModel.js');
const chatController = {};

chatController.getMessages = async (req, res, next) => {
  try {
    if (req.params.room === 'codesmith') {
      const response = await fetch(
        `https://curriculum-api.codesmith.io/messages`
      );
      res.locals.messages = await response.json();
      next();
    } else {
      const Message = mongoose.model(req.params.room, messageSchema);
      const response = await Message.find({});
      response.reverse();
      res.locals.messages = response;
      next();
    }
  } catch (err) {
    return next({
      log: `chatController.getMessages ERROR: ${err}`,
      message: { err: 'An error occurred' },
    });
  }
};

chatController.postMessage = async (req, res, next) => {
  console.log(req.body);
  if (!req.body || !req.body.message || !req.body.created_by) {
    return next({
      log: `chatController.postMessage ERROR: Malformed request body.`,
      message: { err: 'An error occurred' },
    });
  }
  try {
    if (req.params.room === 'codesmith') {
      const response = await fetch(
        `https://curriculum-api.codesmith.io/messages`,
        {
          method: 'POST',
          body: JSON.stringify(req.body),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      res.locals.message = await response.json();
      next();
    } else {
      const Message = mongoose.model(req.params.room, messageSchema);
      const messageData = { ...req.body, created_at: String(new Date()) };
      const newMessage = await Message.create(messageData);
      res.locals.message = [messageData];
      next();
    }
  } catch (err) {
    return next({
      log: `chatController.postMessage ERROR: ${err}`,
      message: { err: 'An error occurred' },
    });
  }
};

module.exports = chatController;
