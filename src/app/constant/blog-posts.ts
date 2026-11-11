/**
 * Blog posts shown on /blogs, /blogs/:id and the home page.
 * There is no blog API yet, so the posts live here. The article text is
 * placeholder copy: replace it with your own posts (or load them from an API).
 */

export type BlogBlock =
  | { type: 'p'; text: string }
  | { type: 'h'; text: string }
  | { type: 'list'; items: string[] };

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  /** ISO date, e.g. 2024-10-01 */
  date: string;
  readMinutes: number;
  body: BlogBlock[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'The benefits of strength training',
    excerpt:
      'Strength training builds muscle, supports your metabolism and keeps bones and joints healthy. Here is why it belongs in every routine.',
    category: 'Strength',
    image:
      'https://plus.unsplash.com/premium_photo-1663100764663-418395b1dd86?q=80&w=1600&auto=format&fit=crop',
    date: '2024-10-01',
    readMinutes: 4,
    body: [
      {
        type: 'p',
        text: 'Lifting weights is not only for bodybuilders. Regular strength work helps you move better, feel stronger in everyday tasks and stay active for longer.',
      },
      { type: 'h', text: 'What it does for you' },
      {
        type: 'list',
        items: [
          'Builds and keeps muscle as you get older',
          'Supports bone density and joint stability',
          'Makes daily tasks like carrying and climbing stairs easier',
          'Pairs well with cardio for overall fitness',
        ],
      },
      { type: 'h', text: 'How to start' },
      {
        type: 'p',
        text: 'Begin with two or three sessions a week that cover the whole body: a squat, a push, a pull and a hinge. Focus on good technique with a weight you can control, and add load slowly over the weeks.',
      },
      {
        type: 'p',
        text: 'Not sure where to begin? Our coaches can show you the basics in the Weight Lifting class.',
      },
    ],
  },
  {
    id: '2',
    title: '10 tips for effective weight loss',
    excerpt:
      'Losing weight is a journey. These practical habits, from what you eat to how you train and rest, help you keep going.',
    category: 'Weight loss',
    image:
      'https://images.unsplash.com/photo-1470167290877-7d5d3446de4c?q=80&w=1600&auto=format&fit=crop',
    date: '2024-10-05',
    readMinutes: 5,
    body: [
      {
        type: 'p',
        text: 'There is no single trick to losing weight. Small, steady habits you can keep up beat strict plans you drop after two weeks.',
      },
      { type: 'h', text: 'Ten habits that help' },
      {
        type: 'list',
        items: [
          'Eat mostly whole foods and plenty of vegetables',
          'Include protein in every meal',
          'Drink water through the day',
          'Plan your meals so you are not caught hungry',
          'Move every day, even if it is a walk',
          'Add strength training to protect muscle',
          'Sleep well: tired bodies crave more food',
          'Track progress with more than the scale',
          'Expect slow weeks and keep going',
          'Train with others to stay accountable',
        ],
      },
      {
        type: 'p',
        text: 'If you have a health condition, talk to a doctor before making big changes to your diet or training.',
      },
    ],
  },
  {
    id: '3',
    title: 'How to stay motivated at the gym',
    excerpt:
      'Motivation comes and goes. Goals, progress tracking and a workout buddy keep you showing up when it fades.',
    category: 'Motivation',
    image:
      'https://images.unsplash.com/photo-1581009137042-c552e485697a?q=80&w=1600&auto=format&fit=crop',
    date: '2024-09-28',
    readMinutes: 3,
    body: [
      {
        type: 'p',
        text: 'Everyone has days when the couch wins. The trick is to make training a habit that does not depend on how you feel that morning.',
      },
      { type: 'h', text: 'Set a clear goal' },
      {
        type: 'p',
        text: 'Pick something specific, like running 5 km or doing ten push-ups, and give it a date. A clear target turns each session into a step forward.',
      },
      { type: 'h', text: 'Track your progress' },
      {
        type: 'p',
        text: 'Write down your workouts. Seeing the weights go up or your runs get faster is one of the best motivators there is.',
      },
      { type: 'h', text: 'Find a workout buddy' },
      {
        type: 'p',
        text: 'Training with a friend, or in a group class, makes it harder to skip and more fun to show up.',
      },
    ],
  },
  {
    id: '4',
    title: 'Why hydration matters for fitness',
    excerpt:
      'Water plays a big part in how you perform and recover. Learn the signs of dehydration and simple ways to drink enough.',
    category: 'Nutrition',
    image:
      'https://media.istockphoto.com/id/1253676339/photo/make-sure-you-stay-hydrated-throughout-your-session.webp?a=1&b=1&s=612x612&w=0&k=20&c=tBM2l140fOBpV7MWrWDXFMyyhIKrEepsZnU4upytebY=',
    date: '2024-09-20',
    readMinutes: 3,
    body: [
      {
        type: 'p',
        text: 'Your body uses water to control temperature, move nutrients and keep your joints comfortable. When you train, you lose more of it through sweat.',
      },
      { type: 'h', text: 'Signs you need to drink more' },
      {
        type: 'list',
        items: ['Feeling thirsty or dizzy', 'Dark yellow urine', 'Headaches or unusual tiredness', 'Cramps during exercise'],
      },
      { type: 'h', text: 'Simple habits' },
      {
        type: 'p',
        text: 'Keep a bottle with you, drink before and after training, and sip during long or hot sessions. Your needs change with the weather and how hard you work.',
      },
    ],
  },
  {
    id: '5',
    title: 'Yoga: a path to flexibility and mindfulness',
    excerpt:
      'Yoga is about more than touching your toes. Explore how different styles support your fitness, focus and stress levels.',
    category: 'Mind & body',
    image:
      'https://plus.unsplash.com/premium_photo-1661777196224-bfda51e61cfd?q=80&w=1600&auto=format&fit=crop',
    date: '2024-09-15',
    readMinutes: 4,
    body: [
      {
        type: 'p',
        text: 'Yoga combines movement, breathing and focus. It is a great partner to strength and cardio training because it helps you recover and move more freely.',
      },
      { type: 'h', text: 'Styles to try' },
      {
        type: 'list',
        items: [
          'Hatha: slower poses, good for beginners',
          'Vinyasa: flowing sequences linked to the breath',
          'Yin: long, quiet holds that target flexibility',
        ],
      },
      { type: 'h', text: 'Getting started' },
      {
        type: 'p',
        text: 'You do not need to be flexible to start. Come to a Yoga & Pilates class, go at your own pace and let the flexibility come with practice.',
      },
    ],
  },
];

export function findBlogPost(id: string | null): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.id === id);
}
