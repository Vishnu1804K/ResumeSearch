package com.resumesearch.websocket;

import com.resumesearch.domain.Comment;
import com.resumesearch.repository.CommentRepository;
import com.resumesearch.websocket.dto.ChatMessage;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.time.Instant;

@Controller
public class ChatController {

    private final CommentRepository commentRepository;

    public ChatController(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    @MessageMapping("/chat.sendComment")
    @SendTo("/topic/comments")
    public ChatMessage sendComment(@Payload ChatMessage message) {
        if (message.getPostId() != null && message.getUsername() != null && message.getContent() != null) {
            Comment comment = new Comment();
            comment.setPostId(message.getPostId());
            comment.setUsername(message.getUsername());
            comment.setComment(message.getContent());
            comment.setCreatedAt(Instant.now());
            commentRepository.save(comment);
        }

        message.setTimestamp(System.currentTimeMillis());
        if (message.getType() == null) {
            message.setType("CHAT_MESSAGE");
        }
        return message;
    }
}

