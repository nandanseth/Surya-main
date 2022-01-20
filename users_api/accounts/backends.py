from django.contrib.auth import get_user_model


class EmailAuthBackend(object):
    def authenticate(self, request, email, password):
        try:
            UserModel = get_user_model()
            user = UserModel.objects.get(email=email)
            if user.check_password(password):
                return user
        except UserModel.DoesNotExist:
            return None

    def get_user(self, user_id):
        try:
            UserModel = get_user_model()
            return UserModel.objects.get(pk=user_id)
        except:
            return None
