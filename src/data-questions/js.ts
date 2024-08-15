import { ref } from 'vue';

interface Answer {
	title: string
	correct: boolean
}

interface Question {
	question: string
	answers: Answer[]
}

export const answersDataJs = ref<Question[]>([
	{
		question: 'JAVASCRIPT!',
		answers: [
			{
				title: 'A) JAVASCRIPT',
				correct: false
			},
			{
				title: 'B) JAVASCRIPT',
				correct: true
			},
			{
				title: 'C) JAVASCRIPT',
				correct: false
			},
			{
				title: 'D) JAVASCRIPT',
				correct: false
			}
		]
	}
])
