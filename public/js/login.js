async function loginUser(e) {
    e.preventDefault();
    try {
        const loginDetails = {
            email: e.target.email.value,
            password: e.target.password.value
        }
        const response = await axios.post('/user/login', loginDetails);
        console.log(response);
        alert(response.data.message);
        e.target.reset();
    }
    catch (error) {
        console.log(error);
        alert(error.response.data.message);
    }
}