import testingbotTunnel from 'testingbot-tunnel-launcher'

class TBLaunchService {
    /**
     * modify config and launch tb tunnel
     */
    onPrepare (config) {
        if (!config.tbTunnel) {
            return
        }

        config.host = 'localhost'
        config.port = 4445

        this.tbTunnelOpts = Object.assign({
            apiKey: config.user,
            apiSecret: config.key
        }, config.tbTunnelOpts)

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

        return new Promise((r) => this.tunnel.close(r))
    }
}

export default TBLaunchService
