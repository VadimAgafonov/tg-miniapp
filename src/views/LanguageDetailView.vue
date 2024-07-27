<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref } from 'vue'

const className = 'b-language-detail'
const route = useRoute()
const title = route.query.title
import heartImage from '../assets/images/heart.png'

interface Answer {
	title: string
	correct: boolean
}

interface Question {
	question: string
	answers: Answer[]
}

interface SelectedAnswer {
	answerIndex: number
	correct: boolean
	pending: boolean
}

function shuffleArray<T>(array: T[]): T[] {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))
		;[array[i], array[j]] = [array[j], array[i]]
	}
	return array
}

const hearts = [
	{
		icon: heartImage
	},
	{
		icon: heartImage
	},
	{
		icon: heartImage
	}
]
const score = ref(0)
const time = ref(30)
const answersData = ref<Question[]>([
	{
		question: 'Применяет callback-функцию ко всем элементам указанных массивов',
		answers: [
			{
				title: 'A) array_map',
				correct: false
			},
			{
				title: 'B) array_map',
				correct: true
			},
			{
				title: 'C) array_map',
				correct: false
			},
			{
				title: 'D) array_map',
				correct: false
			}
		]
	},
	{
		question: 'Другой вопрос',
		answers: [
			{
				title: 'A) array_map',
				correct: false
			},
			{
				title: 'B) array_map',
				correct: true
			},
			{
				title: 'C) array_map',
				correct: false
			},
			{
				title: 'D) array_map',
				correct: false
			}
		]
	},
	{
		question: 'Другой вопрос3',
		answers: [
			{
				title: 'A) array_map',
				correct: false
			},
			{
				title: 'B) array_map',
				correct: true
			},
			{
				title: 'C) array_map',
				correct: false
			},
			{
				title: 'D) array_map',
				correct: false
			}
		]
	},
	{
		question: 'Другой вопрос4',
		answers: [
			{
				title: 'A) array_map',
				correct: false
			},
			{
				title: 'B) array_map',
				correct: true
			},
			{
				title: 'C) array_map',
				correct: false
			},
			{
				title: 'D) array_map',
				correct: false
			}
		]
	},
	{
		question: 'Другой вопрос5',
		answers: [
			{
				title: 'A) array_map',
				correct: false
			},
			{
				title: 'B) array_map',
				correct: true
			},
			{
				title: 'C) array_map',
				correct: false
			},
			{
				title: 'D) array_map',
				correct: false
			}
		]
	},
	{
		question: 'Другой вопрос6',
		answers: [
			{
				title: 'A) array_map',
				correct: false
			},
			{
				title: 'B) array_map',
				correct: true
			},
			{
				title: 'C) array_map',
				correct: false
			},
			{
				title: 'D) array_map',
				correct: false
			}
		]
	}
])
const shuffledAnswersData = ref<Question[]>(shuffleArray([...answersData.value]))
const selectedAnswers = ref<{ [key: number]: SelectedAnswer }>({})
const currentQuestion = ref<number | null>(0)
const canGoToNextQuestion = ref<boolean>(false)
const isFadingOut = ref<boolean>(false)

const choiseOfquestion = (answer: Answer, index: number) => {
	// Если ответ уже выбран, ничего не делаем
	if (selectedAnswers.value[index] !== undefined) return

	selectedAnswers.value[index] = {
		answerIndex: shuffledAnswersData.value[index].answers.indexOf(answer),
		correct: answer.correct,
		pending: true
	}

	// setTimeout(() => {
	selectedAnswers.value[index].pending = false
	canGoToNextQuestion.value = answer.correct
	// }, 3000)
}

const goToNextQuestion = () => {
	if (
		currentQuestion.value !== null &&
		currentQuestion.value + 1 < shuffledAnswersData.value.length
	) {
		currentQuestion.value = currentQuestion.value + 1
		canGoToNextQuestion.value = false
	} else {
		currentQuestion.value = null // Если вопросов больше нет, устанавливаем null
	}
}
</script>

<template>
	<div :class="className">
		<div :class="className + '__up-content'">
			<div :class="className + '__hearts'">
				<div
					v-for="(heart, index) in hearts"
					:key="index"
					:style="{ '--icon': 'url(' + heart.icon + ')' }"
					:class="className + '__heart'"
				></div>
			</div>
			<!-- <div :class="className + '__language'">{{ title }}</div> -->
			<div :class="className + '__score'">{{ score }}</div>
		</div>
		<div :class="className + '__time'">:{{ time }}</div>
		<div v-if="currentQuestion !== null">
			<div :class="className + '__question'">
				{{ shuffledAnswersData[currentQuestion].question }}
			</div>
			<div :class="className + '__answers'">
				<div
					v-for="(answer, answerIndex) in shuffledAnswersData[currentQuestion].answers"
					:key="answerIndex"
					@click="choiseOfquestion(answer, currentQuestion)"
					:class="[
						className + '__answer',
						selectedAnswers[currentQuestion] !== undefined &&
						selectedAnswers[currentQuestion].answerIndex === answerIndex
							? selectedAnswers[currentQuestion].correct
								? 'green'
								: 'red'
							: '',
						selectedAnswers[currentQuestion] !== undefined &&
						selectedAnswers[currentQuestion].answerIndex === answerIndex &&
						selectedAnswers[currentQuestion].pending
							? 'gray'
							: '',
						selectedAnswers[currentQuestion] !== undefined ? 'disabled' : ''
					]"
					:style="{
						pointerEvents: selectedAnswers[currentQuestion] !== undefined ? 'none' : 'auto'
					}"
				>
					{{ answer.title }}
				</div>
			</div>
			<div :class="className + '__btns-wrapper'">
				<div
					@click="goToNextQuestion"
					:class="[
						className + '__prev',
						{ disabled_btn: !canGoToNextQuestion || !selectedAnswers[currentQuestion] }
					]"
				>
					Назад
				</div>
				<div
					@click="goToNextQuestion"
					:class="[
						className + '__next',
						{ disabled_btn: !canGoToNextQuestion || !selectedAnswers[currentQuestion] }
					]"
				>
					Вперед
				</div>
			</div>
		</div>
		<div></div>
	</div>
</template>

<style lang="scss">
$class-name: 'b-language-detail';

.#{$class-name} {
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100vh;
	background-image: url('../assets/images/bg.jpg');
	background-position: center;
	background-size: cover;
	background-repeat: no-repeat;

	&__up-content {
		margin-top: 80px;
		padding: 10px 13px 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
	}

	&__hearts {
		display: flex;
		gap: 2px;
		width: auto;
	}

	&__heart {
		display: inline-block;
		background-image: var(--icon);
		background-position: center;
		background-size: cover;
		width: 17px;
		height: 17px;
	}

	&__language {
		display: flex;
		justify-content: center;
		color: #5e5858;
		font-size: 20px;
	}

	&__score {
		font-size: 14px;
		color: #5e5858;
	}

	&__question {
		display: block;
		position: relative;
		border: 2px solid #5e5858;
		padding: 20px 10px;
		color: #5e5858;
		font-size: 20px;
		margin: 100px 13px 60px;
		min-height: 100px;

		&::after {
			content: '';
			display: block;
			position: absolute;
			width: 19px;
			height: 19px;
			top: 5px;
			right: 5px;
			background-image: url('../assets/images/question.png');
			background-size: cover;
			background-position: center;
		}
	}

	&__time {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border: 1px solid #5e5858;
		border-radius: 100px;
		padding: 7px 14px;
		width: 70px;
		margin: 0 auto;
	}

	&__answers {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 10px;
		margin-top: 40px;
		padding: 0 13px;
	}

	&__answer {
		border: 2px solid #5e5858;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #5e5858;
		font-size: 18px;
		height: 45px;
		cursor: pointer;
		transition: all 0.2s linear;

		&:hover {
			background-color: #5e5858;
			color: #fff;
		}
	}

	&__btns-wrapper {
		margin-top: 180px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		padding: 0 14px;
	}

	&__prev {
		width: 100%;
		border: 2px solid #5e5858;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #5e5858;
		font-size: 18px;
		height: 45px;
		cursor: pointer;
		transition: all 0.2s linear;

		&:hover {
			background-color: #5e5858;
			color: #fff;
		}
	}

	&__next {
		width: 100%;
		border: 2px solid #5e5858;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #5e5858;
		font-size: 18px;
		height: 45px;
		cursor: pointer;
		transition: all 0.2s linear;

		&:hover {
			background-color: #5e5858;
			color: #fff;
		}
	}

	.gray {
		background-color: #5e5858;
		color: #fff;
	}

	.green {
		background-color: #43a713;
		color: #fff;
	}

	.red {
		background-color: #a70606;
		color: #fff;
	}

	.disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}

	.disabled_btn {
		opacity: 0.4;
		cursor: not-allowed;
		pointer-events: none;
	}

	.fade-out {
		opacity: 0;
		transition: opacity 0.3s ease-out;
	}
}
</style>
