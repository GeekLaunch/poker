interface HandRank {
    name: string,
    payout: number,
};

interface Score {
    rank: HandRank,
    scoringCards: Card[],
};

let Ranks: {
    [x: string]: HandRank,
} = {
    ROYAL_FLUSH: {
        name: 'Royal Flush',
        payout: 800,
    },
    STRAIGHT_FLUSH: {
        name: 'Straight Flush',
        payout: 50,
    },
    FOUR_OF_A_KIND: {
        name: 'Four of a Kind',
        payout: 25,
    },
    FULL_HOUSE: {
        name: 'Full House',
        payout: 9,
    },
    FLUSH: {
        name: 'Flush',
        payout: 6,
    },
    STRAIGHT: {
        name: 'Straight',
        payout: 4,
    },
    THREE_OF_A_KIND: {
        name: 'Three of a Kind',
        payout: 3,
    },
    TWO_PAIR: {
        name: 'Two Pair',
        payout: 2,
    },
    JACKS_OR_BETTER: {
        name: 'Jacks or Better',
        payout: 1,
    },
    NOTHING: {
        name: 'Nothing',
        payout: 0,
    },
};

interface KindsGroup {
    cards: Card[];
    rank: number;
};

class Kinds {
    private kinds: {
        [rank: number]: Card[],
    };

    public constructor (cards: Card[]) {
        this.kinds = {};

        cards.forEach(c => {
            let r = c.rank;

            if (this.kinds[r] === undefined) this.kinds[r] = [];

            this.kinds[r].push(c);
        });
    }

    public has (numOfKinds: number): KindsGroup | false {
        let kg = this.all(numOfKinds);

        if (kg) return kg[0];

        return false;
    }

    public all (numOfKinds: number): KindsGroup[] | false {
        let result: KindsGroup[] = [];

        for (let rank of Object.keys(this.kinds)) {
            if (this.kinds[rank].length === numOfKinds) {
                result.push({
                    cards: this.kinds[rank],
                    rank: +rank,
                });
            }
        }

        if (result.length === 0) return false;

        return result;
    }
}

class Hand {
    public readonly cards: Card[];

    public constructor (cards?: Card[]) {
        if (cards !== undefined) {
            this.cards = cards;
        } else {
            this.cards = [];
        }
    }

    private isFlush (): boolean {
        let suit = this.cards[0].suit;

        return this.cards.every(c => c.suit === suit);
    }

    private isStraight (): boolean {
        return this.isAceHighStraight() || this.isAceLowStraight();
    }

    private isAceHighStraight (): boolean {
        let high, low, ranks: number[] = [];

        high = low = this.cards[0].rank;

        for (let i = 0; i < this.cards.length; i++) {
            let c = this.cards[i];
            let r = c.rank;

            if (r === 1) r = 14;

            if (ranks.indexOf(r) !== -1) return false;
            ranks.push(r);

            if (r > high) high = r;
            if (r < low) low = r;
        }

        return high - low === 4;
    }

    private isAceLowStraight (): boolean {
        let high, low, ranks: number[] = [];

        high = low = this.cards[0].rank;

        for (let i = 0; i < this.cards.length; i++) {
            let c = this.cards[i];
            let r = c.rank;

            if (ranks.indexOf(r) !== -1) return false;
            ranks.push(r);

            if (r > high) high = r;
            if (r < low) low = r;
        }

        return high - low === 4;
    }

    public has (...ranks: number[]): boolean {
        return this.cards.some(c => {
            let r = c.rank, i = ranks.indexOf(r);

            if (i !== -1) {
                ranks.splice(i, 1);
            }

            return ranks.length === 0;
        });
    }

    public getScore (): Score {
        if (this.isFlush() && this.isStraight()) {
            if (this.has(1, 10, 11, 12, 13)) {
                // Royal flush
                return {
                    rank: Ranks.ROYAL_FLUSH,
                    scoringCards: this.cards,
                };
            }

            // Straight flush
            return {
                rank: Ranks.STRAIGHT_FLUSH,
                scoringCards: this.cards,
            };
        }

        let kinds = new Kinds(this.cards);

        let has4 = kinds.has(4);

        if (has4) {
            return {
                rank: Ranks.FOUR_OF_A_KIND,
                scoringCards: has4.cards,
            };
        }

        let has3 = kinds.has(3), has2 = kinds.has(2);

        if (has3 && has2) {
            return {
                rank: Ranks.FULL_HOUSE,
                scoringCards: this.cards,
            };
        }

        if (this.isFlush()) {
            return {
                rank: Ranks.FLUSH,
                scoringCards: this.cards,
            };
        }

        if (this.isStraight()) {
            return {
                rank: Ranks.STRAIGHT,
                scoringCards: this.cards,
            };
        }

        if (has3) {
            return {
                rank: Ranks.THREE_OF_A_KIND,
                scoringCards: has3.cards,
            };
        }

        let all2 = kinds.all(2);

        if (all2 && all2.length === 2) {
            return {
                rank: Ranks.TWO_PAIR,
                scoringCards: (() => {
                    let cards: Card[] = [];

                    all2.forEach(kg => {
                        cards = cards.concat(kg.cards);
                    });

                    return cards;
                })(),
            };
        }

        if (has2 && (has2.rank >= 11 || has2.rank === 1)) {
            return {
                rank: Ranks.JACKS_OR_BETTER,
                scoringCards: has2.cards,
            };
        }

        return {
            rank: Ranks.NOTHING,
            scoringCards: [],
        };
    }
}
