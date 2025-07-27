package com.skillsync.service;

import com.skillsync.model.FileUpload;
import com.skillsync.model.User;
import com.skillsync.repository.FileUploadRepository;
import com.skillsync.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.*;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class FileUploadService {

    private static final String UPLOAD_DIR = "uploads/";

    @Autowired
    private FileUploadRepository fileUploadRepository;

    @Autowired
    private UserRepository userRepository;

    // ✅ Upload a file and save metadata
    public FileUpload uploadFile(Long userId, MultipartFile file) throws IOException {
        // Validate file name and type
        String fileName = file.getOriginalFilename();
        if (fileName == null || !(fileName.endsWith(".pdf") || fileName.endsWith(".docx"))) {
            throw new IllegalArgumentException("Only .pdf and .docx files are allowed");
        }

        // Get user by ID
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + userId));

        // Create uploads folder if it doesn't exist
        File uploadDir = new File(UPLOAD_DIR);
        if (!uploadDir.exists()) {
            uploadDir.mkdirs();
        }

        // Save file to disk
        String savedFileName = System.currentTimeMillis() + "_" + fileName;
        Path filePath = Paths.get(UPLOAD_DIR, savedFileName);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        // Save metadata in DB
        FileUpload fileUpload = new FileUpload();
        fileUpload.setFileName(savedFileName);
        fileUpload.setOriginalFileName(fileName);
        fileUpload.setFilePath(filePath.toString());
        fileUpload.setFileType(file.getContentType());
        fileUpload.setUploadTime(LocalDateTime.now());
        fileUpload.setUser(user);

        return fileUploadRepository.save(fileUpload);
    }

    // ✅ Get all files uploaded by a specific user
    public List<FileUpload> getFilesByUserId(Long userId) {
        return fileUploadRepository.findByUserId(userId);
    }

    // ✅ Load a file as a resource (for download)
    public Resource loadFileAsResource(Long fileId) throws IOException {
        FileUpload fileUpload = fileUploadRepository.findById(fileId)
                .orElseThrow(() -> new IllegalArgumentException("File not found with ID: " + fileId));

        Path path = Paths.get(fileUpload.getFilePath());
        Resource resource = new UrlResource(path.toUri());

        if (resource.exists() && resource.isReadable()) {
            return resource;
        } else {
            throw new IOException("Could not read file: " + fileUpload.getFilePath());
        }
    }

    // ✅ Delete file by ID (from disk + DB)
    public void deleteFileById(Long fileId) throws IOException {
    FileUpload fileUpload = fileUploadRepository.findById(fileId)
            .orElseThrow(() -> new IllegalArgumentException("File not found with ID: " + fileId));

    // Delete file from disk
    Path filePath = Paths.get(fileUpload.getFilePath());
    Files.deleteIfExists(filePath);

    // Delete metadata from DB
    fileUploadRepository.deleteById(fileId);
}

}
