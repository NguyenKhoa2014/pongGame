import { SVG_NS, KEYS } from '../settings';

import Board from './Board';

import Paddle from './Paddle';
import Ball from './Ball';
import Score from './Score';

export default class Game {

    constructor(element, width, height) {
        this.element = element;
        this.width = width;
        this.height = height;

        this.boardGap = 10;
        this.paddleWidth = 8;
        this.paddleHeight = 100;

        this.gameElement = document.getElementById(this.element);

        this.pause = false;
        this.newBall = false;

        this.board = new Board(this.width, this.height);
       

        this.ping = new Audio('public/sounds/pong-04.wav');

        this.player1 = new Paddle(
            this.height,
            this.paddleWidth,
            this.paddleHeight,
            this.boardGap,
            ((this.height - this.paddleHeight) / 2),
            KEYS.a,
            KEYS.z
        )

        this.player2 = new Paddle(
            this.height,
            this.paddleWidth,
            this.paddleHeight,
            (this.width - this.boardGap - this.paddleWidth),
            ((this.height - this.paddleHeight) / 2),
            KEYS.up,
            KEYS.down
        )



        this.ball = new Ball(
            this.radius = 8,
            this.boardWidth = width,
            this.boardHeight = height

        )
        this.ball1 = new Ball(
            this.radius = 8,
            this.boardWidth = width,
            this.boardHeight = height

        )
        this.ball2 = new Ball(
            this.radius = 4,
            this.boardWidth = width,
            this.boardHeight = height
        )


        this.score1 = new Score(this.width / 2 - 50, 30, 30,'white');
        this.score2 = new Score(this.width / 2 + 25, 30, 30,'white');
        this.score3 = new Score(this.width / 2 - 130, 70, 40,'yellow');
        this.score4 = new Score(this.width / 2 - 160, 120, 40,'yellow');

        document.addEventListener('keydown', event => {
            switch (event.keyCode) {
                case KEYS.spaceBar:
                    this.pause = !this.pause;
                    break;
                case KEYS.n:
                    this.newBall = !this.newBall;
                    break;

            }
        });

    }

    render() {

        if (this.pause) {
            return;
        }

        this.gameElement.innerHTML = '';

        let svg = document.createElementNS(SVG_NS, 'svg');
        svg.setAttributeNS(null, 'width', this.width);
        svg.setAttributeNS(null, 'height', this.height);
        svg.setAttributeNS(null, 'viewbox', `0 0 ${this.width} ${this.height}`);
        this.gameElement.appendChild(svg);

        this.board.render(svg);

        this.player1.render(svg);
        this.player2.render(svg);

        this.ball.render(svg, this.player1, this.player2);
        this.ball1.render(svg, this.player1, this.player2);
        this.score1.render(svg, this.player1.score);
        this.score2.render(svg, this.player2.score);
        if (this.newBall) {
            this.ball2.render(svg, this.player1, this.player2);
        }
        let winner = 'Winner: ';
        let playAgain = 'Refresh to play again';
        let score1 = parseInt(this.player1.score);
        let score2 = parseInt(this.player2.score);

        if (score2 > score1) {
            winner += 'Player2 ';
        }
        else {
            winner += 'Player1 ';
        }

        if (score1 === 3 || score2 === 3) {
            this.ping.play();
            this.board.render(svg);
            this.score3.render(svg, winner);
            this.score4.render(svg, playAgain);
            
            this.pause = true;

        }



    }



}