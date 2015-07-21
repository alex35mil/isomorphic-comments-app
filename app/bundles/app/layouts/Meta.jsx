/*
 * ===== Meta
 *
 * pageTitle
 * pageDescription
 * pageKeywords
 * pageType
 * pageUrl
 * pageImage
 * siteName
 * fbAppId
 * appHost
 * cssAsset
 *
 */

export default class Meta {


  constructor(props) {

    const base = {

      pageTitle      : 'Isomorphic Comments',
      pageDescription: 'Comments made isomorphic!',
      pageKeywords   : 'flux react redux rails',
      pageType       : 'website',
      pageImage      : '/images/cover.png',
      siteName       : 'Isomorphic Comments',
      facebookAppId  : props.facebookAppId || null

    };

    const { state, route, params, appHost, fullPath, cssAsset } = props;

    this.cssAsset      = cssAsset;
    this.appHost       = appHost;

    this.pageUrl       = appHost + fullPath;
    this.pageImage     = appHost + base.pageImage;

    this.pageType      = base.pageType;
    this.siteName      = base.siteName;
    this.facebookAppId = base.facebookAppId;

    switch (route) {

      case 'comment':

        const { comments } = state.comments;
        const commentAuthor = comments.find(comment => comment.id === parseInt(params.id, 10)).author;

        this.pageTitle       = `${commentAuthor}'s comment`;
        this.pageDescription = base.pageDescription;
        this.pageKeywords    = base.pageKeywords;
        break;

      case 'login':
        this.pageTitle       = 'Login';
        this.pageDescription = base.pageDescription;
        this.pageKeywords    = base.pageKeywords;
        break;

      case 'not-found':
        this.pageTitle       = `Oops! Nothing here.`;
        this.pageDescription = '404';
        this.pageKeywords    = base.pageKeywords;
        break;

      default:
        this.pageTitle        = base.pageTitle;
        this.pageDescription  = base.pageDescription;
        this.pageKeywords     = base.pageKeywords;

    }

    if (this.pageTitle !== base.pageTitle) {
      this.pageTitle += ` | ${base.pageTitle}`;
    }

  }


  getTitle() {

    return this.pageTitle;

  }


}
