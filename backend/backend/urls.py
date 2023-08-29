from django.contrib import admin
from django.urls import path, include
from rest_framework import routers 
from eval.views import SummariesView, TextView

route = routers.DefaultRouter()
route.register("text", TextView, basename="textview")
route.register("summaries", SummariesView, basename="summariesview")

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('eval.urls')),
    path('api/', include(route.urls)),
    # path('api-auth/', include('rest_framework.urls')),
]
