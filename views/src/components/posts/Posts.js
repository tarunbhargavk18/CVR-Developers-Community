import React, { Fragment, useEffect } from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { getPosts } from "../../actions/post";
import PostItem from "./PostItem";
import LoadingSpinner from "../layout/LoadingSpinner";

const Posts = ({getPosts, post: {posts, loading} }) => {
    useEffect(()=> {
        getPosts();
    },[getPosts])

    return loading ? <LoadingSpinner/> : (
        <div className="posts container">
            {posts.map((post)=> (
                <PostItem key = {post._id} post = {post} />
            ))}
        </div>
    );
};

Posts.propTypes = {
    getPosts: propTypes.func.isRequired,
    post: propTypes.object.isRequired,
};

const mapStateToProps = state => ({
    post: state.post
})

export default connect(mapStateToProps,{getPosts})(Posts);
