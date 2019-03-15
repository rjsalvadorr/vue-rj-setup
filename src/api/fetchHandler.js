import axios from "axios";

class FetchHandler {
  static getImage(queryParam = "thingy", reqTimestamp) {
    return this.get("https://imagesearch.dev.tophat.com/", {
      query: queryParam,
      timestamp: reqTimestamp
    }).then(imgData => {
      return imgData;
    });
  }
  static get(endpoint, parameters) {
    return axios.get(endpoint, { params: parameters });
  }
}

export default FetchHandler;
