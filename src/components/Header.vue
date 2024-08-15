<script setup lang="ts">
const className = "b-header";
</script>

<template>
	<div :class="className">
		<div :class="className + '__title'">Hello, world!</div>
	</div>
</template>

<style lang="scss">
	$class-name: "b-header";

	.#{$class-name} {
		display: flex;
		align-items: center;
		justify-content: center;
		position: fixed;
		background-color: transparent;
		width: 100%;
		height: 80px;
		border-bottom: 2px solid #ca9b2c;

		&__title {
			font-size: 24px;
			color: #fff;
			font-weight: 700;
		}
	}
</style>

