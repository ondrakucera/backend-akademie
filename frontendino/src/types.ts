export type Dinosaur = {
  id: number;
  name: string;
  description: string;
  period: string;
  wikipediaAddress: string;
};

export type DinosaurInput = Omit<Dinosaur, 'id'>;
