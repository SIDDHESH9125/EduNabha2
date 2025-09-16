document.addEventListener('DOMContentLoaded', () => {
    const studentBtn = document.getElementById('student-btn');
    const teacherBtn = document.getElementById('teacher-btn');
    const loginForm = document.getElementById('login-form');

    let selectedRole = 'student'; // Default to student

    // Highlight the student button on page load
    studentBtn.classList.add('bg-indigo-50', 'border-indigo-500');

    studentBtn.addEventListener('click', () => {
        selectedRole = 'student';
        studentBtn.classList.add('bg-indigo-50', 'border-indigo-500');
        teacherBtn.classList.remove('bg-indigo-50', 'border-indigo-500');
    });

    teacherBtn.addEventListener('click', () => {
        selectedRole = 'teacher';
        teacherBtn.classList.add('bg-indigo-50', 'border-indigo-500');
        studentBtn.classList.remove('bg-indigo-50', 'border-indigo-500');
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevents the form from submitting in the traditional way

        // In a real application, you would validate the email and password here
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Perform login validation (this is a placeholder)
        // For this example, we'll assume login is always successful
        const loginSuccessful = true; 

        if (loginSuccessful) {
            if (selectedRole === 'student') {
                window.location.href = 'studentdashboard.html';
            } else if (selectedRole === 'teacher') {
                window.location.href = 'teacherdashboard.html';
            }
        } else {
            // Handle failed login (e.g., show an error message)
            alert('Login failed. Please check your credentials.');
        }
    });
});