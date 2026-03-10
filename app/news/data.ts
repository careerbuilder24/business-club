export type Article = {
  title: string;
  image: string;
  slug: string;
  content: string;
};

export const articles: Article[] = [
  {
    title: "Video appears to show agent taking gun before shooting",
    image: "https://picsum.photos/700/400?10",
    slug: "agent-gun-video",
    content:
      "Full detailed article content goes here. This is where the full news story will appear.",
  },
  {
    title: "Massive winter storm disrupts travel",
    image: "https://picsum.photos/700/400?11",
    slug: "massive-winter-storm",
    content:
      "Airports closed, highways blocked, and millions affected by the winter storm.",
  },
];
