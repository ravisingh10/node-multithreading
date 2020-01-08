const MessageTypes = require('./messages.types')
class ParentMessageHandler {
    async handle(message, killMethod) {
        if(message.Type == MessageTypes.Exit)
            killMethod();
    }

    getMessage(type, message) {
        return {
            Type: type,
            Message: message
        }
    }
}

module.exports = new ParentMessageHandler();