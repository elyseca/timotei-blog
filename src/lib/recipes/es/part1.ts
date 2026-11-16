import type { RecipeEs } from './types';
export const part1: Record<string, RecipeEs> = {
	chili: {
		title: 'Chili',
		blurb: 'Pavo, frijoles y tomates asados al fuego.',
		ing: [
			{ name: 'aceite de oliva' },
			{ name: 'cebolla picada', note: 'la congelada ya picada funciona muy bien' },
			{ name: 'pavo molido' },
			{ name: 'azúcar' },
			{ name: 'comino' },
			{ name: 'orégano' },
			{ name: 'sal' },
			{ name: 'pimienta negra' },
			{ name: 'pasta de tomate' },
			{ name: 'salsa de tomate' },
			{ name: 'caldo' },
			{ name: 'tomates triturados asados al fuego' },
			{
				name: 'frijoles (rojos, negros, pintos)',
				note: 'escurridos y enjuagados'
			},
			{
				name: 'mezcla de verduras congeladas',
				note: 'idealmente una mezcla de maíz, ejotes y zanahoria'
			}
		],
		steps: [
			'Pon la Instant Pot en modo Sauté. Agrega el aceite de oliva y la cebolla; cocina hasta que se ablande.',
			'Agrega el pavo molido y dóralo por completo.',
			'Agrega los demás ingredientes y mezcla bien, raspando el fondo de la olla para despegar lo pegado. Deja los frijoles encima y no los mezcles.',
			'Cocina a presión en High por 12 minutos. Deja que se libere la presión de forma natural por 10 minutos y luego libera el resto de golpe.',
			'Ajusta la sazón.'
		],
		notes: []
	},
	'sausage-soup': {
		title: 'Sopa de salchicha de pollo y cuscús',
		blurb: 'Salchicha de pollo, calabacín, cuscús y limón.',
		ing: [
			{ name: 'aceite de oliva' },
			{ name: 'salchicha de pollo', note: 'en rodajas' },
			{ name: 'cebolla', note: 'mediana, picada' },
			{ name: 'zanahoria', note: 'en rodajas' },
			{ name: 'tallo de apio', note: 'picado' },
			{ name: 'calabacín', note: 'picado' },
			{ name: 'tomates picados' },
			{ name: 'caldo de pollo bajo en sodio' },
			{ name: 'cuscús integral' },
			{ name: 'espinaca o col rizada', note: 'la congelada funciona' },
			{ name: 'orégano' },
			{ name: 'albahaca' },
			{ name: 'tomillo' },
			{ name: 'sal' },
			{ name: 'pimienta negra' },
			{ name: 'limón', note: 'en jugo' },
			{ name: 'perejil fresco', note: 'picado, para terminar' },
			{ name: 'hoja de laurel' },
			{ name: 'corteza de queso parmesano', note: 'opcional' }
		],
		steps: [
			'Calienta el horno a 425°F con la rejilla en el tercio inferior. En la olla de hierro (Dutch oven), mezcla las salchichas en rodajas con los gajos de cebolla, las zanahorias, el apio, 2 cucharadas de aceite de oliva, sal y pimienta. Hornea sin tapar 20 minutos, revolviendo una vez, hasta que se doren bien.',
			'Con cuidado, agrega los tomates, 6 tazas de caldo, el orégano, la albahaca, el tomillo, la hoja de laurel y la corteza de parmesano, raspando el fondo para despegar lo dorado. Tapa con la tapa.',
			'Baja el horno a 350°F y hornea 40 minutos, hasta que las zanahorias estén suaves.',
			'Agrega el calabacín, el cuscús y las verduras de hoja. Tapa y regresa al horno por 10 minutos, hasta que el cuscús esté suave.',
			'Retira la hoja de laurel y la corteza. Termina con el jugo de limón, el perejil, y sal y pimienta al gusto.'
		],
		notes: ['Usa guantes de cocina para la olla y la tapa, porque ambas quedan muy calientes.']
	},
	'salsa-verde-soup': {
		title: 'Sopa de pollo con salsa verde',
		blurb: 'Pollo deshebrado, salsa verde y chiles verdes.',
		ing: [
			{ name: 'pollo cocido deshebrado' },
			{ name: 'salsa verde' },
			{ name: 'caldo' },
			{ name: 'chiles verdes picados' },
			{ name: 'comino' },
			{ name: 'chile en polvo' },
			{ name: 'col rizada congelada' },
			{ name: 'cilantro', note: 'picado, congelado o fresco' },
			{ name: 'sal' }
		],
		steps: [
			'Pon todos los ingredientes en la Instant Pot.',
			'Cocina a presión en High por 5 minutos.',
			'Libera la presión de golpe y mezcla.'
		],
		notes: []
	},
	'white-bean-stew': {
		title: 'Guiso de pollo y frijoles blancos en una sola olla',
		blurb: 'Muslos de pollo, frijoles blancos y zanahorias baby.',
		ing: [
			{ name: 'aceite de oliva' },
			{ name: 'cebolla', note: 'amarilla, picada' },
			{ name: 'zanahorias baby', note: 'unas 30, partidas por la mitad si son grandes' },
			{ name: 'tomillo seco' },
			{ name: 'romero seco' },
			{ name: 'muslos de pollo sin hueso y sin piel' },
			{ name: 'caldo de pollo bajo en sodio' },
			{ name: 'frijoles blancos', note: 'escurridos y enjuagados' },
			{ name: 'espinaca baby' },
			{ name: 'sal' },
			{ name: 'pimienta negra' },
			{ name: 'limón', note: 'en jugo' }
		],
		steps: [
			[
				'Ablanda las cebollas',
				'Calienta el aceite de oliva en tu olla Le Creuset a fuego medio. Agrega las cebollas y revuelve de vez en cuando hasta que estén suaves y empiecen a dorarse, unos 8 minutos.'
			],
			[
				'Agrega las hierbas',
				'Incorpora el tomillo, el romero, la sal y la pimienta. Cocina solo hasta que suelten aroma, cerca de 1 minuto.'
			],
			[
				'Cocina todo a fuego lento',
				'Agrega las zanahorias baby, los muslos de pollo, el caldo y los frijoles blancos. Lleva a hervor, luego baja el fuego, tapa y cocina a fuego lento hasta que las zanahorias se pinchen fácilmente con un tenedor, unos 25 minutos.'
			],
			[
				'Deshebra el pollo',
				'Pasa el pollo a un plato y deshébralo con dos tenedores. Si no se deshace con facilidad, cocínalo unos minutos más.'
			],
			[
				'Termina y sirve',
				'Regresa el pollo a la olla e incorpora la espinaca de a puñados hasta que se marchite, unos 3 minutos. Exprime el jugo de limón y agrega más sal si hace falta.'
			]
		],
		notes: [
			'Esto llena una olla de hierro de 5.5 cuartos hasta unos tres cuartos de su capacidad, así que usa tu olla más grande.',
			'Deja enfriar las sobras y repártelas en recipientes: duran unos 4 días en el refrigerador o 3 meses en el congelador. Para mejor textura, congela sin la espinaca y agrega espinaca fresca al recalentar.'
		]
	},
	'butternut-soup': {
		title: 'Sopa de calabaza butternut',
		blurb: 'Calabaza butternut con cebolla dorada y tomillo.',
		ing: [
			{ name: 'aceite de oliva' },
			{ name: 'cebolla', note: 'amarilla, picada' },
			{
				name: 'calabaza butternut',
				note: 'pelada y en cubos (o 2 bolsas de cubos congelados)'
			},
			{ name: 'caldo bajo en sodio' },
			{ name: 'tofu sedoso' },
			{ name: 'sal' },
			{ name: 'pimienta negra' },
			{ name: 'nuez moscada o canela', note: 'opcional' },
			{ name: 'tomillo seco' },
			{ name: 'jugo de limón', note: 'para terminar' }
		],
		steps: [
			'Sofríe las cebollas en el aceite de oliva en la Instant Pot hasta que estén suaves y ligeramente doradas, unos 8 minutos, agregando el tomillo el último minuto.',
			'Agrega el caldo y raspa el fondo de la olla.',
			'Agrega la calabaza y los condimentos.',
			'Cocina a presión en High por 10 minutos.',
			'Deja que la presión baje sola 10 minutos. Agrega el tofu sedoso y licúa hasta que quede suave y cremosa (lo mejor es una licuadora de inmersión). Si se enfrió al licuar, caliéntala en modo Sauté por 2–3 minutos. Incorpora el jugo de limón antes de servir.'
		],
		notes: []
	},
	'kung-pao': {
		title: 'Bowls de res Kung Pao',
		blurb: 'Carne molida, pimientos y cacahuates en salsa de soya dulce.',
		ing: [
			{ name: 'arroz blanco' },
			{ name: 'aceite de oliva' },
			{ name: 'cebolla', note: 'pequeña, picada' },
			{ name: 'pimiento verde', note: 'picado' },
			{
				name: 'cebollín',
				note: 'unos 6, separando la parte blanca de la verde'
			},
			{ name: 'carne molida de res' },
			{ name: 'sal' },
			{ name: 'pimienta negra' },
			{ name: 'salsa picante', note: 'opcional' },
			{ name: 'Kikkoman Sweet Soy Glaze' },
			{ name: 'jengibre fresco', note: 'rallado' },
			{ name: 'cacahuates tostados' }
		],
		steps: [
			'Cocina el arroz en la Instant Pot.',
			'Corta los cebollines en rodajas, manteniendo separadas las partes blancas y las verdes.',
			'Sofríe la cebolla, los pimientos y la parte blanca de los cebollines en el aceite de oliva hasta que estén suaves.',
			'Agrega la carne, la sal, la pimienta y la salsa picante; dórala por completo.',
			'Incorpora el glaseado y el jengibre; cocina a fuego lento 1–2 minutos hasta que quede brillante.',
			'Sirve sobre el arroz con los cacahuates y la parte verde de los cebollines.'
		],
		notes: []
	},
	'meatball-bowls': {
		title: 'Bowls mediterráneos de albóndigas',
		blurb: 'Albóndigas, quinoa y ensalada de pepino y tomate con limón.',
		ing: [
			{ name: 'quinoa' },
			{
				name: 'albóndigas bajas en grasa',
				note: 'ya preparadas, o pavo molido'
			},
			{ name: 'pepino mini', note: 'picado' },
			{ name: 'tomates cherry', note: 'partidos por la mitad' },
			{ name: 'perejil fresco', note: 'picado' },
			{ name: 'yogur griego natural' },
			{ name: 'jugo de limón' },
			{ name: 'sal' },
			{ name: 'zanahorias en rodajas onduladas', note: 'opcional' }
		],
		steps: [
			'Cocina la quinoa según el empaque o la sección de Carbohidratos.',
			'Hornea las albóndigas según las instrucciones del empaque.',
			'Mezcla el yogur, el jugo de limón, el perejil y la sal.',
			'Mezcla el pepino y los tomates con la mezcla de yogur.',
			'Opcional: asa las zanahorias a 400°F por 25 minutos.',
			'Arma los bowls.'
		],
		notes: []
	},
	'salmon-asparagus': {
		title: 'Salmón, espárragos y arroz blanco',
		blurb: 'Salmón, espárragos y arroz.',
		ing: [
			{ name: 'filete de salmón', note: 'de 5–6 onzas cada uno' },
			{ name: 'espárragos', note: 'sin los extremos duros' },
			{ name: 'arroz blanco' },
			{ name: 'aceite de oliva' },
			{ name: 'sal' },
			{ name: 'pimienta negra' },
			{ name: 'pimentón' }
		],
		steps: [
			'Cocina el arroz en la Instant Pot.',
			'Mezcla los espárragos con aceite de oliva, sal y pimienta. Hornea a 400°F por 15 minutos.',
			'Sazona el salmón con sal, pimienta y pimentón. Mételo al horno a 400°F durante los últimos 12–15 minutos, hasta que se desmenuce fácilmente.'
		],
		notes: []
	},
	'sheet-pan-chicken': {
		title: 'Muslos de pollo y papas en charola',
		blurb: 'Muslos de pollo, papas, cebolla morada y brócoli.',
		ing: [
			{ name: 'muslos de pollo sin hueso y sin piel' },
			{ name: 'papas baby', note: 'partidas por la mitad' },
			{ name: 'cebolla morada', note: 'grande, en gajos' },
			{ name: 'floretes de brócoli', note: 'o ejotes' },
			{ name: 'aceite de oliva' },
			{ name: 'pimentón' },
			{ name: 'orégano seco' },
			{ name: 'tomillo seco' },
			{ name: 'sal' },
			{ name: 'pimienta negra' },
			{ name: 'limón', note: 'en gajos' }
		],
		steps: [
			'Precalienta el horno a 425°F.',
			'Mezcla las papas y los gajos de cebolla con la mitad del aceite y una pizca de sal. Extiéndelos en una charola grande y hornea 15 minutos.',
			'Mezcla el pollo con el aceite restante y las especias. Mezcla el brócoli con un poco de aceite y sal.',
			'Mueve las papas a un lado, agrega el pollo y el brócoli, y hornea 20–25 minutos, hasta que el pollo llegue a 165°F.',
			'Exprime el limón sobre todo antes de servir.'
		],
		notes: []
	},
	'power-bowl': {
		title: 'Power bowl de camote asado, hinojo y lentejas',
		blurb: 'Camote, hinojo y lentejas con tahini y limón.',
		ing: [
			{ name: 'camote', note: 'mediano, en cubos' },
			{ name: 'bulbo de hinojo', note: 'grande, en rebanadas' },
			{ name: 'aceite de oliva' },
			{ name: 'comino' },
			{ name: 'pimentón ahumado' },
			{ name: 'sal' },
			{ name: 'pimienta negra' },
			{
				name: 'lentejas verdes o marrones secas',
				note: 'o 2 latas, escurridas y enjuagadas'
			},
			{ name: 'arúgula o col rizada picada' },
			{ name: 'tahini' },
			{ name: 'jugo de limón' },
			{ name: 'cebolla morada', note: 'finamente picada' },
			{ name: 'perejil fresco', note: 'picado' },
			{ name: 'queso feta', note: 'opcional' },
			{ name: 'semillas de calabaza tostadas', note: 'opcional' }
		],
		steps: [
			'Precalienta el horno a 425°F.',
			'Mezcla los camotes y el hinojo con el aceite, el comino, el pimentón, la sal y la pimienta. Hornea en una charola 25–30 minutos, volteando a la mitad.',
			'Mientras tanto, cocina las lentejas a fuego lento en unas 3 tazas de agua por 20–25 minutos, hasta que estén suaves; escúrrelas. Omite este paso si usas lentejas de lata.',
			'Bate el aderezo de tahini (tahini, jugo de limón, 2–3 cucharadas de agua, cebolla morada, perejil y una pizca de sal), aligerándolo con agua hasta que se pueda verter.',
			'Arma cada bowl con las hojas verdes, las lentejas y las verduras asadas. Rocía con el aderezo.'
		],
		notes: []
	},
	'vodka-sauce': {
		title: 'Pasta a la vodka vegana (salsa de tofu sedoso)',
		blurb: 'Salsa cremosa de pimiento rojo asado y tomate, mezclada con la pasta.',
		ing: [
			{ name: 'pasta', note: 'penne, rigatoni o espagueti' },
			{ name: 'aceite de oliva' },
			{ name: 'cebolla', note: 'pequeña, picada' },
			{ name: 'tofu sedoso' },
			{ name: 'pimientos rojos asados' },
			{ name: 'tomates asados al fuego' },
			{ name: 'anacardos crudos sin sal', note: 'remojados' },
			{ name: 'jugo de limón' },
			{ name: 'agua o caldo', note: 'hasta 1 taza' },
			{ name: 'orégano o albahaca secos' },
			{ name: 'sal' },
			{ name: 'pimienta negra' },
			{ name: 'levadura nutricional', note: 'opcional' },
			{ name: 'pimentón ahumado', note: 'opcional' }
		],
		steps: [
			'Cocina la pasta en agua bien salada hasta que esté apenas al dente. Reserva una taza del agua de la pasta y luego escúrrela.',
			'Mientras tanto, sofríe la cebolla picada en 1 cucharada de aceite de oliva hasta que esté suave y dorada, unos 8 minutos. Licúala con todos los demás ingredientes hasta que quede lisa.',
			'Ajusta la sazón y luego calienta la salsa suavemente en la olla.',
			'Mezcla la pasta con la salsa, aflojándola con un chorrito del agua de la pasta hasta que cubra cada pieza. Sirve de inmediato.'
		],
		notes: [
			'Unas 2 onzas de pasta seca por porción. Usa pasta sin gluten si lo necesitas. La salsa sola se conserva bien, así que si vas a cocinar con anticipación, guarda la salsa y la pasta por separado.',
			'Sobre los anacardos: "crudos" significa anacardos (nueces de la India) naturales, sin tostar y sin sal, no los tostados y salados para botanear. El remojo los ablanda para que se licúen hasta formar una base suave y cremosa, en lugar de arenosa. Cúbrelos con agua y déjalos remojar de 2 a 4 horas, o toda la noche en el refrigerador. Para un remojo rápido, cúbrelos con agua recién hervida por 15–20 minutos. Escúrrelos y enjuágalos antes de licuar.'
		]
	}
};
