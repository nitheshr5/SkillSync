package com.skillsync.controller;

import com.skillsync.model.FileUpload;
import com.skillsync.service.FileUploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/files")
@CrossOrigin(origins = "*")  // Adjust CORS if needed
public class FileUploadController {

    @Autowired
    private FileUploadService fileUploadService;

    @PostMapping("/upload/{userId}")
    public ResponseEntity<?> uploadFile(
            @RequestParam("file") MultipartFile file,
            @PathVariable Long userId
    ) {
        try {
            FileUpload uploadedFile = fileUploadService.storeFile(file, userId);
            return ResponseEntity.ok(uploadedFile);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("File upload failed: " + e.getMessage());
        }
    }
}
