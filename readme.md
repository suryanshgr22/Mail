# Mail Project

## Overview
The Mail Project is a web application developed using Django that simulates an email service. Users can send, receive, and manage emails within the platform. The project includes user authentication, inbox management, and the ability to compose new emails.

## Features
- **User Authentication**: Secure user registration, login, and logout functionalities.
- **Inbox Management**: View received emails, mark them as read or unread, and delete emails.
- **Compose Emails**: Send emails to other registered users within the platform.
- **Email Threads**: View and manage email threads for better conversation tracking.

## Technologies Used
- **Backend**: Django, Python
- **Frontend**: HTML, CSS, JavaScript, Bootstrap
- **Database**: SQLite
- **Version Control**: Git, GitHub

## Installation

### Prerequisites
- Python 3.x
- Django
- SQLite

### Steps
1. **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd mail_project
    ```

2. **Create a virtual environment**:
    ```bash
    python3 -m venv env
    source env/bin/activate
    ```

3. **Install dependencies**:
    ```bash
    pip install -r requirements.txt
    ```

4. **Apply migrations**:
    ```bash
    python manage.py migrate
    ```

5. **Run the development server**:
    ```bash
    python manage.py runserver
    ```

6. Open your web browser and go to `http://127.0.0.1:8000/` to see the application.


## Usage

### User Registration and Login
1. Navigate to the registration page to create a new account.
2. Login with your credentials.

### Composing an Email
1. After logging in, go to the "Compose" page.
2. Fill out the form with the recipient's email, subject, and message.
3. Submit the form to send the email.

### Managing the Inbox
1. Access your inbox to view received emails.
2. Click on an email to view its contents.
3. Mark emails as read/unread or delete them as needed.

## Contributing
```https://github.com/suryanshgr22/Mail.git```
If you would like to contribute to this project, please fork the repository and create a pull request with your changes. Make sure to follow the coding standards and include detailed commit messages.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contact
If you have any questions or need further assistance, please feel free to contact me at suryanshgr22@gmail.com.
