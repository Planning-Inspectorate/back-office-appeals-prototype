const govukPrototypeKit = require('govuk-prototype-kit')
const addFilter = govukPrototypeKit.views.addFilter

const moment = require('moment')

addFilter('formatMonth', (number) => {
	var date = moment().month(number -1)
	return date.format('MMMM')
})

addFilter('daysAgoDayNumeric', (number) => {
	var date = moment().subtract(number,"days").format("D")
	return date
})

addFilter('daysAgo', (number) => {
	var date = moment().subtract(number,"days").format("D MMMM YYYY")
	return date
})

addFilter('daysAgoNumeric', (number) => {
	var date = moment().subtract(number,"days").format("D M YYYY")
	return date
})

addFilter('monthsAgoNumeric', (number) => {
	var date = moment().subtract(number,"days").format("M")
	return date
})

addFilter('monthsInFutureNumeric', (number) => {
	var date = moment().add(number,"months").format("M")
	return date
})

addFilter('yearsAgo', (number) => {
	var date = moment().subtract(number,"days").format("YYYY")
	return date
})

addFilter('daysInFuture', (number) => {
	var date = moment().add(number,"days").format("D MMMM YYYY")
	return date
})

addFilter('daysInFutureShort', (number) => {
	var date = moment().add(number,"days").format("D MMM YYYY")
	return date
})

addFilter('daysInPast', (number) => {
	var date = moment().subtract(number,"days").format("D MMMM YYYY")
	return date
})

addFilter('daysInPastShort', (number) => {
	var date = moment().subtract(number,"days").format("D MMM YYYY")
	return date
})

addFilter('whichDay',function (value) {
  const options = { weekday: 'long' }; // Format such as 'Monday', 'Tuesday', etc.
  const formatter = new Intl.DateTimeFormat('en-GB', options); // Localised datetime formatter
  const currentDate = new Date();

  let targetDate;

  switch (value) {
	  case 'today':
      targetDate = currentDate;
      break;
	  case 'tomorrow':
      targetDate = new Date(currentDate);
      targetDate.setDate(currentDate.getDate() + 1);
      break;
	  case 'yesterday':
      targetDate = new Date(currentDate);
      targetDate.setDate(currentDate.getDate() - 1);
      break;
	  default:
	    const offset = parseInt(value, 10); // Convert the input to a base-10 integer
	    if (!isNaN(offset)) {
        targetDate = new Date(currentDate);
        targetDate.setDate(currentDate.getDate() + offset); // Apply the offset
	    } else {
        return 'Error';
	    }
	}

	// {{ 'today' | whichDay }}
	// {{ 'tomorrow' | whichDay }}
	// {{ 'yesterday' | whichDay }}
	// {{ '-2' | whichDay }}
	// {{ '+3' | whichDay }}

  return formatter.format(targetDate);
})



addFilter('push', (array, item) => {
	array.push(item)
	return array
})

addFilter('cleanArray', (array) => {
	return array.filter(item => {
		return (item && (item !==""))
	})
})
