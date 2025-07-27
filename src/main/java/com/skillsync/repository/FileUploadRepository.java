package com.skillsync.repository;

import com.skillsync.model.FileUpload;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FileUploadRepository extends JpaRepository<FileUpload, Long> {
    List<FileUpload> findByUserId(Long userId);
}
