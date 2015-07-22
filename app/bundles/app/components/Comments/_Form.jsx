import React              from 'react';
import { PropTypes }      from 'react';

import animate            from 'app/libs/animate';
import analytics          from 'app/libs/analytics';
import Loader             from 'app/libs/components/Loader/Loader';

import * as actionTypes   from '../../constants/CommentsConstants';


export default class Form extends React.Component {


  constructor(props, context) {

    super(props, context);

    this.state = {
      author      : null,
      authorState : null,
      comment     : null,
      commentState: null
    };

  }


  componentWillReceiveProps(newProps) {

    if (newProps.comments.type === actionTypes.COMMENT_ADD_SUCCEED) {
      this.setState({
        comment     : null,
        commentState: null
      });
    }

  }


  _handleValueChange(e) {

    const { name, value } = e.target;

    this.setState({
      [name]: value.trim()
    }, this._validateForm.bind(this, null, name));

  }


  _validateForm(e, attr) {

    const rules = {
      author: {
        required: true
      },
      comment: {
        required: true
      }
    };

    const isFail = 'error';
    const isOk   = 'ok';

    const isSubmit = e ? e.target.nodeName === 'FORM' : false;

    this._formIsValid    = true;
    this._focusedOnError = false;
    this._wasSubmitted   = false;

    if (isSubmit && !this._wasSubmitted) this._wasSubmitted = true;

    let attributes = [];

    if (isSubmit) {
      e.preventDefault();
      for (let attribute in rules) {
        if (rules.hasOwnProperty(attribute)) {
          attributes.push({
            key  : attribute,
            rules: rules[attribute]
          });
        }
      }
    } else {
      attributes.push({
        key  : attr,
        rules: rules[attr]
      });
    }

    attributes.forEach((attribute, index) => {

      const attrValue = this.state[attribute.key] ? this.state[attribute.key].trim() : this.state[attribute.key];
      const attrRules = attribute.rules;

      if (attrRules.required && !attrValue) {
        this._setFormState(attribute.key, isFail);
        return;
      }

      this._setFormState(attribute.key, isOk);

      if (isSubmit && this._formIsValid && index === attributes.length - 1) {
        this._handleSuccessSubmit();
      }

    });

    if (isSubmit && !this._formIsValid) {
      this._handleFailedSubmit();
    }

  }


  _setFormState(attr, status) {

    const isFail = status === 'error';

    this.setState({ [attr + 'Status']: status });

    if (isFail) {
      this._formIsValid = false;
      if (!this._focusedOnError) {
        React.findDOMNode(this.refs[attr]).focus();
        this._focusedOnError = true;
      }
    }

  }


  _handleSuccessSubmit() {

    const { author, comment } = this.state;
    const { commentsActions } = this.props;

    const data = {
      'comment': { author, comment }
    };

    commentsActions.addComment({ data });

    analytics.sendEvent({
      category: 'Comment',
      action  : 'Added'
    });

  }


  _handleFailedSubmit() {

    animate('comments__form', 'shake');

  }


  render() {

    const { isPosting } = this.props.comments;

    return (
      <form id="comments__form" onSubmit={::this._validateForm}>
        <input
            ref="author"
            name="author"
            type="text"
            placeholder="Who are you"
            value={this.state.author}
            className={this.state.authorStatus}
            onChange={::this._handleValueChange}
            autoFocus
        />
        <input
            ref="comment"
            name="comment"
            type="text"
            placeholder="Say smth"
            value={this.state.comment}
            className={this.state.commentStatus}
            onChange={::this._handleValueChange}
        />
        <div className="button-wrapper">
          <button disabled={isPosting}>Say!</button>
          { isPosting && <Loader color="#fff" /> }
        </div>
      </form>
    );

  }

}
