/* eslint-disable */
<template>
  <div class="home">
    <h1 class="subheading grey--text">Home</h1>
    <v-container>
      <v-layout row wrap>
        

      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      team: [
        { name: 'Iyad', role: 'Web Developer', avatar: '/img1.png' },
        { name: 'Reda', role: 'Graphic Designer', avatar: '/img2.png' },
        { name: 'Zineb', role: 'Web Developer', avatar: '/img3.png' },
        { name: 'Hu TechGroup', role: 'Desktop Developer', avatar: '/img4.png' }
      ]
    };
  }
};
</script>