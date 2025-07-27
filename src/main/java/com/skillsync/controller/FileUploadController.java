package com.skillsync.controller;

import com.skillsync.model.FileUpload;
import com.skillsync.service.FileUploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/files")
public class FileUploadController {

    @Autowired
    private FileUploadService fileUploadService;

    // ✅ 1. Upload File
    @PostMapping("/upload/{userId}")
    public ResponseEntity<FileUpload> uploadFile(
            @PathVariable Long userId,
            @RequestParam("file") MultipartFile file
    ) throws IOException {
        FileUpload uploadedFile = fileUploadService.uploadFile(userId, file);
        return new ResponseEntity<>(uploadedFile, HttpStatus.CREATED);
    }

    // ✅ 2. List Files by User ID
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<FileUpload>> getFilesByUserId(@PathVariable Long userId) {
        List<FileUpload> files = fileUploadService.getFilesByUserId(userId);
        return ResponseEntity.ok(files);
    }

    // ✅ 3. (Coming next) Download File by File ID
    @GetMapping("/download/{fileId}")
    public ResponseEntity<Resource> downloadFile(@PathVariable Long fileId) throws IOException {
        Resource resource = fileUploadService.loadFileAsResource(fileId);
        String contentType = "application/octet-stream";

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }
    @DeleteMapping("/{fileId}")
    public ResponseEntity<?> deleteFile(@PathVariable Long fileId) {
    try {
        fileUploadService.deleteFileById(fileId);
        return ResponseEntity.ok("File deleted successfully");
    } catch (IOException e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete file: " + e.getMessage());
    } catch (IllegalArgumentException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    }
}

}
