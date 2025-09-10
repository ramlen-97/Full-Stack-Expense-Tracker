
async function registerUser(e) {
    e.preventDefault();
    try {
        const signupDetails = {
            name: e.target.name.value,
            email: e.target.email.value,
            password: e.target.password.value
        }
        const response = await axios.post('/user/signup', signupDetails);
        console.log(response);
        alert("User registered successfully");
        e.target.reset();

    } catch (error) {
        console.log(error);
        alert(error.response.data.error);
    }
}