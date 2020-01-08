const ChildMessageHandler = require('./message/child-message.handler');
const MessageTypes = require('./message/messages.types');

process.on('message', (msg) => {
  ChildMessageHandler.handle(msg);
});

process.on('uncaughtException', (err) => {
  process.send(ChildMessageHandler.getMessage(MessageTypes.Exception, err));
  process.exit();
})


process.on('exit', () => {
  console.log('Exiting');
})
