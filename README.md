[![Build Status](https://travis-ci.org/minot0r/iutcalendar.svg?branch=master)](https://travis-ci.org/minot0r/iutcalendar)

# iutcalendar
a npm package to retrieve courses of Nantes' IUT

# install
install using
`npm i @minot0r/iutcalendar`

# example

this is a basic example of getting next course using iutcalendar

```js
/* Basically you're creating your EDT object, then you build it, 
 * build here does retrieve all courses from constructor parameters
 * and returns a Promise which gives you back your EDT object
 * with courses loaded.
 * 
 * Play around with other EDT methods which you can find on docs
 */
new EDT(new Group(1, 1), new Date()).build().then(edt => {
    let nextCourse = edt.getClosestCourse()
    // Play around with your course, find all data you can get from it with docs
}).catch(err => {
    // In case there is an error
})
```