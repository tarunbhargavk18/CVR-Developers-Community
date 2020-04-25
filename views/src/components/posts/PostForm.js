import React, { useState } from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../../actions/post";

const PostForm = ({ addPost }) => {
  const [text, setText] = useState("");

  const onChange = (e) => {
    setText(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    addPost({ text });

    // To set the form back to empty
    setText("");
  };

  return (
    <div class="post-form">
      <div class="p">
        <h3>Say Something...</h3>
      </div>
      <form class="form my-1" onSubmit={(e) => onSubmit(e)}>
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Create a post"
          class="form-control"
          value={text}
          onChange={(e) => onChange(e)}
          required
        ></textarea>
        <input
          type="submit"
          class="btn btn-outline-dark my-1 form-control"
          value="Submit"
        />
      </form>
    </div>
  );
};

PostForm.propTypes = {
  addPost: propTypes.func.isRequired,
};

export default connect(null, { addPost })(PostForm);
