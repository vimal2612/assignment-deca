// import { GET_POST} from "../actions/action";

const initstate = {
  posts: []
};

const rootReducer = (state = initstate, action) => {
  if (action.type === "GET_POST") {
    return { ...state, posts: action.payload };
  } else if (action.type === "DELETE_POST") {
    console.log(action.type);
    return { ...state, posts: action.payload };
  } else if (action.type === "EDIT_POST") {
    let newPosts = state.posts.filter(post => {
      return action.payload === post.id;
    });
    return { ...state, posts: newPosts };
  } else {
    return initstate;
  }
};

export default rootReducer;
