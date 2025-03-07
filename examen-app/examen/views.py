from django.shortcuts import render, redirect
from .forms import EventoForm 
from django.http import HttpResponse
from .models import Boleto, Evento
from django.shortcuts import render, get_object_or_404
from .models import Producto
from django.http import JsonResponse


def index(request):
    return HttpResponse("Hola, mundo. Esta es la página de inicio de la aplicación examen.")

def boletos(request):
    boletos = Boleto.objects.all()  # Recupera todos los boletos desde la base de datos
    for i, boleto in enumerate(boletos, start=1):
        boleto.name = f"Boleto {i}"  # Asigna nombres secuenciales a cada boleto
    data = {
        "boletos": boletos,
        "titulo": "Lista de Boletos",
        "total_boletos": boletos.count(),
        "total_eventos": 10,  # Ejemplo de dato adicional
        "eventos": [
            {
                "id": 1, "name": "Evento 1", "image": 'images/boletos.jpg'
            },
            {
                "id": 2, "name": "Evento 2", "image": "https://example.com/evento2.jpg"
            },
            {
                "id": 3, "name": "Evento 3", "image": "https://example.com/evento3.jpg"
            },
            {
                "id": 4, "name": "Evento 4", "image": "https://example.com/evento4.jpg"
            },
            {
                "id": 5, "name": "Evento 5", "image": "https://example.com/evento5.jpg"
            },
            {
                "id": 6, "name": "Evento 6", "image": "https://example.com/evento6.jpg"
            },
            {
                "id": 7, "name": "Evento 7", "image": "https://example.com/evento7.jpg"
            },
            {
                "id": 8, "name": "Evento 8", "image": "https://example.com/evento8.jpg"
            },
            {
                "id": 9, "name": "Evento 9", "image": "https://example.com/evento9.jpg"
            },
            {
                "id": 10, "name": "Evento 10", "image": "https://example.com/evento10.jpg"
            }
        ]
    }
    return render(request, 'boletos/boletos.html', data)

def eventos(request):
    eventos = Evento.objects.all()  # Recupera todos los eventos desde la base de datos
    data = {
        "eventos": eventos,
        "titulo": "Lista de Eventos",
        "total_eventos": eventos.count(),
    }
    return render(request, 'eventos/eventos.html', data)

def boletos_por_evento(request, evento_id):
    evento = get_object_or_404(Evento, id=evento_id)  # Obtiene el evento
    boletos = Boleto.objects.filter(evento=evento)  # Filtra los boletos de ese evento
    
    context = {
        'titulo': f'Boletos para {evento.name}',
        'evento': evento,
        'boletos': boletos
    }
    return render(request, 'boletos/boletos.html', context)

def agregar_evento(request):
    if request.method == "POST":
        form = EventoForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('eventos')  # Asegúrate de que 'eventos' es el nombre correcto de la URL
    else:
        form = EventoForm()
    
    return render(request, 'eventos/agregar_evento.html', {'form': form})

def mostrar_productos(request):
    productos = Producto.objects.all()
    return render(request, 'examen/productos/productos.html', {'productos': productos})

def agregar_producto(request):
    if request.method == "POST":
        # Obtener los datos del formulario
        name = request.POST.get('name')
        precio = request.POST.get('precio')
        localidad_id = request.POST.get('localidad')

        # Validar los datos
        if not name or not precio or not localidad_id:
            return JsonResponse({'error': 'Ningún campo puede quedar vacío'}, status=400)

        try:
            precio = float(precio)
            if precio <= 0:
                return JsonResponse({'error': 'El precio debe ser mayor a 0'}, status=400)
        except ValueError:
            return JsonResponse({'error': 'El precio debe ser un número válido'}, status=400)

        # Obtener la localidad
        try:
            localidad = Localidad.objects.get(id=localidad_id)
        except Localidad.DoesNotExist:
            return JsonResponse({'error': 'Localidad no válida'}, status=400)

        # Verificar cuántos productos se han agregado hoy
        from django.utils import timezone
        today = timezone.now().date()
        productos_hoy = Producto.objects.filter(fecha_creacion__date=today).count()

        if productos_hoy >= 10:
            return JsonResponse({'error': 'Solo se pueden agregar 10 productos por día'}, status=400)

        # Crear el nuevo producto
        producto = Producto(name=name, precio=precio, localidad=localidad)
        producto.save()

        return JsonResponse({'message': 'Producto agregado correctamente'})

    return JsonResponse({'error': 'Método no permitido'}, status=405)

def obtener_productos(request):
    productos = Producto.objects.values('id', 'name', 'precio', 'localidad__nombre')
    return JsonResponse(list(productos), safe=False)

