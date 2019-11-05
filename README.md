# iutcalendar
a npm package to retrieve courses of Nantes' IUT
[![Build Status](https://travis-ci.org/minot0r/iutcalendar.svg?branch=master)](https://travis-ci.org/minot0r/iutcalendar)

# example

Get closest course (next one)

    new EDT(new Group(1, 1), new Date()).build().then(edt => {
        const nextCourse = edt.getClosestCourse();
        // Work with your object 
    })