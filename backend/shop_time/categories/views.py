from rest_framework.views import APIView
from .models import Category
from .serializer import CategorySerializer
from rest_framework.permissions import AllowAny
from rest_framework import status
from rest_framework.response import Response




class CategoryList(APIView):
    """ get all categories with tree structure"""
    permission_classes = (AllowAny,)


    def get(self,request,format=None):
        """
        loop only for cat and sub_cat == 1 level inclusiveness;
        need more: make loop deeper
        """
        if Category.objects.all().exists():
            categories = Category.objects.all()
            result = []
            for cat in categories:
                if not cat.parent:
                    item = {}
                    item['id'] = cat.id
                    item['name'] = cat.name
                    item['slug'] = cat.slug
                    item['sub_categories'] = []
                    for category in categories:
                        sub_item  = {}
                        if category.parent and category.parent.id == cat.id:
                            sub_item['id'] = category.id
                            sub_item['name'] = category.name
                            sub_item['sub_categories']  = []
                            item['sub_categories'].append(sub_item)
                    result.append(item)        
 
            return Response({'categories':result},status=status.HTTP_200_OK)
        else:
            # instead of 404 ( server error)
            return Response({'errors':'No categories found'},status=status.HTTP_500_INTERNAL_SERVER_ERROR)  
    

   # def get_queryset(self, queryset=None):        
        #qs =  Category.objects.all()
        # TODO
        # return queryset
        # return queryset.get_cached_trees