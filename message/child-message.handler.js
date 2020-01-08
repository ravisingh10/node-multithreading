const MessageTypes = require('./messages.types');
const JobManager = require('./../job/job.manager');

class ChildMessageHandler {

    async handle(message) {
        if (message.Type == MessageTypes.Activation) {
            console.log('11111 ', message.Message)
            let response = await JobManager.doJob(message.Message.JobName, message.Message.Options);
            process.send(this.getMessage(MessageTypes.Success, response));
            process.exit();
        }
        else if (message.Type == MessageTypes.Exit)
            process.exit();
    }

    getMessage(type, message) {
        return {
            Type: type,
            Message: message
        }
    }
}

module.exports = new ChildMessageHandler();