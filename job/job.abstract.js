
class JobAbstract {
    async perform(options) {
        throw new Error('[Job Abstract] Need To Override')
    }
}

module.exports = JobAbstract;