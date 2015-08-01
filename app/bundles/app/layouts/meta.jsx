/*
 * ===== Meta
 *
 * title
 * description
 * keywords
 * type
 * url
 * image
 * siteName
 * facebookAppId
 * appHost
 * cssAsset
 *
 */

export default (props) => {

  let meta = {};

  const { state, route, params, appHost, fullPath, cssAsset, facebookAppId } = props;

  const base = {

    title        : 'Isomorphic Comments',
    description  : 'Comments made isomorphic!',
    keywords     : 'flux react redux rails',
    type         : 'website',
    image        : '/images/cover.png',
    siteName     : 'Isomorphic Comments',
    facebookAppId: facebookAppId || null

  };

  meta.cssAsset      = cssAsset;
  meta.appHost       = appHost;

  meta.url           = appHost + fullPath;
  meta.image         = appHost + base.pageImage;

  meta.type          = base.pageType;
  meta.siteName      = base.siteName;
  meta.facebookAppId = base.facebookAppId;


  switch (route) {

    case 'comment':

      const { comments } = state.comments;
      const commentAuthor = comments.find(comment => comment.id === parseInt(params.id, 10)).author;

      meta.title       = `${commentAuthor}'s comment`;
      meta.description = base.description;
      meta.keywords    = base.keywords;
      break;


    case 'login':
      meta.title       = 'Login';
      meta.description = base.description;
      meta.keywords    = base.keywords;
      break;


    case 'not-found':
      meta.title       = `Oops! Nothing here.`;
      meta.description = '404';
      meta.keywords    = base.keywords;
      break;


    default:
      meta.title        = base.title;
      meta.description  = base.description;
      meta.keywords     = base.keywords;

  }

  if (meta.title !== base.title) {
    meta.title += ` | ${base.title}`;
  }

  return meta;

}
