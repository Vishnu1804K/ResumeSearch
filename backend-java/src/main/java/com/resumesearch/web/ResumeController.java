package com.resumesearch.web;

import com.lowagie.text.DocumentException;
import com.resumesearch.service.ResumeService;
import com.resumesearch.service.ResumeService.GeneratedResume;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/api/resume")
public class ResumeController {

    private final ResumeService resumeService;

    public ResumeController(ResumeService resumeService) {
        this.resumeService = resumeService;
    }

    @GetMapping("/generate/{userId}")
    public ResponseEntity<byte[]> generate(@PathVariable String userId) throws IOException, DocumentException {
        GeneratedResume generated = resumeService.generateResume(userId);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDisposition(ContentDisposition.attachment()
                .filename("resume-" + userId + ".pdf")
                .build());
        headers.add("X-Job-Id", generated.jobId());

        return new ResponseEntity<>(generated.bytes(), headers, HttpStatus.OK);
    }
}

