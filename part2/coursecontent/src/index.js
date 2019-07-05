import React from 'react';
import ReactDOM from 'react-dom';

const Part = ({part, exercises}) => {
    return (
        <p>
            {part} {exercises}
        </p>
    )
}

const Header = ({course}) => {
    return (
        <h1>{course}</h1>
    )
}

const Content = ({ parts }) => {
    const course_parts = () => parts.map(part =>
        <Part
            key={part.id}
            part={part.name}
            exercises={part.exercises}
        />
    );

    return (
        <>
            {course_parts()}
        </>
    )
}

const Total = ({ parts }) => {
    const total = parts
                    .map(part => part.exercises)
                    .reduce((total, amount) => total + amount, 0);
    return (
        <p>
            <strong>total of {total} exercises</strong>
        </p>
    )
}

const Course = ({course, parts}) => {
    return (
        <>
            <Header course={course} />
            <Content parts={parts} />
            <Total parts={parts} />
        </>
    )
}

const App = () => {
    const courses = [
        {
            name: 'Half Stack application development',
            id: 1,
            parts: [
                {
                    name: 'Fundamentals of React',
                    exercises: 10,
                    id: 1
                },
                {
                    name: 'Using props to pass data',
                    exercises: 7,
                    id: 2
                },
                {
                    name: 'State of a component',
                    exercises: 15,
                    id:3
                }
            ]
        },
        {
            name: 'Node.js',
            id: 2,
            parts: [
              {
                name: 'Routing',
                exercises: 3,
                id: 1
              },
              {
                name: 'Middlewares',
                exercises: 6,
                id: 2
              }
            ]
        }
    ]

    return (
        <div>
            {courses.map((course) => <Course key={course.id} course={course.name} parts={course.parts} />)}
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));
