import React, { useState, Fragment } from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { addComment } from "../../actions/post";

const CommentForm = ({ postId, addComment }) => {
  const [text, setText] = useState("");

  const onChange = (e) => {
    setText(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addComment(postId, { text });
    setText("");
  };

  return (
    <Fragment>
      <div class="post-form">
        <div class="text-dark p">
          <h3>Leave A Comment</h3>
        </div>
        <form class="form my-1" onSubmit={(e) => onSubmit(e)}>
          <textarea
            name="text"
            cols="2"
            rows="2"
            placeholder="Comment on this post"
            class="form-control"
            value={text}
            onChange={(e) => onChange(e)}
            required
          ></textarea>
          <input type="submit" class="btn btn-dark my-1" value="Submit" />
        </form>
      </div>
      <div class="line"></div>
    </Fragment>
  );
};

CommentForm.propTypes = {
  postId: propTypes.string.isRequired,
  addComment: propTypes.func.isRequired,

};

export default connect(null, { addComment })(CommentForm);
