export default {

  init(analyticsId) {
    this._injectAnalytics(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
    ga('create', analyticsId, 'auto');
    ga('require', 'displayfeatures');
  },

  sendPageview(path) {
    if (typeof ga !== 'undefined') {
      ga('set', 'page', path);
      ga('send', 'pageview');
    }
  },

  sendEvent(e) {
    if (typeof ga !== 'undefined' && e && e.category && e.action) {
      ga('send', 'event', e.category, e.action);
    }
  },


  /* eslint-disable */

  _injectAnalytics(i,s,o,g,r,a,m){
    i['GoogleAnalyticsObject']=r;
    i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();
    a=s.createElement(o),m=s.getElementsByTagName(o)[0];
    a.async=1;a.src=g;m.parentNode.insertBefore(a,m);
  }

  /* eslint-enable */

}
