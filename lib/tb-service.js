import request from 'request'

const jobDataProperties = ['name', 'tags', 'public', 'build', 'extra']

class TBService {
    /**
     * gather information about runner
     */
    before (capabilities) {
        this.sessionId = global.browser.sessionId
        this.capabilities = capabilities
        this.auth = global.browser.requestHandler.auth || {}
        this.tbUser = this.auth.user
        this.tbSecret = this.auth.pass
        this.APIUri = `https://api.testingbot.com/v1/tests/${this.sessionId}`
    }

    beforeSuite (suite) {
        this.suiteTitle = suite.title
    }

    beforeTest (test) {
        if (!this.tbUser || !this.tbSecret) {
            return
        }

        global.browser.execute('tb:context=' + test.parent + ' - ' + test.title)
    }

    beforeFeature (feature) {
        if (!this.tbUser || !this.tbSecret) {
            return
        }

        this.suiteTitle = feature.getName()
        global.browser.execute('tb:context=Feature: ' + this.suiteTitle)
    }

    beforeScenario (scenario) {
        if (!this.tbUser || !this.tbSecret) {
            return
        }

        global.browser.execute('tb:context=Scenario: ' + scenario.getName())
    }

    /**
     * update TestingBot info
     */
    after (failures) {
        if (!this.tbUser || !this.tbSecret) {
            return
        }

        return new Promise((resolve, reject) => request.put(this.APIUri, {
            json: true,
            auth: {
                user: this.tbUser,
                pass: this.tbSecret
            },
            body: this.getBody(failures)
        }, (e, res, body) => {
            if (e) {
                return reject(e)
            }
            global.browser.jobData = body
            resolve(body)
        }))
    }

    /**
     * massage data
     */
    getBody (failures) {
        let body = { test: {} }

        /**
         * set default values
         */
        body.test[name] = this.suiteTitle

        for (let prop of jobDataProperties) {
            if (!this.capabilities[prop]) {
                continue
            }

            body.test[prop] = this.capabilities[prop]
        }

        body.test[success] = failures === 0
        return body
    }
}

export default TBService
