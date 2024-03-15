from domain.User import User
from domain.Authority import Authority
from WebSerializer import ma
from DatabaseConfig import db
from marshmallow_sqlalchemy import auto_field


class PublicUserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User
        load_instance = True
        exclude = (
            "first_name",
            "last_name",
            "password_hash",
            "activated",
            "lang_key",
            "image_url",
            "reset_key",
            "activation_key",
            "created_by",
            "created_date",
            "reset_date",
            "last_modified_by",
            "last_modified_date"
        )
        sqla_session = db.session

    getfName = auto_field("first_name")
    getlName = auto_field("last_name")


class AdminUserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User
        load_only = ("authority",)
        include_fk = True
        load_instance = True
        exclude = (
            "password_hash",
            "reset_key",
            "activation_key",
            "reset_date",
            "first_name",
            "last_name",
            "image_url",
            "lang_key",
            "created_by",
            "created_date",
            "last_modified_by",
            "last_modified_date",
            "roles",
        )
        sqla_session = db.session

    firstName = auto_field("first_name")
    lastName = auto_field("last_name")
    imageUrl = auto_field("image_url")
    langKey = auto_field("lang_key")
    createdBy = auto_field("created_by")
    createdDate = auto_field("created_date")
    lastModifiedDate = auto_field("last_modified_date")
    lastModifiedBy = auto_field("last_modified_by")
    authorities = auto_field("roles")
    password = auto_field("password_hash")


class ManagedUserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User
        load_instance = True
        exclude = (
            "password_hash",
            "lang_key",
            "first_name",
            "last_name",
            "activated",
            "image_url",
            "activation_key",
            "reset_key",
            "created_by",
            "created_date",
            "reset_date",
            "last_modified_date",
            "last_modified_by",
        )
        sqla_session = db.session

    password = auto_field("password_hash")
    langKey = auto_field("lang_key")


class KeyAndPasswordSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User
        load_instance = True
        exclude = (
            "password_hash",
            "reset_key",
            "activation_key",
            "reset_date",
            "first_name",
            "last_name",
            "image_url",
            "lang_key",
            "created_by",
            "created_date",
            "last_modified_by",
            "last_modified_date"
        )
        sqla_session = db.session

    key = auto_field("reset_key")
    newPassword = auto_field("password_hash")


class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User
        load_only = ("authority",)
        include_fk = True
        load_instance = True
        exclude = (
            "password_hash",
            "reset_key",
            "activation_key",
            "reset_date",
            "first_name",
            "last_name",
            "image_url",
            "lang_key",
            "created_by",
            "created_date",
            "last_modified_by",
            "last_modified_date",
            "roles",
        )
        sqla_session = db.session

    firstName = auto_field("first_name")
    lastName = auto_field("last_name")
    imageUrl = auto_field("image_url")
    langKey = auto_field("lang_key")
    createdBy = auto_field("created_by")
    createdDate = auto_field("created_date")
    lastModifiedDate = auto_field("last_modified_date")
    lastModifiedBy = auto_field("last_modified_by")
    authorities = auto_field("roles")
