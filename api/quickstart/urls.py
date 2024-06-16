from django.urls import path
from . import views

urlpatterns = [
    path('validate_login/', views.validate_login, name='validate_login'),
    path('submit_request/', views.submit_request, name='submit_request'),
    path('get_request/', views.get_request, name='get_request'),
    path('update_request/', views.update_request, name='update_request'),    
    path('delete_request/', views.delete_request, name='delete_request'),
    path('get_requests/', views.get_requests, name='get_requests'),
    path('get_suppliers/', views.get_suppliers, name='get_suppliers'),
]