const { fork } = require('child_process');
const semaphore = require('./semaphore')(2);

const ParentMessageHandler = require('./message/parent-message.handler');
const MessageType = require('./message/messages.types')

const addJob = (jobName, options) => {
  const doFork = () => {
    const forked = fork('child.js');
    const kill = () => {
      forked.kill();
    }

    forked.on('message', (msg) => {
      ParentMessageHandler.handle(msg, kill)
    })

    forked.on('exit', () => {
      semaphore.leave();
    })

    forked.send(ParentMessageHandler.getMessage(MessageType.Activation, { JobName: jobName, Options: options }), (error) => {
      if(error){
        forked.kill("SIGALRM");
        semaphore.leave();
      }
    });  
  }
  semaphore.take(doFork);   
}
// addJob('Example', {key: 'value'})

module.exports = addJob;