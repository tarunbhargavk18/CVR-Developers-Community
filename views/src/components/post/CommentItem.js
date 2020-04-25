import React from "react";
import { Link } from "react-router-dom";
import propTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { deleteComment } from "../../actions/post";

const CommentItem = ({
  postId,
  comment: { _id, text, name, user, date },
  auth,
  deleteComment,
}) => {
  return (
    <div class="comment bg-light p-2 my-4">
      <div>
        <Link to={`/profile/${user}`}>
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p class="my-2">{text}</p>
        <p class="post-date text-muted small">
          Posted on <Moment format="DD/MM/YYYY">{date}</Moment>
        </p>
      </div>
      {!auth.loading && user === auth.user._id && (
        <button
          onClick={(e) => deleteComment(postId, _id)}
          type="button"
          class="btn btn-light"
        >
          <i class="far fa-trash-alt text-dark"></i>
        </button>
      )}
    </div>
  );
};

CommentItem.propTypes = {
  postId: propTypes.string.isRequired,
  comment: propTypes.object.isRequired,
  auth: propTypes.object.isRequired,
  deleteComment: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
