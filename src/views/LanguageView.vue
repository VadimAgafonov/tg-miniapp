<script setup lang="ts">
import { ref } from 'vue';
import LanguageBtn from "../components/LanguageBtn.vue";

const className = "b-language";
const languageBtns = ref([
	{
		title: 'PHP',
		link: '/language/php'
	},
	{
		title: 'JavaScript',
		link: '/language/javascript'
	},
	{
		title: 'C++',
		link: '/language/cpp'
	},
	{
		title: 'GO',
		link: '/language/go'
	},
	{
		title: 'React',
		link: '/language/react'
	},
	{
		title: 'Vue',
		link: '/language/vue'
	},
	{
		title: 'TypeScript',
		link: '/language/typescript'
	},
])
</script>

<template>
	<div :class="className">
		<div :class="className + '__title'">Выберите язык <br> программирования</div>
		<div :class="className + '__btns'">
			<LanguageBtn
				v-for="(btn, index) in languageBtns"
				:key="index"
				:title="btn.title"
				:link="btn.link"
			/>
		</div>
	</div>
</template>

<style lang="scss">
	$class-name: "b-language";

	.#{$class-name} {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		width: 100%;
		height: 100vh;
		background-image: url('../assets/images/bg.jpg');
		background-position: center;
		background-size: cover;
		background-repeat: no-repeat;

		&__title {
			color: #5E5858;
			font-size: 22px;
			text-align: center;
			font-weight: 500;
			margin-bottom: 40px;
		}

		&__btns {
			display: flex;
			flex-direction: column;
		}
	}
</style>

