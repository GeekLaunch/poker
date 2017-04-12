class UI {
    private parent: Element;
    private cashDisplay: Element;
    private betInput: HTMLInputElement;
    public readonly betButton: HTMLButtonElement;
    private cardsListElement: Element;
    public readonly playButton: HTMLButtonElement;
    private _cards: WeakMap<Card, UICard>;

    public constructor (parent: Element) {
        this.parent = parent;
        this.cashDisplay = <Element> parent.querySelector('.cash');
        this.betInput = <HTMLInputElement> parent.querySelector('.bet-input');
        this.betButton = <HTMLButtonElement> parent.querySelector('.bet-button');
        this.playButton = <HTMLButtonElement> parent.querySelector('.play-button');
        this.cardsListElement = <Element> parent.querySelector('.cards');

        this._cards = new WeakMap();
    }

    public get cards (): WeakMap<Card, UICard> {
        return this._cards;
    }

    public addCard (card: Card): UICard {
        let u = new UICard(card);
        this._cards.set(card, u);

        this.cardsListElement.appendChild(u.element);

        return u;
    }

    public replaceCard (newCard: Card, oldCard: Card): UICard {
        let oldUICard = this._cards.get(oldCard);

        if (oldUICard === undefined)
            throw 'Card not in display';

        let u = new UICard(newCard);

        this.cardsListElement.replaceChild(u.element, oldUICard.element);
        this._cards.delete(oldCard);
        this._cards.set(newCard, u);

        return u;
    }

    public clearCards (): void {
        this._cards = new WeakMap();

        while (this.cardsListElement.firstChild) {
            this.cardsListElement.removeChild(this.cardsListElement.firstChild);
        }
    }
}