exports.validateUser = (body) => {
    let valid_gender = ['male', 'female']
    let error = !body.name ? 'name is required' : !body.age ? 'age is required' : !body.gender ? 'gender is required' : ''
    if (error == '') {
        error = typeof body.name != 'string' ? 'name must be a string' : typeof body.age != 'number' ? 'age must be a number' : !valid_gender.includes(body.gender) ? `gender must be ${valid_gender.join(' or ')}` : ''
    }
    return error
}