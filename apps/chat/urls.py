from django.urls import path

from . import views

app_name = 'chat'

urlpatterns = [
    path('room/<str:room_code>', views.join_room, name='join_room'),
    path('create-room', views.create_room, name='create_room'),
    path('', views.index_chat, name='index_chat')
]
