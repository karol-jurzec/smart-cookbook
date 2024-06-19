defmodule SmartCookbook.Recipes.RecipeResponse do
  use Ecto.Schema
  import Ecto.Changeset

  embedded_schema do
    field :name, :string
    field :ingredients, {:array, :string}
    field :execution_time, :string
    field :change_desc, :string, default: ""
    field :calories, :integer
    field :instructions, {:array, :string}
  end

  @doc false
  def changeset(recipe, attrs) do
    recipe
    |> cast(attrs, [:name, :ingredients, :execution_time, :calories, :instructions, :change_desc])
    |> validate_required([:name, :ingredients, :execution_time, :calories, :instructions])
  end
end
