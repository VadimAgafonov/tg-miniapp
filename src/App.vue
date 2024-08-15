<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from './components/Header.vue'
import '../src/assets/fonts/fonts.scss'
</script>

<template>
	<div>
		<Header />
		<router-view />
	</div>
</template>

<style scoped></style>
