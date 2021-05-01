import Vue from 'vue'
import { VuePlausible } from 'vue-plausible'

Vue.use(VuePlausible, {
	domain: 'lsn.dat.cloud',
	trackLocalhost: false,
})

Vue.$plausible.enableAutoPageviews() // optional
