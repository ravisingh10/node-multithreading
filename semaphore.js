

class Semaphore {
    constructor(maxCount) {
        if(isNaN(Number(maxCount)) && !Number(maxCount))
            throw new Error('Invalid maximum count, it should be a number greater than 0');
        this.maxCount = maxCount;
        this.jobQueue = [];
        this.currentCount = 0;
    }

    take(method) {
        this.jobQueue.push(method);
        this.triggerJobs();
    }

    triggerJobs() {
        if(this.jobQueue.length > 0)
            if(this.currentCount < this.maxCount){
                let nextJob = this.jobQueue.shift();
                this.currentCount++;           
                nextJob();
            }
    }

    leave() {
        this.currentCount--;
        this.triggerJobs();
    }
    
}


module.exports = function getSemaphore(count) {
    const semaphore = new Semaphore(count);
    return {
        take(method) {
            semaphore.take(method);
        }, 
        leave() {
            semaphore.leave();
        }
    }
}