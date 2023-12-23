from flask import Flask, request
from flask_mail import Mail, Message
from flask_cors import CORS 

app = Flask(__name__)
CORS(app)

# Configure mail settings
app.config['MAIL_SERVER'] = 'smtp.gmail.com'  # Replace with your SMTP server
app.config['MAIL_PORT'] = 587  # Replace with your SMTP port
app.config['MAIL_USERNAME'] = 'runclubhousesllc@gmail.com'  # Replace with your email username
app.config['MAIL_PASSWORD'] = 'vortsbqrdagklxik'  # Replace with your email password
app.config['MAIL_USE_TLS'] = True

mail = Mail(app)

@app.route('/send_email', methods=['POST'])
def send_email():
    if request.method == 'POST':
        # email = request.form.get('email')
        # message = request.form.get('message')
        email = request.json["email"]
        message = request.json["message"]
        if email and message:
            msg = Message(email, sender='runclubhousesllc@gmail.com', recipients=['runclubhousesllc@gmail.com'])
            msg.body = message
            mail.send(msg)
            return "Email sent successfully.",200
        else:
            return "Incomplete data provided for email or message.",400
    else:
        return "Invalid request.",400

if __name__ == '__main__':
    app.run(debug=True)
