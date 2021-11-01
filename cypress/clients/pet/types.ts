export type PetCategory = {
    id: number;
    name: string;
};

export type PetTag = {
    id: number;
    name: string;
};

export type PetData = {
    id: number;
    category: PetCategory;
    name: string;
    photoUrls: [string];
    tags: [PetTag];
    status: 'available' | 'pending' | 'sold';
};
