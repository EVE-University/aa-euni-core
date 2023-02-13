# Alliance Auth
from allianceauth.authentication.backends import StateBackend
from allianceauth.services.hooks import get_extension_logger

logger = get_extension_logger(__name__)


class EUniBackend(StateBackend):
    """EVE Uni Authorization Backend"""

    # Create new users with a fake generated email and activate them skipping email registration
    def create_user(self, token):
        logger.debug("EUniBackend:create_user(%s)", token)
        user = super().create_user(token)
        user.is_active = True
        user.email = f"{user.id}@eveuniversity.org"
        user.save()

        return user
