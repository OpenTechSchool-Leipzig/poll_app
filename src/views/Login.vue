<template>
  <div class="wrapper">
    <Card title="'login to continue...'">
      <template #body>
        <div>
          <h3>test</h3>
          <InputUnit v-model="test" :name="'first Input'" type="'text'" />
        </div>
      </template>
      <template #footer>
        <button>test</button>
      </template>
    </Card>
  </div>
</template>

<script>
//import { auth } from '../store/firebase';
import Card from '../components/basic/Card.vue';
import InputUnit from '../components/basic/InputUnit.vue';

export default {
  components: {
    Card,
    InputUnit,
  },
};
</script>
