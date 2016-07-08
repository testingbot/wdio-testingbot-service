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
        this.testCnt = 0
    }

    getRestUrl (sessionId) {
        return `https://api.testingbot.com/v1/tests/${sessionId}`
    }

    beforeSuite (suite) {
        this.suiteTitle = suite.title
    }

    beforeTest (test) {
        if (!this.tbUser || !this.tbSecret) {
            return
        }

        //global.browser.execute('tb:test-context=' + test.parent + ' - ' + test.title)
    }

    beforeFeature (feature) {
        if (!this.tbUser || !this.tbSecret) {
            return
        }

        //this.suiteTitle = feature.getName()
        //global.browser.execute('tb:test-context=Feature: ' + this.suiteTitle)
    }

    beforeScenario (scenario) {
        if (!this.tbUser || !this.tbSecret) {
            return
        }

        //global.browser.execute('tb:test-context=Scenario: ' + scenario.getName())
    }

    /**
     * update TestingBot info
     */
    after (failures) {
        if (!this.tbUser || !this.tbSecret) {
            return
        }

        return this.updateJob(this.sessionId, failures)
    }

    onRefresh (oldSessionId, newSessionId) {
        if (!this.tbUser || !this.tbSecret) {
            return
        }

        this.sessionId = newSessionId
        return this.updateJob(oldSessionId)
    }

    updateJob (sessionId, failures) {
        return new Promise((resolve, reject) => request.put(this.getRestUrl(sessionId), {
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
        body.test['name'] = this.suiteTitle

        if (typeof failures !== 'number') {
            body.name += ` (${++this.testCnt})`
            failures = 0
        }

        for (let prop of jobDataProperties) {
            if (!this.capabilities[prop]) {
                continue
            }

            body.test[prop] = this.capabilities[prop]
        }

        body.test['success'] = failures === 0 ? "1" : "0"
        return body
    }
}

export default TBService
