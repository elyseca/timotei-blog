import type { RecipeEs } from './types';
export const part3: Record<string, RecipeEs> = {
	asparagus: {
		title: 'Espárragos asados',
		ing: [
			{ name: 'espárragos', note: 'sin la parte dura' },
			{ name: 'aceite de oliva' },
			{ name: 'sal' },
			{ name: 'pimienta negra' }
		],
		steps: [
			'Precalienta el horno a 400°F.',
			'Mezcla los espárragos con el aceite de oliva, la sal y la pimienta.',
			'Hornea por 15 minutos.'
		],
		notes: []
	},
	'roasted-fennel': {
		title: 'Hinojo asado',
		ing: [
			{ name: 'bulbo de hinojo', note: 'grande, en rodajas' },
			{ name: 'aceite de oliva' },
			{ name: 'comino' },
			{ name: 'pimentón ahumado' },
			{ name: 'sal' },
			{ name: 'pimienta negra' }
		],
		steps: [
			'Precalienta el horno a 425°F.',
			'Mezcla el hinojo con el aceite, el comino, el pimentón, la sal y la pimienta.',
			'Hornea en una bandeja por 25–30 minutos, volteando a la mitad.'
		],
		notes: []
	},
	'cucumber-salad': {
		title: 'Ensalada de pepino y tomate con limón',
		ing: [
			{ name: 'pepino pequeño', note: 'en cubitos' },
			{ name: 'tomates cherry', note: 'partidos por la mitad' },
			{ name: 'perejil fresco', note: 'picado' },
			{ name: 'yogur griego natural' },
			{ name: 'jugo de limón' },
			{ name: 'sal' }
		],
		steps: [
			'Mezcla el yogur, el jugo de limón, el perejil y la sal.',
			'Mezcla el pepino y los tomates con la mezcla de yogur.'
		],
		notes: []
	},
	'roasted-carrots': {
		title: 'Zanahorias asadas',
		ing: [
			{ name: 'zanahorias', note: 'las cortadas en ondas quedan muy bien' },
			{ name: 'aceite de oliva' },
			{ name: 'sal' }
		],
		steps: [
			'Precalienta el horno a 400°F.',
			'Mezcla las zanahorias con el aceite de oliva y la sal.',
			'Hornea por 25 minutos.'
		],
		notes: []
	},
	'white-rice': {
		title: 'Arroz blanco',
		ing: [{ name: 'arroz blanco' }, { name: 'agua' }],
		steps: [
			'Pon el arroz y el agua en la Instant Pot.',
			'Cocina a presión en Alta por 3 minutos.',
			'Deja que la presión baje sola por 10 minutos.'
		],
		notes: []
	},
	'brown-rice': {
		title: 'Arroz integral',
		ing: [{ name: 'arroz integral' }, { name: 'agua' }],
		steps: [
			'Pon el arroz y el agua en la Instant Pot.',
			'Cocina a presión en Alta por 22 minutos.',
			'Deja que la presión baje sola por 10 minutos.'
		],
		notes: []
	},
	'sushi-rice': {
		title: 'Arroz para sushi',
		ing: [
			{ name: 'arroz para sushi' },
			{ name: 'agua' },
			{ name: 'vinagre de arroz' },
			{ name: 'azúcar' }
		],
		steps: [
			'Enjuaga bien el arroz.',
			'Cocínalo con el agua en la Instant Pot en Alta por 5 minutos y deja que la presión baje sola por 10 minutos.',
			'Sazona con el vinagre de arroz y el azúcar.'
		],
		notes: []
	},
	quinoa: {
		title: 'Quinoa',
		ing: [{ name: 'quinoa' }, { name: 'agua' }],
		steps: [
			'Enjuaga la quinoa.',
			'Cocínala con el agua, tapada, por 15 minutos.',
			'Déjala reposar 5 minutos y luego esponja con un tenedor.'
		],
		notes: []
	},
	'pearled-couscous': {
		title: 'Cuscús perlado',
		ing: [{ name: 'cuscús perlado' }, { name: 'agua' }],
		steps: ['Cocina el cuscús a fuego lento en el agua por 10 minutos.'],
		notes: []
	},
	'sweet-potatoes': {
		title: 'Camotes asados',
		ing: [
			{ name: 'camote', note: 'mediano, en cubos' },
			{ name: 'aceite de oliva' },
			{ name: 'comino' },
			{ name: 'pimentón ahumado' },
			{ name: 'sal' },
			{ name: 'pimienta negra' }
		],
		steps: [
			'Precalienta el horno a 425°F.',
			'Mezcla los camotes con el aceite, el comino, el pimentón, la sal y la pimienta.',
			'Hornea en una bandeja por 25–30 minutos, volteando a la mitad.'
		],
		notes: []
	},
	'roasted-potatoes': {
		title: 'Papas asadas con cebolla morada',
		ing: [
			{ name: 'papas pequeñas', note: 'partidas por la mitad' },
			{ name: 'cebolla morada', note: 'grande, en gajos' },
			{ name: 'aceite de oliva' },
			{ name: 'sal' }
		],
		steps: [
			'Precalienta el horno a 425°F.',
			'Mezcla las papas y los gajos de cebolla con el aceite y la sal. Extiéndelas en una bandeja grande.',
			'Hornea de 35 a 40 minutos, revolviendo una vez, hasta que estén doradas.'
		],
		notes: []
	}
};
