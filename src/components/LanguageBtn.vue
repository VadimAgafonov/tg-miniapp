<script setup lang="ts">
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';
const className = "b-language-btn";

const props = defineProps({
	title: {
		type: String,
		required: true
  	},
	link: {
		type: String,
		required: false
 	}
});

const router = useRouter();

const navigateToLink = () => {
	if (props.link) {
		router.push({
			path: props.link,
			query: { title: props.title }
		});
  	}
};
</script>

<template>
	<div :class="className" @click="navigateToLink">
		{{ props.title }}
	</div>
</template>

<style lang="scss">
	$class-name: "b-language-btn";

	.#{$class-name} {
		display: flex;
		align-items: center;
		justify-content: center;
		border: 2px solid #5E5858;
		margin-bottom: 14px;
		color: #5E5858;
		font-size: 20px;
		width: 135px;
		height: 45px;
		cursor: pointer;
		transition: all 0.2s linear;

		&:hover {
			background-color: #5E5858;
			color: #fff;
		}

		&:last-child {
			margin-bottom: 0;
		}
	}
</style>

