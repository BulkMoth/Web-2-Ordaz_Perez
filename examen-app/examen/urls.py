from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('boletos/', views.boletos, name='boletos'),
    path('eventos/', views.eventos, name='eventos'),  # Nueva ruta para eventos
    
    path('boletos/evento/<int:evento_id>/', views.boletos_por_evento, name='boletos_por_evento'),
    path('eventos/agregar/', views.agregar_evento, name='agregar_evento'),
    path('productos/', views.mostrar_productos, name='mostrar_productos'),  # Nueva ruta
    path('api/agregar_producto/', views.agregar_producto, name='agregar_producto'),
    path('api/productos/', views.obtener_productos, name='obtener_productos'),
]

