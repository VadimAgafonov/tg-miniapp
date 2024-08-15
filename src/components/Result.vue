<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
const className = 'b-result'

const backHome = () => {
	router.replace('/')
}

import { ref, reactive, onMounted, onUnmounted } from 'vue'

const score = route.query.score
	? Array.isArray(route.query.score)
		? route.query.score[0] !== null
			? parseInt(route.query.score[0], 10)
			: 0
		: route.query.score !== null
			? parseInt(route.query.score, 10)
			: 0
	: 0

class Firework {
	x: number
	y: number
	sx: number
	sy: number
	size: number
	shouldExplode: boolean
	r: number
	g: number
	b: number

	constructor() {
		this.x = Math.random() * canvasWidth.value
		this.y = canvasHeight.value
		this.sx = Math.random() * 3 - 1.5
		this.sy = Math.random() * -3 - 3
		this.size = Math.random() * 2 + 1
		this.shouldExplode = false

		const colorVal = Math.round(0xffffff * Math.random())
		const r = colorVal >> 16
		const g = (colorVal >> 8) & 255
		const b = colorVal & 255
		this.r = r
		this.g = g
		this.b = b
	}

	update() {
		if (this.sy >= -2 || this.y <= 100 || this.x <= 0 || this.x >= canvasWidth.value) {
			this.shouldExplode = true
		} else {
			this.sy += 0.01
		}
		this.x += this.sx
		this.y += this.sy
	}

	draw() {
		if (ctx.value) {
			ctx.value.fillStyle = `rgb(${this.r},${this.g},${this.b})`
			ctx.value.beginPath()
			ctx.value.arc(this.x, this.y, this.size, 0, Math.PI * 2)
			ctx.value.fill()
		}
	}
}

class Particle {
	x: number
	y: number
	sx: number
	sy: number
	size: number
	life: number
	r: number
	g: number
	b: number

	constructor(x: number, y: number, r: number, g: number, b: number) {
		this.x = x
		this.y = y
		this.sx = Math.random() * 3 - 1.5
		this.sy = Math.random() * 3 - 1.5
		this.size = Math.random() * 2 + 1
		this.life = 100
		this.r = r
		this.g = g
		this.b = b
	}

	update() {
		this.x += this.sx
		this.y += this.sy
		this.life -= 1
	}

	draw() {
		if (ctx.value) {
			ctx.value.fillStyle = `rgba(${this.r}, ${this.g}, ${this.b}, ${this.life / 100})`
			ctx.value.beginPath()
			ctx.value.arc(this.x, this.y, this.size, 0, Math.PI * 2)
			ctx.value.fill()
		}
	}
}

const canvas = ref<HTMLCanvasElement | null>(null)
const ctx = ref<CanvasRenderingContext2D | null>(null)
const canvasWidth = ref(window.innerWidth)
const canvasHeight = ref(window.innerHeight)

const fireworks = reactive<Firework[]>([new Firework()])
const particles = reactive<Particle[]>([])

function animate() {
	if (ctx.value) {
		ctx.value.fillStyle = 'rgba(0, 0, 0, 0.2)'
		ctx.value.fillRect(0, 0, canvasWidth.value, canvasHeight.value)

		if (Math.random() < 0.05) {
			fireworks.push(new Firework())
		}

		for (let i = fireworks.length - 1; i >= 0; i--) {
			fireworks[i].update()
			fireworks[i].draw()

			if (fireworks[i].shouldExplode) {
				for (let j = 0; j < 50; j++) {
					particles.push(
						new Particle(
							fireworks[i].x,
							fireworks[i].y,
							fireworks[i].r,
							fireworks[i].g,
							fireworks[i].b
						)
					)
				}
				fireworks.splice(i, 1)
			}
		}

		for (let i = particles.length - 1; i >= 0; i--) {
			particles[i].update()
			particles[i].draw()

			if (particles[i].life <= 0) {
				particles.splice(i, 1)
			}
		}
		requestAnimationFrame(animate)
	}
}

onMounted(() => {
	if (canvas.value) {
		ctx.value = canvas.value.getContext('2d')
		animate()
	}

	window.addEventListener('resize', () => {
		canvasWidth.value = window.innerWidth
		canvasHeight.value = window.innerHeight
	})
})

onUnmounted(() => {
	window.removeEventListener('resize', () => {
		canvasWidth.value = window.innerWidth
		canvasHeight.value = window.innerHeight
	})
})
</script>

<template>
	<div :class="className">
		<div :class="className + '__content'">
			<div :class="className + '__desc'">Вы набрали</div>
			<div :class="className + '__score'">{{ score }}</div>
			<div :class="className + '__desc'">очков</div>
		</div>
		<div @click="backHome" :class="className + '__btn'">На главную</div>
		<div>
			<canvas ref="canvas" :width="canvasWidth" :height="canvasHeight"></canvas>
		</div>
	</div>
</template>

<style lang="scss">
$class-name: 'b-result';

.#{$class-name} {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100vh;

	&__content {
		display: flex;
		flex-direction: column;
		text-align: center;
		margin-bottom: 80px;
	}

	&__desc {
		color: #fff;
		font-size: 40px;
		font-weight: 600;
	}

	&__score {
		color: #ca9b2c;
		font-size: 60px;
		font-weight: 700;
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
	}

	canvas {
		position: fixed;
		width: 100wh;
		height: 100vh;
		top: 0;
		left: 0;
		z-index: -1;
	}
}
</style>
