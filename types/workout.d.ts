export interface WorkoutApiType {
  name: string;
  tags: string[];
  image?: string;
  id: string;
  description: string;
  author: string;
  type: string;
  tags: string[];
  isFavorite: boolean;
  blocks: [
    {
      title: string;
      items: WorkoutItem[];
    },
  ];
}
