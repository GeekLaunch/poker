class Deck {
    private cards: Card[];

    public constructor () {
        this.cards = [];

        for (let s = 0; s < 4; s++) {
            for (let r = 1; r <= 13; r++) {
                this.cards.push(new Card(r, s));
            }
        }
    }

    public shuffle (): void {
        this.cards.sort(() => Math.floor(Math.random() * 3 - 1));
    }

    public draw (): Card {
        return <Card> this.cards.shift();
    }
}