class UICard {
    public readonly card: Card;
    public readonly element: Element = document.createElement('div');
    public readonly img: HTMLImageElement = document.createElement('img');
    public disabled: boolean = false;
    private _discarded: boolean = false;
    private _highlighted: boolean = false;

    public constructor (card: Card) {
        this.card = card;
        this.element.classList.add('card');
        this.element.appendChild(this.img);
        this.img.src = 'img/' + this.card.imageName;

        this.element.addEventListener('click', () => {
            if (!this.disabled)
                this.discarded = !this.discarded;
        });
    }

    public get discarded (): boolean {
        return this._discarded;
    }

    public get highlighted (): boolean {
        return this._highlighted;
    }

    public set discarded (value: boolean) {
        this._discarded = value;
        this.element.classList.toggle('discarded', this.discarded);
    }

    public set highlighted (value: boolean) {
        this._highlighted = value;
        this.element.classList.toggle('highlighted', this.highlighted);
    }
}