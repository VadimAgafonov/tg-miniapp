<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import { answersDataPhp } from '@/data-questions/php'
import { answersDataJs } from '@/data-questions/js'
import heartImage from '@/assets/images/heart.png'

const className = 'b-language-detail'
const router = useRouter()
const route = useRoute()
const title = route.query.title

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

const hearts = ref([{ icon: heartImage }, { icon: heartImage }, { icon: heartImage }]);
const score = ref(0);
// const time = ref(30)
let answersData = null;

if(title === 'PHP') {
	answersData = answersDataPhp
} else if (title === 'JavaScript') {
	answersData = answersDataJs
}

const shuffledAnswersData = ref<Question[]>(shuffleArray([...answersData.value]))
const selectedAnswers = ref<{ [key: number]: SelectedAnswer }>({})
const currentQuestion = ref<number | null>(0)
const canGoToNextQuestion = ref<boolean>(false)

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
	canGoToNextQuestion.value = true // Активируем кнопку "вперед" при выборе любого ответа

	// Удаляем одно сердце и изменяем очки, если ответ неправильный
	if (!answer.correct) {
		hearts.value.pop()
		score.value -= 15
		// Проверяем, остались ли жизни
		if (hearts.value.length === 0) {
			router.replace('/results')
		}
	} else {
		// Добавляем очки, если ответ правильный
		score.value += 15
	}
	// }, 3000);
}

const goToNextQuestion = () => {
	if (
		currentQuestion.value !== null &&
		currentQuestion.value + 1 < shuffledAnswersData.value.length
	) {
		currentQuestion.value = currentQuestion.value + 1
		canGoToNextQuestion.value = selectedAnswers.value[currentQuestion.value] !== undefined
	} else {
		// Передаем результат в компонент result
		router.replace({ path: '/results', query: { score: score.value } })
		currentQuestion.value = null // Если вопросов больше нет, устанавливаем null
		canGoToNextQuestion.value = false
	}
}

const goToPrevQuestion = () => {
	if (currentQuestion.value === 0) {
		// Переход на предыдущую страницу
		router.go(-1)
	} else if (currentQuestion.value !== null && currentQuestion.value > 0) {
		currentQuestion.value = currentQuestion.value - 1
		canGoToNextQuestion.value = true // Предполагаем, что пользователь может перейти к следующему вопросу после возврата
	}
}
</script>

<template>
	<div :class="className">
		<div :class="className + '__up-content'">
			<div :class="className + '__hearts-lang'">
				<div :class="className + '__language'">{{ title }}</div>
				<div :class="className + '__hearts'">
					<div
						v-for="(heart, index) in hearts"
						:key="index"
						:style="{ '--icon': 'url(' + heart.icon + ')' }"
						:class="className + '__heart'"
					></div>
				</div>
			</div>
			<div :class="className + '__score'">{{ score }}</div>
		</div>
		<!-- <div :class="className + '__time'">:{{ time }}</div> -->
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
				<div @click="goToPrevQuestion" :class="[className + '__prev']">Назад</div>
				<div
					@click="goToNextQuestion"
					:class="[
						className + '__prev',
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
		mask-image: var(--icon);
		mask-position: center;
		mask-size: cover;
		background-color: #ca9b2c;
		width: 17px;
		height: 17px;
	}

	&__language {
		display: flex;
		color: #ca9b2c;
		font-size: 18px;
		margin-bottom: 10px;
	}

	&__score {
		font-size: 18px;
		color: #ca9b2c;
	}

	&__question {
		display: block;
		position: relative;
		border: 2px solid #ca9b2c;
		padding: 20px 10px;
		color: #fff;
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
			mask-image: url('../assets/images/question.png');
			mask-size: cover;
			mask-position: center;
			background-color: #fff;
		}
	}

	&__time {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border: 1px solid #ca9b2c;
		border-radius: 100px;
		padding: 7px 14px;
		width: 70px;
		margin: 0 auto;
		color: #fff;
	}

	&__answers {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 10px;
		margin-top: 40px;
		padding: 0 13px;
	}

	&__answer {
		border: 2px solid #ca9b2c;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
		font-size: 18px;
		height: 45px;
		cursor: pointer;
		transition: all 0.2s linear;

		&:hover {
			background-color: #ca9b2c;
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
		border: 2px solid #ca9b2c;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
		font-size: 18px;
		height: 45px;
		cursor: pointer;
		transition: all 0.2s linear;

		&:hover {
			background-color: #ca9b2c;
			color: #fff;
		}
	}

	&__next {
		width: 100%;
		border: 2px solid #ca9b2c;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
		font-size: 18px;
		height: 45px;
		cursor: pointer;
		transition: all 0.2s linear;

		&:hover {
			background-color: #ca9b2c;
			color: #fff;
		}
	}

	.gray {
		background-color: #5e5858;
		color: #fff;
	}

	.green {
		position: relative;
		background-color: #43a713;
		color: #fff;

		&::after {
			content: '+15';
			position: absolute;
			top: 0;
			right: 0;
			color: #fff;
			padding: 5px 10px;
			border-radius: 5px;
			font-size: 18px;
			opacity: 0;
			transform: translateY(0);
			animation: fadeOutUp 2s ease-out;
		}
	}

	@keyframes fadeOutUp {
		0% {
			opacity: 1;
			transform: translateY(0);
		}
		100% {
			opacity: 0;
			transform: translateY(-80px);
		}
	}

	.red {
		position: relative;
		background-color: #a70606;
		color: #fff;

		&::after {
			content: '-15';
			position: absolute;
			top: 0;
			right: 0;
			color: #fff;
			padding: 5px 10px;
			border-radius: 5px;
			font-size: 18px;
			opacity: 0;
			transform: translateY(0);
			animation: fadeOutUp 2s ease-out;
		}
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
