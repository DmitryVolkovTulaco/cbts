import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import homeActions from '../home.actions';
import notification from '../../common/services/notificationService';

import "../home.scss"

class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            initialPage: true,
            againPage: false,
            questionNumber: 0,
            time: null
        }
    }

    componentDidMount() {
        this.props.fetchQuestions();
    };

    handleStartClick = () => {
        this.setState({ initialPage: false, time: moment() })
    };

    handlePlayAgain = () => {
        this.setState({ againPage: false, time: moment() })
    };

    handleSelectAnswer = (answer) => {
        if(answer === this.props.questions[this.state.questionNumber].correct_answer) {
            if(this.state.questionNumber === 9) {
                this.setState({ questionNumber: 0, againPage: true })
            }
             else this.setState({ questionNumber: this.state.questionNumber + 1 })
        } else {
            notification({
                message: 'Wrong answer',
                kind: 'danger'
            })
        }
    };

    renderQuestion(item) {
        return (
            <div className="question">
                <div className="category">Category: {item.category}</div>
                <div className="diff">Difficulty: {item.difficulty}</div>
                <div className="question">Question: {item.question}</div>
                    <div>{this.renderAnswers(item)}</div>
            </div>
        )
    };

    renderPlayAgain() {
        let now = moment();
        return (
            <div>
                <div>Time taken: {moment(now - this.state.time).format('m[ minute(s)] s[ second(s).]')}</div>
                <button className="btn btn-success btn-lg btn-again" onClick={this.handlePlayAgain}>Play Again</button>
            </div>
        )
    }

    renderAnswers(item) {
        let answers = [...item.incorrect_answers, item.correct_answer];
        for (let i = answers.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [answers[i], answers[j]] = [answers[j], answers[i]];
        }
        return (
            <div>
                {answers.map((item, index) =>
                    <button className="btn btn-primary btn-question" key={index} onClick={this.handleSelectAnswer.bind(this, item)}>
                        {item}
                    </button>
                )}
            </div>
        )
    }

    render() {
        return (
            <div className="home-page">
                <div className="text-center">
                    {this.state.againPage && this.renderPlayAgain()}
                    {this.state.initialPage &&
                        <button className="btn btn-success btn-lg btn-start" onClick={this.handleStartClick}>Start Quiz</button>}
                </div>
                {(!this.state.initialPage && !this.state.againPage) && this.renderQuestion(this.props.questions[this.state.questionNumber])}
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    fetchQuestions: () => dispatch(homeActions.fetchQuestions()),
});

const mapStateToProps = (state) => ({
    questions: state.home.questions,
    answers: state.home.answers,
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)