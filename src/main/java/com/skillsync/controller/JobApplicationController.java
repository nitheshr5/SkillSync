package com.skillsync.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skillsync.model.JobApplication;
import com.skillsync.model.User;
import com.skillsync.repository.JobApplicationRepository;
import com.skillsync.repository.UserRepository;

@RestController
@RequestMapping("/api/jobs")
public class JobApplicationController {

    @Autowired
    private JobApplicationRepository jobRepo;

    @Autowired
    private UserRepository userRepo;

    @GetMapping
    public List<JobApplication> getAllJobs() {
        return jobRepo.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<JobApplication> getJobById(@PathVariable Long id) {
        return jobRepo.findById(id)
                .map(job -> ResponseEntity.ok().body(job))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<JobApplication> createJob(@RequestBody JobApplication job) {
        if (job.getUser() == null || job.getUser().getId() == null) {
            return ResponseEntity.badRequest().build();
        }

        User user = userRepo.findById(job.getUser().getId()).orElse(null);
        if (user == null) {
            return ResponseEntity.badRequest().build();
        }

        job.setUser(user);
        return ResponseEntity.ok(jobRepo.save(job));
    }

  @PutMapping("/{id}")
public ResponseEntity<JobApplication> updateJob(@PathVariable Long id, @RequestBody JobApplication updatedJob) {
    return jobRepo.findById(id)
            .map(existingJob -> {
                existingJob.setCompany(updatedJob.getCompany());
                existingJob.setRole(updatedJob.getRole());
                existingJob.setStatus(updatedJob.getStatus());
                return ResponseEntity.ok(jobRepo.save(existingJob));
            })
            .orElse(ResponseEntity.notFound().build());
}


    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteJob(@PathVariable Long id) {
        jobRepo.deleteById(id);
        return ResponseEntity.ok("Job deleted successfully");
    }
}
