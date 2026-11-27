// Timeline for the Our Story page, copied from timotei.wedding/our-story.
// Listed oldest first; the page shows them newest first.
// Text is English; Spanish lives in src/lib/i18n/es/story.ts (keyed by the same English text).
// Photos live in static/story-photos/ (resized copies from the wedding site).
const IMG = '/story-photos/';

export type Chapter = {
	when: string;
	title: string;
	text: string;
	bg: string;
	/** Can be empty: the chapter then shows text (and videos) only. */
	photos: { src: string; alt: string }[];
	/** Optional videos shown under the chapter. `youtube` is an embed URL; `file` plays in a <video>. */
	videos?: Video[];
	/** Optional button under the text, e.g. to another page on the site. */
	link?: { href: string; label: string };
};

export type Video = {
	label: string;
	kind: 'file' | 'youtube';
	src: string;
	poster?: string;
	vertical?: boolean;
};

// Wedding films from our videographer's Vidflow gallery (galleries.vidflow.co/reuug9a1).
const VF = 'https://dcdn-global.content.vidflow.co/89710a190/studio/gayyug6x/videos/';
const VF_POSTER = 'https://meta.vidflow.co/c/';

export const chapters: Chapter[] = [
	{
		when: 'Fall 2018',
		title: 'And they were roommates...',
		text: 'A bit unconventional, but we first met when we became roommates in college at UNC Chapel Hill. We instantly hit it off as friends, but it would take a while longer for love to blossom.',
		bg: 'bg-teal',
		photos: [{ src: IMG + 'college-years-1.jpg', alt: 'First photo together' }]
	},
	{
		when: 'Summer 2019',
		title: 'Officially official',
		text: "It wasn't until after Gabe had graduated that we began dating. We spent most of the summer apart while Gabe was on a road trip and started our new long distance relationship with lots of travel between DC and Chapel Hill.",
		bg: 'bg-mustard',
		photos: [
			{ src: IMG + 'officially-official-1.jpg', alt: 'Date at Dorothea Dix park' },
			{ src: IMG + 'officially-official-2.jpg', alt: 'Gabe and Elyse together' },
			{ src: IMG + 'officially-official-3.jpg', alt: 'Hiking trip in the Rocky Mountains' }
		]
	},
	{
		when: 'March 2020',
		title: 'And then there was a pandemic...',
		text: "The pandemic hit while we were on Elyse's spring break trip with friends in Colorado. Cue Gabe's crash course in Hickory, NC as we waited out the pandemic while Elyse graduated from her undergrad. We made the most of it, making it our goal to see as many National Parks as we could possibly visit!",
		bg: 'bg-coral',
		photos: [
			{ src: IMG + 'pandemic-1.jpg', alt: "Elyse's remote graduation" },
			{ src: IMG + 'pandemic-2.jpg', alt: 'Pandemic-style hiking' },
			{ src: IMG + 'pandemic-3.jpg', alt: 'Our alien-themed van!' },
			{ src: IMG + 'pandemic-4.jpg', alt: 'Glacier National Park, MT' }
		]
	},
	{
		when: 'August 2020',
		title: 'New family member!',
		text: "We kicked off a year of new adventures in DC with the addition of our kitty, Yoshi (named after Gabe's favorite Super Smash Bros character)! She brought a spark of joy and energy to an otherwise weird year as we waited out the rest of the pandemic.",
		bg: 'bg-lime',
		photos: [
			{ src: IMG + 'dc-1.jpg', alt: 'Meet Yoshi!' },
			{ src: IMG + 'dc-2.jpg', alt: 'Taking Yoshi for a ride' },
			{ src: IMG + 'dc-3.jpg', alt: 'Anniversary dinner at Fiola, DC' }
		]
	},
	{
		when: 'August 2021',
		title: 'HAVAHD',
		text: "Elyse decided to enroll in a small school in Cambridge, MA for her master's degree. We lived on-campus together for 2 years and experienced the best of what New England had to offer. We also made some great friends along the way, whose footsteps we would follow for our next move...",
		bg: 'bg-blue',
		photos: [
			{ src: IMG + 'boston-1.jpg', alt: 'Baseball at Fenway Park' },
			{ src: IMG + 'boston-2.jpg', alt: 'Trip to Mexico with our friends' },
			{ src: IMG + 'boston-3.jpg', alt: "Elyse's Harvard graduation" }
		]
	},
	{
		when: 'August 2023',
		title: "I'M WALKING HERE",
		text: "When most of our friends deserted Boston, we decided to follow them to NYC! We've made the most of our time in The Big Apple - going to Broadway shows, eating great food, and hosting weekly Survivor watch parties. We've really felt at home here thanks to our wonderful community and all that the city has to offer!",
		bg: 'bg-purple',
		photos: [
			{ src: IMG + 'nyc-1.jpg', alt: 'Kebab party in our patio' },
			{ src: IMG + 'nyc-2.jpg', alt: 'Views from Central Park' },
			{ src: IMG + 'nyc-3.jpg', alt: "Elyse's masquerade birthday party" },
			{ src: IMG + 'nyc-4.jpg', alt: 'Brooklyn Half Marathon' }
		]
	},
	{
		when: 'January 2025',
		title: 'Will you marry me?',
		text: 'Gabe proposed to Elyse at the first summit of their hiking trip in Chilean Patagonia. Cue an exciting year of travel, job changes, and preparing for the biggest day of our lives!',
		bg: 'bg-mustard',
		videos: [
			{
				label: 'Engagement video',
				kind: 'youtube',
				src: 'https://www.youtube.com/embed/hjI9I55pK-A'
			}
		],
		photos: [
			{ src: IMG + 'proposal-1.jpg', alt: 'The proposal in Patagonia' },
			{ src: IMG + 'proposal-2.jpg', alt: 'Celebrating our engagement in Patagonia' },
			{ src: IMG + 'proposal-3.jpg', alt: 'Hiking in Chilean Patagonia' }
		]
	},
	{
		when: 'August 2026',
		title: 'Our Wedding Day',
		text: "The day we've been dreaming of - celebrating our love with all our favorite people in the beautiful mountains of North Carolina.",
		bg: 'bg-teal',
		link: { href: '/wedding', label: 'More from our wedding' },
		videos: [
			{
				label: 'Highlight film',
				kind: 'file',
				src: VF + 'sgdh7qbv-pu0w2gyl/u/Elyse_Gabrielhighlight1_main.mp4',
				poster:
					VF_POSTER +
					'axpxrsa4/CleanShot_20260816_at_0005132x.jpg?width=960&height=960&optimize=image'
			}
		],
		photos: [
			{
				src: '/images/wedding-cover.jpg',
				alt: 'Gabe dipping Elyse for a kiss in the aisle after the ceremony'
			}
		]
	},
	{
		when: 'Honeymoon',
		title: 'South Africa & Mauritius',
		text: 'We kicked off married life with a honeymoon in South Africa and Mauritius.',
		bg: 'bg-coral',
		videos: [
			{
				label: 'Honeymoon video',
				kind: 'file',
				src: '/story-video/honeymoon.mp4',
				poster: '/story-video/honeymoon-poster.jpg'
			}
		],
		photos: []
	}
];
