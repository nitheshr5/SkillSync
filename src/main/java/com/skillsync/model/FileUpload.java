package com.skillsync.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "uploaded_files")
public class FileUpload {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fileName;
    private String originalFileName;
    private String filePath;
    private String fileType;
    private LocalDateTime uploadTime;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    // Constructors
    public FileUpload() {}

    // Getters and Setters
    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getFileName() { return fileName; }

    public void setFileName(String fileName) { this.fileName = fileName; }

    public String getOriginalFileName() { return originalFileName; }

    public void setOriginalFileName(String originalFileName) { this.originalFileName = originalFileName; }

    public String getFilePath() { return filePath; }

    public void setFilePath(String filePath) { this.filePath = filePath; }

    public String getFileType() { return fileType; }

    public void setFileType(String fileType) { this.fileType = fileType; }

    public LocalDateTime getUploadTime() { return uploadTime; }

    public void setUploadTime(LocalDateTime uploadTime) { this.uploadTime = uploadTime; }

    public User getUser() { return user; }

    public void setUser(User user) { this.user = user; }
}
