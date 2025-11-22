from django.urls import path, include
from .views import *



urlpatterns = [
    path('admin-login/', AdminLoginView.as_view(), name='login'),
    path('admin-logout/', AdminLogoutView.as_view(), name='logout'),

    path('reset-password/confirm_password/', CustomPasswordTokenVerificationView.as_view(), name='confirm_password'),  # confirm password
    path('reset-password/', include('django_rest_passwordreset.urls', namespace='password_reset')),
]
