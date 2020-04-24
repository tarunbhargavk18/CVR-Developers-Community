import React from "react";
import propTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import { addLike, removeLike } from "../../actions/post";

const PostItem = ({
  auth,
  post: { _id, text, name, user, likes, comments, date },
  addLike,
  removeLike
}) => {
  return (
    <div className="post card bg-white p-1 my-2">
      <div className="card-header">
        <a href="profile.html">
          <h4>{name}</h4>
        </a>
        {/* <small className="rollNumber text-muted">{rollNumber}</small> */}
      </div>
      <div className="card-body">
        <p className="my-1">{text}</p>
        <p className="post-date text-muted small">
          Posted on <Moment format="DD/MM/YYYY">{date}</Moment>
        </p>
        <button onClick={(e) => addLike(_id)} type="button" className="btn btn-light">
          <i className="far fa-thumbs-up mr-1"></i>
          {likes.length > 0 && <span>{likes.length}</span>}
        </button>
        <button onClick={(e) => removeLike(_id)} type="button" className="ml-1 btn btn-light">
          <i className="far fa-thumbs-down"></i>
        </button>
        <Link to={`/post/${_id}`} className="ml-1 btn btn-primary text-light">
          <i className="far fa-comment-dots mr-1"></i>
          {comments.length > 0 && (
            <span className="comment-count">{comments.length}</span>
          )}
        </Link>
        {/* check if post is of logged in user to enable delete button */}
        {!auth.loading && user === auth.user._id && (
          <button type="button" className="ml-1 btn btn-outline-danger">
            <i className="far fa-trash-alt"></i>
          </button>
        )}
      </div>
    </div>
  );
};

PostItem.propTypes = {
  post: propTypes.object.isRequired,
  auth: propTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {addLike, removeLike})(PostItem);
