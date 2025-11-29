"""seed_data

Revision ID: 2b3c4d5e6f7g
Revises: 1a2b3c4d5e6f
Create Date: 2023-10-27 10:01:00.000000

"""
from alembic import op
import sqlalchemy as sa
from app.core.security import get_password_hash
from app.core.config import settings

# revision identifiers, used by Alembic.
revision = '2b3c4d5e6f7g'
down_revision = '1a2b3c4d5e6f'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # Insert Roles
    op.execute("INSERT INTO roles (name) VALUES ('Admin'), ('Trader'), ('Analyst')")
    
    # Insert Superuser
    hashed_password = get_password_hash(settings.FIRST_SUPERUSER_PASSWORD)
    op.execute(f"INSERT INTO users (email, hashed_password, is_active, is_superuser) VALUES ('{settings.FIRST_SUPERUSER}', '{hashed_password}', true, true)")
    
    # Assign Admin role to Superuser
    # Assuming id 1 for both
    op.execute("INSERT INTO user_roles (user_id, role_id) VALUES ((SELECT id FROM users WHERE email = 'admin@hashtrade.ai'), (SELECT id FROM roles WHERE name = 'Admin'))")


def downgrade() -> None:
    op.execute("DELETE FROM user_roles")
    op.execute("DELETE FROM users")
    op.execute("DELETE FROM roles")
