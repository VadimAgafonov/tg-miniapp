import { ref } from 'vue';

interface Answer {
	title: string
	correct: boolean
}

interface Question {
	question: string
	answers: Answer[]
}

export const answersDataPhp = ref<Question[]>([
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
])
