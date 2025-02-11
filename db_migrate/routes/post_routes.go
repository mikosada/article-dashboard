package routes

import (
	"db_migrate/controllers"

	"github.com/gin-gonic/gin"
)

 func PostRoutes(router *gin.Engine) {
	postGroup := router.Group("/article")
	{
		postGroup.POST("/", controllers.CreatePost)
		postGroup.GET("/list/:limit/:offset", controllers.GetPosts)
		postGroup.GET("/:id", controllers.GetPostByID)
		postGroup.PUT("/:id", controllers.UpdatePost)
		postGroup.PATCH("/:id", controllers.UpdatePost)
		postGroup.DELETE("/:id", controllers.DeletePost)
	}
 }