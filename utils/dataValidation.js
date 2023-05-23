export const registerValidate = (name, email, password, cpassword) => {
    if(!name, !email, !password, !cpassword)
    return 'Please complete all fields.'

    if(!validateEmail(email))
    return 'Invalid email.'

    if(password.length < 6)
    return 'Password must be at lease 6 characters.'

    if(password !== cpassword)
    return 'Confirm password did not match.'

}

const validateEmail = (str) => str.match(/^\S+@\S+\.\S+$/)