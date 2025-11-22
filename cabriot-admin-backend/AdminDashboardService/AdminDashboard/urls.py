from django.urls import path
from .views import CusisineViewSet, DietaryViewSet, KitechenViewSet, MealChoiceViewSet, MenuViewSet, DishInfoViewSet,MealInfoViewSet, StateCityViewSet
from django.conf.urls.static import static
from django.conf import settings
from . import views

urlpatterns = [
    path('statecity', StateCityViewSet.as_view({
        "get": "GetStateCity",
    })),
    path('dietary', DietaryViewSet.as_view({
            "get": "GetMeal",
    })),
     path('cusisine', CusisineViewSet.as_view({
            "get": "GetMeal",
    })),
     path('mealchioce', MealChoiceViewSet.as_view({
            "get": "GetMeal",
    })),
    path('kitchen', KitechenViewSet.as_view({
        "get": "GetKitechens",
        "post": "PostKitechens"
    })),
    path('kitchen/<str:pk>', KitechenViewSet.as_view({
        "get": "RetriveKitechens",
        "put": "UpdateKitechens",
        "delete": "DistoryKitechens"
    })),
    
    path('menu', MenuViewSet.as_view({
        "get": "get_menu",
        "post": "create_menu",
    }), name='menu-list'),
    path('menu/<int:pk>', MenuViewSet.as_view({
        "put": "update_menu",
        "get": "RetriveMenu",
        "delete": "delete_menu"
    }), name='menu-detail'),
    path('menu/kitchenmenu', MenuViewSet.as_view({
        "get": "get_kitchen_menus",
        "post": "create_kitchen_menu",
    }), name='menu-list'),
    path('menu/kitchenmenu/<int:pk>', MenuViewSet.as_view({
        "put": "update_kitchen_menu",
        "get": "Retrive_kitchen_Menu",
        "delete": "delete_kitchen_menu"
    }), name='menu-detail'),
    path('dishinfo', DishInfoViewSet.as_view({
            "get": "GetDishes",
            "post": "PostDish"
    })),
    path('dishinfo/<int:pk>', DishInfoViewSet.as_view({
            'get': 'RetriveDish',
            'delete': 'DeleteDish',
            'put': 'UpdateDish'
    })),
    path('mealinfo', MealInfoViewSet.as_view({
            "get": "GetMeal",
            "post": "PostMeal"
    })),
    path('mealinfo/<int:pk>', MealInfoViewSet.as_view({
            'get': 'RetriveMeal',
            'delete': 'DeleteMeal',
            'put': 'UpdateMeal'
    })),
    path('mealinfo/update/<int:pk>', MealInfoViewSet.as_view({
            'get': 'UpdateRetriveMeal',
    })),
    path('mealplan', views.MealPlanViewSet.as_view({
        "get": "GetMealPlan",
        "post": "PostMealPlan"
    })),
    path('mealplan/<int:pk>', views.MealPlanViewSet.as_view({
        "get": "RetriveMealPlan",
        "put": "UpdateMealPlan",
        "delete": "DeleteMealPlan"
    })),
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)