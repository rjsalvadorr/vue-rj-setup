<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      This makes an API call to https://jsonplaceholder.typicode.com/posts and
      displays the results.
    </p>
    <hr />
    <article v-for="post in posts" :key="post.id">
      <h2>{{ post.title }}</h2>
      <p>{{ post.body }}</p>
    </article>
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
      posts: []
    };
  },
  created() {
    FetchHandler.getPosts()
      .then(postData => {
        this.posts = postData;
      })
      .catch(err => console.log(err))
      .finally(() => {
        this.isLoading = false;
      });
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
