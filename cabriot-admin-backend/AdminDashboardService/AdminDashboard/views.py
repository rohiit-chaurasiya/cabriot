from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED,HTTP_404_NOT_FOUND,HTTP_204_NO_CONTENT,HTTP_400_BAD_REQUEST
HTTP_400_BAD_REQUEST
from rest_framework import viewsets
from .serializers import CuisineChoiceSerializer, KitchenSerializer, MealChoiceSerializer,\
    MenuSerializer, DishInfoSerializer, MealSerializer, DietaryChoiceSerializer, KitchenMenusSerializer, \
    MenuDataWithKitchenSerializer, UpdateMealSerializer, MealPlanSerializer, MealPlanDataSerializer
from .models import CuisineChoice, DietaryChoice, Kitchen, MealChoice, Menu, DishInfo, Meal, KitchenMenus, MealPlan

import pathlib
pathlib.Path('save_path').mkdir(parents=True, exist_ok=True)
from rest_framework import status




# Create your views here.

class DietaryViewSet(viewsets.ViewSet):
    def GetMeal(self,req):
        diet = DietaryChoice.objects.all()
        serializer = DietaryChoiceSerializer(diet,many=True)
        return Response(serializer.data)
    
class CusisineViewSet(viewsets.ViewSet):
    def GetMeal(self,req):
        diet = CuisineChoice.objects.all()
        serializer = CuisineChoiceSerializer(diet,many=True)
        return Response(serializer.data)
    
class MealChoiceViewSet(viewsets.ViewSet):
    def GetMeal(self,req):
        diet = MealChoice.objects.all()
        serializer = MealChoiceSerializer(diet,many=True)
        return Response(serializer.data)


class StateCityViewSet(viewsets.ViewSet):
    def GetStateCity(selfself, req):
        pass


class KitechenViewSet(viewsets.ViewSet):
    def GetKitechens(self,req):
        kitchens = Kitchen.objects.all()
        serializer = KitchenSerializer(kitchens,many =True)
        return Response(serializer.data)
    
    def PostKitechens(self,req):
        serializer = KitchenSerializer(data=req.data)
        print(serializer)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data,status=HTTP_201_CREATED)
    
    def RetriveKitechens(self,req,pk=None):
       try:
            kitchen = Kitchen.objects.get(kitchen_id=pk)
            serilizer = KitchenSerializer(kitchen)
            return Response(serilizer.data)
       except kitchen.DoesNotExist:
            return Response({"message":"not exist"}, status=HTTP_404_NOT_FOUND)
       
    def UpdateKitechens(self,req,pk=None):
        kitchen = Kitchen.objects.get(kitchen_id=pk)
        serializer = KitchenSerializer(instance=kitchen,data=req.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data,status=HTTP_201_CREATED)

    def DistoryKitechens(self, request, pk=None):
        try:
            print(pk)
            kitchen =Kitchen.objects.get(kitchen_id=pk)
            kitchen.delete()
            return Response(status=HTTP_204_NO_CONTENT)
        except kitchen.DoesNotExist:
            return Response({"detail": "Product not found."}, status=HTTP_404_NOT_FOUND)


class MenuViewSet(viewsets.ViewSet):
    def get_menu(self, request):
        menus = Menu.objects.all()
        serializer = MenuSerializer(menus, many=True)
        return Response(serializer.data)

    def get_kitchen_menus(self, request):
        kitchen_menus = KitchenMenus.objects.all()
        kitchen_menus_serializer = MenuDataWithKitchenSerializer(kitchen_menus, many=True)
        return Response(kitchen_menus_serializer.data)

    def create_menu(self, request):
        menu_serializer = MenuSerializer(data=request.data, many=True)

        if menu_serializer.is_valid():
            created_menu_ids = []
            for menu_data in menu_serializer.validated_data:
                created_menu = Menu.objects.create(**menu_data)
                created_menu_ids.append(created_menu.menu_id)

            response_data = {'message': 'Menus added successfully', 'menu_ids': created_menu_ids}
            return Response(response_data, status=HTTP_201_CREATED)

        return Response(menu_serializer.errors, status=HTTP_400_BAD_REQUEST)

    def create_kitchen_menu(self, request):
        kitchen_menu_serializer = KitchenMenusSerializer(data=request.data)
        print(kitchen_menu_serializer)
        if kitchen_menu_serializer.is_valid():
            kitchen_menu_serializer.save()
            return Response(kitchen_menu_serializer.data,  status=HTTP_201_CREATED)
        return Response(status=HTTP_400_BAD_REQUEST)
    
    def RetriveMenu(self,req,pk=None):
       try:
            menu = Menu.objects.get(id=pk)
            serilizer = MenuSerializer(menu)
            return Response(serilizer.data)
       except Menu.DoesNotExist:
            return Response({"message":"not exist"}, status=HTTP_404_NOT_FOUND)

    def Retrive_kitchen_Menu(self,req,pk=None):
        try:
            kitchen = KitchenMenus.objects.get(id=pk)
            serilizer = MenuDataWithKitchenSerializer(kitchen)
            return Response(serilizer.data)
        except KitchenMenus.DoesNotExist:
            return Response({"message": "not exist"}, status=HTTP_404_NOT_FOUND)
       
    def delete_menu(self, request, pk=None):
        try:
            menu = Menu.objects.get(pk=pk)
            menu.delete()
            return Response(status=HTTP_204_NO_CONTENT)
        except Menu.DoesNotExist:
            return Response({'error': 'Menu not found'}, status=HTTP_404_NOT_FOUND)

    def delete_kitchen_menu(self, request, pk=None):
        try:
            menu = KitchenMenus.objects.get(pk=pk)
            menu.delete()
            return Response(status=HTTP_204_NO_CONTENT)
        except Menu.DoesNotExist:
            return Response({'error': 'Menu not found'}, status=HTTP_404_NOT_FOUND)

    def update_menu(self, request, pk=None):
        try:
            menu = Menu.objects.get(pk=pk)
            serializer = MenuSerializer(menu, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
        except Menu.DoesNotExist:
            return Response({'error': 'Menu not found'}, status=HTTP_404_NOT_FOUND)

    def update_kitchen_menu(self, request, pk=None):
        pass


class DishInfoViewSet(viewsets.ViewSet):
    def GetDishes(self, req):
        dish = DishInfo.objects.all()
        serializer = DishInfoSerializer(dish, many=True)
        return Response(serializer.data)
    
    def RetriveDish(self, req, pk=None):
            try:
                kitchen = DishInfo.objects.get(dish_id=pk)
                serializer = DishInfoSerializer(kitchen)
                return Response(serializer.data)
            except DishInfo.DoesNotExist:
                return Response({"message": "not exist"}, status=HTTP_404_NOT_FOUND)

    def PostDish(self, req):
        serializer = DishInfoSerializer(data=req.data)
        if serializer.is_valid():
            # Convert choices to integers
            dietary_choices = [int(choice) for choice in req.data.get('dietary_choices', [])]
            cuisine_choices = [int(choice) for choice in req.data.get('cuisine_choices', [])]
            meal_choices = [int(choice) for choice in req.data.get('meal_choices', [])]
            serializer.validated_data['dietary_choices'] = dietary_choices
            serializer.validated_data['cuisine_choices'] = cuisine_choices
            serializer.validated_data['meal_choices'] = meal_choices
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    # method for delete
    def DeleteDish(self, request, pk=None):
        try:
            dish = DishInfo.objects.get(pk=pk)
            dish.delete()
            return Response(status=HTTP_204_NO_CONTENT)
        except DishInfo.DoesNotExist:
            return Response({'error': 'dish is not found'}, status=HTTP_404_NOT_FOUND)
        
    def UpdateDish(self, request, pk=None):
            try:
                dish = DishInfo.objects.get(pk=pk)
                serializer = DishInfoSerializer(dish, data=request.data)
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data)
                return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
            except dish.DoesNotExist:
                return Response({'error': 'Dish not found'}, status=HTTP_404_NOT_FOUND)

    
class MealInfoViewSet(viewsets.ViewSet):
    def GetMeal(self, req):
        meal = Meal.objects.all()
        serializer = MealSerializer(meal, many=True)
        return Response(serializer.data)

    def UpdateRetriveMeal(self, req, pk=None):
        try:
            kitchen = Meal.objects.get(meal_id=pk)
            serializer = UpdateMealSerializer(kitchen)
            return Response(serializer.data)
        except Meal.DoesNotExist:
            return Response({"message": "not exist"}, status=HTTP_404_NOT_FOUND)
    
    def RetriveMeal(self, req, pk=None):
            try:
                kitchen = Meal.objects.get(meal_id=pk)
                serializer = MealSerializer(kitchen)
                return Response(serializer.data)
            except Meal.DoesNotExist:
                return Response({"message": "not exist"}, status=HTTP_404_NOT_FOUND)

    def PostMeal(self, req):
        serializer = MealSerializer(data=req.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=HTTP_201_CREATED)

    def DeleteMeal(self, request, pk=None):
        try:
            dish = Meal.objects.get(pk=pk)
            dish.delete()
            return Response(status=HTTP_204_NO_CONTENT)
        except Meal.DoesNotExist:
            return Response({'error': 'dish is not found'}, status=HTTP_404_NOT_FOUND)
        
    def UpdateMeal(self, request, pk=None):
            try:
                dish = Meal.objects.get(pk=pk)
                serializer = MealSerializer(dish, data=request.data)
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data)
                return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
            except Meal.DoesNotExist:
                return Response({'error': 'Dish not found'}, status=HTTP_404_NOT_FOUND)


class MealPlanViewSet(viewsets.ViewSet):
    def GetMealPlan(self, req):
        try:
            mealPlan = MealPlan.objects.all()
            serializer = MealPlanDataSerializer(mealPlan, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response({"error": str(e)}, status=HTTP_400_BAD_REQUEST)

    def PostMealPlan(self, req):
        try:
            serializer = MealPlanSerializer(data=req.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=HTTP_201_CREATED)
            return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": str(e)}, status=HTTP_400_BAD_REQUEST)

    def RetriveMealPlan(self, req, pk=None):
        try:
            mealPlan = MealPlan.objects.get(meal_plan_id=pk)
            serializer = MealPlanDataSerializer(mealPlan)
            return Response(serializer.data)
        except MealPlan.DoesNotExist:
            return Response({"message": "not exist"}, status=HTTP_404_NOT_FOUND)

    def UpdateMealPlan(self, req, pk=None):
        try:
            mealPlan = MealPlan.objects.get(pk=pk)
            serializer = MealPlanSerializer(mealPlan, data=req.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
        except MealPlan.DoesNotExist:
            return Response({'error': 'Dish not found'}, status=HTTP_404_NOT_FOUND)

    def DeleteMealPlan(self, req, pk=None):
        try:
            mealPlan = MealPlan.objects.get(meal_plan_id=pk)
            mealPlan.delete()
            return Response(status=HTTP_204_NO_CONTENT)
        except MealPlan.DoesNotExist:
            return Response({'error': 'dish is not found'}, status=HTTP_404_NOT_FOUND)