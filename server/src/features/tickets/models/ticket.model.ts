export interface Ticket {
    id: number;
    title: string;
    description: string;
    userType: 'local' | 'tourist';
    image?: string;
    date?: string;
    location?: string;
}

export const tickets: Ticket[] = [];