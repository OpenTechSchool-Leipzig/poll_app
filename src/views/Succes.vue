<template>
  <div class="container">
    <div class="msg-box"></div>
  </div>
</template>

<script>
export default {
  // idea: use the $router object to get previous routes data
  // => only when the previous route was a poll show the success message with this polls data.
  //else: show an error message.
  /////
  // Now, how do I get the previous route data?
  //I guess I'll need to use the route guard here to make sure that this route only get's it's info programmatically?
  // easier solution: add id to success url in the Answer Poll view and redirect requests that weren't made from the poll route
};
</script>
