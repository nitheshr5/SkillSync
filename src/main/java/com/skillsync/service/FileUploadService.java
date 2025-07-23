package com.skillsync.service;

import com.skillsync.model.FileUpload;
import com.skillsync.model.User;
import com.skillsync.repository.FileUploadRepository;
import com.skillsync.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.*;
import java.time.LocalDateTime;

@Service
public class FileUploadService {

    private static final String UPLOAD_DIR = "uploads/";

    @Autowired
    private FileUploadRepository fileUploadRepository;

    @Autowired
    private UserRepository userRepository;

    public FileUpload storeFile(MultipartFile file, Long userId) throws IOException {
    return uploadFile(userId, file);
}



    public FileUpload uploadFile(Long userId, MultipartFile file) throws IOException {
        // Validate file type
        String fileName = file.getOriginalFilename();
        if (fileName == null || !(fileName.endsWith(".pdf") || fileName.endsWith(".docx"))) {
            throw new IllegalArgumentException("Only .pdf and .docx files are allowed");
        }

        // Fetch user
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + userId));

        // Create upload directory if it doesn't exist
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
}
