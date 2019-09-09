import React, { Component } from "react";

import CardBack from "../images/back.png";

import Cat from "../images/Cat.jpeg";
import Dog from "../images/dog.jpg";
import Tiger from "../images/Tiger.jpg";
import Elephant from "../images/Elephant.jpg";
import Monkey from "../images/Monkey.jpg";
import Stag from "../images/Stag.jpg";
import Bird from "../images/Bird.jpg";
import Squirrel from "../images/Squirrel.jpg";
import Flamingo from "../images/Flamingo.jpg";

export default class MemoryGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [
        Cat,
        Dog,
        Tiger,
        Elephant,
        Monkey,
        Stag,
        Bird,
        Squirrel,
        Flamingo
      ],
      flippedCards: [],
      finalDeck: [],
      leaderboard: [],
      indexArr: [],
      hasFlipped: false,

      flips: 0,
      completed: 0,

      start: true,

      gameOver: false
    };
  }

  startGame = () => {
    let finalDeck = [];
    let dupedCards = [];
    let shuffledCards = [];

    dupedCards = this.state.cards.concat(this.state.cards);
    shuffledCards = this.shuffle(dupedCards);
    shuffledCards.map(name => {
      finalDeck.push({
        name,
        close: true,
        matched: false
      });
    });
    this.setState({
      finalDeck: finalDeck,
      gameOver: true,
      flips: 0,
      completed: 0
    });
  };

  // Fisher-Yates shuffling algorithm
  shuffle(arr) {
    var i, j, temp;
    for (i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    return arr;
  }

  checkValues = (card, index) => {
    let hasFlipped = this.state.hasFlipped;
    let firstPick = {};
    let lastPick = {};
    let index1 = -1;
    let index2 = -1;

    let finalDeck = this.state.finalDeck;

    let indexes = this.state.indexArr;
    let flippedItems = this.state.flippedCards;
    if (this.state.start) {
    }

    if (this.state.flippedCards.length < 1 && !hasFlipped) {
      firstPick = card;
      index1 = index;
      indexes.push(index1);
      finalDeck[index].close = false;
      flippedItems.push(firstPick);
      this.setState({
        flips: this.state.flips + 1,
        flippedCards: flippedItems,
        indexArr: indexes,
        hasFlipped: true,
        start: true
      });
    }

    if (this.state.flippedCards.length < 2 && hasFlipped) {
      lastPick = card;
      index2 = index;
      indexes.push(index2);
      finalDeck[index].close = false;
      flippedItems.push(lastPick);
      this.setState({
        flips: this.state.flips + 1,
        flippedCards: flippedItems,
        indexArr: indexes
      });
      if (
        this.state.flippedCards[0].name === this.state.flippedCards[1].name &&
        this.state.indexArr[0] !== this.state.indexArr[1]
      ) {
        setTimeout(() => {
          finalDeck[this.state.indexArr[0]].matched = true;
          finalDeck[this.state.indexArr[1]].matched = true;
          this.setState({ completed: this.state.completed + 1 });
          if (this.state.completed === this.state.cards.length) {
            this.setState({ gameOver: true });
          }
        }, 100);
      } else {
        setTimeout(() => {
          finalDeck[this.state.indexArr[0]].close = true;
          finalDeck[this.state.indexArr[1]].close = true;
        }, 500);
      }
      setTimeout(() => {
        this.setState({
          hasFlipped: false,
          indexArr: [],
          flippedCards: [],
          finalDeck
        });
      }, 600);
    }
  };

  componentDidMount() {
    this.startGame();
  }

  render() {
    return (
      <div>
        {this.state.gameOver ? (
          <div className="gameOver">
            <div>
              You won! <br />
              You flipped {this.state.flips} times
            </div>
            <button className="btn" onClick={this.startGame}>
              Start over
            </button>
          </div>
        ) : null}
        <div className="title">
          <div className="title-text">Match the cards!</div>
          <div className="title-text">Tries: {this.state.flips}</div>
        </div>
        <div className="card-container">
          <div className="cards-center">
            {this.state.finalDeck.map((card, index) => {
              return (
                <div className="card">
                  {!card.close ? (
                    <div>
                      <img
                        className={
                          "card" +
                          (card.matched ? " matched" : "") +
                          (!card.close ? " opened" : "")
                        }
                        src={card.name}
                        alt="Animal"
                      />
                    </div>
                  ) : (
                    <div
                      key={index}
                      onClick={() => this.checkValues(card, index)}
                    >
                      <img
                        src={CardBack}
                        alt="CardBack"
                        className={
                          "card" +
                          (!card.close ? " opened" : "") +
                          (card.matched ? " matched" : "")
                        }
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
