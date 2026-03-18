package com.resumesearch.websocket;

import com.resumesearch.websocket.dto.ProgressUpdate;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

@Component
public class ProgressController {

    private final SimpMessagingTemplate messagingTemplate;

    public ProgressController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    public void sendProgress(String jobId, int percent, String status, String step) {
        ProgressUpdate update = new ProgressUpdate();
        update.setJobId(jobId);
        update.setPercent(percent);
        update.setStatus(status);
        update.setStep(step);

        messagingTemplate.convertAndSend("/topic/progress/" + jobId, update);
    }
}

