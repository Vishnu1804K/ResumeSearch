package com.resumesearch.websocket.dto;

public class ProgressUpdate {
    private String jobId;
    private String status;   // e.g. STARTED, IN_PROGRESS, COMPLETED
    private int percent;     // 0-100
    private String step;     // human readable step description

    public String getJobId() { return jobId; }
    public void setJobId(String jobId) { this.jobId = jobId; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public int getPercent() { return percent; }
    public void setPercent(int percent) { this.percent = percent; }
    public String getStep() { return step; }
    public void setStep(String step) { this.step = step; }
}

