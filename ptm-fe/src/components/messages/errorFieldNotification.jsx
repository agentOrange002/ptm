export const warningAol = value => 
    value && /.+@aol\.com/.test(value) ? 'Really? You still use AOL for your email?' : undefined 
    
export const errorEmail = value =>  
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Invalid email address' : undefined

export const required = value => (value || typeof value === 'number' ? undefined : 'Required')

export const maxLength = max => value => value && value.length > max ? `Must be ${max} characters or less` : undefined

export const maxLength150 = maxLength(150)

export const minLength = min => value => value && value.length < min ? `Must be ${min} characters or more` : undefined

export const minLength5 = minLength(5)

export const minLength10 = minLength(10)

export const minLength1 = minLength(1)

export const number = value =>  value && isNaN(Number(value)) ? 'Must be a number' : undefined

export const minValue = min => value => value && value < min ? `Must be at least ${min}` : undefined

export const minValue13 = minValue(13)

export const tooYoung = value => value && value < 13 ? 'You do not meet the minimum age requirement!' : undefined

export const alphaNumeric = value => value && /[^a-zA-Z0-9 ]/i.test(value) ? 'Only alphanumeric characters' : undefined

export const phoneNumber = value => value && !/^(0|[1-9][0-9]{9})$/i.test(value) ? 'Invalid phone number, must be 10 digits' : undefined

export const passwordsMustMatch = (value, allValues) =>  value !== allValues.password ? 'Passwords do not match' : undefined