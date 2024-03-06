from flask_mail import Mail, Message
from flask import render_template, request
from config.BaseConfig import BaseConfig
import os


mail = Mail()
directory = os.path.dirname(os.getcwd())


def send_activation_mail(user):
    template_variable = render_template('activationEmail.html', activationKey=user.activation_key, login=user.login, baseUrl=request.url_root)
    send_mail("PyHipster activation", user.email, template_variable)


def send_creation_mail(user):
    template_variable = render_template('creationEmail.html', resetKey=user.reset_key, login=user.login, baseUrl=request.url_root)
    send_mail("PyHipster creation", user.email, template_variable)


def send_reset_mail(user):
    template_variable = render_template('passwordResetEmail.html', resetKey=user.reset_key, login=user.login, baseUrl=request.url_root)
    send_mail("PyHipster Password Reset", user.email, template_variable)


def send_mail(subject, recipient, body):
    msg = Message(
        subject,
        sender=BaseConfig.MAIL_USERNAME,
        recipients=[recipient]
    )
    msg.html = body
    mail.send(msg)
