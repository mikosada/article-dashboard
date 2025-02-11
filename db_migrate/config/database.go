package config

import (
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

//variabel global koneksi ke database
var DB *gorm.DB

//fungsi untuk menghubungkan ke database
func ConnectDatabase() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local",
	os.Getenv("DB_USER"),
	os.Getenv("DB_PASSWORD"),
	os.Getenv("DB_HOST"),
	os.Getenv("DB_PORT"),
	os.Getenv("DB_NAME"),
)

db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
if err != nil {
	log.Fatal("Gagal terhubung ke database: ", err)
}

fmt.Println("Database berhasil terhubung")
DB = db
}