import type { RecipeEs } from './types';
export const part4: Record<string, RecipeEs> = {
	fritters: {
		title: 'Buñuelos de calabacín y zanahoria',
		blurb: 'Calabacín y zanahoria, fritos en sartén.',
		ing: [
			{ name: 'calabacín', note: 'mediano, de unas 1 libra, rallado' },
			{ name: 'zanahoria', note: 'rallada' },
			{ name: 'harina' },
			{ name: 'queso parmesano rallado' },
			{ name: 'polvo de hornear' },
			{ name: 'sal' },
			{ name: 'pimienta negra' },
			{ name: 'huevo' },
			{ name: 'aceite de oliva', note: 'para la sartén' }
		],
		steps: [
			'Ralla las verduras y exprímelas bien con un paño de cocina limpio hasta que queden secas.',
			'Mezcla la harina, el parmesano, el polvo de hornear, la sal y la pimienta.',
			'Agrega las verduras y luego los huevos, y mezcla.',
			'Fríe tortitas pequeñas en aceite de oliva a fuego medio hasta que estén doradas, de 3 a 4 minutos por lado.'
		],
		notes: ['Congela los buñuelos ya fríos en una sola capa y luego guárdalos en una bolsa.']
	},
	'pumpkin-pudding': {
		title: 'Pudín de calabaza, chía y avena',
		blurb: 'Calabaza, chía y avena.',
		ing: [
			{ name: 'puré de calabaza en lata', note: 'no relleno para pay' },
			{ name: 'avena en hojuelas' },
			{ name: 'semillas de chía' },
			{ name: 'leche', note: 'de vaca o vegetal sin azúcar' },
			{ name: 'sirope de maple' },
			{ name: 'canela' },
			{ name: 'jengibre molido' },
			{ name: 'nuez moscada' },
			{ name: 'pimienta de Jamaica o clavo molido' },
			{ name: 'extracto de vainilla' },
			{ name: 'sal' },
			{ name: 'yogur griego natural', note: 'opcional' },
			{ name: 'pecanas o nueces picadas', note: 'para decorar' }
		],
		steps: [
			'En un tazón grande, bate la calabaza, la leche, el sirope de maple, las especias, la vainilla y la sal hasta que quede suave.',
			'Agrega la avena y las semillas de chía. Incorpora el yogur griego si lo usas.',
			'Déjalo reposar 10 minutos y vuelve a mezclar para deshacer los grumos de chía.',
			'Reparte la mezcla en partes iguales en 4 frascos o recipientes con tapa.',
			'Refrigera al menos 4 horas, o mejor toda la noche.',
			'Agrega las nueces justo antes de comer. Sírvelo frío, o caliéntalo en el microondas de 60 a 90 segundos para una versión tibia, estilo avena cocida.'
		],
		notes: [
			'Agrega los toppings el mismo día que lo vayas a comer.',
			'Si queda muy espeso, añade un chorrito de leche.',
			'Solo chía: omite la avena y usa ½ taza de chía en total.',
			'Solo avena: omite la chía y usa 1½ tazas de avena y ¼ de taza extra de leche.'
		]
	},
	'chia-variations': {
		title: 'Variaciones de pudín de chía y avena',
		blurb: 'Pudín de chía y avena en cinco sabores de fruta.',
		ing: [
			{ name: 'avena en hojuelas' },
			{ name: 'semillas de chía' },
			{ name: 'leche', note: 'de vaca o vegetal sin azúcar' },
			{ name: 'puré de fruta', note: 'mira los sabores más abajo' },
			{ name: 'extracto de vainilla' },
			{ name: 'sal' }
		],
		steps: [
			'Bate el puré, la leche, la vainilla, la sal y los ingredientes extra del sabor que elijas hasta que quede suave.',
			'Agrega la avena y la chía. Déjalo reposar 10 minutos y vuelve a mezclar.',
			'Reparte en 4 frascos. Refrigera al menos 4 horas o toda la noche.',
			'Agrega los toppings justo antes de comer. Se conserva de 4 a 5 días.'
		],
		flavors: [
			{
				name: 'Cheesecake de fresa',
				add: '1 taza de puré de fresa, ½ taza de yogur griego natural, 1 cucharada de jugo de limón',
				sweet: '1–2 cucharadas de sirope de maple',
				top: 'Galleta graham triturada'
			},
			{
				name: 'Arándano y limón',
				add: '1 taza de puré de arándanos azules, ralladura de 1 limón, 1 cucharada de jugo de limón',
				sweet: '1–2 cucharadas de miel',
				top: ''
			},
			{
				name: 'Plátano y mantequilla de maní',
				add: '1 taza de plátano maduro machacado (unos 2 grandes), 2 cucharadas de mantequilla de maní, ½ cucharadita de canela',
				sweet: '',
				top: 'Chispas de chocolate oscuro'
			},
			{
				name: 'Frambuesa y chocolate',
				add: '1 taza de puré de frambuesa (colado si no te gustan las semillas), 1 cucharada de cacao en polvo',
				sweet: '2 cucharadas de sirope de maple',
				top: ''
			},
			{
				name: 'Cobbler de durazno',
				add: '1 taza de puré de durazno, ½ cucharadita de canela, ½ cucharadita de jengibre molido',
				sweet: '1–2 cucharadas de sirope de maple',
				top: 'Granola'
			}
		],
		notes: [
			'La fruta ya es dulce, así que empieza con menos endulzante y prueba antes de refrigerar.',
			'Si la mezcla se ve líquida (sobre todo la de fresa y la de durazno), usa 1¾ tazas de leche en lugar de 2.'
		]
	},
	'choc-chip-cookies': {
		title: 'Galletas con chispas de chocolate (a lo Analise)',
		blurb: 'Clásicas galletas con chispas de chocolate.',
		ing: [
			{ name: 'harina de trigo todo uso', note: '170 g, medida con cuchara y nivelada' },
			{ name: 'bicarbonato de sodio' },
			{ name: 'polvo de hornear' },
			{ name: 'sal kosher' },
			{ name: 'mantequilla sin sal', note: '112 g, derretida y enfriada' },
			{ name: 'azúcar morena clara', note: '100 g, compactada' },
			{ name: 'azúcar granulada', note: '70 g' },
			{ name: 'extracto de vainilla' },
			{ name: 'huevo', note: 'grande' },
			{ name: 'chispas de chocolate semiamargo', note: '250 g, más extra para decorar' },
			{ name: 'sal en escamas', note: 'para espolvorear' }
		],
		steps: [
			'Calienta el horno a 350°F y forra una bandeja grande para hornear con papel pergamino.',
			'Mezcla con un batidor la harina, el bicarbonato, el polvo de hornear y la sal kosher en un tazón mediano.',
			'En un tazón grande, bate la mantequilla derretida con ambos azúcares de 1 a 2 minutos, hasta que quede espesa, como una pasta. La mantequilla debe estar fría o apenas tibia.',
			'Incorpora el huevo y la vainilla batiendo hasta que quede suave.',
			'Agrega la mezcla seca e incorpora con una espátula con movimientos envolventes hasta que queden solo unas pocas vetas de harina. Agrega las chispas de chocolate y mezcla solo hasta integrar. No mezcles de más.',
			'Toma porciones con un cucharón para galletas de 2 onzas (o una taza medidora de ¼ de taza). Pon 5 galletas grandes en la bandeja y hornea de 12 a 15 minutos (12 si las quieres más suaves por dentro). Para galletas de tamaño normal, pon 6 en la bandeja y hornea de 10 a 12 minutos.',
			'Están listas cuando los bordes están dorados y el centro se ve pálido e hinchado. Si se extienden demasiado, empuja los bordes hacia adentro con un tenedor apenas salgan del horno.',
			'Mientras aún estén calientes, presiona unas cuantas chispas extra encima y espolvorea con sal en escamas.',
			'Déjalas enfriar en una rejilla unos 20 minutos. Están mejor un poco tibias.'
		],
		notes: [
			'Mide la harina con cuidado; si le pones demasiada, las galletas quedan secas y no se extienden.',
			'Guárdalas en un recipiente hermético a temperatura ambiente hasta por 6 días.',
			'Para congelar, forma las bolitas de masa, refrigéralas aproximadamente 1 hora y luego congélalas. Hornéalas directo del congelador a 340°F, agregando de 2 a 3 minutos.'
		]
	},
	'carne-mechada': {
		title: 'Carne mechada',
		story:
			'La carne mechada fue una de las primeras cosas que mi mamá me enseñó a cocinar antes de irme a la universidad, como una forma de aprovechar la carne que se usa para hacer caldo. Desde entonces he jugado con la receta que ella me dio y la he hecho mía.',
		blurb:
			'Carne de res deshilachada, tierna y guisada en un sofrito de tomate con especias, hecha con la carne que sobra del caldo.',
		ing: [
			{ name: 'falda o arrachera de res', note: 'ya usada para hacer caldo' },
			{ name: 'cebolla', note: 'mediana, picada fino' },
			{ name: 'zanahoria', note: 'mediana, picada fina' },
			{ name: 'tallo de apio', note: 'picado fino' },
			{ name: 'pimiento', note: 'sin semillas, cortado en tiras largas' },
			{ name: 'diente de ajo', note: 'picado fino' },
			{ name: 'caldo de res', note: '2-3 tazas' },
			{ name: 'puré de tomate', note: 'Pomi o Mutti' },
			{ name: 'aceite de oliva', note: '2-3 cucharadas' },
			{ name: 'vinagre de vino blanco' },
			{ name: 'orégano' },
			{ name: 'tomillo' },
			{ name: 'comino' },
			{ name: 'canela' },
			{ name: 'pimienta negra' },
			{ name: 'pimienta de Jamaica', note: 'también llamada pimienta gorda' },
			{ name: 'hoja de laurel' },
			{ name: 'pimentón', note: 'o 1 chile guajillo sin semillas' },
			{ name: 'sal', note: 'al gusto' }
		],
		steps: [
			'Deshilacha la carne ya cocida en tiras largas. No tienen que quedar muy finas, porque se irán deshaciendo al cocinar. Reserva.',
			'Pica fino la cebolla, el apio y la zanahoria. Quita el tallo y las semillas del pimiento y córtalo en tiras largas.',
			'Pon el aceite de oliva en una olla grande y sofríe las verduras a fuego medio-bajo a medio hasta que la cebolla esté semitransparente, moviendo para que no se dore.',
			'Agrega el ajo picado fino y sofríe 1 minuto.',
			'Agrega la carne deshilachada, el caldo, el puré de tomate y el vinagre. Mezcla y lleva a hervor suave; luego baja el fuego a bajo y tapa parcialmente. Cocina 1 hora, moviendo de vez en cuando y agregando agua si se seca demasiado rápido.',
			'Si tienes mortero y especias enteras, muele la pimienta de Jamaica, los granos de pimienta negra, el comino y la canela hasta obtener un polvo. Agrega la mezcla de especias, las hojas de laurel, la sal y el pimentón (o el chile guajillo sin semillas) al guiso y mezcla bien. Agrega ahora el orégano y el tomillo secos; si son frescos, agrégalos en los últimos 15 minutos. Tapa parcialmente y cocina 30 minutos.',
			'Si agregaste el guajillo entero, retíralo antes de que se deshaga. Sigue cocinando hasta que el guiso esté jugoso y la carne tierna, pero no muy líquido. Cuando muevas la carne, el líquido debe quedar absorbido por ella y tardar unos segundos en volver al fondo de la olla.'
		],
		notes: []
	},
	'sweet-potato-black-bean-chili': {
		title: 'Chili de camote y frijoles negros',
		blurb: 'Un chili espeso y ahumado de una sola olla, con camote y frijoles negros.',
		ing: [
			{ name: 'aceite de oliva' },
			{ name: 'sal' },
			{ name: 'chile en polvo' },
			{ name: 'comino' },
			{ name: 'pimentón ahumado' },
			{ name: 'cebolla dulce', note: 'mediana, picada en cubos' },
			{ name: 'diente de ajo', note: 'picado fino' },
			{ name: 'camote', note: 'grande, pelado, en cubos de ½ pulgada' },
			{ name: 'agua' },
			{ name: 'tomates en cubos en lata', note: 'no los escurras' },
			{ name: 'frijoles negros en lata', note: 'escurridos y enjuagados' }
		],
		steps: [
			'Prepara las verduras y reserva: pela y pica el camote en cubos de ½ pulgada, pica la cebolla, pica fino el ajo, escurre y enjuaga los frijoles negros, y abre la lata de tomates (no la escurras).',
			'En una olla grande a fuego medio, agrega el aceite y la cebolla. Sofríe de 3 a 4 minutos hasta que esté transparente. Agrega el ajo y el camote y cocina unos 2 minutos más.',
			'Agrega las especias y mezcla bien.',
			'Agrega los frijoles negros, los tomates con su jugo y las 2 tazas de agua.',
			'Cocina a fuego lento sin tapar de 20 a 25 minutos.',
			'Comprueba que el camote esté bien cocido. Si ya está listo, aplástalo con un machacador de papas.',
			'Sirve con aguacate, salsa picante, queso o crema agria.'
		],
		notes: [
			'Los tomates asados al fuego son un excelente cambio para un chili con más sabor.',
			'Se congela muy bien en recipientes individuales. Para recalentar, ponlo en una olla con un poco de agua en el fondo, tapa y calienta a fuego medio, agregando más agua si empieza a pegarse mientras se descongela.'
		]
	},
	'buffalo-chicken-mac-slow-cooker': {
		title: 'Macarrones con queso y pollo búfalo (olla de cocción lenta)',
		variant: 'Olla de cocción lenta, más ligera',
		blurb: 'Macarrones cremosos con pollo búfalo, en versión más ligera con una salsa de requesón.',
		ing: [
			{ name: 'muslo de pollo deshuesado y sin piel' },
			{ name: 'salsa búfalo', note: '⅓ de taza para el pollo, el resto para la salsa' },
			{ name: 'salsa inglesa' },
			{ name: 'ajo en polvo' },
			{ name: 'cebolla en polvo' },
			{ name: 'caldo de pollo en polvo' },
			{ name: 'agua' },
			{ name: 'requesón al 2%' },
			{ name: 'queso crema bajo en grasa' },
			{ name: 'parmigiano reggiano', note: 'rallado' },
			{ name: 'queso cheddar en polvo' },
			{ name: 'miel' },
			{ name: 'leche al 1%', note: 'más hasta ½ taza extra si hace falta' },
			{ name: 'pasta' },
			{ name: 'sal' },
			{ name: 'pimienta negra' }
		],
		steps: [
			'Prepara el pollo búfalo: pon los muslos de pollo en la olla de cocción lenta con ⅓ de taza de la salsa búfalo, la salsa inglesa, el ajo en polvo, la cebolla en polvo, el caldo en polvo y el agua. Mezcla para cubrir bien. Tapa y cocina a temperatura alta de 2 a 3 horas, o a baja de 3 a 4 horas, hasta que el pollo esté tierno y se deshaga fácilmente.',
			'Lleva a hervor una olla grande con agua con sal. Agrega la pasta y cocínala la mitad del tiempo que indica el empaque. Escúrrela y reserva.',
			'Licúa el requesón hasta que quede suave y ralla el Parmigiano Reggiano.',
			'Cuando el pollo esté listo, deshébralo ligeramente dentro de la olla. Agrega la pasta medio cocida, el requesón, el Parmigiano Reggiano, el queso crema, el cheddar en polvo, el resto de la salsa búfalo (unos ½ taza), la miel, la leche, la sal y la pimienta. Mezcla hasta integrar todo en una salsa cremosa que cubra el pollo y la pasta.',
			'Tapa y cocina a temperatura alta 15 a 20 minutos más, hasta que la pasta esté tierna y la salsa espese. Si hace falta, agrega hasta ½ taza más de leche para ajustar la consistencia.'
		],
		notes: ['¿No tienes olla de cocción lenta? Puedes usar una olla grande.']
	},
	'buffalo-chicken-mac-full-yum': {
		title: 'Macarrones con pollo búfalo (versión súper rica)',
		variant: 'En la estufa, versión súper rica',
		blurb:
			'La versión indulgente: una salsa clásica de queso cheddar y Monterey Jack, pollo rostizado y salsa búfalo.',
		ing: [
			{ name: 'pasta' },
			{ name: 'pollo rostizado', note: 'la carne deshebrada' },
			{ name: 'mantequilla' },
			{ name: 'harina' },
			{ name: 'leche' },
			{ name: 'queso cheddar rallado' },
			{ name: 'queso Monterey Jack rallado' },
			{ name: 'salsa búfalo', note: 'empieza con ½ taza y agrega al gusto' },
			{ name: 'queso azul', note: 'opcional' },
			{ name: 'pimienta negra' }
		],
		steps: [
			'Lleva a hervor una olla grande con agua ligeramente salada. Cocina la pasta y escúrrela.',
			'Deshebra la carne del pollo rostizado y reserva.',
			'Derrite la mantequilla en una olla de hierro fundido a fuego medio. Agrega la harina poco a poco, batiendo, y cocina hasta que esté dorada. Vierte la leche despacio, batiendo constantemente, hasta que espese y burbujee. La salsa debe ser lo bastante espesa como para cubrir el dorso de una cuchara. Baja el fuego y sazona con pimienta.',
			'Agrega el cheddar y el Monterey Jack a la salsa y mezcla hasta que se derritan por completo.',
			'Incorpora la salsa búfalo hasta lograr el picante que quieras, empezando con ½ taza.',
			'Agrega el queso azul (si lo usas), el pollo y la pasta a la salsa y mezcla para integrar.'
		],
		notes: [
			'A veces Katie le pone una cubierta de pan molido o de hojuelas de maíz azucaradas para que quede aún más rico: tuesta el pan molido o el cereal en la estufa unos minutos hasta que esté dorado, espolvoréalo sobre los macarrones y gratina en el horno unos minutos.'
		]
	},
	'cheesecake-blueberry-sauce': {
		title: 'Cheesecake con salsa casera de arándanos',
		story: '¡La receta de mi abuela!',
		blurb:
			'Un cheesecake horneado con una capa de crema agria y una cobertura cocida de arándanos azules.',
		ing: [
			{ name: 'migas de galleta graham', note: 'para la base' },
			{ name: 'azúcar', note: 'para la base' },
			{ name: 'mantequilla', note: 'para la base' },
			{ name: 'clara de huevo' },
			{ name: 'azúcar', note: 'para el relleno' },
			{ name: 'queso crema', note: 'a temperatura ambiente' },
			{ name: 'extracto de vainilla', note: 'para el relleno' },
			{ name: 'crema agria' },
			{ name: 'azúcar', note: 'para la capa de crema agria' },
			{ name: 'extracto de vainilla', note: 'para la capa de crema agria' },
			{
				name: 'lata de arándanos azules silvestres de Maine',
				note: 'una con su jugo y otra escurrida'
			},
			{ name: 'azúcar', note: 'para la cobertura' },
			{ name: 'harina' },
			{ name: 'sal' },
			{ name: 'jugo de lima fresco' },
			{ name: 'maicena' },
			{ name: 'mantequilla sin sal' }
		],
		steps: [
			'Prepara la base. Mezcla bien las migas de galleta graham, ½ taza de azúcar y ¾ de taza de mantequilla. Presiona la mezcla en un molde de 8x10x2 para formar una base gruesa. Refrigera 45 minutos.',
			'Saca el queso crema para que llegue a temperatura ambiente y enciende el horno a 325°F.',
			'Corta el queso crema en trozos. En una batidora de pedestal, bate las claras a punto de nieve firme. Agrega 1 taza de azúcar, el queso crema y 1 cucharadita de vainilla y mezcla hasta que quede suave; luego vierte sobre la base.',
			'Hornea 25 minutos a 325°F.',
			'Saca del horno y deja enfriar 10 minutos. Sube la temperatura del horno a 475°F.',
			'Mezcla la crema agria, 2 cucharadas de azúcar y ½ cucharadita de vainilla hasta que quede suave. Extiéndela con una cuchara sobre la primera capa y hornea todo junto 5 minutos a 435°F.',
			'Prepara la cobertura de arándanos. Combina los arándanos, 1¾ tazas de azúcar, ⅔ de taza de harina, ⅛ de cucharadita de sal, el jugo de lima, la maicena y la mantequilla. Cocina en la parte de arriba de un baño María hasta que la salsa empiece a espesar. Retira del fuego y deja enfriar por completo.',
			'Vierte la cobertura sobre el cheesecake ya ligeramente frío. Refrigera toda la noche antes de cortar.'
		],
		notes: ['Katie también ha hecho la cobertura con fresas frescas y quedó muy bien.']
	},
	rosquillas: {
		title: 'Rosquillas',
		story: 'Esta receta me la dio mi abuela, Concepción Fortún.',
		blurb: 'Roscas de masa frita con aroma a anís, de una receta familiar.',
		ing: [
			{ name: 'huevo' },
			{ name: 'harina leudante' },
			{ name: 'aceite de oliva', note: 'sirve cualquier aceite neutro' },
			{ name: 'anisado', note: 'licor de anís' },
			{ name: 'azúcar blanca granulada' },
			{ name: 'semillas de anís' },
			{ name: 'aceite neutro', note: 'para freír' }
		],
		steps: [
			'Calienta el aceite para freír en tu sartén hasta que llegue a 350°F.',
			'En un tazón grande, bate los huevos, el azúcar, el anisado, las semillas de anís y el aceite de oliva hasta que el azúcar se disuelva por completo.',
			'Agrega la harina poco a poco, batiendo. Cuando la mezcla empiece a espesar, cambia a una espátula y sigue mezclando. Tapa y deja reposar 10 minutos.',
			'Unta con aceite una superficie de trabajo grande y limpia, y también tus manos. Toma un trozo de masa del tamaño de una pelota de ping-pong y enróllalo en una tira que pueda dar la vuelta alrededor de 2 dedos. Presiona los extremos del aro con los dedos o contra la superficie para sellarlos, y échalo al aceite.',
			'Fríe cada rosquilla unos 2 a 3 minutos por lado, hasta que estén doradas de manera uniforme. Vigila la temperatura del aceite para que no suba ni baje demasiado. Escurre las rosquillas ya fritas en un tazón forrado con papel absorbente.'
		],
		notes: []
	},
	flan: {
		title: 'Flan',
		blurb: 'Natilla horneada y sedosa con una capa dorada de caramelo.',
		ing: [
			{ name: 'huevo' },
			{ name: 'yema de huevo' },
			{ name: 'leche entera' },
			{
				name: 'extracto de vainilla',
				note: 'o ½ cucharadita de pasta de vainilla, o ½ vaina de vainilla'
			},
			{ name: 'azúcar blanca granulada', note: 'para la natilla' },
			{ name: 'azúcar blanca granulada', note: 'para el caramelo' }
		],
		steps: [
			'Precalienta el horno a 350°F. Coloca en el centro del horno una fuente honda para hornear, lo bastante grande para que quepan todos tus moldes individuales o tu molde de flan. Llénala con agua hasta un poco menos de la mitad de la altura del molde.',
			'Pon ⅓ de taza de azúcar y 2 cucharaditas de agua en una sartén a fuego medio-bajo y déjalo sin mover. Cuando el azúcar empiece a derretirse y a dorarse, mezcla con cuidado con una espátula para que no se queme. Cuando el caramelo esté uniformemente dorado y no queden cristales de azúcar, cubre con él el fondo de los moldes individuales o del molde de flan.',
			'Vierte la leche y la vainilla en una olla pequeña, mezcla y pon a fuego bajo. Caliéntala hasta que casi hierva, pero sin que llegue a hervir.',
			'Mientras se calienta la leche, en un tazón grande de metal, bate los huevos, las yemas y el resto del azúcar hasta que el azúcar se disuelva por completo.',
			'Muy, muy despacio, agrega la leche a la mezcla de huevo con un cucharón mientras bates sin parar. Así evitas que los huevos se cuajen con el calor. Cuando hayas usado la mitad de la leche, puedes agregarla más rápido.',
			'Cuela la mezcla por un colador de malla fina.',
			'Vierte la mezcla en los moldes individuales o en el molde de flan y colócalos con cuidado dentro de la fuente con agua en el horno. Hornea 45 minutos.',
			'Deja enfriar 15 minutos antes de sacar el flan del baño María. Déjalo enfriar sobre la encimera otros 15 minutos y luego refrigera al menos 2 horas.',
			'Para servir, pasa un cuchillo pequeño por el borde del flan para separarlo del molde. Coloca un plato encima, voltea y mueve suavemente hasta que el flan venza la succión y caiga sobre el plato.'
		],
		notes: []
	}
};
