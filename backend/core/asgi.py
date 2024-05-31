"""
ASGI config for core project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/howto/deployment/asgi/
"""

import os

from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter,URLRouter
from channels.security.websocket import AllowedHostsOriginValidator
from django.core.asgi import get_asgi_application
from chat import routing
import django
django.setup()
git
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')

django_application_asgi = get_asgi_application()
application = ProtocolTypeRouter({
    "http":django_application_asgi ,
    "websocket":
        AuthMiddlewareStack(URLRouter(routing.websoket_urlpatterns))

})