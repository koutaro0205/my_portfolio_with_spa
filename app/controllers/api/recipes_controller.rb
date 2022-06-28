class Api::RecipesController < ApplicationController
  before_action :set_recipe, only: %i[show edit update destroy]
  before_action :correct_user, only: %i[edit update destroy]

  def index
    @recipes = json_with_image_and_user(Recipe.all)
    render json: @recipes
  end

  def show
    render json: json_with_image_and_user(@recipe)
    # @comment = Comment.new
    # @comments = @recipe.comments.order(created_at: :desc)
  end

  def new
  end

  def create
    @recipe = current_user.recipes.build(recipe_params)
    if params[:image]
      attach_image(@recipe)
    end

    if @recipe.save
      render json: { recipe: @recipe, status: :created }
    else
      render json: { errors: @recipe.errors, status: :unprocessable_entity }
    end
  end

  def edit
    # @user = @recipe.user
    # render json: { recipe: @recipe, user: @user, status: :ok, image: @recipe.image_url }
    render json: json_with_image(@recipe)
  end

  def update
    if params[:image]
      attach_image(@recipe)
    end

    if @recipe.update(recipe_params)
      render json: { recipe: @recipe, status: :ok, message: "レシピの内容が更新されました", image: @recipe.image_url}
    else
      render json: { errors: @recipe.errors, status: :unprocessable_entity }
    end
  end

  def destroy
    @recipe.destroy
    render json: { status: :ok, message: "レシピを削除しました"}
  end

  def search
    @recipes = json_with_image_and_user(Recipe.search(params[:keyword]))
    @keyword = params[:keyword]
    render json: {recipes: @recipes, keyword: @keyword}
  end

  private
    def set_recipe
      @recipe = Recipe.find(params[:id])
    end

    def recipe_params
      params.permit(:title, :ingredient, :body, :image, :duration, :cost)
    end

    def attach_image(recipe)
      blob = ActiveStorage::Blob.create_and_upload!(
        io: StringIO.new(decode(params[:image][:data]) + "\n"),
        filename: params[:image][:filename]
        )
      recipe.image.attach(blob)
    end

    def decode(str)
      Base64.decode64(str.split(',').last)
    end

    def correct_user
      @user = @recipe.user
      render json: { status: :forbidden, message: '権限がありません' } unless current_user?(@user)
    end
end