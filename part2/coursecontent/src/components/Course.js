import React from 'react';

const Part = ({ part, exercises }) => {
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

export default Course;