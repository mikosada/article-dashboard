package main

import (
	"db_migrate/config"
	"db_migrate/models"
	"db_migrate/routes"
	"fmt"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)


func main() {
	// Connect to the database
	config.ConnectDatabase()

	//Migrasi jika tabel belum ada
	config.DB.AutoMigrate(&models.Post{})

	//Inisialisasi router Gin
	router := gin.Default()

	//cors
	router.Use(cors.New(cors.Config{
		AllowOrigins: []string{"http://localhost:5173"},
		AllowMethods: []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders: []string{"Content-Type", "Authorization"},
		ExposeHeaders: []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge: 12 * time.Hour,
	}))

	//routes
	routes.PostRoutes(router)

	//Jalankan server di port 8008
	port := "8008"
	fmt.Println("Server running on port: ", port)
	router.Run(":" + port)
}