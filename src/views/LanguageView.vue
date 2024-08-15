<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router'
import LanguageBtn from "@/components/LanguageBtn.vue";
const router = useRouter();

interface LanguageBtns {
	title: string;
	link: string;
	dev?: boolean;
}

const className = "b-language";
const languageBtns = ref<LanguageBtns[]>([
	{
		title: 'PHP',
		link: '/language/php',
	},
	{
		title: 'JavaScript',
		link: '/language/javascript'
	},
	{
		title: 'C++',
		link: '/language/cpp',
		dev: true
	},
	{
		title: 'GO',
		link: '/language/go',
		dev: true
	},
	{
		title: 'React',
		link: '/language/react',
		dev: true
	},
	{
		title: 'Vue',
		link: '/language/vue',
		dev: true
	},
	{
		title: 'TypeScript',
		link: '/language/typescript',
		dev: true
	}
])

const backMenu = () => {
	router.go(-1);
}

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
				:class="btn.dev ? className + '__btn' : '' "
			/>
		</div>
		<div :class="className + '__btn-back'" @click="backMenu">
			Назад
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

		&__title {
			color: #fff;
			font-size: 22px;
			text-align: center;
			font-weight: 500;
			margin-bottom: 40px;
		}

		&__btns {
			display: flex;
			flex-direction: column;
		}

		&__btn-back {
			margin-top: 60px;
			display: flex;
			align-items: center;
			justify-content: center;
			border: 2px solid #ca9b2c;
			color: #fff;
			font-size: 20px;
			width: 135px;
			height: 45px;
			cursor: pointer;
			transition: all 0.2s linear;

			&:hover {
				background-color: #ca9b2c;
			}
		}

		&__btn {
			cursor: none;
			pointer-events: none;
			opacity: 0.5;
		}
	}
</style>

