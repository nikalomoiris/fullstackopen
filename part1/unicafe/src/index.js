import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Statistics = ({ good, neutral, bad, totalFeedback, averageFeedbaack, positivePercentage }) => {
    if (totalFeedback === 0) {
        return (
            <>
                <h1>statistics</h1>
                <p>No feedback given</p>
            </>
        );
    }
    return (
        <>
            <h1>statistics</h1>
            <p>good: {good}</p>
            <p>neutral: {neutral}</p>
            <p>bad: {bad}</p>
            <p>all: {totalFeedback}</p>
            <p>average: {averageFeedbaack}</p>
            <p>positive: {positivePercentage}%</p>
        </>
    )
}

const App = () => {
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    const goodFeedback = () => {
        setGood(good + 1);
    }

    const neutralFeedback = () => {
        setNeutral(neutral + 1);
    }

    const badFeedback = () => {
        setBad(bad + 1);
    }

    const totalFeedback = () => good + neutral + bad;

    const averageFeedbaack = () => {
        return (
            (good + (bad * (-1))) / totalFeedback()
        );
    }

    const positivePercentage = () => {
        return (
            (good / totalFeedback()) * 100
        );
    }

    return (
        <div>
            <h1>give feedback</h1>
            <button onClick={() => goodFeedback()}>good</button>
            <button onClick={() => neutralFeedback()}>neutral</button>
            <button onClick={() => badFeedback()}>bad</button>
            <h1>statistics</h1>
            <Statistics good={good}
                        neutral={neutral}
                        bad={bad}
                        totalFeedback={totalFeedback()}
                        averageFeedbaack={averageFeedbaack()}
                        positivePercentage={positivePercentage()} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));
