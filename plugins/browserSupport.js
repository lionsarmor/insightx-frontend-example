
import { detect } from 'detect-browser'
import MobileDetect from 'mobile-detect'

export default ({ store }, inject) => {
    inject('browserDetect', function() {
        let md = new MobileDetect(window.navigator.userAgent);
        let browser = detect().name
        store.commit('updateBrowser', browser);
        return browser
    }) 
}
