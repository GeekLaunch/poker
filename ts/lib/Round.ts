class Round {
    public readonly deck: Deck;
    public readonly hand: Hand;
    public readonly bet: number;

    public constructor (bet: number) {
        this.bet = bet;
        this.deck = new Deck();
        this.deck.shuffle();
        this.hand = new Hand();
    }

    public draw (): void {
        this.hand.cards.push(this.deck.draw());
        this.hand.cards.push(this.deck.draw());
        this.hand.cards.push(this.deck.draw());
        this.hand.cards.push(this.deck.draw());
        this.hand.cards.push(this.deck.draw());
    }
}