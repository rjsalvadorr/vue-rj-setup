import axios from "axios";

class FetchHandler {
  static getPosts() {
    return this.get("https://jsonplaceholder.typicode.com/posts", {})
      .then(postData => {
        return postData.data;
      })
      .catch(err => {
        throw Error(err.message);
      });
  }
  static get(endpoint, parameters) {
    return axios.get(endpoint, { params: parameters });
  }
}

export default FetchHandler;
