<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <input type="text" id="searchString" name="searchString" v-model="searchString" v-on:input="searchChange" />
    <p>
      This makes an API call to https://jsonplaceholder.typicode.com/posts and
      displays the results.
    </p>
    <hr />
    <img v-bind:src="image_url"/>
  </div>
</template>

<script>
import FetchHandler from "../api/fetchHandler";

export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  data() {
    return {
      isLoading: true,
      image_url: '',
      searchString: 'init',
      mostRecentRequestTime: 0,
    };
  },
  created() {
    FetchHandler.getImage()
      .then(imgData => {
        this.image_url = imgData.data.image_url;
      })
      .catch(err => console.log(err))
      .finally(() => {
        this.isLoading = false;
      });
  },
  methods: {
    searchChange: function(param) {
      this.mostRecentRequestTime = Date.now();
      this.doSearch(this.searchString, this.mostRecentRequestTime);
    },
    doSearch: function(searchString, requestTimestamp) {
      FetchHandler.getImage(searchString, requestTimestamp)
      .then(imgData => {
        const timestampIdx = imgData.request.responseURL.search(/timestamp=\d+/);
        const timestamp = imgData.request.responseURL.slice(timestampIdx + 10);

        if(timestamp >= this.mostRecentRequestTime) {
          this.image_url = imgData.data.image_url;
        }
      })
      .catch(err => {
        console.log(JSON.stringify(err, null, 2));
        this.doSearch(searchString, requestTimestamp);
      });
    },
    testy: function(param) {
      console.log('yep!');
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
