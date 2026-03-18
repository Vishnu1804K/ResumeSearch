package com.resumesearch.web;

import com.resumesearch.domain.Comment;
import com.resumesearch.repository.CommentRepository;
import com.resumesearch.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/api/comments")
@CrossOrigin(origins = "*")
public class CommentController {

    private final CommentRepository commentRepository;
    private final UserRepository userRepository;

    public CommentController(CommentRepository commentRepository, UserRepository userRepository) {
        this.commentRepository = commentRepository;
        this.userRepository = userRepository;
    }

    @GetMapping("/{postId}")
    public List<Comment> getComments(@PathVariable String postId) {
        return commentRepository.findByPostId(postId);
    }

    @PostMapping("/{postId}")
    public ResponseEntity<?> createComment(@PathVariable String postId, @RequestBody NewCommentRequest request) {
        if (request.getComment() == null || request.getComment().trim().isEmpty()
                || request.getUsername() == null || request.getUsername().trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Missing comment or username");
        }

        Comment comment = new Comment();
        comment.setPostId(postId);
        comment.setUsername(request.getUsername());
        comment.setComment(request.getComment().trim());
        comment.setCreatedAt(Instant.now());

        Comment saved = commentRepository.save(comment);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<?> getUser(@PathVariable String id) {
        return userRepository.findById(id)
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    public static class NewCommentRequest {
        private String comment;
        private String username;

        public String getComment() { return comment; }
        public void setComment(String comment) { this.comment = comment; }
        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }
    }
}

