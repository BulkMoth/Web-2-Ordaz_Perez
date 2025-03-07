from django import forms
from .models import Evento

class EventoForm(forms.ModelForm):
    class Meta:
        model = Evento
        fields = ['name', 'localidad', 'fecha_inicio', 'fecha_fin']

