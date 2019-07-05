import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Statistic = ({ text, value }) => {
    return (
        <p>{text}: {value}</p>
    )
}

const Statistics = ({ good, neutral, bad, totalFeedback, averageFeedbaack, positivePercentage }) => {
    if (totalFeedback === 0) {
        return (
            <p>No feedback given</p>
        );
    }
    return (
        <>
            <Statistic text="good" value={good} />
            <Statistic text="neutral" value={neutral} />
            <Statistic text="bad" value={bad} />
            <Statistic text="all" value={totalFeedback} />
            <Statistic text="average" value={averageFeedbaack} />
            <Statistic text="positive" value={positivePercentage} />
        </>
    )
}

const Button = ({ func, text }) => {
    return (
        <button onClick={func}>{text}</button>
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
            (good / totalFeedback()) * 100 + '%'
        );
    }

    return (
        <div>
            <h1>give feedback</h1>
            <Button func={() => goodFeedback()} text="good" />
            <Button func={() => neutralFeedback()} text="neutral" />
            <Button func={() => badFeedback()} text="bad" />
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
