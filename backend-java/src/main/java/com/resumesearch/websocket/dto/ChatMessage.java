package com.resumesearch.websocket.dto;

public class ChatMessage {
    private String type;      // e.g. CHAT_MESSAGE, NEW_COMMENT
    private String postId;    // user/resume id
    private String username;
    private String content;
    private long timestamp;

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public String getPostId() { return postId; }
    public void setPostId(String postId) { this.postId = postId; }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
    public long getTimestamp() { return timestamp; }
    public void setTimestamp(long timestamp) { this.timestamp = timestamp; }
}

