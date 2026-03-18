package com.resumesearch.service;

import com.lowagie.text.Document;
import com.lowagie.text.DocumentException;
import com.lowagie.text.Paragraph;
import com.lowagie.text.pdf.PdfWriter;
import com.resumesearch.domain.User;
import com.resumesearch.repository.UserRepository;
import com.resumesearch.websocket.ProgressController;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Optional;
import java.util.UUID;

@Service
public class ResumeService {

    private final UserRepository userRepository;
    private final ProgressController progressController;

    public ResumeService(UserRepository userRepository, ProgressController progressController) {
        this.userRepository = userRepository;
        this.progressController = progressController;
    }

    public GeneratedResume generateResume(String userId) throws IOException, DocumentException {
        String jobId = UUID.randomUUID().toString();

        progressController.sendProgress(jobId, 5, "STARTED", "Initializing resume generation");

        Optional<User> maybeUser = userRepository.findById(userId);
        if (maybeUser.isEmpty()) {
            progressController.sendProgress(jobId, 100, "FAILED", "User not found");
            throw new IllegalArgumentException("User not found");
        }

        User user = maybeUser.get();

        progressController.sendProgress(jobId, 30, "IN_PROGRESS", "Preparing PDF document");

        ByteArrayOutputStream out = new ByteArrayOutputStream();
        Document document = new Document();
        PdfWriter.getInstance(document, out);

        document.open();
        progressController.sendProgress(jobId, 60, "IN_PROGRESS", "Writing resume content");

        document.add(new Paragraph(user.getFirstName() + " " + user.getLastName()));
        document.add(new Paragraph("Email: " + user.getEmail()));
        document.add(new Paragraph("Mobile: " + user.getMobileNumber()));
        document.add(new Paragraph("Portfolio: " + user.getPortfolio()));

        document.close();

        progressController.sendProgress(jobId, 100, "COMPLETED", "Resume generation completed");

        return new GeneratedResume(jobId, out.toByteArray());
    }

    public record GeneratedResume(String jobId, byte[] bytes) {
    }
}

