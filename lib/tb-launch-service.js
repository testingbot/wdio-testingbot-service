import testingbotTunnel from 'testingbot-tunnel-launcher'

class TBLaunchService {
    /**
     * modify config and launch tb tunnel
     */
    onPrepare (config) {
        if (!config.tbTunnel) {
            return
        }

        this.tbTunnelOpts = Object.assign({
            apiKey: config.user,
            apiSecret: config.key
        }, config.tbTunnelOpts)

        config.protocol = 'http'
        config.host = 'localhost'
        config.port = 4445

        return new Promise((resolve, reject) => testingbotTunnel(this.tbTunnelOpts, (err, tunnel) => {
            if (err) {
                return reject(err)
            }

            this.tunnel = tunnel
            resolve()
        }))
    }

    /**
     * shut down the tunnel
     */
    onComplete () {
        if (!this.tunnel) {
            return
        }

        return new Promise((resolve, reject) => this.tunnel.close(resolve))
    }
}

export default TBLaunchService
