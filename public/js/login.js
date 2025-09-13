
function showErrorMessage(error) {
    console.log(error);
    document.getElementById('err').textContent = error.response?.data.message ? `${error.response.data.message}` : 'Something went wrong! Please try again.';
    document.addEventListener('click', () => document.getElementById('err').textContent = "", { once: true });
}

async function loginUser(e) {
    e.preventDefault();
    try {
        const loginDetails = {
            email: e.target.email.value,
            password: e.target.password.value
        }
        const response = await axios.post('/user/login', loginDetails);
        alert(response.data.message);
        window.location.href = "../expense";

    }
    catch (error) {
        showErrorMessage(error);
    }
}

async function signupUser(e) {
    e.preventDefault();
    try {
        const signupDetails = {
            name: e.target.name.value,
            email: e.target.email.value,
            password: e.target.password.value
        }
        const response = await axios.post('/user/signup', signupDetails);
        console.log(response);
        alert(response.data.message);
        window.location.href = "../expense";


    } catch (error) {
        showErrorMessage(error);
    }
}

function togglePassword(e) {
    e.target.classList.toggle('fa-eye');
    const inputPasswordElement = document.getElementById('password');
    inputPasswordElement.type = inputPasswordElement.type === 'password' ? 'text' : 'password';
}
