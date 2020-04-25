import React, { Fragment, useEffect } from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";
import LoadingSpinner from "../layout/LoadingSpinner";
import { getPost } from "../../actions/post";
import PostItem from "../posts/PostItem";
import { Link } from "react-router-dom";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem"

const Post = ({ getPost, post: { post, loading }, match }) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost]);

  return loading || post === null ? (
    <LoadingSpinner />
  ) : (
    <Fragment>
      <section className="post container mb-4 mt-5">
        <div className="mx-5">
          <Link to="/feed" class="btn btn-sm btn-dark">
            Back To Feed
          </Link>
          <PostItem post={post} showActions={false} />
          <CommentForm postId = {post._id} />
          <div className="comments">
              {post.comments.map((comment) =>(
                  <CommentItem key={comment._id} comment={comment} postId = {post._id} />
              ))}
          </div>
        </div>
      </section>
    </Fragment>
  );
};

Post.propTypes = {
  getPost: propTypes.func.isRequired,
  post: propTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPost })(Post);
