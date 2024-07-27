<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import Header from './components/Header.vue';
import '../src/assets/fonts/fonts.scss';
</script>

<template>
	<Header />
	<router-view />
</template>

<style scoped></style>
