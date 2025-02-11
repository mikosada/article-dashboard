package models

import (
	"errors"
	"time"

	"gorm.io/gorm"
)

//Struktur Post
type Post struct {
	ID 			uint 		`gorm:"primaryKey;autoIncrement" json:"id"`
	Title 		string 		`gorm:"type:varchar(200);not null" json:"title" binding:"required,min=20"`
	Content 	string 		`gorm:"type:text;not null" json:"content" binding:"required,min=200"`
	Category 	string 		`gorm:"type:varchar(100);not null" json:"category" binding:"required,min=3"`
	CreatedDate time.Time 	`gorm:"type:timestamp;default:CURRENT_TIMESTAMP" json:"created_date"`
	UpdatedDate time.Time 	`gorm:"type:timestamp;default:CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP" json:"updated_date"`
	Status 		string 		`gorm:"type:varchar(100);not null;check:status IN ('Publish', 'Draft', 'Trash')" json:"status" binding:"required,oneof=Publish Draft Trash"`
}

type UpdateStatusRequest struct {
	Status string `json:"status" binding:"required,oneof=Publish Draft Trash"`
}

//Validasi
func (p *Post) BeforeSave(tx *gorm.DB) (err error) {
	if len(p.Title) < 20 {
		return errors.New("title minimal 20 karakter")
	}
	if len(p.Content) < 200 {
		return errors.New("content minimal 200 karakter")
	}
	if len(p.Category) < 3 {
		return errors.New("category minimal 3 karakter")
	}
	if p.Status != "Publish" && p.Status != "Draft" && p.Status != "Trash" {
		return errors.New("status harus berupa Publish, Draft, atau Trash")
	}
	return nil
}