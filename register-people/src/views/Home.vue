<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <Table context="Pessoas" />  
    <Button :onClick="handleClick" label="Click me" :disabled="block" classType="primary"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Table from "@/components/Table.vue";
import Button from "@/components/Button.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
    Table,
    Button
  },
  methods: {
    handleClick() {
      alert("Works!");
    }
  },
  data() {
    return {
      block: false
    };
  }
};
</script>
