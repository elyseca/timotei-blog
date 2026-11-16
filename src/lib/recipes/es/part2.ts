import type { RecipeEs } from './types';
export const part2: Record<string, RecipeEs> = {
	'butter-beans': {
		title: 'Frijoles mantequilla con tomatitos cherry y albahaca en una sola olla',
		blurb: 'Frijoles mantequilla y tomates cherry en una cremosa salsa de albahaca.',
		ing: [
			{ name: 'aceite de oliva' },
			{ name: 'cebolla', note: 'pequeña, picada en cubitos' },
			{ name: 'tomates cherry' },
			{ name: 'frijoles mantequilla (butter beans)', note: 'escurridos y enjuagados' },
			{ name: 'queso parmesano rallado' },
			{ name: 'tofu suave', note: '5 onzas' },
			{ name: 'sal' },
			{ name: 'jugo de limón' },
			{ name: 'limón', note: 'solo la ralladura' },
			{ name: 'agua' },
			{ name: 'albahaca fresca' },
			{ name: 'pan tostado', note: 'para acompañar' }
		],
		steps: [
			'Calienta el aceite de oliva en una sartén antiadherente a fuego medio-bajo. Agrega la cebolla y cocina hasta que esté suave y dorada, unos 8 minutos.',
			'Agrega los tomates cherry y revuelve seguido hasta que se les formen ampollas.',
			'Aparta ⅔ de taza de los frijoles para la salsa.',
			'Presiona suavemente los tomates con una cuchara de madera hasta que se revienten.',
			'En una licuadora, mezcla aproximadamente ⅓ de los tomates, los ⅔ de taza de frijoles apartados, el parmesano, el tofu, la sal, el jugo de limón y el agua. Licúa hasta que quede suave y cremoso.',
			'Agrega el resto de los frijoles a la sartén, vierte la salsa y deja que hierva a fuego lento.',
			'Pica la albahaca en trozos grandes y agrega la mayor parte, reservando aproximadamente ¼ para decorar.',
			'Retira del fuego, sirve y decora con la albahaca restante y la ralladura de limón.'
		]
	},
	wings: {
		title: 'Alitas de pollo',
		ing: [
			{ name: 'alitas de pollo' },
			{ name: 'harina' },
			{ name: 'polvo de hornear' },
			{ name: 'sal' },
			{ name: 'pimienta negra' }
		],
		steps: [
			'Seca bien las alitas con papel de cocina.',
			'Mézclalas con los ingredientes secos y déjalas reposar de 30 minutos a 4 horas (en el refrigerador, sobre una rejilla, si reposan más tiempo). Una bolsa hermética de un galón funciona muy bien para esto.',
			'Hornea a 425°F durante 20 minutos.',
			'Voltéalas y hornea 15 minutos más.',
			'Opcional: al final, mézclalas con la salsa que prefieras, o sírvela aparte para mojar.'
		]
	},
	'pork-loin': {
		title: 'Lomo de cerdo',
		ing: [
			{ name: 'lomo de cerdo' },
			{ name: 'pimentón' },
			{ name: 'sal' },
			{ name: 'pimienta negra' },
			{ name: 'mostaza Dijon' }
		],
		steps: [
			'Precalienta el horno a 425°F.',
			'Frota el cerdo con el pimentón, la sal y la pimienta.',
			'Úntale la mostaza Dijon con una brocha.',
			'Hornea unos 40 minutos, hasta que el centro llegue a 145°F. Déjalo reposar 10 minutos antes de rebanar.'
		]
	},
	'whole-chicken': {
		title: 'Pollo entero',
		ing: [
			{ name: 'pollo entero', note: '4–5 libras' },
			{ name: 'aceite de oliva' },
			{ name: 'pimentón' },
			{ name: 'sal' },
			{ name: 'pimienta negra' },
			{ name: 'tomillo seco' },
			{ name: 'cebolla en polvo' },
			{ name: 'limón', note: 'opcional, para el interior del pollo' },
			{ name: 'cebolla', note: 'pequeña, en cuartos, opcional, para el interior del pollo' }
		],
		steps: [
			'Precalienta el horno a 425°F. Seca el pollo muy bien con papel de cocina.',
			'Frótalo con el aceite de oliva, el pimentón, el tomillo, la cebolla en polvo, la sal y la pimienta. Si quieres, rellena el interior con el limón y la cebolla.',
			'Hornea con la pechuga hacia arriba de 60 a 75 minutos, hasta que la parte más gruesa del muslo llegue a 165°F.',
			'Déjalo reposar 15 minutos antes de trinchar. Guarda la carcasa para hacer caldo.'
		]
	},
	salmon: {
		title: 'Salmón',
		ing: [
			{ name: 'filete de salmón', note: '5–6 onzas cada uno' },
			{ name: 'pimentón' },
			{ name: 'sal' },
			{ name: 'pimienta negra' }
		],
		steps: [
			'Precalienta el horno a 400°F.',
			'Sazona el salmón con sal, pimienta y pimentón.',
			'Hornea de 12 a 15 minutos, hasta que se desmenuce fácilmente.'
		]
	},
	'chicken-thighs': {
		title: 'Muslos de pollo',
		ing: [
			{ name: 'muslos de pollo deshuesados y sin piel' },
			{ name: 'aceite de oliva' },
			{ name: 'pimentón' },
			{ name: 'orégano seco' },
			{ name: 'tomillo seco' },
			{ name: 'sal' },
			{ name: 'pimienta negra' },
			{ name: 'limón', note: 'cortado en gajos' }
		],
		steps: [
			'Precalienta el horno a 425°F.',
			'Mezcla el pollo con el aceite y las especias. Extiéndelo en una bandeja para hornear.',
			'Hornea de 20 a 25 minutos, hasta que el pollo llegue a 165°F.',
			'Exprime el limón por encima antes de servir.'
		]
	},
	meatballs: {
		title: 'Albóndigas bajas en grasa',
		ing: [{ name: 'albóndigas bajas en grasa', note: 'ya preparadas, o de pavo molido' }],
		steps: ['Hornea las albóndigas según las instrucciones del paquete.']
	},
	lentils: {
		title: 'Lentejas',
		ing: [
			{ name: 'lentejas verdes o pardinas', note: 'secas, o 2 latas, escurridas y enjuagadas' },
			{ name: 'agua' }
		],
		steps: [
			'Cuece las lentejas a fuego lento en unas 3 tazas de agua durante 20–25 minutos, hasta que estén tiernas; escúrrelas. Omite este paso si usas lentejas de lata.'
		]
	},
	broccoli: {
		title: 'Brócoli congelado',
		ing: [
			{ name: 'floretes de brócoli congelados' },
			{ name: 'aceite de oliva' },
			{ name: 'sal' },
			{ name: 'pimienta negra' },
			{ name: 'queso parmesano rallado', note: 'opcional' }
		],
		steps: [
			'Precalienta el horno a 400°F.',
			'Mezcla el brócoli congelado con el aceite, la sal y la pimienta en una bandeja para hornear.',
			'Hornea durante 30 minutos. Si quieres, cubre con el parmesano.'
		]
	},
	'mashed-potatoes': {
		title: 'Puré de papas en la Instant Pot',
		ing: [
			{ name: 'papa Yukon', note: 'en cubos' },
			{ name: 'leche o caldo', note: 'lo mejor es la media crema (half and half)' },
			{ name: 'queso parmesano rallado' },
			{ name: 'sal', note: 'y más al gusto' },
			{ name: 'pimienta negra' },
			{ name: 'cilantro', note: 'picado' }
		],
		steps: [
			'Pon las papas y el líquido en la Instant Pot. Cocina a presión en High durante 10 minutos. Si usas leche o media crema y te sale un aviso de quemado (burn), cocina con caldo o agua y agrega los lácteos al final.',
			'Haz puré con el parmesano, la sal, la pimienta y el cilantro.'
		]
	},
	'arugula-salad': {
		title: 'Ensalada sencilla de rúcula',
		ing: [
			{ name: 'rúcula' },
			{ name: 'aceite de oliva' },
			{ name: 'jugo de limón' },
			{ name: 'sal' },
			{ name: 'pimienta negra' },
			{ name: 'queso parmesano en láminas', note: 'para decorar' }
		],
		steps: [
			'Mezcla la rúcula con el aceite de oliva, el jugo de limón, la sal y la pimienta.',
			'Decora con las láminas de parmesano.'
		],
		notes: ['Si tienes limones frescos, exprímelos para el jugo.']
	}
};
