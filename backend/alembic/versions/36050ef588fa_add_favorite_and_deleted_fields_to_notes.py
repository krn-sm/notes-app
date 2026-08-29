"""add favorite and deleted fields to notes

Revision ID: 36050ef588fa
Revises: 878a1eca3225
Create Date: 2026-08-29 17:29:20.941244
"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "36050ef588fa"
down_revision: Union[str, Sequence[str], None] = "878a1eca3225"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column(
        "notes",
        sa.Column(
            "is_favorite",
            sa.Boolean(),
            nullable=False,
            server_default=sa.false(),
        ),
    )

    op.add_column(
        "notes",
        sa.Column(
            "is_deleted",
            sa.Boolean(),
            nullable=False,
            server_default=sa.false(),
        ),
    )


def downgrade() -> None:
    op.drop_column("notes", "is_deleted")
    op.drop_column("notes", "is_favorite")