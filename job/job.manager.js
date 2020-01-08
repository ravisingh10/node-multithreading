const exampleJob = require('./example.job');

class JobManager {
    constructor() {
        this.jobsMap = {'Example': exampleJob}
    }

    async doJob(jobName, options) {
        try {
            console.log('Job Map', this.jobsMap, 'JobName', jobName);
            let jobResponse = await (this.jobsMap[jobName].perform(options));
            return jobResponse;    
        } catch(error) {
            return error
        }
    }
}

module.exports = new JobManager();