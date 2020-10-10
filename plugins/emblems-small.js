
export default ({ store, app }, inject) => {
    inject('emblem', (coinName) => {
        let base = store.state.apiEndPoint
        return base +'/coinImages/' + coinName.toLowerCase() + '.png'
    });
}