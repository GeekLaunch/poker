enum Suit {
    Spades,
    Clubs,
    Hearts,
    Diamonds,
};

class Card {
    public readonly rank: number;
    public readonly suit: number;

    public constructor (rank: number, suit: Suit) {
        this.rank = rank;
        this.suit = suit;
    }

    private static rankNames = [
        'Ace',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        'Jack',
        'Queen',
        'King',
    ];

    public get rankName (): string {
        return Card.rankNames[this.rank - 1];
    }

    public get suitName (): string {
        return Suit[this.suit];
    }

    public get name (): string {
        return this.rankName + ' of ' + this.suitName;
    }
}