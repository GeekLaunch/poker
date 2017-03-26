let hands = [
    // Royal flush
    new Hand([
        new Card(10, Suit.Clubs),
        new Card(11, Suit.Clubs),
        new Card(12, Suit.Clubs),
        new Card(13, Suit.Clubs),
        new Card(1, Suit.Clubs),
    ]),
    // Straight flush
    new Hand([
        new Card(4, Suit.Clubs),
        new Card(5, Suit.Clubs),
        new Card(6, Suit.Clubs),
        new Card(7, Suit.Clubs),
        new Card(8, Suit.Clubs),
    ]),
    // Four of a kind
    new Hand([
        new Card(10, Suit.Diamonds),
        new Card(10, Suit.Clubs),
        new Card(10, Suit.Spades),
        new Card(10, Suit.Hearts),
        new Card(1, Suit.Clubs),
    ]),
    // Full house
    new Hand([
        new Card(6, Suit.Clubs),
        new Card(6, Suit.Spades),
        new Card(6, Suit.Diamonds),
        new Card(13, Suit.Clubs),
        new Card(13, Suit.Hearts),
    ]),
    // Flush
    new Hand([
        new Card(10, Suit.Hearts),
        new Card(13, Suit.Hearts),
        new Card(4, Suit.Hearts),
        new Card(3, Suit.Hearts),
        new Card(1, Suit.Hearts),
    ]),
    // Straight
    new Hand([
        new Card(6, Suit.Clubs),
        new Card(7, Suit.Hearts),
        new Card(10, Suit.Spades),
        new Card(8, Suit.Diamonds),
        new Card(9, Suit.Diamonds),
    ]),
    // Three of a kind
    new Hand([
        new Card(10, Suit.Spades),
        new Card(4, Suit.Clubs),
        new Card(10, Suit.Diamonds),
        new Card(7, Suit.Clubs),
        new Card(10, Suit.Clubs),
    ]),
    // Two pair
    new Hand([
        new Card(5, Suit.Diamonds),
        new Card(5, Suit.Spades),
        new Card(12, Suit.Diamonds),
        new Card(2, Suit.Diamonds),
        new Card(2, Suit.Clubs),
    ]),
    // Jacks or better
    new Hand([
        new Card(11, Suit.Spades),
        new Card(11, Suit.Diamonds),
        new Card(2, Suit.Diamonds),
        new Card(3, Suit.Clubs),
        new Card(1, Suit.Spades),
    ]),
    // Nothing
    new Hand([
        new Card(5, Suit.Diamonds),
        new Card(11, Suit.Diamonds),
        new Card(12, Suit.Hearts),
        new Card(8, Suit.Hearts),
        new Card(1, Suit.Clubs),
    ]),
];

hands.forEach((h) => {
    let s = h.getScore();
    console.log(s.rank.name, s.rank.payout, s.scoringCards.map(c => c.name).join(', '));
});
