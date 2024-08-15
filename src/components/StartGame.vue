<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { Alert } from 'vue-tg'
// console.log(Alert);
const router = useRouter()
const className = 'b-start'

const isOverlayVisible = ref(false)

const toggleOverlay = () => {
	isOverlayVisible.value = !isOverlayVisible.value
}

const navigateToAnotherView = () => {
	router.push({ name: 'Language' })
}
</script>

<template>
	<div :class="className">
		<div :class="className + '__btns'">
			<div :class="className + '__btn start'" @click="navigateToAnotherView">Начать</div>
			<div :class="className + '__btn rule'" @click="toggleOverlay">Правила</div>
		</div>
		<div :class="[className + '__overlay', { show: isOverlayVisible }]">
			<div :class="className + '__rule-wrapper'">
				<div :class="className + '__close'" @click="toggleOverlay"></div>
				<Alert message="Hello!" />
				В этой мини-игре вас ждут вопросы, которые проверят ваши знания о самых популярных языках
				программирования, их особенностях и ключевых терминах. <br />
				Удачи!
			</div>
		</div>
	</div>
</template>

<style lang="scss">
$class-name: 'b-start';

.#{$class-name} {
	display: flex;
	flex-direction: column;
	padding: 0 13px;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100vh;

	&__desc {
		padding: 10px 13px;
		border: 2px solid #ca9b2c;
		color: #fff;
	}

	&__btns {
		display: flex;
		flex-direction: column;
		gap: 20px;
		margin-top: 90px;
	}

	&__btn {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		padding: 10px 30px;
		border: 2px solid #ca9b2c;
		color: #fff;
		font-size: 20px;
		transition: all 0.2s linear;

		&:hover {
			background-color: #ca9b2c;
		}

		&.start {
			&::after {
				content: '';
				width: 15px;
				height: 15px;
				mask-image: url('../assets/images/start.png');
				mask-position: center;
				mask-size: cover;
				position: absolute;
				background-color: #fff;
				top: 5px;
				right: 5px;
			}
		}

		&.rule {
			&::after {
				content: '';
				width: 13px;
				height: 13px;
				mask-image: url('../assets/images/rules.png');
				mask-position: center;
				mask-size: cover;
				background-color: #fff;
				position: absolute;
				top: 5px;
				right: 5px;
			}
		}
	}

	&__overlay {
		position: fixed;
		display: flex;
		align-items: center;
		z-index: 1000;
		width: 100vw;
		height: 100vh;
		background-color: rgba($color: #000000, $alpha: 0.8);
		backdrop-filter: blur(4px);
		transform: translateX(-100vw);
		transition: all 0.3s linear;
	}

	&__rule-wrapper {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 20px;
		background-color: #fff;
		border-radius: 20px;
		width: 80%;
		height: 60%;
		margin: 0 auto;
	}

	&__close {
		position: absolute;
		top: 10px;
		right: 10px;
		width: 40px;
		height: 40px;
		background-image: url('../assets/images/close.png');
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		cursor: pointer;
	}

	.show {
		transform: translateX(0);
	}
}
</style>
