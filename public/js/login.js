async function loginUser(e) {
    e.preventDefault();
    try {
        const loginDetails = {
            email: e.target.email.value,
            password: e.target.password.value
        }
        const response = await axios.post('/user/login', loginDetails);
        console.log(response);
        alert("User logged in successfully");
    }
    catch (error) {
        console.log(error);
        alert(error.messgae);
    }
}