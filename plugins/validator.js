/* eslint-disable no-useless-escape */
export default ({ app }, inject) => {
  inject('rules', {
    email: [
      v => !!v || 'email is required',
      v => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(v) || 'wrong email format'
    ],
    password: [
      v => !!v || 'password is required',
      v => (v || '').length <= 100 || 'max characters 100'
    ],
    Password_confirmation: [v => !!v || 'password confirmation required'],
    firstname: [
      v => !!v || 'firstname is required',
      v => (v || '').length <= 100 || 'max characters 100',
      v => (v || '').length >= 2 || 'min characters 2'
    ],
    lastname: [
      v => !!v || 'lastname is required',
      v => (v || '').length <= 100 || 'max characters 100',
      v => (v || '').length >= 2 || 'min characters 2'
    ],

    category: [v => !!v || 'category is required'],
    title: [
      v => !!v || 'title is required',
      v => (v || '').length <= 100 || '100 characters max'
    ],
    location: [v => !!v || 'location is required'],
    description: [v => (v || '').length <= 16000 || '16000 characters max'],
    startDate: [v => !!v || 'start date is required'],
    endDate: [v => !!v || 'end date is required'],
    startTime: [v => !!v || 'start time is required'],
    endTime: [v => !!v || 'end time is required'],
    price: [v => v >= 0 || 'price must be a positive value'],
    tickets: [v => v >= 5 || 'at least 5 tickets']
  })
}
