#setting file
import os
import datetime
from pathlib import Path
from datetime import timedelta
from dotenv import load_dotenv
import dj_database_url
import mimetypes

load_dotenv()
mimetypes.add_type("text/javascript", ".js", True)
mimetypes.add_type("text/css", ".css", True)

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ.get('SECRET_KEY')
# SECRET_KEY = 'django-insecure-p07mtuuqn&30g@)e6*r&fpkdl_i5^y4*=3#d57ka66b$6jx==e'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = os.environ.get('DEBUG', "False").lower() == "true"
# DEBUG = True

# ALLOWED_HOSTS = os.environ.get("ALLOWED_HOSTS").split(" ")
ALLOWED_HOSTS = []

# Application definition


DJANGO_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'corsheaders',
]

THIRD_PARTY_APPS = [
   'rest_framework',
   'rest_framework_simplejwt',
   'django_rest_passwordreset'
]

LOCAL_APPS = [
    'account'
]

INSTALLED_APPS = DJANGO_APPS + THIRD_PARTY_APPS + LOCAL_APPS

AUTH_USER_MODEL = 'account.CustomUser'

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
]

ROOT_URLCONF = 'config.urls'


TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR,'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'config.wsgi.application'


# Database
DATABASES = {'default': dj_database_url.config(default=os.environ.get('DATABASE_URL'))}


# Password validation
# https://docs.djangoproject.com/en/5.0/ref/settings/#auth-password-validators
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True



STATIC_URL = '/static/'
STATICFILES_DIRS = [os.path.join(BASE_DIR, 'static')]
STATIC_ROOT=os.path.join(BASE_DIR,'staticfiles')


# CORS_ALLOWED_ORIGINS = [
#     'https://cabriot-admin-frontend.vercel.app/',
#     'https://cabriot-admin-frontend.vercel.app',
#     "35.160.120.126",
#     "44.233.151.27",
#     "34.211.200.85",
#     "http://localhost:5173",
#     "http://localhost:8000",
# ]

# CORS_ALLOWED_ORIGINS = [
#     "http://localhost:5173",
#     "http://127.0.0.1:5173",
# ]


CSRF_TRUSTED_ORIGINS = ['https://cabriot-admin-frontend.vercel.app/', 'https://cabriot-admin-frontend.vercel.app']
# CSRF_TRUSTED_ORIGINS = ["http://localhost:5173", "http://localhost:5173/","http://127.0.0.1:5173"]


CORS_ALLOW_METHODS = [
    'DELETE',
    'GET',
    'OPTIONS',
    'PATCH',
    'POST',
    'PUT',
]

CORS_ALLOW_HEADERS = [
    'accept',
    'accept-encoding',
    'authorization',
    'content-type',
    'dnt',
    'origin',
    'user-agent',
    'x-csrftoken',
    'x-requested-with',
]

# Optional: Allow all methods and headers
CORS_ALLOW_ALL_ORIGINS = True



# Default primary key field type
# https://docs.djangoproject.com/en/5.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


REST_FRAMEWORK = {
    
    'DEFAULT_AUTHENTICATION_CLASSES': (
        
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),

    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
        'rest_framework.permissions.AllowAny',
        "rest_framework.parsers.JSONParser",
        "rest_framework.parsers.FormParser",
        "rest_framework.parsers.MultiPartParser",
    ],

}

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=180),
    "REFRESH_TOKEN_LIFETIME": timedelta(days= 90),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': True,

    'ALGORITHM': 'HS256',
    'VERIFYING_KEY': None,
    'AUDIENCE': None,
    'ISSUER': None,

    'AUTH_HEADER_TYPES': ('Bearer', 'JWT'),
    'USER_ID_FIELD': 'id',
    'USER_ID_CLAIM': 'user_id',

    'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken',),
    'TOKEN_TYPE_CLAIM': 'token_type',

    'JTI_CLAIM': 'jti',

    'SLIDING_TOKEN_REFRESH_EXP_CLAIM': 'refresh_exp',
    'SLIDING_TOKEN_LIFETIME': timedelta(minutes=15),
    'SLIDING_TOKEN_REFRESH_LIFETIME': timedelta(days=1),
}

REST_USE_JWT = True

DJANGO_REST_PASSWORDRESET_TOKEN_CONFIG = {
    "CLASS": "django_rest_passwordreset.tokens.RandomStringTokenGenerator",
    "OPTIONS": {"min_length": 50, "max_length": 60},
}

# OTP = {
#     "OTP_DIGIT_LENGTH": environ("OTP_DIGIT_LENGTH", cast=int, default=4),
#     "OTP_EXPIRATION_TIME": timedelta(
#         minutes=env("OTP_EXPIRATION_TIME_IN_MINUTES", cast=int, default=30),
#         seconds=env("OTP_EXPIRATION_TIME_IN_SECONDS", cast=int, default=0),
#     ),



#smtp settings
EMAIL_BACKEND = os.environ.get('EMAIL_BACKEND')
EMAIL_USE_TLS = os.environ.get('EMAIL_USE_TLS', 'True') == 'True'
EMAIL_USE_SSL = os.environ.get('EMAIL_USE_SSL', 'False') == 'True'
EMAIL_HOST = os.environ.get('EMAIL_HOST')
EMAIL_PORT = int(os.environ.get('EMAIL_PORT', '587'))
EMAIL_HOST_USER = os.environ.get('EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD = os.environ.get('EMAIL_HOST_PASSWORD')
DOMAIN = os.environ.get('DOMAIN')
SITE_NAME = "Cabriot-Admin"


# FRONTEND_URL = 'http://localhost:5173'
FRONTEND_URL = 'https://cabriot-admin-frontend.vercel.app'


CACHES = {
    'default': {
        'BACKEND': 'django_redis.cache.RedisCache',
        'LOCATION': 'redis-16572.c281.us-east-1-2.ec2.cloud.redislabs.com:16572',
        'OPTIONS': {
            'CLIENT_CLASS': 'django_redis.client.DefaultClient',
        },
    }
}


CORS_ALLOW_CREDENTIALS = True
CSRF_COOKIE_HTTPONLY = False

SESSION_COOKIE_SECURE = False
CSRF_COOKIE_SECURE = False
CSRF_USE_SESSIONS = True
CSRF_COOKIE_SAMESITE = 'None'
SESSION_COOKIE_HTTPONLY=False


CSRF_COOKIE_DOMAIN = "https://cabriot-admin-frontend.vercel.app"
CSRF_COOKIE_NAME = "csrftoken"
CSRF_HEADER_NAME = 'HTTP_X_CSRFTOKEN'

# CSRF_COOKIE_DOMAIN = 'localhost'
# CSRF_COOKIE_PATH = '/'