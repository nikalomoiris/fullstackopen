import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({ func, text }) => {
    return (
        <button onClick={func}>{text}</button>
    )
}

const App = (props) => {
    const [selected, setSelected] = useState(0);
    const [votes, setVotes] = useState(new Array(6).fill(0));

    const randomSelect = (max) => {
        setSelected(Math.floor(Math.random() * Math.floor(max)));
        console.log(votes);
    }

    const castVote = () => {
        const copy = [...votes];
        copy[selected] += 1;
        setVotes(copy);
    }

    const indexOfMax = () => {
        return votes.indexOf(Math.max(...votes));
    }

    return (
        <div>
            <h1>Anecdote of the day</h1>
            {props.anecdotes[selected]}
            <p>has {votes[selected]} votes</p>
            <Button func={() => castVote()} text='vote' />
            <Button func={() => randomSelect(anecdotes.length)} text='Random Quote' />
            <h1>Anecdote with most votes</h1>
            {props.anecdotes[indexOfMax()]}
            <p>has {votes[indexOfMax()]} votes</p>
        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
);
