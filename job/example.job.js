const JobAbstract = require('./job.abstract');

class ExampleJob extends JobAbstract {

    async perform(objects) {
        console.log('The obejcts recieved', objects);
        await this.job()
        console.log('***Example Job Completed***')
    }

    async job() {
        return new Promise((res, rej) => {
            const timer = setInterval(() => {
                clearInterval(timer);
                res();
            }, 1000);
        })
    }

}

module.exports = new ExampleJob();