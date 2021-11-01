export type Inventory = {
    sold: number;
    booked: number;
    string: number;
    unavailable: number;
    pending: number;
    available: number;
    StatusJvR: number;
    ok: number;
    Zajęta: number;
    OK: number;
    avaible: number;
    [status: string]: number;
};

export type Order = {
    id: number;
    petId: number;
    quantity: number;
    shipDate: string;
    status: 'placed' | 'approved' | 'delivered';
    complete: boolean;
};
