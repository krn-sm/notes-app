"""add case insensitive tag uniqueness

Revision ID: 878a1eca3225
Revises: ff8d2b38340b
Create Date: 2026-08-26 18:26:15.600890

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '878a1eca3225'
down_revision: Union[str, Sequence[str], None] = 'ff8d2b38340b'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_index(
        "uq_tags_user_id_lower_name",
        "tags",
        ["user_id", sa.text("lower(name)")],
        unique=True,
    )

def downgrade() -> None:
    op.drop_index(
        "uq_tags_user_id_lower_name",
        table_name="tags",
    )
