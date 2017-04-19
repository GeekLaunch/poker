let ui = new UI(document.querySelector('main')!),
    round: Round,
    player = {
        cash: 100,
    };

function init (): void {
    reset();

    ui.betButton.addEventListener('click', function () {
        let bet: number = parseInt(ui.betInput.value);
        if (bet > player.cash && bet <= 0) return;
        round = new Round(bet);
        round.draw();

        player.cash -= bet;
        updateCash();

        round.hand.cards.forEach(c => {
            ui.addCard(c);
        });

        ui.playMode();

        msg('Click on the cards you wish to discard');
    });

    ui.playButton.addEventListener('click', function () {
        round.hand.cards.forEach((c, i) => {
            let u: UICard = ui.cards.get(c)!;

            if (u.discarded) {
                let newCard = round.deck.draw();
                round.hand.cards[i] = newCard;
                ui.replaceCard(newCard, c);
            }
        });

        let score = round.hand.getScore(),
            payout = score.rank.payout * round.bet;

        player.cash += payout;
        updateCash();

        score.scoringCards.forEach(c => {
            ui.cards.get(c)!.highlighted = true;
        });

        ui.gameOverMode();
        ui.disableCards();

        msg('Hand: ' + score.rank.name + '<br>Winnings: $' + payout);
    });

    ui.resetButton.addEventListener('click', function () {
        reset();
    });
}

function reset () {
    ui.betMode();
    ui.clearCards();
    ui.enableCards();
    clearMsg();
}

function updateCash (): void {
    ui.updateCash(player.cash);
}

function msg (str: string): void {
    ui.msg.innerHTML += str + '<br>';
}

function clearMsg (): void {
    ui.msg.innerHTML = '';
}

init();
