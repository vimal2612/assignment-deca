import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import "./App.css";

class Home extends React.Component {
  handleClick = () => {
    this.props.getPost();
  };

  handleClickdel = id => {
    console.log(id);
    this.props.deletePost(id);
    // console.log (this.props);
  };

  handleClickedit = id => {
    console.log(id);
    this.props.editPost(id);
    // console.log (this.props);
  };

  render() {
    const posts = this.props.posts;
    const postArray = posts.length ? (
      posts.map(post => {
        return (
          <div id="card-colour" className="App container" key={post.id}>
            <div className="row">
              <div className="col s12 m12 l12">
                <div className="card blue-grey darken-1">
                  <div className="card-content white-text">
                    <span className="card-title">Title: {post.title}</span>
                    <p>{post.body}</p>
                    <p>{post.id}</p>
                    <button
                      className="btn waves-effect waves-light"
                      onClick={() => {
                        this.handleClickdel(post.id);
                      }}
                    >
                      DELETE POSTS
                    </button>
                    <button
                      className="btn grey"
                      onClick={() => {
                        this.handleClickedit(post.id);
                      }}
                    >
                      EDIT POSTS
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })
    ) : (
      <div className="center">
        <div>No Posts</div>
        <button
          className="btn waves-effect waves-light"
          onClick={this.handleClick}
        >
          GET POSTS
        </button>
      </div>
    );

    return <div className="container">{postArray} </div>;
  }
}

const mapStatetoProps = state => {
  // console.log (state);
  return {
    posts: state.posts
  };
};

const mapdispatchtoProps = dispatch => {
  return {
    getPost: () => {
      return axios
        .get("https://jsonplaceholder.typicode.com/posts")
        .then(res => {
          dispatch({ type: "GET_POST", payload: res.data });
        });
    },
    deletePost: id => {
      console.log(id);
      return axios

        .delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then(res => {
          dispatch({ type: "DELETE_POST", payload: res.data });
        });
    },
    editPost: id => {
      console.log(id);

      dispatch({ type: "EDIT_POST", payload: id });
    }
  };
};

export default connect(
  mapStatetoProps,
  mapdispatchtoProps
)(Home);
