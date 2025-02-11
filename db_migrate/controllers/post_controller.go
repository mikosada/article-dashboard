package controllers

import (
	"db_migrate/config"
	"db_migrate/models"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

//Create New Article (POST /article/)
func CreatePost(c *gin.Context) {
	var post models.Post
	if err := c.ShouldBindJSON(&post); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := config.DB.Create(&post).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Article created", "data": post})
}

//Get list of articles with pagination (GET /article/:limit/:offset)
func GetPosts(c *gin.Context) {
	limit, err := strconv.Atoi(c.Param("limit"))
	offset, err2 := strconv.Atoi(c.Param("offset"))

	if err != nil || err2 != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid limit or offset"})
		return
	}

	var posts []models.Post
	config.DB.Limit(limit).Offset(offset).Find(&posts)

	c.JSON(http.StatusOK, posts)
}

//Get article by ID (GET /article/:id)
func GetPostByID(c *gin.Context) {
	id := c.Param("id")
	var post models.Post

	if err := config.DB.First(&post, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Article not found"})
		return
	}

	c.JSON(http.StatusOK, post)
}

//Update article by ID (PUT/PATCH /article/:id)
func UpdatePost(c *gin.Context) {
	id := c.Param("id")
	var post models.Post

	if err := config.DB.First(&post, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Article not found"})
		return
	}

	var updatedData models.Post
	if err := c.ShouldBindJSON(&updatedData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	config.DB.Model(&post).Updates(updatedData)
	c.JSON(http.StatusOK, gin.H{"message": "Article updated successfully", "data": post})
}

//Delete article by ID (DELETE /article/:id)
func DeletePost(c *gin.Context) {
	id := c.Param("id")
	var post models.Post

	if err := config.DB.First(&post, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Article not found"})
		return
	}

	//Soft delete mengubah status menjadi Trash
	post.Status = "Trash"
	if err := config.DB.Save(&post).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Article moved to Trash"})
}
